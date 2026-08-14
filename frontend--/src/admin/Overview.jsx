import React, { useState, useEffect } from "react";
import {
  getAdminOverview,
  getComplaintClusters,
  getUniqueQueries,
  updateComplaintStatus,
} from "../api/admin.api";

export default function Overview() {
  const [activityTimeframe, setActivityTimeframe] = useState("Last 7 Days");
  const [dateFilter, setDateFilter] = useState("Today");
  const [selectedPriorityIssue, setSelectedPriorityIssue] = useState(null);
  const [showAllPriorityModal, setShowAllPriorityModal] = useState(false);
  const [showAllQueriesModal, setShowAllQueriesModal] = useState(false);
  const [selectedAreaModal, setSelectedAreaModal] = useState(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Dynamic Backend State (Zeroed initially - populated exclusively by Backend API)
  const [overviewMetrics, setOverviewMetrics] = useState({
    totalRequests: 0,
    pending: 0,
    resolved: 0,
    activeClusters: 0,
    flaggedForReview: 0,
  });

  // Priority Issues Data (Empty initially - populated exclusively by Backend API)
  const [priorityIssues, setPriorityIssues] = useState([]);

  // Priority Issue Search & Filter State inside modal
  const [prioritySearch, setPrioritySearch] = useState("");

  // Common Queries Search State inside modal
  const [querySearch, setQuerySearch] = useState("");

  // Most Common Queries Data (Empty initially - populated exclusively by Backend API)
  const [commonQueries, setCommonQueries] = useState([]);

  // -------------------------------------------------------------------
  // FETCH BACKEND DATA ON MOUNT & FILTER CHANGE
  // -------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;
    async function loadDashboardData() {
      setLoading(true);
      try {
        // 1. Fetch Overview Stats
        const overviewRes = await getAdminOverview(dateFilter);
        if (isMounted && overviewRes?.data) {
          setOverviewMetrics(overviewRes.data);
        }
      } catch (err) {
        console.error("Error fetching overview stats from backend:", err);
      }

      try {
        // 2. Fetch Complaint Clusters
        const clustersRes = await getComplaintClusters();
        if (isMounted && clustersRes?.data) {
          const mappedClusters = clustersRes.data.map((c, idx) => ({
            id: c.clusterId || `ISS-0${idx + 1}`,
            title: c.category ? `${c.category} Issues` : `Pincode ${c.pincode}`,
            count: c.complaintCount || 0,
            dotColor: c.unmatchedCount > 0 ? "bg-red-500" : "bg-amber-500",
            urgency: c.unmatchedCount > 0 ? "High Priority" : "Moderate Priority",
            department: c.category || "Municipal Dept",
            location: `Pincode ${c.pincode}`,
            status: c.unmatchedCount > 0 ? "Pending Action" : "Under Review",
            description: `Aggregated complaint cluster with ${c.complaintCount} citizen report(s) in Pincode ${c.pincode}.`,
            complaints: c.complaints || []
          }));
          setPriorityIssues(mappedClusters);
        }
      } catch (err) {
        console.error("Error fetching priority clusters from backend:", err);
      }

      try {
        // 3. Fetch Common Queries
        const queriesRes = await getUniqueQueries();
        if (isMounted && queriesRes?.data) {
          const mappedQueries = queriesRes.data.map((q) => ({
            ...q,
            text: q.text || q.question || q.query || "Citizen Query",
            count: q.count ?? q.requestCount ?? 0,
            category: "Citizen Query"
          }));
          setCommonQueries(mappedQueries);
        }
      } catch (err) {
        console.error("Error fetching queries from backend:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDashboardData();
    return () => { isMounted = false; };
  }, [dateFilter]);

  // Compute Stat Cards dynamically from overviewMetrics
  const currentStats = {
    dateLabel: dateFilter,
    stats: [
      {
        title: "TOTAL REQUESTS",
        value: Number(overviewMetrics.totalRequests ?? 0).toLocaleString(),
        trend: loading ? "Loading..." : "↑ Live from database",
        titleColor: "text-[#2D7FF9]",
        valColor: "text-[#1E3A8A]",
        strokeColor: "#2D7FF9",
        hoverBorder: "hover:shadow-[#2D7FF9]/15",
      },
      {
        title: "PENDING",
        value: Number(overviewMetrics.pending ?? 0).toLocaleString(),
        trend: loading ? "Loading..." : "↑ Needs action",
        titleColor: "text-[#FF5722]",
        valColor: "text-slate-800",
        strokeColor: "#FF5722",
        hoverBorder: "hover:shadow-[#FF5722]/15",
      },
      {
        title: "RESOLVED",
        value: Number(overviewMetrics.resolved ?? 0).toLocaleString(),
        trend: loading ? "Loading..." : "✓ Completed",
        titleColor: "text-[#2E7D32]",
        valColor: "text-[#2E7D32]",
        strokeColor: "#2E7D32",
        hoverBorder: "hover:shadow-[#2E7D32]/15",
      },
      {
        title: "ACTIVE CLUSTERS",
        value: Number(overviewMetrics.activeClusters ?? overviewMetrics.flaggedForReview ?? 0).toLocaleString(),
        trend: loading ? "Loading..." : "↑ Grouped clusters",
        titleColor: "text-[#1E3A8A]",
        valColor: "text-[#1E3A8A]",
        strokeColor: "#1E3A8A",
        hoverBorder: "hover:shadow-[#1E3A8A]/15",
      },
    ],
  };

  // Handlers for modal actions with Backend Integration
  const handleAssignCrew = async (issueId) => {
    try {
      const issue = priorityIssues.find((i) => i.id === issueId);
      if (issue && issue.complaints && issue.complaints.length > 0) {
        await updateComplaintStatus(issue.complaints[0].id, { status: "Crew Dispatched" });
      }
    } catch (e) {
      console.warn("Backend status update error:", e);
    }
    setPriorityIssues((prev) =>
      prev.map((iss) => (iss.id === issueId ? { ...iss, status: "Crew Dispatched" } : iss))
    );
    setActionSuccessMsg(`Repair crew dispatched for ${selectedPriorityIssue?.title || "issue"}!`);
    setTimeout(() => setActionSuccessMsg(""), 3000);
  };

  const handleResolveIssue = async (issueId) => {
    try {
      const issue = priorityIssues.find((i) => i.id === issueId);
      if (issue && issue.complaints && issue.complaints.length > 0) {
        await Promise.all(
          issue.complaints.map((c) => updateComplaintStatus(c.id, { status: "Resolved", admin_flagged: false }))
        );
      }
    } catch (e) {
      console.warn("Backend status update error:", e);
    }
    setPriorityIssues((prev) =>
      prev.map((iss) => (iss.id === issueId ? { ...iss, count: Math.max(0, iss.count - 1), status: "Resolved & Closed" } : iss))
    );
    // Update overview metrics locally
    setOverviewMetrics((prev) => ({
      ...prev,
      pending: Math.max(0, prev.pending - 1),
      resolved: prev.resolved + 1,
    }));
    setActionSuccessMsg(`Issue "${selectedPriorityIssue?.title || "selected"}" marked as resolved!`);
    setTimeout(() => setActionSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-6 text-slate-800">
      {/* Toast Notification */}
      {actionSuccessMsg && (
        <div className="fixed top-6 right-6 z-50 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-2xl transition-all animate-bounce">
          ✓ {actionSuccessMsg}
        </div>
      )}

      {/* Welcome Header Bar with Functional Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Welcome back, Admin
            {loading && <span className="text-xs font-semibold text-slate-400 animate-pulse">(Fetching live data...)</span>}
          </h2>
          
        </div>

        <div className="flex items-center gap-3">
          {/* Functional Date Dropdown Filter */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 pr-9 text-xs font-bold text-slate-700 shadow-sm hover:border-[#2D7FF9] focus:outline-none transition cursor-pointer"
            >
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
              ▼
            </span>
          </div>

          {/* Date Badge */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm">
            <span>Filter: {currentStats.dateLabel}</span>
            <svg
              className="h-4 w-4 text-[#2D7FF9]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Dynamic Top 4 Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {currentStats.stats.map((stat, idx) => (
          <div
            key={idx}
            className={`group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ${stat.hoverBorder} hover:shadow-md cursor-pointer overflow-hidden`}
          >
            {/* Animated Circular Border Trace */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none rounded-xl">
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="11"
                ry="11"
                fill="none"
                stroke={stat.strokeColor}
                strokeWidth="2.5"
                pathLength="100"
                className="card-circle-stroke opacity-0"
              />
            </svg>

            <span className={`text-xs font-extrabold uppercase tracking-wider ${stat.titleColor}`}>
              {stat.title}
            </span>
            <div className={`mt-2 text-2xl font-black ${stat.valColor}`}>
              {stat.value}
            </div>
            <div className="mt-2 text-xs font-bold text-emerald-600">
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Priority Issues (Left Column) & Most Common Queries (Right Column) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Priority Issues Card */}
        <div className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-[#FF5722]/10 hover:shadow-md lg:col-span-6 flex flex-col justify-between overflow-hidden">
          <svg className="absolute inset-0 h-full w-full pointer-events-none rounded-xl">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="11"
              ry="11"
              fill="none"
              stroke="#FF5722"
              strokeWidth="2.5"
              pathLength="100"
              className="card-circle-stroke opacity-0"
            />
          </svg>

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-extrabold uppercase tracking-wider text-[#1E3A8A]">
                PRIORITY ISSUES
              </h3>
              <button
                onClick={() => setShowAllPriorityModal(true)}
                className="text-sm font-bold text-[#2D7FF9] hover:underline relative z-10"
              >
                View all ({priorityIssues.length})
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              {loading && priorityIssues.length === 0 ? (
                <div className="py-8 text-center text-xs font-semibold text-slate-400 animate-pulse">
                  Loading priority issues from backend...
                </div>
              ) : priorityIssues.length === 0 ? (
                <div className="py-8 text-center text-xs font-semibold text-slate-400">
                  No active priority issue clusters found.
                </div>
              ) : (
                priorityIssues.slice(0, 5).map((issue) => (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedPriorityIssue(issue)}
                    className="flex items-center justify-between cursor-pointer group/item hover:bg-slate-50 p-2 rounded-xl transition border border-transparent hover:border-slate-200 relative z-10"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-3.5 w-3.5 rounded-full ${issue.dotColor} shrink-0`} />
                      <div>
                        <span className="text-sm font-extrabold text-slate-800 group-hover/item:text-[#2D7FF9] transition block">
                          {issue.title}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                          {issue.department}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-600">
                        {issue.status}
                      </span>
                      <span className="text-sm font-black font-mono text-slate-800">
                        {issue.count}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Most Common Queries Card */}
        <div className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-[#2D7FF9]/10 hover:shadow-md lg:col-span-6 flex flex-col justify-between overflow-hidden">
          <svg className="absolute inset-0 h-full w-full pointer-events-none rounded-xl">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="11"
              ry="11"
              fill="none"
              stroke="#2D7FF9"
              strokeWidth="2.5"
              pathLength="100"
              className="card-circle-stroke opacity-0"
            />
          </svg>

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-extrabold uppercase tracking-wider text-[#1E3A8A]">
                MOST COMMON QUERIES
              </h3>
              <button
                onClick={() => setShowAllQueriesModal(true)}
                className="text-sm font-bold text-[#2D7FF9] hover:underline relative z-10"
              >
                View all ({commonQueries.length})
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              {commonQueries.length === 0 ? (
                <div className="py-6 text-center text-xs font-semibold text-slate-400">
                  No common citizen queries logged yet.
                </div>
              ) : (
                commonQueries.map((query, idx) => (
                  <div
                    key={idx}
                    onClick={() => alert(`Query detail: "${query.text}" (${query.count} citizen requests)`)}
                    className="flex items-center justify-between text-sm text-slate-800 cursor-pointer p-2 rounded-xl hover:bg-slate-50 relative z-10 transition border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="h-4.5 w-4.5 text-[#2D7FF9] shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-extrabold text-slate-700 hover:text-[#2D7FF9] transition">
                        {query.text}
                      </span>
                    </div>
                    <span className="font-black font-mono text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg text-sm shrink-0 ml-2">
                      {query.count}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. PRIORITY ISSUE DETAIL MODAL */}
      {selectedPriorityIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-sm animate-fadeIn">
          <div className="modal-popup-container w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl transition-all">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className={`h-4 w-4 rounded-full ${selectedPriorityIssue.dotColor}`} />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xl">
                    {selectedPriorityIssue.title}
                  </h3>
                  <span className="text-sm font-bold text-slate-400">
                    ID: {selectedPriorityIssue.id} • Urgency: <strong className="text-red-600">{selectedPriorityIssue.urgency}</strong>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPriorityIssue(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 text-base font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-500 block mb-1 text-xs uppercase tracking-wider">Active Citizen Reports</span>
                  <span className="font-black text-3xl font-mono text-[#2D7FF9]">
                    {selectedPriorityIssue.count}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-500 block mb-1 text-xs uppercase tracking-wider">Current Status</span>
                  <span className="inline-block rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-extrabold text-amber-800">
                    {selectedPriorityIssue.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="font-extrabold text-slate-900 block text-sm">Assigned Department:</span>
                  <span className="text-slate-700 font-semibold text-sm">{selectedPriorityIssue.department}</span>
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 block text-sm">Primary Location:</span>
                  <span className="text-slate-700 font-semibold text-sm">{selectedPriorityIssue.location}</span>
                </div>
              </div>

              <div>
                <span className="font-extrabold text-slate-900 block mb-1.5 text-sm">
                  Issue Description & Field Notes:
                </span>
                <p className="bg-slate-50 p-4 rounded-xl text-slate-800 border border-slate-100 leading-relaxed font-medium text-sm">
                  {selectedPriorityIssue.description}
                </p>
              </div>
            </div>

            {/* Action Buttons inside Priority Modal */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
              <div className="flex gap-2">
                <button
                  onClick={() => handleAssignCrew(selectedPriorityIssue.id)}
                  className="rounded-xl bg-[#2D7FF9] px-4 py-2.5 text-sm font-extrabold text-white shadow-md hover:bg-[#1E4FA3] transition"
                >
                  🚀 Assign Repair Crew
                </button>
                <button
                  onClick={() => handleResolveIssue(selectedPriorityIssue.id)}
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-md hover:bg-emerald-700 transition"
                >
                  ✓ Mark as Resolved
                </button>
              </div>

              <button
                onClick={() => setSelectedPriorityIssue(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. VIEW ALL PRIORITY ISSUES MODAL */}
      {showAllPriorityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-sm animate-fadeIn">
          <div className="modal-popup-container w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-xl">
                  All Priority Municipal Issues
                </h3>
                <p className="text-sm text-slate-500 font-semibold">Search and dispatch crews directly from this overview list.</p>
              </div>
              <button
                onClick={() => setShowAllPriorityModal(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 text-base font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Controls: Search & Filter */}
            <div className="my-4 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search issues by title or location..."
                value={prioritySearch}
                onChange={(e) => setPrioritySearch(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2D7FF9]"
              />
            </div>

            <div className="mt-2 space-y-3 overflow-y-auto pr-1 flex-1 max-h-96">
              {priorityIssues
                .filter((iss) =>
                  iss.title.toLowerCase().includes(prioritySearch.toLowerCase()) ||
                  iss.location.toLowerCase().includes(prioritySearch.toLowerCase())
                )
                .map((issue) => (
                  <div
                    key={issue.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-100 bg-slate-50/60 p-4 rounded-xl hover:bg-slate-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-3.5 w-3.5 rounded-full ${issue.dotColor} shrink-0`} />
                      <div>
                        <span className="font-extrabold text-slate-900 text-sm block">{issue.title}</span>
                        <span className="text-xs text-slate-500 font-semibold">{issue.department} • {issue.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-white px-3 py-1 text-xs font-extrabold text-slate-700 border border-slate-200">
                        {issue.status}
                      </span>
                      <span className="font-black font-mono text-slate-800 text-sm">{issue.count} reports</span>
                      <button
                        onClick={() => {
                          setSelectedPriorityIssue(issue);
                          setShowAllPriorityModal(false);
                        }}
                        className="rounded-lg bg-[#2D7FF9] px-3.5 py-1.5 text-xs font-extrabold text-white hover:bg-[#1E4FA3]"
                      >
                        Inspect →
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end border-t border-slate-100 pt-4">
              <button
                onClick={() => setShowAllPriorityModal(false)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-extrabold text-white"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. VIEW ALL CITIZEN QUERIES MODAL */}
      {showAllQueriesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-sm animate-fadeIn">
          <div className="modal-popup-container w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-xl">
                  Citizen Inquiries & Frequently Asked Queries
                </h3>
                <p className="text-sm text-slate-500 font-semibold">Aggregated query frequencies across ward helplines.</p>
              </div>
              <button
                onClick={() => setShowAllQueriesModal(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 text-base font-bold"
              >
                ✕
              </button>
            </div>

            <div className="my-4">
              <input
                type="text"
                placeholder="Search citizen queries..."
                value={querySearch}
                onChange={(e) => setQuerySearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2D7FF9]"
              />
            </div>

            <div className="mt-2 space-y-3 overflow-y-auto pr-1 flex-1 max-h-96">
              {commonQueries
                .filter((q) => q.text.toLowerCase().includes(querySearch.toLowerCase()))
                .map((query, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm bg-slate-50 p-3.5 rounded-xl hover:bg-slate-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-[#2D7FF9]/10 p-2 text-[#2D7FF9] font-bold">💬</span>
                      <div>
                        <span className="font-bold text-slate-800 block text-sm">{query.text}</span>
                        <span className="text-xs text-slate-500 font-semibold">Category: {query.category}</span>
                      </div>
                    </div>
                    <span className="font-extrabold font-mono text-[#2D7FF9] text-sm bg-white px-3 py-1 rounded-lg border border-slate-200 shrink-0 ml-2">
                      {query.count} citizen queries
                    </span>
                  </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end border-t border-slate-100 pt-4">
              <button
                onClick={() => setShowAllQueriesModal(false)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-extrabold text-white"
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
