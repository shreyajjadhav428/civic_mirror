import React, { useState, useEffect } from "react";
import { getComplaintClusters, dispatchClusterWorkOrder } from "../api/admin.api";

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
    priorityStyle: "bg-red-50 text-red-600 border-red-200",
    topAccent: "bg-amber-500",
    deptColor: "text-amber-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    priorityStyle: "bg-red-50 text-red-600 border-red-200",
    topAccent: "bg-sky-500",
    deptColor: "text-sky-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    priorityStyle: "bg-red-50 text-red-600 border-red-200",
    topAccent: "bg-indigo-500",
    deptColor: "text-indigo-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    priorityStyle: "bg-red-50 text-red-600 border-red-200",
    topAccent: "bg-amber-600",
    deptColor: "text-amber-800",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    priorityStyle: "bg-amber-50 text-amber-700 border-amber-200",
    topAccent: "bg-emerald-500",
    deptColor: "text-emerald-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    priorityStyle: "bg-amber-50 text-amber-700 border-amber-200",
    topAccent: "bg-blue-600",
    deptColor: "text-blue-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    priorityStyle: "bg-amber-50 text-amber-700 border-amber-200",
    topAccent: "bg-green-500",
    deptColor: "text-green-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    priorityStyle: "bg-amber-50 text-amber-700 border-amber-200",
    topAccent: "bg-rose-500",
    deptColor: "text-rose-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    priorityStyle: "bg-red-50 text-red-600 border-red-200",
    topAccent: "bg-red-500",
    deptColor: "text-red-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    priorityStyle: "bg-red-50 text-red-600 border-red-200",
    topAccent: "bg-fuchsia-500",
    deptColor: "text-fuchsia-700",
    cardHoverBorder: "hover:border-[#2D7FF9]",
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
    btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
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
  // HANDLE CLUSTER STATUS CHANGE (PENDING -> IN PROGRESS -> COMPLETED)
  // -------------------------------------------------------------------
  const handleStatusChange = async (cluster, newStatus) => {
    setUpdatingClusterId(cluster.id);
    setActionSuccessMsg("");
    try {
      const res = await dispatchClusterWorkOrder({
        pincode: cluster.pincode,
        category: cluster.category,
        status: newStatus,
      });

      const isResolved = newStatus === "Completed" || newStatus === "Resolved";
      const isInProgress = newStatus === "In Progress";

      setClusterData((prev) =>
        prev.map((item) => {
          if (item.id === cluster.id) {
            const newResolvedCount = isResolved ? item.complaintCount : 0;
            const newInProgressCount = isInProgress ? item.complaintCount : 0;
            const newPendingCount = isResolved || isInProgress ? 0 : item.complaintCount;

            return {
              ...item,
              status: isResolved ? "Completed" : isInProgress ? "In Progress" : "Pending",
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
          status: isResolved ? "Completed" : isInProgress ? "In Progress" : "Pending",
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
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* 1. HEADER BANNER */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        {/* Top Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              <span className="h-[3px] w-6 bg-[#2D7FF9] rounded-full inline-block" />
              GEOGRAPHIC CONCENTRATIONS & DEPARTMENTS
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight flex items-center gap-3">
              Complaint <span className="text-[#2D7FF9]">Clusters</span>
              {loading && <span className="text-xs font-semibold text-slate-400 animate-pulse">(Fetching live data...)</span>}
            </h1>
            <p className="mt-2 text-lg font-semibold text-[#59687A] max-w-2xl">
              Turn user queries into <strong>pincode & department clusters</strong> covering all 12 municipal departments.
            </p>
          </div>

          {/* Stat Box */}
          <div className="flex flex-wrap sm:flex-nowrap sm:items-end gap-3 shrink-0">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-3 text-base font-semibold">
              <span className="text-[#657386] block text-xs font-black uppercase tracking-wider">Active Clusters</span>
              <span className="text-[#0D1B2A] font-black text-xl">{filteredClusters.length} Clustered Groups</span>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-5 py-3 text-base font-semibold">
              <span className="text-emerald-700 block text-xs font-black uppercase tracking-wider">Resolved Complaints</span>
              <span className="text-emerald-900 font-black text-xl">{totalResolvedComplaints} / {totalAggregatedComplaints}</span>
            </div>
          </div>
        </div>

        {/* Action success message banner */}
        {actionSuccessMsg && (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-bold text-emerald-800 shadow-xs flex items-center gap-2">
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* 2. SEARCH & FILTER CONTROL BAR */}
        <div className="mt-7 pt-6 border-t border-slate-100 flex flex-col gap-3.5 sm:flex-row sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search cluster, location, department, or pincode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4.5 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-[#2D7FF9] focus:bg-white transition"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Department Dropdown */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm font-bold">
              <span className="text-slate-500">Department:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-[#0D1B2A] font-black outline-none cursor-pointer"
              >
                <option value="All">All 12 Departments</option>
                {OFFICIAL_DEPARTMENTS.map((dept) => (
                  <option key={dept.name} value={dept.name}>
                    {dept.icon} {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pincode Dropdown */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm font-bold">
              <span className="text-slate-500">Pincode:</span>
              <select
                value={selectedPincode}
                onChange={(e) => setSelectedPincode(e.target.value)}
                className="bg-transparent text-[#0D1B2A] font-black outline-none cursor-pointer"
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
      </div>

      {/* 3. CLUSTER CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-black tracking-widest text-slate-400 uppercase">
            <span className="h-[3px] w-6 bg-slate-300 rounded-full inline-block" />
            IDENTIFIED CLUSTER CARDS
          </p>
          <span className="text-sm font-bold text-slate-500">
            Showing {filteredClusters.length} of {clusterData.length} clusters
          </span>
        </div>

        {loading && clusterData.length === 0 ? (
          <div className="py-16 text-center text-xs font-semibold text-slate-400 animate-pulse">
            Loading issue clusters from database...
          </div>
        ) : filteredClusters.length === 0 ? (
          <div className="py-16 text-center text-xs font-semibold text-slate-400">
            No active complaint clusters found matching your filter criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredClusters.map((cluster) => {
              const currentStatus = cluster.status || "Pending";
              const resolvedCount = cluster.resolvedCount || 0;
              const percentResolved = cluster.complaintCount > 0 ? Math.round((resolvedCount / cluster.complaintCount) * 100) : 0;

              return (
                <div
                  key={cluster.id}
                  className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all ${cluster.cardHoverBorder} hover:shadow-md overflow-hidden`}
                >
                  {/* Top Accent line */}
                  <div className={`absolute top-0 left-0 w-16 h-1.5 ${cluster.topAccent} rounded-b`} />

                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4 pt-1">
                      <div>
                        <span className="text-xs font-black tracking-wider text-slate-400 uppercase block mb-0.5">
                          {cluster.id}
                        </span>
                        <h3 className={`text-xl font-black text-[#0D1B2A] ${cluster.titleHover} transition-colors leading-tight`}>
                          {cluster.title}
                        </h3>
                      </div>

                      <span className={`rounded-lg border px-3 py-1 text-xs font-black uppercase tracking-wider ${cluster.priorityStyle}`}>
                        • {cluster.priority} PRIORITY
                      </span>
                    </div>

                    {/* Main Stats Box */}
                    <div className="rounded-xl bg-slate-50/70 p-4 border border-slate-100 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                        <span className="text-sm font-bold text-slate-500">Aggregated Complaints</span>
                        <span className="font-black text-[#0D1B2A] text-lg">
                          {cluster.complaintCount} complaints
                        </span>
                      </div>

                      {/* Resolution Progress Bar */}
                      <div className="border-b border-slate-200/60 pb-2.5">
                        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                          <span className="text-slate-500">Resolution Progress</span>
                          <span className={`${percentResolved === 100 ? 'text-emerald-700' : 'text-[#2D7FF9]'}`}>
                            {resolvedCount} / {cluster.complaintCount} Resolved ({percentResolved}%)
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className={`h-full transition-all duration-500 ${percentResolved === 100 ? 'bg-emerald-500' : 'bg-[#2D7FF9]'}`}
                            style={{ width: `${percentResolved}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                        <span className="text-sm font-bold text-slate-500">Geographic Location</span>
                        <span className="font-black text-[#0D1B2A] text-base">
                          {cluster.location} <span className="text-slate-400 font-medium">({cluster.pincode})</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-500">Responsible Department</span>
                        <span className={`font-extrabold ${cluster.deptColor} text-base`}>
                          {cluster.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Status Dropdown & View Button */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    {/* Status Dropdown Selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cluster Status:</span>
                      <select
                        value={currentStatus}
                        disabled={updatingClusterId === cluster.id}
                        onChange={(e) => handleStatusChange(cluster, e.target.value)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-extrabold outline-none cursor-pointer transition shadow-2xs ${
                          currentStatus === "Completed"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                            : currentStatus === "In Progress"
                            ? "bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100"
                            : "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                        }`}
                      >
                        <option value="Pending">⏳ Pending</option>
                        <option value="In Progress">⚡ In Progress</option>
                        <option value="Completed">✓ Completed (Resolve All)</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setSelectedCluster(cluster)}
                      className={`rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-black text-[#0D1B2A] ${cluster.btnHover} transition-all shadow-2xs`}
                    >
                      View Cluster Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. CLUSTER DETAILS MODAL */}
      {selectedCluster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="modal-popup-container w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2D7FF9]" />
                  <span className="font-mono text-xs font-black text-[#2D7FF9] uppercase tracking-wider">
                    {selectedCluster.id}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-[#0D1B2A] mt-1">
                  {selectedCluster.title}
                </h2>
                <p className="text-base font-bold text-slate-500 mt-0.5">
                  {selectedCluster.location} <span className="font-mono text-slate-400">({selectedCluster.pincode})</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedCluster(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-800 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* STATUS ACTION BAR INSIDE MODAL */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase block">Cluster Action Status</span>
                <span className="text-sm font-extrabold text-[#0D1B2A]">
                  Currently: <strong className="text-[#2D7FF9]">{selectedCluster.status || "Pending"}</strong> ({selectedCluster.resolvedCount || 0} / {selectedCluster.complaintCount} resolved)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCluster.status || "Pending"}
                  disabled={updatingClusterId === selectedCluster.id}
                  onChange={(e) => handleStatusChange(selectedCluster, e.target.value)}
                  className={`rounded-xl border px-4 py-2 text-xs font-black outline-none cursor-pointer transition shadow-xs ${
                    selectedCluster.status === "Completed"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : selectedCluster.status === "In Progress"
                      ? "bg-blue-50 text-blue-800 border-blue-300"
                      : "bg-amber-50 text-amber-800 border-amber-300"
                  }`}
                >
                  <option value="Pending">⏳ Pending</option>
                  <option value="In Progress">⚡ In Progress</option>
                  <option value="Completed">✓ Completed (Resolve All)</option>
                </select>
              </div>
            </div>

            {/* CLUSTER BREAKDOWN METADATA */}
            <div className="space-y-3">
              <h4 className="text-base font-black text-[#0D1B2A] uppercase tracking-wider">
                Cluster Breakdown
              </h4>

              <div className="grid grid-cols-2 gap-3 text-base">
                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Complaint Count</span>
                  <span className="font-black text-[#0D1B2A] text-lg">{selectedCluster.complaintCount}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Resolved Count</span>
                  <span className="font-black text-emerald-700 text-lg">{selectedCluster.resolvedCount || 0}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Location</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedCluster.location}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Pincode</span>
                  <span className="font-black text-[#0D1B2A]">{selectedCluster.pincode}</span>
                </div>

                <div className="col-span-2 rounded-xl bg-slate-50 p-3.5 border border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase">Priority Level</span>
                  <span className={`rounded-lg border px-3 py-1 text-xs font-black uppercase ${selectedCluster.priorityStyle}`}>
                    • {selectedCluster.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* RELATED ISSUES BOX */}
            <div className="space-y-3">
              <h4 className="text-base font-black text-[#0D1B2A] uppercase tracking-wider">
                Related Complaints ({selectedCluster.relatedComplaints?.length || 0})
              </h4>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 space-y-2 max-h-48 overflow-y-auto">
                <ul className="space-y-2 text-sm font-semibold text-slate-700">
                  {selectedCluster.relatedComplaints?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#2D7FF9] font-black">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Close Footer */}
            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedCluster(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-50"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
