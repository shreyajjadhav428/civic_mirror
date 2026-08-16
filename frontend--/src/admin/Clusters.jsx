import React, { useState, useEffect } from "react";
import { getComplaintClusters, dispatchClusterWorkOrder, updateComplaintStatus } from "../api/admin.api";

export const OFFICIAL_DEPARTMENTS = [
  { name: "Electricity & Street Lighting", icon: "⚡" },
  { name: "Water Supply & Water Works", icon: "💧" },
  { name: "Sewerage & Sanitation", icon: "🚰" },
  { name: "Roads & Public Works", icon: "🛣️" },
  { name: "Solid Waste Management", icon: "🗑️" },
  { name: "Storm Water & Drainage", icon: "🌧️" },
  { name: "Parks & Horticulture", icon: "🌳" },
  { name: "Building & Urban Development", icon: "🏗️" },
  { name: "Traffic & Transportation", icon: "🚦" },
  { name: "Public Health & Sanitation", icon: "🏥" },
  { name: "Animal Welfare & Veterinary", icon: "🐄" },
  { name: "Environment & Pollution Control", icon: "🌱" },
];

export const DEFAULT_CLUSTERS = [
  {
    id: "CLS-ELEC-110025",
    clusterId: "CLS-ELEC-110025",
    title: "⚡ ELECTRICITY & STREET LIGHTING CLUSTER",
    category: "Electricity & Street Lighting",
    department: "Electricity & Street Lighting",
    departmentIcon: "⚡",
    location: "Shanti Nagar (Pincode 110025)",
    pincode: "110025",
    complaintCount: 5,
    resolvedCount: 1,
    inProgressCount: 1,
    pendingCount: 3,
    status: "Pending",
    priority: "High",
    priorityStyle: "bg-rose-50 text-rose-700 border-rose-200",
    topAccent: "bg-amber-500",
    deptColor: "text-amber-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Streetlights on 4th avenue are completely dead in Shanti Nagar",
      "Pitch black near the primary school, flickering LED poles",
      "Broken light fixture near community hall",
      "Transformers humming loudly near block C",
      "Exposed electrical wiring near street pole #14"
    ]
  },
  {
    id: "CLS-WATER-110025",
    clusterId: "CLS-WATER-110025",
    title: "💧 WATER SUPPLY & WATER WORKS CLUSTER",
    category: "Water Supply & Water Works",
    department: "Water Supply & Water Works",
    departmentIcon: "💧",
    location: "Shanti Nagar (Pincode 110025)",
    pincode: "110025",
    complaintCount: 4,
    resolvedCount: 2,
    inProgressCount: 0,
    pendingCount: 2,
    status: "In Progress",
    priority: "High",
    priorityStyle: "bg-rose-50 text-rose-700 border-rose-200",
    topAccent: "bg-sky-500",
    deptColor: "text-sky-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "No water pressure in Block B during peak morning hours",
      "Pipeline leak leaking onto main roadway",
      "Low water volume in elevated water tank line",
      "Contaminated tap water report near ward 5"
    ]
  },
  {
    id: "CLS-SEWER-400001",
    clusterId: "CLS-SEWER-400001",
    title: "🚰 SEWERAGE & SANITATION CLUSTER",
    category: "Sewerage & Sanitation",
    department: "Sewerage & Sanitation",
    departmentIcon: "🚰",
    location: "Downtown (Pincode 400001)",
    pincode: "400001",
    complaintCount: 5,
    resolvedCount: 0,
    inProgressCount: 2,
    pendingCount: 3,
    status: "Pending",
    priority: "High",
    priorityStyle: "bg-rose-50 text-rose-700 border-rose-200",
    topAccent: "bg-indigo-500",
    deptColor: "text-indigo-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Sewage line blockage overflowing near commercial market",
      "Foul sewage smell rising from open manhole",
      "Sewer line backing up into basement shops",
      "Broken manhole cover near pedestrian crossing",
      "Sanitation drain overflow report"
    ]
  },
  {
    id: "CLS-ROADS-110025",
    clusterId: "CLS-ROADS-110025",
    title: "🛣️ ROADS & PUBLIC WORKS CLUSTER",
    category: "Roads & Public Works",
    department: "Roads & Public Works",
    departmentIcon: "🛣️",
    location: "Shanti Nagar (Pincode 110025)",
    pincode: "110025",
    complaintCount: 6,
    resolvedCount: 3,
    inProgressCount: 1,
    pendingCount: 2,
    status: "In Progress",
    priority: "High",
    priorityStyle: "bg-rose-50 text-rose-700 border-rose-200",
    topAccent: "bg-amber-600",
    deptColor: "text-amber-800",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Massive crater pothole on Main Road near Ward 4",
      "Road repaving left heavy gravel and asphalt debris",
      "Deep rut on bus route causing vehicle damage",
      "Unfinished road tarring near sector gate 2",
      "Speed breaker paint faded and dangerous at night",
      "Curb alignment broken along avenue 3"
    ]
  },
  {
    id: "CLS-SOLID-400001",
    clusterId: "CLS-SOLID-400001",
    title: "🗑️ SOLID WASTE MANAGEMENT CLUSTER",
    category: "Solid Waste Management",
    department: "Solid Waste Management",
    departmentIcon: "🗑️",
    location: "Downtown (Pincode 400001)",
    pincode: "400001",
    complaintCount: 4,
    resolvedCount: 1,
    inProgressCount: 0,
    pendingCount: 3,
    status: "Pending",
    priority: "Medium",
    priorityStyle: "bg-amber-50 text-amber-800 border-amber-200",
    topAccent: "bg-emerald-500",
    deptColor: "text-emerald-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Garbage overflow and uncollected public bins near Sector 8",
      "Commercial waste dump uncleared for 3 days",
      "Plastic waste dumping near vegetable market",
      "Sanitation bin lid broken and scattering litter"
    ]
  },
  {
    id: "CLS-STORM-422001",
    clusterId: "CLS-STORM-422001",
    title: "🌧️ STORM WATER & DRAINAGE CLUSTER",
    category: "Storm Water & Drainage",
    department: "Storm Water & Drainage",
    departmentIcon: "🌧️",
    location: "Suburban Area (Pincode 422001)",
    pincode: "422001",
    complaintCount: 3,
    resolvedCount: 0,
    inProgressCount: 1,
    pendingCount: 2,
    status: "Pending",
    priority: "Medium",
    priorityStyle: "bg-amber-50 text-amber-800 border-amber-200",
    topAccent: "bg-blue-600",
    deptColor: "text-blue-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Stagnant rainwater and blocked stormwater drain flooding street",
      "Culvert clogged with silt after heavy rainfall",
      "Drain grate missing on suburban highway stretch"
    ]
  },
  {
    id: "CLS-PARKS-400001",
    clusterId: "CLS-PARKS-400001",
    title: "🌳 PARKS & HORTICULTURE CLUSTER",
    category: "Parks & Horticulture",
    department: "Parks & Horticulture",
    departmentIcon: "🌳",
    location: "Downtown (Pincode 400001)",
    pincode: "400001",
    complaintCount: 3,
    resolvedCount: 1,
    inProgressCount: 1,
    pendingCount: 1,
    status: "In Progress",
    priority: "Medium",
    priorityStyle: "bg-amber-50 text-amber-800 border-amber-200",
    topAccent: "bg-green-500",
    deptColor: "text-green-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Overgrown tree branches blocking street lamps and vision",
      "Broken park bench in Central Garden",
      "Dead tree hazard along residential perimeter"
    ]
  },
  {
    id: "CLS-BUILD-110001",
    clusterId: "CLS-BUILD-110001",
    title: "🏗️ BUILDING & URBAN DEVELOPMENT CLUSTER",
    category: "Building & Urban Development",
    department: "Building & Urban Development",
    departmentIcon: "🏗️",
    location: "Central Zone (Pincode 110001)",
    pincode: "110001",
    complaintCount: 3,
    resolvedCount: 0,
    inProgressCount: 0,
    pendingCount: 3,
    status: "Pending",
    priority: "Medium",
    priorityStyle: "bg-amber-50 text-amber-800 border-amber-200",
    topAccent: "bg-rose-500",
    deptColor: "text-rose-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Unauthorized construction material dumped on public sidewalk",
      "Illegal scaffolding encroaching road clearance",
      "Unpermitted building excavation without safety barrier"
    ]
  },
  {
    id: "CLS-TRAFF-110025",
    clusterId: "CLS-TRAFF-110025",
    title: "🚦 TRAFFIC & TRANSPORTATION CLUSTER",
    category: "Traffic & Transportation",
    department: "Traffic & Transportation",
    departmentIcon: "🚦",
    location: "Shanti Nagar (Pincode 110025)",
    pincode: "110025",
    complaintCount: 4,
    resolvedCount: 2,
    inProgressCount: 1,
    pendingCount: 1,
    status: "In Progress",
    priority: "High",
    priorityStyle: "bg-rose-50 text-rose-700 border-rose-200",
    topAccent: "bg-red-500",
    deptColor: "text-red-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Traffic signal controller malfunctioning at major intersection",
      "Faded zebra crossing lines near school zone",
      "Traffic sign board damaged by storm",
      "Bus stop shelter light damaged"
    ]
  },
  {
    id: "CLS-HLTH-422001",
    clusterId: "CLS-HLTH-422001",
    title: "🏥 PUBLIC HEALTH & SANITATION CLUSTER",
    category: "Public Health & Sanitation",
    department: "Public Health & Sanitation",
    departmentIcon: "🏥",
    location: "Suburban Area (Pincode 422001)",
    pincode: "422001",
    complaintCount: 4,
    resolvedCount: 0,
    inProgressCount: 1,
    pendingCount: 3,
    status: "Pending",
    priority: "High",
    priorityStyle: "bg-rose-50 text-rose-700 border-rose-200",
    topAccent: "bg-fuchsia-500",
    deptColor: "text-fuchsia-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Mosquito breeding risk in stagnant puddles near ward clinic",
      "Anti-larval fogging requested in Ward 9",
      "Public health sanitizer dispenser empty near bus terminus",
      "Food hygiene concern at open street stall corner"
    ]
  },
  {
    id: "CLS-ANML-110025",
    clusterId: "CLS-ANML-110025",
    title: "🐄 ANIMAL WELFARE & VETERINARY CLUSTER",
    category: "Animal Welfare & Veterinary",
    department: "Animal Welfare & Veterinary",
    departmentIcon: "🐄",
    location: "Shanti Nagar (Pincode 110025)",
    pincode: "110025",
    complaintCount: 3,
    resolvedCount: 1,
    inProgressCount: 0,
    pendingCount: 2,
    status: "Pending",
    priority: "Medium",
    priorityStyle: "bg-amber-50 text-amber-700 border-amber-200",
    topAccent: "bg-orange-500",
    deptColor: "text-orange-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Pack of aggressive stray dogs near residential gate",
      "Injured stray cow needing veterinary mobile squad",
      "Stray cattle causing traffic hazard near market road"
    ]
  },
  {
    id: "CLS-ENV-110001",
    clusterId: "CLS-ENV-110001",
    title: "🌱 ENVIRONMENT & POLLUTION CONTROL CLUSTER",
    category: "Environment & Pollution Control",
    department: "Environment & Pollution Control",
    departmentIcon: "🌱",
    location: "Central Zone (Pincode 110001)",
    pincode: "110001",
    complaintCount: 4,
    resolvedCount: 2,
    inProgressCount: 0,
    pendingCount: 2,
    status: "Pending",
    priority: "Medium",
    priorityStyle: "bg-amber-50 text-amber-700 border-amber-200",
    topAccent: "bg-teal-500",
    deptColor: "text-teal-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9]",
    titleHover: "group-hover:text-[#2D7FF9]",
    relatedComplaints: [
      "Severe dust pollution from unmitigated building site",
      "Open garbage burning causing smoke pollution",
      "Commercial diesel generator high emissions report",
      "Noise pollution from late night loudspeakers"
    ]
  }
];

export default function Clusters({ onNavigate }) {
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPincode, setSelectedPincode] = useState("All");

  // Pagination state (10 per page)
  const [visibleCount, setVisibleCount] = useState(10);

  // Reset pagination when search or filters change
  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery, selectedCategory, selectedPincode]);

  // Modal State
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingClusterId, setUpdatingClusterId] = useState(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  // Dynamic Backend Cluster Data (Initialized with DEFAULT_CLUSTERS covering all 12 departments)
  const [clusterData, setClusterData] = useState(DEFAULT_CLUSTERS);

  // -------------------------------------------------------------------
  // FETCH BACKEND CLUSTERS ON MOUNT
  // -------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    async function loadClustersData() {
      try {
        const res = await getComplaintClusters();
        if (isMounted && res?.data && res.data.length > 0) {
          setClusterData(res.data);
        }
      } catch (err) {
        console.error("Error fetching complaint clusters from backend:", err);
      }
    }

    loadClustersData();
    return () => {
      isMounted = false;
    };
  }, []);

  // -------------------------------------------------------------------
  // HANDLE CLUSTER STATUS CHANGE (PENDING -> IN PROGRESS -> RESOLVED)
  // -------------------------------------------------------------------
  const handleStatusChange = async (cluster, newStatus) => {
    setUpdatingClusterId(cluster.id);
    setActionSuccessMsg("");
    try {
      const isResolved = newStatus === "Resolved";
      const isInProgress = newStatus === "In Progress";
      const complaintStatus = isResolved ? "Resolved" : isInProgress ? "In Progress" : "Pending";

      // 1. Bulk update by pincode+category (best-effort)
      const res = await dispatchClusterWorkOrder({
        pincode: cluster.pincode,
        category: cluster.category,
        status: newStatus,
      });

      // 2. Also update each complaint individually by ID for reliability
      if (cluster.complaints && cluster.complaints.length > 0) {
        await Promise.all(
          cluster.complaints.map((c) =>
            updateComplaintStatus(c.id, { status: complaintStatus, admin_flagged: isResolved ? false : undefined })
          )
        );
      }

      setClusterData((prev) =>
        prev.map((item) => {
          if (item.id === cluster.id) {
            const newResolvedCount = isResolved ? item.complaintCount : 0;
            const newInProgressCount = isInProgress ? item.complaintCount : 0;
            const newPendingCount = isResolved || isInProgress ? 0 : item.complaintCount;

            return {
              ...item,
              status: isResolved ? "Resolved" : isInProgress ? "In Progress" : "Pending",
              resolvedCount: newResolvedCount,
              inProgressCount: newInProgressCount,
              pendingCount: newPendingCount,
            };
          }
          return item;
        })
      );

      if (selectedCluster && selectedCluster.id === cluster.id) {
        setSelectedCluster((prev) => ({
          ...prev,
          status: isResolved ? "Resolved" : isInProgress ? "In Progress" : "Pending",
          resolvedCount: isResolved ? prev.complaintCount : 0,
        }));
      }

      const count = res?.updatedCount || cluster.complaintCount || 1;
      setActionSuccessMsg(
        `✓ Cluster '${cluster.title}' updated to '${newStatus}'! Successfully changed ${count} complaints to '${isResolved ? "Resolved" : newStatus}'.`
      );
      setTimeout(() => setActionSuccessMsg(""), 5000);
    } catch (err) {
      console.error("Error updating cluster status:", err);
    } finally {
      setUpdatingClusterId(null);
    }
  };

  // Compute unique dropdown options dynamically from official departments and data
  const availableCategories = [
    "All",
    ...OFFICIAL_DEPARTMENTS.map((d) => d.name),
  ];

  const availablePincodes = [
    "All",
    ...Array.from(new Set(["110025", "400001", "422001", "110001", ...clusterData.map((c) => c.pincode).filter(Boolean)])),
  ];

  // Filtering Logic
  const filteredClusters = clusterData.filter((cluster) => {
    const matchesSearch =
      cluster.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cluster.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cluster.pincode.includes(searchQuery) ||
      cluster.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || cluster.category === selectedCategory || cluster.department === selectedCategory;

    const matchesPincode =
      selectedPincode === "All" || cluster.pincode === selectedPincode;

    return matchesSearch && matchesCategory && matchesPincode;
  });

  // Calculate aggregated resolved stats
  const totalAggregatedComplaints = clusterData.reduce((sum, c) => sum + (c.complaintCount || 0), 0);
  const totalResolvedComplaints = clusterData.reduce((sum, c) => sum + (c.resolvedCount || 0), 0);

  return (
    <div className="space-y-6 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* 1. HEADER BANNER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2">
        <div>
          <p className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#2D7FF9] uppercase mb-1.5">
            <span className="h-[2.5px] w-4 bg-[#2D7FF9] rounded-full inline-block" />
            GEOGRAPHIC CONCENTRATIONS & DEPARTMENTS
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A] tracking-tight flex items-center gap-2.5">
            Complaint <span className="text-[#2D7FF9]">Clusters</span>
            {loading && <span className="text-sm font-semibold text-slate-400 animate-pulse ml-2">(Fetching live data...)</span>}
          </h1>
          <p className="mt-1.5 text-sm sm:text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
            Turn user queries into <strong>pincode & department clusters</strong> covering all 12 municipal departments.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold shadow-2xs">
            <span className="text-slate-400 block text-[10px] sm:text-xs font-bold uppercase tracking-wider">Active Clusters</span>
            <span className="text-[#0D1B2A] font-bold text-sm sm:text-base">{filteredClusters.length} Clustered Groups</span>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs sm:text-sm font-semibold shadow-2xs">
            <span className="text-emerald-700 block text-[10px] sm:text-xs font-bold uppercase tracking-wider">Resolved Complaints</span>
            <span className="text-emerald-900 font-bold text-sm sm:text-base">{totalResolvedComplaints} / {totalAggregatedComplaints}</span>
          </div>
        </div>
      </div>

      {/* Action success message banner */}
      {actionSuccessMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm font-bold text-emerald-800 shadow-2xs flex items-center gap-2">
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* 2. SEARCH & FILTER CONTROL BAR */}
      <div className="rounded-xl border border-[#DCE7F1] bg-white p-3.5 shadow-2xs space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search cluster, location, department, or pincode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-[#DCE7F1] bg-[#FBFCFE] px-4 text-sm sm:text-base font-semibold text-[#18324C] outline-none transition-colors placeholder:text-[#91A0AF] focus:border-[#9BC5FF] focus:bg-white"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Department Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 rounded-xl border border-[#DCE7F1] bg-[#FBFCFE] px-4 text-sm sm:text-base font-semibold text-[#486278] outline-none transition-colors focus:border-[#9BC5FF] cursor-pointer"
            >
              <option value="All">All 12 Departments</option>
              {OFFICIAL_DEPARTMENTS.map((dept) => (
                <option key={dept.name} value={dept.name}>
                  {dept.icon} {dept.name}
                </option>
              ))}
            </select>

            {/* Pincode Dropdown */}
            <select
              value={selectedPincode}
              onChange={(e) => setSelectedPincode(e.target.value)}
              className="h-11 rounded-xl border border-[#DCE7F1] bg-[#FBFCFE] px-4 text-sm sm:text-base font-semibold text-[#486278] outline-none transition-colors focus:border-[#9BC5FF] cursor-pointer"
            >
              {availablePincodes.map((pin) => (
                <option key={pin} value={pin}>
                  {pin === "All" ? "All Pincodes" : `Pincode ${pin}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SUB-SECTION HEADER LINE */}
      <div className="flex items-center justify-between pt-1 border-b border-slate-200/60 pb-3">
        <span className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
          <span className="h-[2.5px] w-4 bg-slate-400 rounded-full" />
          IDENTIFIED CLUSTER CARDS ({filteredClusters.length})
        </span>
        <span className="text-xs sm:text-sm font-semibold text-slate-400">
          Showing {Math.min(visibleCount, filteredClusters.length)} of {filteredClusters.length} clusters
        </span>
      </div>

      {/* 3. CLUSTER CARDS GRID */}
      <div className="space-y-4">
        {loading && clusterData.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center text-slate-500 font-semibold text-base">
            Loading issue clusters from database...
          </div>
        ) : filteredClusters.length === 0 ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center text-slate-500 font-semibold text-base">
            No active complaint clusters found matching your filter criteria.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filteredClusters.slice(0, visibleCount).map((cluster) => {
                const currentStatus = cluster.status || "Pending";
                const resolvedCount = cluster.resolvedCount || 0;
                const percentResolved = cluster.complaintCount > 0 ? Math.round((resolvedCount / cluster.complaintCount) * 100) : 0;

                return (
                  <div
                    key={cluster.id}
                    className="group relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-2xl transition-all hover:border-slate-300 hover:shadow-xs overflow-hidden"
                  >
                    {/* Top Accent line */}
                    <div className={`absolute top-0 left-0 w-14 h-1.5 ${cluster.topAccent} rounded-b`} />

                    <div>
                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-4 pt-1">
                        <div>
                          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block mb-1">
                            {cluster.id}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors leading-snug">
                            {cluster.title}
                          </h3>
                        </div>

                        <span className={`rounded-md border px-3 py-1 text-xs font-bold uppercase tracking-wide ${cluster.priorityStyle}`}>
                          {cluster.priority} PRIORITY
                        </span>
                      </div>

                      {/* Main Stats Box */}
                      <div className="rounded-xl bg-slate-50/70 p-4 border border-slate-100 space-y-3 text-sm sm:text-base">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                          <span className="font-semibold text-slate-500">Aggregated Complaints</span>
                          <span className="font-bold text-[#0D1B2A]">
                            {cluster.complaintCount} complaints
                          </span>
                        </div>

                        {/* Resolution Progress Bar */}
                        <div className="border-b border-slate-200/60 pb-2.5">
                          <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-1.5">
                            <span className="text-slate-500">Resolution Progress</span>
                            <span className={`${percentResolved === 100 ? 'text-[#008D78]' : 'text-[#2D7FF9]'}`}>
                              {resolvedCount} / {cluster.complaintCount} Resolved ({percentResolved}%)
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                            <div
                              className={`h-full transition-all duration-500 ${percentResolved === 100 ? 'bg-[#008D78]' : 'bg-[#2D7FF9]'}`}
                              style={{ width: `${percentResolved}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                          <span className="font-semibold text-slate-500">Geographic Location</span>
                          <span className="font-bold text-[#0D1B2A]">
                            {cluster.location} <span className="text-slate-400 font-normal">({cluster.pincode})</span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-500">Responsible Department</span>
                          <span className={`font-bold ${cluster.deptColor}`}>
                            {cluster.department}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Status Dropdown & View Button */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      {/* Status Dropdown Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status:</span>
                        <select
                          value={currentStatus}
                          disabled={updatingClusterId === cluster.id}
                          onChange={(e) => handleStatusChange(cluster, e.target.value)}
                          className={`rounded-lg border px-3 py-1.5 text-xs sm:text-sm font-bold outline-none cursor-pointer transition shadow-2xs ${
                            currentStatus === "Resolved"
                              ? "bg-emerald-50 text-[#008D78] border-emerald-200 hover:bg-emerald-100"
                              : currentStatus === "In Progress"
                              ? "bg-blue-50 text-[#2D7FF9] border-blue-200 hover:bg-blue-100"
                              : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                          }`}
                        >
                          <option value="Pending">⏳ Pending</option>
                          <option value="In Progress">⚡ In Progress</option>
                          <option value="Resolved">✓ Resolved (Resolve All)</option>
                        </select>
                      </div>

                      <button
                        onClick={() => setSelectedCluster(cluster)}
                        className="rounded-xl border border-slate-200 bg-white px-4.5 py-2 text-xs sm:text-sm font-semibold text-[#0D1B2A] hover:border-[#2D7FF9] hover:bg-[#EEF5FF] hover:text-[#2D7FF9] transition-all cursor-pointer shadow-2xs"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT-ALIGNED SHOW MORE / SHOW LESS BLUE TEXT LINK */}
            {filteredClusters.length > 10 && (
              <div className="flex justify-end pt-3 pr-1">
                {visibleCount < filteredClusters.length ? (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="text-[#2D7FF9] font-bold text-sm sm:text-base hover:underline cursor-pointer bg-transparent border-none p-0 transition flex items-center gap-1.5"
                  >
                    Show More ({filteredClusters.length - visibleCount} remaining) →
                  </button>
                ) : (
                  <button
                    onClick={() => setVisibleCount(10)}
                    className="text-[#2D7FF9] font-bold text-sm sm:text-base hover:underline cursor-pointer bg-transparent border-none p-0 transition flex items-center gap-1.5"
                  >
                    Show Less ↑
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. CLUSTER DETAILS MODAL */}
      {selectedCluster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fadeIn">
          <div className="modal-popup-container w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3.5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2D7FF9]" />
                  <span className="font-mono text-xs font-semibold text-[#2D7FF9] uppercase tracking-wider">
                    {selectedCluster.id}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D1B2A]">
                  {selectedCluster.title}
                </h2>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  {selectedCluster.location} <span className="font-mono text-slate-400">({selectedCluster.pincode})</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedCluster(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* STATUS ACTION BAR INSIDE MODAL */}
            <div className="rounded-xl bg-slate-50 p-4.5 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-sm">
              <div>
                <span className="font-semibold text-slate-400 uppercase block text-xs">Cluster Action Status</span>
                <span className="font-bold text-[#0D1B2A] text-base">
                  Currently: <strong className="text-[#2D7FF9]">{selectedCluster.status || "Pending"}</strong> ({selectedCluster.resolvedCount || 0} / {selectedCluster.complaintCount} resolved)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCluster.status || "Pending"}
                  disabled={updatingClusterId === selectedCluster.id}
                  onChange={(e) => handleStatusChange(selectedCluster, e.target.value)}
                  className={`rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-bold outline-none cursor-pointer transition shadow-xs ${
                    selectedCluster.status === "Resolved"
                      ? "bg-emerald-50 text-[#008D78] border-emerald-200"
                      : selectedCluster.status === "In Progress"
                      ? "bg-blue-50 text-[#2D7FF9] border-blue-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  }`}
                >
                  <option value="Pending">⏳ Pending</option>
                  <option value="In Progress">⚡ In Progress</option>
                  <option value="Resolved">✓ Resolved (Resolve All)</option>
                </select>
              </div>
            </div>

            {/* CLUSTER BREAKDOWN METADATA */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Cluster Breakdown
              </h4>

              <div className="grid grid-cols-2 gap-3.5 text-sm">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="font-semibold text-slate-400 uppercase block mb-1 text-xs">Complaint Count</span>
                  <span className="font-bold text-[#0D1B2A] text-base">{selectedCluster.complaintCount}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="font-semibold text-slate-400 uppercase block mb-1 text-xs">Resolved Count</span>
                  <span className="font-bold text-[#008D78] text-base">{selectedCluster.resolvedCount || 0}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="font-semibold text-slate-400 uppercase block mb-1 text-xs">Location</span>
                  <span className="font-bold text-[#0D1B2A] text-base">{selectedCluster.location}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="font-semibold text-slate-400 uppercase block mb-1 text-xs">Pincode</span>
                  <span className="font-bold text-[#0D1B2A] text-base">{selectedCluster.pincode}</span>
                </div>

                <div className="col-span-2 rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-400 uppercase text-xs">Priority Level</span>
                  <span className={`rounded-md border px-3 py-1 text-xs font-bold uppercase ${selectedCluster.priorityStyle}`}>
                    {selectedCluster.priority}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase block mb-0.5">Pincode</span>
                  <span className="font-semibold text-[#0D1B2A] text-xs sm:text-sm">{selectedCluster.pincode}</span>
                </div>
              </div>
            </div>

            {/* RELATED ISSUES BOX */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Related Complaints ({selectedCluster.relatedComplaints?.length || 0})
              </h4>

              <div className="rounded-xl bg-slate-50 p-4.5 border border-slate-200/80 space-y-2 max-h-48 overflow-y-auto">
                <ul className="space-y-2 text-sm font-normal text-slate-700">
                  {selectedCluster.relatedComplaints?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#2D7FF9] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Close Footer */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedCluster(null)}
                className="rounded-xl border border-slate-200 px-6 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}