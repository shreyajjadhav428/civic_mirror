import React, { useState } from "react";

export default function Clusters({ onNavigate }) {
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPincode, setSelectedPincode] = useState("All");

  // Modal State
  const [selectedCluster, setSelectedCluster] = useState(null);

  // Initial Cluster Data matching backend spec
  const clusterData = [
    {
      id: "CLS-STREET-01",
      title: "STREETLIGHT CLUSTER",
      category: "Streetlight",
      categoryFull: "Streetlight failures & electrical outages",
      location: "Shanti Nagar",
      pincode: "110025",
      complaintCount: 23,
      department: "Electrical Works",
      priority: "High",
      priorityStyle: "bg-red-50 text-red-600 border-red-200",
      topAccent: "bg-[#2D7FF9]",
      barColor: "bg-[#2D7FF9]",
      cardHoverBorder: "hover:border-[#2D7FF9]",
      btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
      titleHover: "group-hover:text-[#2D7FF9]",
      deptColor: "text-[#2D7FF9]",
      flowChain: [
        "23 COMPLAINTS",
        "STREETLIGHT FAILURES",
        "SHANTI NAGAR",
        "ELECTRICAL WORKS",
        "RELATED MUNICIPAL CONTEXT"
      ],
      relatedComplaints: [
        "Streetlight not working near Shanti Nagar Main Road",
        "Streetlight flickering violently near Pole #409",
        "Dark road near intersection causing safety concern",
        "Streetlight fixture damaged after storm"
      ]
    },
    {
      id: "CLS-ROAD-02",
      title: "ROAD DAMAGE CLUSTER",
      category: "Roads",
      categoryFull: "Pavement & Pothole Surface Damage",
      location: "Shanti Nagar",
      pincode: "110025",
      complaintCount: 17,
      department: "Engineering",
      priority: "Medium",
      priorityStyle: "bg-amber-50 text-amber-700 border-amber-200",
      topAccent: "bg-[#FFC107]",
      barColor: "bg-[#FFC107]",
      cardHoverBorder: "hover:border-[#FFC107]",
      btnHover: "hover:bg-[#FFC107] hover:border-[#FFC107] hover:text-[#0D1B2A]",
      titleHover: "group-hover:text-[#D97706]",
      deptColor: "text-[#D97706]",
      flowChain: [
        "17 COMPLAINTS",
        "ROAD SURFACE DAMAGE",
        "SHANTI NAGAR",
        "ENGINEERING",
        "RELATED MUNICIPAL CONTEXT"
      ],
      relatedComplaints: [
        "Deep pothole near Shanti Nagar market entrance",
        "Asphalt erosion along 3rd cross road",
        "Cracked pavement causing traffic slowdown",
        "Loose gravel on major bus transit curve"
      ]
    },
    {
      id: "CLS-WATER-03",
      title: "WATER LEAKAGE CLUSTER",
      category: "Water",
      categoryFull: "Mainline Seepage & Low Water Pressure",
      location: "Sector 12",
      pincode: "110012",
      complaintCount: 21,
      department: "Water Supply & Sanitation",
      priority: "High",
      priorityStyle: "bg-red-50 text-red-600 border-red-200",
      topAccent: "bg-[#00A68E]",
      barColor: "bg-[#00A68E]",
      cardHoverBorder: "hover:border-[#00A68E]",
      btnHover: "hover:bg-[#00A68E] hover:border-[#00A68E] hover:text-white",
      titleHover: "group-hover:text-[#00A68E]",
      deptColor: "text-[#00A68E]",
      flowChain: [
        "21 COMPLAINTS",
        "MAINLINE PIPE LEAKAGE",
        "SECTOR 12",
        "WATER SUPPLY & SANITATION",
        "RELATED MUNICIPAL CONTEXT"
      ],
      relatedComplaints: [
        "Low water pressure reported across Block B",
        "Clean water seepage observed on main road curb",
        "Water outage during morning peak hours",
        "Dirty water supply in residential tap line"
      ]
    },
    {
      id: "CLS-DRAIN-04",
      title: "DRAINAGE OVERFLOW CLUSTER",
      category: "Sanitation",
      categoryFull: "Stormwater Grate Blockage & Overflow",
      location: "Green Park",
      pincode: "110045",
      complaintCount: 18,
      department: "Stormwater Management",
      priority: "Medium",
      priorityStyle: "bg-amber-50 text-amber-700 border-amber-200",
      topAccent: "bg-[#6366F1]",
      barColor: "bg-[#6366F1]",
      cardHoverBorder: "hover:border-[#6366F1]",
      btnHover: "hover:bg-[#6366F1] hover:border-[#6366F1] hover:text-white",
      titleHover: "group-hover:text-[#6366F1]",
      deptColor: "text-[#6366F1]",
      flowChain: [
        "18 COMPLAINTS",
        "DRAINAGE BLOCKAGE",
        "GREEN PARK",
        "STORMWATER MANAGEMENT",
        "RELATED MUNICIPAL CONTEXT"
      ],
      relatedComplaints: [
        "Storm drain overflowing post rain",
        "Blocked culvert causing standing water",
        "Foul odor near storm grate entrance",
        "Silt accumulation clogging drainage outlet"
      ]
    }
  ];

  // Filtering Logic
  const filteredClusters = clusterData.filter((cluster) => {
    const matchesSearch =
      cluster.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cluster.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cluster.pincode.includes(searchQuery) ||
      cluster.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || cluster.category === selectedCategory;

    const matchesPincode =
      selectedPincode === "All" || cluster.pincode === selectedPincode;

    return matchesSearch && matchesCategory && matchesPincode;
  });

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
              GEOGRAPHIC CONCENTRATIONS
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight">
              Complaint <span className="text-[#2D7FF9]">Clusters</span>
            </h1>
            <p className="mt-2 text-lg font-semibold text-[#59687A] max-w-2xl">
              Turn thousands of individual complaints into <strong>meaningful groups</strong>. Identify geographic concentrations of similar civic problems.
            </p>

            {/* Accent Line Dashes */}
            <div className="flex items-center gap-2 mt-4">
              <span className="h-1.5 w-7 rounded-full bg-[#2D7FF9]" />
              <span className="h-1.5 w-7 rounded-full bg-[#00A68E]" />
              <span className="h-1.5 w-7 rounded-full bg-[#FFC107]" />
              <span className="h-1.5 w-7 rounded-full bg-[#FF5252]" />
            </div>
          </div>

          {/* Stat Box */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-3 text-base font-semibold">
              <span className="text-[#657386] block text-xs font-black uppercase tracking-wider">Active Clusters</span>
              <span className="text-[#0D1B2A] font-black font-mono text-xl">{filteredClusters.length} Clustered Groups</span>
            </div>
          </div>
        </div>

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
            {/* Category Dropdown */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm font-bold">
              <span className="text-slate-500">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-[#0D1B2A] font-black outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Streetlight">Streetlight</option>
                <option value="Roads">Roads</option>
                <option value="Water">Water</option>
                <option value="Sanitation">Sanitation</option>
              </select>
            </div>

            {/* Pincode Dropdown */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm font-bold">
              <span className="text-slate-500">Pincode:</span>
              <select
                value={selectedPincode}
                onChange={(e) => setSelectedPincode(e.target.value)}
                className="bg-transparent text-[#0D1B2A] font-black outline-none cursor-pointer font-mono"
              >
                <option value="All">All Pincodes</option>
                <option value="110025">110025 (Shanti Nagar)</option>
                <option value="110012">110012 (Sector 12)</option>
                <option value="110045">110045 (Green Park)</option>
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredClusters.map((cluster) => (
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
                    <span className="font-mono text-xs font-black tracking-wider text-slate-400 uppercase block mb-0.5">
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
                    <span className="font-mono font-black text-[#0D1B2A] text-lg">
                      {cluster.complaintCount} complaints
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                    <span className="text-sm font-bold text-slate-500">Geographic Location</span>
                    <span className="font-black text-[#0D1B2A] text-base">
                      {cluster.location} <span className="font-mono text-slate-400 font-medium">({cluster.pincode})</span>
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

              {/* Card Footer Button */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedCluster(cluster)}
                  className={`rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-black text-[#0D1B2A] ${cluster.btnHover} transition-all shadow-2xs`}
                >
                  View Cluster
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CLUSTER DETAILS MODAL (FULL WORKFLOW & BREAKDOWN & AI CTA) */}
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



            {/* CLUSTER BREAKDOWN METADATA */}
            <div className="space-y-3">
              <h4 className="text-base font-black text-[#0D1B2A] uppercase tracking-wider">
                Cluster Breakdown
              </h4>

              <div className="grid grid-cols-2 gap-3 text-base">
                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Complaint Count</span>
                  <span className="font-mono font-black text-[#0D1B2A] text-lg">{selectedCluster.complaintCount}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Location</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedCluster.location}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Pincode</span>
                  <span className="font-mono font-black text-[#0D1B2A]">{selectedCluster.pincode}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Category</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedCluster.category}</span>
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
                Related Complaints
              </h4>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono block mb-2">
                  AGGREGATED INCOMING TICKETS
                </span>
                <ul className="space-y-2 text-sm font-semibold text-slate-700">
                  {selectedCluster.relatedComplaints.map((item, idx) => (
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
