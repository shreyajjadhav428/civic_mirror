import React, { useState, useEffect } from "react";
import { getComplaintClusters } from "../api/admin.api";

export default function Clusters({ onNavigate }) {
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPincode, setSelectedPincode] = useState("All");

  // Modal State
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dynamic Backend Cluster Data (Empty by default - populated strictly by Backend API)
  const [clusterData, setClusterData] = useState([]);

  // -------------------------------------------------------------------
  // FETCH BACKEND CLUSTERS ON MOUNT
  // -------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    async function loadClustersData() {
      setLoading(true);
      try {
        const res = await getComplaintClusters();
        if (isMounted && res?.data) {
          setClusterData(res.data);
        }
      } catch (err) {
        console.error("Error fetching complaint clusters from backend:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadClustersData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute unique dropdown options dynamically from backend data
  const availableCategories = [
    "All",
    ...Array.from(new Set(clusterData.map((c) => c.category).filter(Boolean))),
  ];

  const availablePincodes = [
    "All",
    ...Array.from(new Set(clusterData.map((c) => c.pincode).filter(Boolean))),
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
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight flex items-center gap-3">
              Complaint <span className="text-[#2D7FF9]">Clusters</span>
              {loading && <span className="text-xs font-semibold text-slate-400 animate-pulse">(Fetching live data...)</span>}
            </h1>
            <p className="mt-2 text-lg font-semibold text-[#59687A] max-w-2xl">
              Turn individual complaints into <strong>actionable issue clusters</strong>. Identify geographic concentrations of similar civic problems.
            </p>
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
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
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
                className="bg-transparent text-[#0D1B2A] font-black outline-none cursor-pointer font-mono"
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
        )}
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
                  AGGREGATED INCOMING TICKETS ({selectedCluster.relatedComplaints?.length || 0})
                </span>
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
