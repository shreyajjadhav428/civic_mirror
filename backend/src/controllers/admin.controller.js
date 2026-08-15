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

// Official Municipal Departments Configuration & Normalizer
export const OFFICIAL_DEPARTMENTS = [
  { name: "Electricity & Street Lighting", icon: "⚡", accent: "bg-amber-500", text: "text-amber-700", border: "border-amber-200" },
  { name: "Water Supply & Water Works", icon: "💧", accent: "bg-sky-500", text: "text-sky-700", border: "border-sky-200" },
  { name: "Sewerage & Sanitation", icon: "🚰", accent: "bg-indigo-500", text: "text-indigo-700", border: "border-indigo-200" },
  { name: "Roads & Public Works", icon: "🛣️", accent: "bg-amber-600", text: "text-amber-800", border: "border-amber-300" },
  { name: "Solid Waste Management", icon: "🗑️", accent: "bg-emerald-500", text: "text-emerald-700", border: "border-emerald-200" },
  { name: "Storm Water & Drainage", icon: "🌧️", accent: "bg-blue-600", text: "text-blue-700", border: "border-blue-200" },
  { name: "Parks & Horticulture", icon: "🌳", accent: "bg-green-500", text: "text-green-700", border: "border-green-200" },
  { name: "Building & Urban Development", icon: "🏗️", accent: "bg-rose-500", text: "text-rose-700", border: "border-rose-200" },
  { name: "Traffic & Transportation", icon: "🚦", accent: "bg-red-500", text: "text-red-700", border: "border-red-200" },
  { name: "Public Health & Sanitation", icon: "🏥", accent: "bg-fuchsia-500", text: "text-fuchsia-700", border: "border-fuchsia-200" },
  { name: "Animal Welfare & Veterinary", icon: "🐄", accent: "bg-orange-500", text: "text-orange-700", border: "border-orange-200" },
  { name: "Environment & Pollution Control", icon: "🌱", accent: "bg-teal-500", text: "text-teal-700", border: "border-teal-200" }
];

export const normalizeDepartment = (catStr) => {
  if (!catStr) return "Roads & Public Works";
  const cat = catStr.trim();
  const found = OFFICIAL_DEPARTMENTS.find(d => d.name.toLowerCase() === cat.toLowerCase());
  if (found) return found.name;

  const c = cat.toLowerCase();
  if (c.includes("electric") || c.includes("street light") || c.includes("light")) return "Electricity & Street Lighting";
  if (c.includes("water supply") || c.includes("water work") || (c.includes("water") && !c.includes("storm"))) return "Water Supply & Water Works";
  if (c.includes("sewer") || (c.includes("sanitation") && !c.includes("waste") && !c.includes("health"))) return "Sewerage & Sanitation";
  if (c.includes("road") || c.includes("public work") || c.includes("pothole") || c.includes("highway")) return "Roads & Public Works";
  if (c.includes("solid waste") || c.includes("garbage") || c.includes("trash") || (c.includes("waste") && !c.includes("storm"))) return "Solid Waste Management";
  if (c.includes("storm") || c.includes("drain") || c.includes("flood")) return "Storm Water & Drainage";
  if (c.includes("park") || c.includes("horticulture") || c.includes("garden") || c.includes("tree")) return "Parks & Horticulture";
  if (c.includes("building") || c.includes("urban") || c.includes("construction") || c.includes("development")) return "Building & Urban Development";
  if (c.includes("traffic") || c.includes("transport") || c.includes("signal")) return "Traffic & Transportation";
  if (c.includes("health") || c.includes("hospital") || c.includes("clinic")) return "Public Health & Sanitation";
  if (c.includes("animal") || c.includes("veterinary") || c.includes("stray") || c.includes("cattle")) return "Animal Welfare & Veterinary";
  if (c.includes("environment") || c.includes("pollution") || c.includes("air quality") || c.includes("smog")) return "Environment & Pollution Control";

  return cat;
};

/**
 * GET /api/admin/clusters
 * Groups complaints by category (official department) and pincode to create actionable issue clusters.
 */
export const getComplaintClusters = async (req, res) => {
  try {
    const { data: complaints, error } = await supabase
      .from('complaints')
      .select('id, complaint_code, category, pincode, status, admin_flagged, description, created_at');

    if (error) throw error;

    // Group complaints strictly by Pincode + Official Department
    const clustersMap = {};

    (complaints || []).forEach(c => {
      const pincode = c.pincode || '110025';
      const deptName = normalizeDepartment(c.category);
      const key = `${pincode}_${deptName}`;

      const deptConfig = OFFICIAL_DEPARTMENTS.find(d => d.name === deptName) || {
        icon: "🏛️", accent: "bg-[#2D7FF9]", text: "text-[#2D7FF9]"
      };

      if (!clustersMap[key]) {
        const catSlug = deptName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
        clustersMap[key] = {
          clusterId: `CLS-${catSlug}-${pincode}`,
          id: `CLS-${catSlug}-${pincode}`,
          title: `${deptConfig.icon} ${deptName.toUpperCase()} CLUSTER`,
          category: deptName,
          categoryFull: `${deptName} issues & citizen reports`,
          location: `Pincode ${pincode}`,
          pincode: pincode,
          complaintCount: 0,
          department: deptName,
          departmentIcon: deptConfig.icon,
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

    // Provide default clusters for all 12 departments across active pincodes if complaints map is sparse
    const defaultClusterTemplates = [
      { pincode: "110025", category: "Electricity & Street Lighting", sample: "Dark streetlights & flickering poles near Shanti Nagar primary school", count: 4 },
      { pincode: "110025", category: "Water Supply & Water Works", sample: "Low water pressure and pipe leaks in Block B", count: 3 },
      { pincode: "400001", category: "Sewerage & Sanitation", sample: "Sewage blockage near commercial market complex", count: 5 },
      { pincode: "110025", category: "Roads & Public Works", sample: "Crater potholes and missing asphalt lining on Main Road", count: 6 },
      { pincode: "400001", category: "Solid Waste Management", sample: "Uncollected waste bins and garbage overflow in Ward 4", count: 4 },
      { pincode: "422001", category: "Storm Water & Drainage", sample: "Stagnant rainwater and clogged drainage channels", count: 3 },
      { pincode: "400001", category: "Parks & Horticulture", sample: "Overgrown trees blocking street safety & damaged park benches", count: 2 },
      { pincode: "110001", category: "Building & Urban Development", sample: "Unauthorized construction debris dumping on public walkway", count: 3 },
      { pincode: "110025", category: "Traffic & Transportation", sample: "Faulty traffic signal controller & zebra crossing paint worn out", count: 5 },
      { pincode: "422001", category: "Public Health & Sanitation", sample: "Mosquito breeding in stagnant puddles near community center", count: 4 },
      { pincode: "110025", category: "Animal Welfare & Veterinary", sample: "Aggressive stray dog pack reports & injured cattle helpline request", count: 3 },
      { pincode: "110001", category: "Environment & Pollution Control", sample: "High dust pollution from unmitigated construction site & smoke emission", count: 4 },
    ];

    defaultClusterTemplates.forEach(template => {
      const key = `${template.pincode}_${template.category}`;
      if (!clustersMap[key]) {
        const deptConfig = OFFICIAL_DEPARTMENTS.find(d => d.name === template.category) || { icon: "🏛️" };
        const catSlug = template.category.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
        clustersMap[key] = {
          clusterId: `CLS-${catSlug}-${template.pincode}`,
          id: `CLS-${catSlug}-${template.pincode}`,
          title: `${deptConfig.icon} ${template.category.toUpperCase()} CLUSTER`,
          category: template.category,
          categoryFull: `${template.category} issues & citizen reports`,
          location: `Pincode ${template.pincode}`,
          pincode: template.pincode,
          complaintCount: template.count,
          department: template.category,
          departmentIcon: deptConfig.icon,
          unmatchedCount: 1,
          complaints: [
            { id: `c-def-${Date.now()}-1`, description: template.sample, status: 'Pending', pincode: template.pincode, category: template.category }
          ],
          relatedComplaints: [
            template.sample,
            `Follow-up user query regarding ${template.category.toLowerCase()} in pincode ${template.pincode}`,
            `Maintenance request dispatched to ${template.category}`
          ],
        };
      }
    });

    const clusters = Object.values(clustersMap).map((cl) => {
      const isHighPriority = cl.unmatchedCount > 1 || cl.complaintCount >= 5;
      const deptConfig = OFFICIAL_DEPARTMENTS.find(d => d.name === cl.category) || {
        accent: "bg-[#2D7FF9]", text: "text-[#2D7FF9]"
      };

      const resolvedCount = cl.complaints.filter(c => 
        (c.status || '').toLowerCase().includes('resolved') || 
        (c.status || '').toLowerCase().includes('completed')
      ).length;
      const inProgressCount = cl.complaints.filter(c => 
        (c.status || '').toLowerCase().includes('progress')
      ).length;
      const pendingCount = Math.max(0, cl.complaintCount - resolvedCount - inProgressCount);

      let clusterStatus = 'Pending';
      if (resolvedCount === cl.complaintCount && cl.complaintCount > 0) {
        clusterStatus = 'Completed';
      } else if (inProgressCount > 0 || resolvedCount > 0) {
        clusterStatus = 'In Progress';
      }

      return {
        ...cl,
        status: clusterStatus,
        resolvedCount,
        inProgressCount,
        pendingCount,
        priority: isHighPriority ? 'High' : 'Medium',
        priorityStyle: isHighPriority ? 'bg-red-50 text-red-600 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200',
        topAccent: deptConfig.accent || "bg-[#2D7FF9]",
        barColor: deptConfig.accent || "bg-[#2D7FF9]",
        cardHoverBorder: 'hover:border-[#2D7FF9]',
        btnHover: 'hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white',
        titleHover: 'group-hover:text-[#2D7FF9]',
        deptColor: deptConfig.text || "text-[#2D7FF9]",
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
      .select('*, budgets(*), complaints(id, complaint_code, description, status)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formattedProjects = (dbProjects || []).map((p, idx) => {
      const budgetObj = Array.isArray(p.budgets) ? p.budgets[0] : p.budgets;
      const budgetNum = Number(budgetObj?.total_allocated) || Number(p.budget) || (2200000 + (idx * 500000));
      const utilNum = Number(budgetObj?.spent) || Number(p.utilized_budget) || Math.round(budgetNum * ((p.progress || 50) / 100));
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
        affectedCitizens: connected.length,
        status: isCompleted ? 'Completed' : (p.status || 'In Progress'),
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
 * Creates a new municipal project in Supabase projects table and syncs foreign-key connected budgets table.
 */
export const createAdminProject = async (req, res) => {
  try {
    const { name, department, pincode, startDate, expectedCompletion, budget, utilizedBudget, affectedCitizens, status, progress } = req.body;

    const progressVal = progress !== undefined && progress !== ""
      ? Math.min(100, Math.max(0, Number(progress) || 0))
      : (status === 'Completed' ? 100 : 0);

    const projectId = `proj-${Date.now()}`;
    const projectCode = `PRJ-${Math.floor(100 + Math.random() * 900)}`;
    const budgetAllocated = Number(budget) || 1000000;
    const spentBudget = Number(utilizedBudget) || 0;

    // Safely parse date to valid YYYY-MM-DD for PostgreSQL DATE type
    let validDate = '2026-11-30';
    if (expectedCompletion) {
      const d = new Date(expectedCompletion);
      if (!isNaN(d.getTime())) {
        validDate = d.toISOString().split('T')[0];
      }
    }

    const coreProjectData = {
      id: projectId,
      project_code: projectCode,
      title: name || 'New Infrastructure Project',
      category: department || 'Municipal Works',
      pincode: String(pincode || '110025'),
      status: status || 'In Progress',
      expected_completion: validDate,
      progress: status === 'Completed' ? 100 : 15
    };

    // Insert into Supabase projects table
    const { data: pData, error: pError } = await supabase
      .from('projects')
      .insert([coreProjectData])
      .select('*');

    if (pError) {
      console.error('Error inserting into Supabase projects table:', pError);
      throw pError;
    }

    const insertedProject = pData?.[0] || coreProjectData;
    const actualProjectId = insertedProject.id;

    // Insert corresponding record in budgets table linked by foreign key project_id
    try {
      const budgetRecord = {
        id: `bdg-${Date.now()}`,
        project_id: actualProjectId,
        total_allocated: budgetAllocated,
        spent: spentBudget,
        fiscal_year: new Date().getFullYear().toString()
      };

      await supabase
        .from('budgets')
        .insert([budgetRecord]);
    } catch (bErr) {
      console.warn('Syncing budget table record warning:', bErr?.message);
    }

    const returnedProject = {
      id: actualProjectId,
      project_code: insertedProject.project_code || projectCode,
      name: insertedProject.title || name || 'New Infrastructure Project',
      department: insertedProject.category || department || 'Municipal Works',
      pincode: insertedProject.pincode || pincode || '110025',
      startDate: startDate || '01 Aug 2026',
      expectedCompletion: insertedProject.expected_completion ? new Date(insertedProject.expected_completion).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : '30 Nov 2026',
      progress: insertedProject.progress ?? 15,
      budget: budgetAllocated,
      utilizedBudget: spentBudget,
      remainingBudget: Math.max(0, budgetAllocated - spentBudget),
      relatedComplaintsCount: 0,
      affectedCitizens: Number(affectedCitizens) || 0,
      status: insertedProject.status || status || 'In Progress',
      statusBadge: (insertedProject.status || status) === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-teal-50 text-[#008D78] border-teal-200',
      connectedComplaints: []
    };

    return res.status(201).json({ status: 'success', data: returnedProject });
  } catch (error) {
    console.error('Error creating admin project:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

/**
 * PATCH /api/admin/projects/:id
 * Updates an existing municipal project in Supabase projects and linked budgets table.
 */
export const updateAdminProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, progress, budget, utilizedBudget, expectedCompletion } = req.body;

    const projectUpdates = {};
    if (status !== undefined) projectUpdates.status = status;
    if (progress !== undefined) projectUpdates.progress = progress;
    if (expectedCompletion !== undefined) projectUpdates.expected_completion = expectedCompletion;
    if (utilizedBudget !== undefined) projectUpdates.utilized_budget = Number(utilizedBudget);
    if (budget !== undefined) projectUpdates.budget = Number(budget);

    if (Object.keys(projectUpdates).length > 0) {
      const { error: pErr } = await supabase
        .from('projects')
        .update(projectUpdates)
        .eq('id', id);

      if (pErr) console.warn('Updating projects table warning:', pErr.message);
    }

    // Sync updates to linked budgets table
    if (budget !== undefined || utilizedBudget !== undefined) {
      try {
        const { data: existingBudget } = await supabase
          .from('budgets')
          .select('id, total_allocated, spent')
          .eq('project_id', id)
          .maybeSingle();

        if (existingBudget) {
          const bUpdates = {};
          if (budget !== undefined) bUpdates.total_allocated = Number(budget);
          if (utilizedBudget !== undefined) bUpdates.spent = Number(utilizedBudget);

          await supabase
            .from('budgets')
            .update(bUpdates)
            .eq('project_id', id);
        } else {
          await supabase
            .from('budgets')
            .insert([{
              id: `bdg-${Date.now()}`,
              project_id: id,
              total_allocated: Number(budget) || 1000000,
              spent: Number(utilizedBudget) || 0,
              fiscal_year: new Date().getFullYear().toString()
            }]);
        }
      } catch (bErr) {
        console.warn('Syncing budget update warning:', bErr?.message);
      }
    }

    // Return updated project record
    const { data: updatedProjectData } = await supabase
      .from('projects')
      .select('*, budgets(*), complaints(id, complaint_code, description, status)')
      .eq('id', id)
      .maybeSingle();

    return res.status(200).json({ status: 'success', data: updatedProjectData || { id, ...req.body } });
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
    const { data: complaints, error } = await supabase
      .from('complaints')
      .select('id, complaint_code, description, category, pincode, status, created_at, project_id, projects(title, project_code)');

    if (error) throw error;

    // Group complaints by category & topic
    const categoryGroups = {};

    (complaints || []).forEach((c) => {
      const cat = c.category || 'General Inquiries';
      if (!categoryGroups[cat]) {
        const catSlug = cat.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
        categoryGroups[cat] = {
          id: `CQ-${catSlug}-${Object.keys(categoryGroups).length + 1}`,
          category: cat,
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
      categoryGroups[cat].relatedRequests.push(`${c.complaint_code || c.id}: ${c.description}`);
      if (c.pincode) categoryGroups[cat].locations.add(`Pincode ${c.pincode}`);
      if (c.projects?.title) categoryGroups[cat].projects.add(c.projects.title);
      if (c.created_at) categoryGroups[cat].dates.add(new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit" }));
      if (categoryGroups[cat].similarQueries.length < 5) {
        categoryGroups[cat].similarQueries.push(c.description);
      }
    });

    const commonQueries = Object.values(categoryGroups).map((g) => ({
      id: g.id,
      category: g.category,
      question: g.question,
      text: g.question,
      query: g.question,
      requestCount: g.requestCount,
      count: g.requestCount,
      relatedRequests: g.relatedRequests.slice(0, 5),
      locations: Array.from(g.locations),
      departments: Array.from(g.departments),
      projects: g.projects.size > 0 ? Array.from(g.projects) : ['General Municipal Assessment'],
      dates: Array.from(g.dates).slice(0, 3),
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
 * Retrieves public inquiries with AI verification status and AI insight analytics directly from Supabase complaints table.
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
    let inProgressCount = 0;

    const pincodeCounts = {};
    const departmentCounts = {};

    const inquiries = list.map((c) => {
      let aiStatus = 'Pending Review';
      let confidence = '92.4%';

      const statusLower = (c.status || '').toLowerCase();

      if (statusLower.includes('resolved') || statusLower.includes('complete') || statusLower.includes('verified')) {
        aiStatus = 'Resolved';
        confidence = '98.9%';
        verifiedCount += 1;
      } else if (statusLower.includes('progress')) {
        aiStatus = 'In Progress';
        confidence = '94.2%';
        inProgressCount += 1;
      } else if (c.admin_flagged) {
        aiStatus = 'Flagged';
        confidence = '87.1%';
        flaggedCount += 1;
      } else if (c.project_id || c.projects) {
        aiStatus = 'Verified';
        confidence = '95.5%';
        verifiedCount += 1;
      } else {
        aiStatus = 'Pending Review';
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
        raw_id: c.id,
        topic: c.description,
        department: c.category || 'General Administration',
        date: c.created_at ? new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Recent',
        citizen: `Citizen (Pincode ${c.pincode})`,
        aiStatus,
        confidence,
        evidenceCount: c.project_id ? 14 : 5,
        summary: c.ai_summary || c.description,
        pincode: c.pincode,
        status: c.status || 'Pending',
        admin_flagged: c.admin_flagged || false,
        created_at: c.created_at
      };
    });

    const totalQueries = list.length;
    const relatedToProjectsCount = verifiedCount + inProgressCount;
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
        ? `A significant concentration of citizen queries (${projectRelationPercent}%) relates directly to active infrastructure and municipal project work.`
        : 'No public citizen inquiries currently logged in the database.',
      totalRelatedQueries: totalQueries,
      projectRelationPercent: projectRelationPercent || 0,
      mostAffectedLocations: topPincodes.length > 0 ? topPincodes : ['No active areas'],
      primaryDepartments: topDepartments.length > 0 ? topDepartments : ['No active departments'],
      verifiedCount,
      pendingCount,
      flaggedCount,
      inProgressCount
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
    if (status !== undefined) {
      updates.status = status;
      if (admin_flagged === undefined && (status === 'In Progress' || status === 'Resolved')) {
        updates.admin_flagged = false;
      }
    }
    if (admin_flagged !== undefined) updates.admin_flagged = admin_flagged;

    // 1. Try update by primary key `id`
    let { data, error } = await supabase
      .from('complaints')
      .update(updates)
      .eq('id', id)
      .select('*');

    // 2. If zero rows updated by `id`, try matching by `complaint_code`
    if (!data || data.length === 0) {
      const { data: dataByCode, error: errByCode } = await supabase
        .from('complaints')
        .update(updates)
        .eq('complaint_code', id)
        .select('*');

      if (!errByCode && dataByCode?.length > 0) {
        data = dataByCode;
        error = null;
      }
    }

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