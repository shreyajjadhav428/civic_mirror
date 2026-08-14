import React, { useState, useEffect } from "react";
import { getComplaintClusters, dispatchClusterWorkOrder } from "../api/admin.api";

export default function Clusters({ onNavigate }) {
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPincode, setSelectedPincode] = useState("All");

  // Modal State
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingClusterId, setUpdatingClusterId] = useState(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

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
              GEOGRAPHIC CONCENTRATIONS
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight flex items-center gap-3">
              Complaint <span className="text-[#2D7FF9]">Clusters</span>
              {loading && <span className="text-xs font-semibold text-slate-400 animate-pulse">(Fetching live data...)</span>}
            </h1>
            <p className="mt-2 text-lg font-semibold text-[#59687A] max-w-2xl">
              Turn individual complaints into <strong>actionable issue clusters</strong>. Change cluster statuses below to batch-update all associated complaints.
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
