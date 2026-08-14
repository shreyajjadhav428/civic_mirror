import { supabase } from '../config/supabase.js';
import { generateAdminClusterInsights } from '../services/admin.service.js';

/**
 * GET /api/admin/overview
 * Returns top-level dashboard metrics (Total, Pending, Resolved, Flagged, Active Clusters).
 */
export const getAdminOverview = async (req, res) => {
  try {
    const { timeframe } = req.query;

    const { count: totalRequests } = await supabase.from('complaints').select('*', { count: 'exact', head: true });
    const { count: pendingRequests } = await supabase.from('complaints').select('*', { count: 'exact', head: true }).eq('status', 'Pending');
    const { count: resolvedRequests } = await supabase.from('complaints').select('*', { count: 'exact', head: true }).eq('status', 'Resolved');
    const { count: flaggedRequests } = await supabase.from('complaints').select('*', { count: 'exact', head: true }).eq('admin_flagged', true);

    // Compute active clusters count (unique pincode + category for unresolved complaints)
    const { data: allComplaints } = await supabase.from('complaints').select('pincode, category, status');
    const activeClusterKeys = new Set();
    (allComplaints || []).forEach(c => {
      if (c.status !== 'Resolved' && c.pincode && c.category) {
        activeClusterKeys.add(`${c.pincode}_${c.category}`);
      }
    });

    return res.status(200).json({
      status: 'success',
      data: {
        totalRequests: totalRequests || 0,
        pending: pendingRequests || 0,
        resolved: resolvedRequests || 0,
        flaggedForReview: flaggedRequests || 0,
        activeClusters: activeClusterKeys.size || 0,
        timeframe: timeframe || 'Today'
      }
    });
  } catch (error) {
    console.error('Error fetching admin overview:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/admin/clusters
 * Groups complaints by category and pincode to create actionable issue clusters.
 */
export const getComplaintClusters = async (req, res) => {
  try {
    const { data: complaints, error } = await supabase
      .from('complaints')
      .select('id, complaint_code, category, pincode, status, admin_flagged, description, created_at');

    if (error) throw error;

    // Group complaints by Pincode + Category
    const clustersMap = {};

    (complaints || []).forEach(c => {
      const key = `${c.pincode}_${c.category}`;
      if (!clustersMap[key]) {
        const catSlug = (c.category || 'general').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
        clustersMap[key] = {
          clusterId: `CLS-${catSlug}-${c.pincode}`,
          id: `CLS-${catSlug}-${c.pincode}`,
          title: `${(c.category || 'MUNICIPAL').toUpperCase()} CLUSTER`,
          category: c.category || 'General',
          categoryFull: `${c.category} issues & citizen reports`,
          location: `Pincode ${c.pincode}`,
          pincode: c.pincode,
          complaintCount: 0,
          department: c.category || 'Municipal Services',
          unmatchedCount: 0,
          complaints: [],
          relatedComplaints: [],
        };
      }

      clustersMap[key].complaintCount += 1;
      if (c.admin_flagged) clustersMap[key].unmatchedCount += 1;
      clustersMap[key].complaints.push(c);
      clustersMap[key].relatedComplaints.push(c.description);
    });

    const clusters = Object.values(clustersMap).map((cl) => {
      const isHighPriority = cl.unmatchedCount > 1 || cl.complaintCount >= 5;
      const catLower = cl.category.toLowerCase();

      const resolvedCount = cl.complaints.filter(c => 
        (c.status || '').toLowerCase().includes('resolved') || 
        (c.status || '').toLowerCase().includes('completed')
      ).length;
      const inProgressCount = cl.complaints.filter(c => 
        (c.status || '').toLowerCase().includes('progress')
      ).length;
      const pendingCount = Math.max(0, cl.complaints.length - resolvedCount - inProgressCount);

      let clusterStatus = 'Pending';
      if (resolvedCount === cl.complaints.length && cl.complaints.length > 0) {
        clusterStatus = 'Completed';
      } else if (inProgressCount > 0 || resolvedCount > 0) {
        clusterStatus = 'In Progress';
      }

      let topAccent = "bg-[#2D7FF9]";
      let deptColor = "text-[#2D7FF9]";

      if (catLower.includes('road')) {
        topAccent = "bg-[#FFC107]";
        deptColor = "text-[#D97706]";
      } else if (catLower.includes('water')) {
        topAccent = "bg-[#00A68E]";
        deptColor = "text-[#00A68E]";
      } else if (catLower.includes('sanitation') || catLower.includes('drain')) {
        topAccent = "bg-[#6366F1]";
        deptColor = "text-[#6366F1]";
      }

      return {
        ...cl,
        status: clusterStatus,
        resolvedCount,
        inProgressCount,
        pendingCount,
        priority: isHighPriority ? 'High' : 'Medium',
        priorityStyle: isHighPriority ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200',
        topAccent,
        barColor: topAccent,
        cardHoverBorder: 'hover:border-[#2D7FF9]',
        btnHover: 'hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white',
        titleHover: 'group-hover:text-[#2D7FF9]',
        deptColor,
        flowChain: [
          `${cl.complaintCount} COMPLAINTS`,
          cl.category.toUpperCase(),
          `PINCODE ${cl.pincode}`,
          cl.department.toUpperCase(),
          'RELATED MUNICIPAL CONTEXT'
        ]
      };
    }).sort((a, b) => b.complaintCount - a.complaintCount);

    // Sync clusters to Supabase clusters table asynchronously
    try {
      const dbClusters = clusters.map(c => ({
        id: c.id,
        name: c.title,
        pincode: c.pincode,
        category: c.category,
        department: c.department,
        status: 'Active',
        priority: c.priority,
        complaint_count: c.complaintCount,
        updated_at: new Date().toISOString()
      }));

      if (dbClusters.length > 0) {
        await supabase.from('clusters').upsert(dbClusters, { onConflict: 'id' });
      }
    } catch (dbErr) {
      console.warn('Syncing clusters table warning:', dbErr?.message);
    }

    return res.status(200).json({
      status: 'success',
      count: clusters.length,
      data: clusters
    });
  } catch (error) {
    console.error('Error fetching clusters:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * POST /api/admin/insights
 * Generates AI-driven root cause analysis and recommendations for a specific complaint cluster.
 */
export const getClusterInsights = async (req, res) => {
  try {
    const { pincode, category } = req.body;

    if (!pincode || !category) {
      return res.status(400).json({ error: 'BadRequest', message: 'pincode and category are required.' });
    }

    const { data: complaints } = await supabase
      .from('complaints')
      .select('id, description, status, admin_flagged, created_at')
      .eq('pincode', pincode)
      .ilike('category', `%${category}%`);

    const { data: activeProjects } = await supabase
      .from('projects')
      .select('project_code, title, status, progress, expected_completion')
      .eq('pincode', pincode);

    const clusterPayload = {
      pincode,
      category,
      total_complaints: complaints?.length || 0,
      complaint_descriptions: complaints?.map(c => c.description) || [],
      existing_projects_in_area: activeProjects || []
    };

    const insights = await generateAdminClusterInsights(clusterPayload);

    // Persist insights into Supabase clusters table
    try {
      const catSlug = (category || 'general').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
      const clusterId = `CLS-${catSlug}-${pincode}`;
      await supabase
        .from('clusters')
        .update({
          root_cause: insights.root_cause,
          recommendation: insights.recommendation,
          reasoning: insights.reasoning,
          updated_at: new Date().toISOString()
        })
        .eq('id', clusterId);
    } catch (dbErr) {
      console.warn('Persisting cluster insights to database warning:', dbErr?.message);
    }

    return res.status(200).json({
      status: 'success',
      data: {
        pincode,
        category,
        insights
      }
    });

  } catch (error) {
    console.error('Error generating cluster insights:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/admin/pincode/:pincode
 * Returns geographic intelligence for a specified pincode[cite: 1].
 */
export const getPincodeIntelligence = async (req, res) => {
  try {
    const { pincode } = req.params;

    const { data: complaints } = await supabase
      .from('complaints')
      .select('*')
      .eq('pincode', pincode);

    const { data: projects } = await supabase
      .from('projects')
      .select('*, departments(name), budgets(*)')
      .eq('pincode', pincode);

    return res.status(200).json({
      status: 'success',
      data: {
        pincode,
        activeComplaintsCount: complaints?.filter(c => c.status !== 'Resolved').length || 0,
        resolvedComplaintsCount: complaints?.filter(c => c.status === 'Resolved').length || 0,
        ongoingProjectsCount: projects?.filter(p => p.status === 'In Progress').length || 0,
        complaints: complaints || [],
        projects: projects || []
      }
    });
  } catch (error) {
    console.error('Error fetching pincode intelligence:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/admin/projects
 * Retrieves all municipal projects from Supabase.
 */
export const getAdminProjects = async (req, res) => {
  try {
    const { data: dbProjects, error } = await supabase
      .from('projects')
      .select('*, complaints(id, complaint_code, description, status)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formattedProjects = (dbProjects || []).map((p, idx) => {
      const budgetNum = Number(p.budget) || (2200000 + (idx * 500000));
      const utilNum = Number(p.utilized_budget) || Math.round(budgetNum * ((p.progress || 50) / 100));
      const remNum = Math.max(0, budgetNum - utilNum);
      const isCompleted = p.status === 'Completed' || p.progress === 100;

      const connected = (p.complaints || []).map((c) => ({
        id: c.complaint_code || c.id,
        title: c.description || 'Citizen issue',
        citizen: 'Citizen User',
        status: c.status || 'In Progress'
      }));

      return {
        id: p.id || `PRJ-0${idx + 1}`,
        project_code: p.project_code || `PRJ-0${idx + 1}`,
        name: p.title || 'Municipal Infrastructure Project',
        department: p.category || 'Engineering & Road Ops',
        pincode: p.pincode || '110025',
        startDate: p.start_date || '01 June 2026',
        expectedCompletion: p.expected_completion ? new Date(p.expected_completion).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : '30 Nov 2026',
        progress: p.progress ?? 50,
        budget: budgetNum,
        utilizedBudget: utilNum,
        remainingBudget: remNum,
        relatedComplaintsCount: connected.length,
        affectedCitizens: connected.length, // deterministic: actual linked complaint count, no random
        status: isCompleted ? 'Completed' : 'In Progress',
        statusBadge: isCompleted ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-teal-50 text-[#008D78] border-teal-200',
        connectedComplaints: connected
      };
    });

    return res.status(200).json({ status: 'success', data: formattedProjects });
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * POST /api/admin/projects
 * Creates a new municipal project in Supabase.
 */
export const createAdminProject = async (req, res) => {
  try {
    const { name, department, pincode, startDate, expectedCompletion, budget, utilizedBudget, affectedCitizens, status } = req.body;

    const newProjectData = {
      id: `proj-${Date.now()}`,
      project_code: `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      title: name || 'New Infrastructure Project',
      category: department || 'Municipal Works',
      pincode: pincode || '110025',
      status: status || 'In Progress',
      budget: Number(budget) || 1000000,
      utilized_budget: Number(utilizedBudget) || 0,
      expected_completion: expectedCompletion || '2026-11-30',
      progress: status === 'Completed' ? 100 : 15
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([newProjectData])
      .select('*');

    if (error) throw error;

    return res.status(201).json({ status: 'success', data: data?.[0] || newProjectData });
  } catch (error) {
    console.error('Error creating admin project:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * PATCH /api/admin/projects/:id
 * Updates an existing municipal project in Supabase.
 */
export const updateAdminProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, progress, utilizedBudget, expectedCompletion } = req.body;

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (progress !== undefined) updates.progress = progress;
    if (utilizedBudget !== undefined) updates.utilized_budget = utilizedBudget;
    if (expectedCompletion !== undefined) updates.expected_completion = expectedCompletion;

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select('*');

    if (error) throw error;

    return res.status(200).json({ status: 'success', data: data?.[0] || null });
  } catch (error) {
    console.error('Error updating admin project:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
/**
 * GET /api/admin/queries
 * Aggregates natural language queries and complaint topics to spot citizen inquiry trends.
 */
export const getUniqueQueries = async (req, res) => {
  try {
    const { data: complaints } = await supabase
      .from('complaints')
      .select('id, complaint_code, description, category, pincode, created_at, project_id, projects(title, project_code)');

    // Group complaints by category & pincode or summary theme
    const categoryGroups = {};

    (complaints || []).forEach((c) => {
      const cat = c.category || 'General Inquiries';
      if (!categoryGroups[cat]) {
        categoryGroups[cat] = {
          id: `CQ-${100 + Object.keys(categoryGroups).length + 1}`,
          question: `Recurring issues regarding ${cat}`,
          requestCount: 0,
          relatedRequests: [],
          locations: new Set(),
          departments: new Set([cat]),
          projects: new Set(),
          dates: new Set(),
          similarQueries: [],
        };
      }
      categoryGroups[cat].requestCount += 1;
      categoryGroups[cat].relatedRequests.push(`${c.complaint_code || c.id}: ${c.description.slice(0, 45)}...`);
      categoryGroups[cat].locations.add(`Pincode ${c.pincode}`);
      if (c.projects?.title) categoryGroups[cat].projects.add(c.projects.title);
      if (c.created_at) categoryGroups[cat].dates.add(new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit" }));
      if (categoryGroups[cat].similarQueries.length < 3) {
        categoryGroups[cat].similarQueries.push(c.description);
      }
    });

    const commonQueries = Object.values(categoryGroups).map((g) => ({
      id: g.id,
      question: g.question,
      text: g.question,
      query: g.question,
      requestCount: g.requestCount,
      count: g.requestCount,
      relatedRequests: g.relatedRequests.slice(0, 4),
      locations: Array.from(g.locations),
      departments: Array.from(g.departments),
      projects: g.projects.size > 0 ? Array.from(g.projects) : ['General Municipal Assessment'],
      dates: Array.from(g.dates).slice(0, 2),
      similarQueries: g.similarQueries,
    })).sort((a, b) => b.requestCount - a.requestCount);

    return res.status(200).json({ status: 'success', data: commonQueries });
  } catch (error) {
    console.error('Error fetching unique queries:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/admin/inquiries
 * Retrieves public inquiries with AI verification status and AI insight analytics.
 */
export const getAdminInquiries = async (req, res) => {
  try {
    const { data: complaints, error } = await supabase
      .from('complaints')
      .select('*, projects(title, category, project_code)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const list = complaints || [];
    let verifiedCount = 0;
    let pendingCount = 0;
    let flaggedCount = 0;

    const pincodeCounts = {};
    const departmentCounts = {};

    const inquiries = list.map((c) => {
      let aiStatus = 'Pending Review';
      let confidence = '92.4%';

      if (c.admin_flagged) {
        aiStatus = 'Flagged';
        confidence = '87.1%';
        flaggedCount += 1;
      } else if (c.project_id || c.projects) {
        aiStatus = 'Verified';
        confidence = '98.9%';
        verifiedCount += 1;
      } else {
        pendingCount += 1;
      }

      if (c.pincode) {
        pincodeCounts[c.pincode] = (pincodeCounts[c.pincode] || 0) + 1;
      }
      if (c.category) {
        departmentCounts[c.category] = (departmentCounts[c.category] || 0) + 1;
      }

      return {
        id: c.complaint_code || c.id,
        topic: c.description,
        department: c.category || 'General Administration',
        date: c.created_at ? new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Recent',
        citizen: `Citizen (Pincode ${c.pincode})`,
        aiStatus,
        confidence,
        evidenceCount: c.project_id ? 14 : 5,
        summary: c.ai_summary || c.description,
        pincode: c.pincode,
        status: c.status
      };
    });

    const totalQueries = list.length;
    const relatedToProjectsCount = verifiedCount;
    const projectRelationPercent = totalQueries > 0 ? Math.round((relatedToProjectsCount / totalQueries) * 100) : 0;

    const topPincodes = Object.entries(pincodeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([p]) => `Pincode ${p}`);

    const topDepartments = Object.entries(departmentCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([d]) => d);

    const aiInsight = {
      summaryText: totalQueries > 0 
        ? `A significant concentration of citizen queries (${projectRelationPercent}%) relates directly to ongoing infrastructure and municipal project work.`
        : 'No public citizen inquiries currently logged in the database.',
      totalRelatedQueries: totalQueries,
      projectRelationPercent: projectRelationPercent || 0,
      mostAffectedLocations: topPincodes.length > 0 ? topPincodes : ['No active areas'],
      primaryDepartments: topDepartments.length > 0 ? topDepartments : ['No active departments'],
      verifiedCount,
      pendingCount,
      flaggedCount
    };

    return res.status(200).json({
      status: 'success',
      data: {
        inquiries,
        aiInsight
      }
    });
  } catch (error) {
    console.error('Error fetching admin inquiries:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * GET /api/admin/files
 * Retrieves the library of municipal RAG data files uploaded by admins.
 */
export const getMunicipalFiles = async (req, res) => {
  try {
    let docs = [];
    const { data: dbDocs, error } = await supabase
      .from('documents')
      .select('id, title, content_text, pincode, source_type, created_at')
      .order('created_at', { ascending: false });

    if (!error && dbDocs) {
      docs = dbDocs.map((doc, idx) => {
        const type = doc.source_type || (doc.title?.endsWith('.csv') ? 'CSV' : doc.title?.endsWith('.xlsx') ? 'XLSX' : 'PDF');
        const iconMap = { PDF: "📄", CSV: "📊", XLSX: "📋" };
        const accentMap = { PDF: "bg-[#2D7FF9]", CSV: "bg-[#00A68E]", XLSX: "bg-[#FFC107]" };
        const hoverMap = {
          PDF: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
          CSV: "hover:bg-[#00A68E] hover:border-[#00A68E] hover:text-white",
          XLSX: "hover:bg-[#FFC107] hover:border-[#FFC107] hover:text-[#0D1B2A]"
        };

        return {
          id: doc.id || `DOC-0${idx + 1}`,
          filename: doc.title || "Municipal_Doc.pdf",
          updatedDate: doc.created_at ? new Date(doc.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent',
          status: "Indexed",
          statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
          extractedRecords: Math.floor((doc.content_text?.length || 200) / 4),
          departments: [`Pincode ${doc.pincode || "110025"}`, `${type} RAG Knowledge`],
          relatedProjects: 4,
          size: "2.4 MB",
          fileType: type,
          icon: iconMap[type] || "📄",
          topAccent: accentMap[type] || "bg-[#2D7FF9]",
          btnHover: hoverMap[type] || "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
          contributionSummary: doc.content_text || "Document vector indexed into CivicMirror Administrative Intelligence knowledge graph."
        };
      });
    }

    return res.status(200).json({ status: 'success', data: docs });
  } catch (error) {
    console.error('Error fetching municipal files:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * PATCH /api/admin/complaints/:id/status
 * Updates status of a complaint (e.g. 'Resolved', 'In Progress').
 */
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_flagged } = req.body;

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (admin_flagged !== undefined) updates.admin_flagged = admin_flagged;

    const { data, error } = await supabase
      .from('complaints')
      .update(updates)
      .eq('id', id)
      .select('*');

    if (error) throw error;

    return res.status(200).json({ status: 'success', data: data?.[0] || null });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * POST /api/admin/clusters/dispatch
 * Bulk updates all complaints in a cluster (matching pincode + category) to 'In Progress' status.
 */
export const dispatchClusterWorkOrder = async (req, res) => {
  try {
    const { pincode, category, status } = req.body;
    let targetStatus = status || 'In Progress';
    
    // Normalize status for complaints table
    let complaintStatus = targetStatus;
    if (targetStatus.toLowerCase().includes('complete') || targetStatus.toLowerCase().includes('resolve')) {
      complaintStatus = 'Resolved';
      targetStatus = 'Completed';
    } else if (targetStatus.toLowerCase().includes('progress')) {
      complaintStatus = 'In Progress';
      targetStatus = 'In Progress';
    } else {
      complaintStatus = 'Pending';
      targetStatus = 'Pending';
    }

    if (!pincode) {
      return res.status(400).json({ error: 'BadRequest', message: 'pincode is required.' });
    }

    let query = supabase
      .from('complaints')
      .update({ status: complaintStatus })
      .eq('pincode', pincode);

    if (category && category !== 'All' && category !== 'General') {
      query = query.ilike('category', `%${category}%`);
    }

    const { data, error } = await query.select('id, complaint_code, status, pincode, category');

    if (error) throw error;

    // Update status in clusters table as well
    try {
      const catSlug = (category || 'general').replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
      const clusterId = `CLS-${catSlug}-${pincode}`;
      await supabase
        .from('clusters')
        .update({ status: targetStatus, updated_at: new Date().toISOString() })
        .eq('id', clusterId);
    } catch (dbErr) {
      console.warn('Updating cluster status in database warning:', dbErr?.message);
    }

    return res.status(200).json({
      status: 'success',
      message: `Successfully updated cluster to '${targetStatus}'. ${data?.length || 0} complaints updated to '${complaintStatus}'.`,
      targetStatus,
      complaintStatus,
      updatedCount: data?.length || 0,
      data: data || []
    });

  } catch (error) {
    console.error('Error dispatching cluster work order:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};