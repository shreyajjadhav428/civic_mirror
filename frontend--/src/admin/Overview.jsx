import React, { useState } from "react";

export default function Overview() {
  const [activityTimeframe, setActivityTimeframe] = useState("Last 7 Days");
  const [dateFilter, setDateFilter] = useState("Today");
  const [selectedPriorityIssue, setSelectedPriorityIssue] = useState(null);
  const [showAllPriorityModal, setShowAllPriorityModal] = useState(false);
  const [showAllQueriesModal, setShowAllQueriesModal] = useState(false);
  const [selectedAreaModal, setSelectedAreaModal] = useState(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  // Priority Issues Data (Stateful so user actions can update it)
  const [priorityIssues, setPriorityIssues] = useState([
    {
      id: "ISS-01",
      title: "Streetlight Issues",
      count: 34,
      dotColor: "bg-red-500",
      urgency: "High Priority",
      department: "Electrical Works",
      location: "Ward 4 & Downtown",
      status: "Pending Action",
      description: "Multiple non-functional LED fixtures causing dark spots and public safety concerns during night hours.",
    },
    {
      id: "ISS-02",
      title: "Road Damage",
      count: 27,
      dotColor: "bg-orange-500",
      urgency: "High Priority",
      department: "Engineering / Road Dept",
      location: "North Avenue",
      status: "Under Review",
      description: "Pothole clusters and asphalt deterioration following monsoon runoff.",
    },
    {
      id: "ISS-03",
      title: "Water Leakage",
      count: 21,
      dotColor: "bg-amber-500",
      urgency: "Moderate Priority",
      department: "Water Supply",
      location: "Green Park Sector 7",
      status: "Crew Dispatched",
      description: "Pipeline seepage leading to low water pressure in domestic supply.",
    },
    {
      id: "ISS-04",
      title: "Drainage",
      count: 18,
      dotColor: "bg-amber-500",
      urgency: "Moderate Priority",
      department: "Engineering",
      location: "Eastside Lowland",
      status: "Scheduled",
      description: "Clogged stormwater drains causing localized waterlogging.",
    },
    {
      id: "ISS-05",
      title: "Other Issues",
      count: 12,
      dotColor: "bg-purple-500",
      urgency: "Low Priority",
      department: "General Admin",
      location: "Multiple Wards",
      status: "Pending Action",
      description: "Miscellaneous municipal inquiries and sanitation requests.",
    },
  ]);

  // Priority Issue Search & Filter State inside modal
  const [prioritySearch, setPrioritySearch] = useState("");
  const [priorityFilterDept, setPriorityFilterDept] = useState("All");

  // Common Queries Search State inside modal
  const [querySearch, setQuerySearch] = useState("");

  // Most Common Queries Data
  const commonQueries = [
    { text: "Why is my road repair delayed?", count: 84, category: "Infrastructure" },
    { text: "When will water supply resume?", count: 63, category: "Utilities" },
    { text: "Why hasn't my streetlight been repaired?", count: 41, category: "Electrical" },
    { text: "Why is drainage work taking so long?", count: 32, category: "Sanitation" },
    { text: "How long will this project take?", count: 15, category: "General" },
  ];

  // Dynamic Top Stat Cards Data by Date Filter
  const statsDataByFilter = {
    Today: {
      dateLabel: "12 Aug 2026",
      stats: [
        {
          title: "TOTAL REQUESTS",
          value: "1,284",
          trend: "↑ 12% from last 7 days",
          titleColor: "text-[#2D7FF9]",
          valColor: "text-[#1E3A8A]",
          strokeColor: "#2D7FF9",
          hoverBorder: "hover:shadow-[#2D7FF9]/15",
        },
        {
          title: "PENDING",
          value: "214",
          trend: "↑ 7% from last 7 days",
          titleColor: "text-[#FF5722]",
          valColor: "text-slate-800",
          strokeColor: "#FF5722",
          hoverBorder: "hover:shadow-[#FF5722]/15",
        },
        {
          title: "RESOLVED",
          value: "927",
          trend: "↑ 18% from last 7 days",
          titleColor: "text-[#2E7D32]",
          valColor: "text-[#2E7D32]",
          strokeColor: "#2E7D32",
          hoverBorder: "hover:shadow-[#2E7D32]/15",
        },
        {
          title: "ACTIVE CLUSTERS",
          value: "43",
          trend: "↑ 5 from last 7 days",
          titleColor: "text-[#1E3A8A]",
          valColor: "text-[#1E3A8A]",
          strokeColor: "#1E3A8A",
          hoverBorder: "hover:shadow-[#1E3A8A]/15",
        },
      ],
    },
    Yesterday: {
      dateLabel: "11 Aug 2026",
      stats: [
        {
          title: "TOTAL REQUESTS",
          value: "1,210",
          trend: "↑ 8% from previous day",
          titleColor: "text-[#2D7FF9]",
          valColor: "text-[#1E3A8A]",
          strokeColor: "#2D7FF9",
          hoverBorder: "hover:shadow-[#2D7FF9]/15",
        },
        {
          title: "PENDING",
          value: "198",
          trend: "↓ 3% from previous day",
          titleColor: "text-[#FF5722]",
          valColor: "text-slate-800",
          strokeColor: "#FF5722",
          hoverBorder: "hover:shadow-[#FF5722]/15",
        },
        {
          title: "RESOLVED",
          value: "890",
          trend: "↑ 14% from previous day",
          titleColor: "text-[#2E7D32]",
          valColor: "text-[#2E7D32]",
          strokeColor: "#2E7D32",
          hoverBorder: "hover:shadow-[#2E7D32]/15",
        },
        {
          title: "ACTIVE CLUSTERS",
          value: "41",
          trend: "↑ 2 from previous day",
          titleColor: "text-[#1E3A8A]",
          valColor: "text-[#1E3A8A]",
          strokeColor: "#1E3A8A",
          hoverBorder: "hover:shadow-[#1E3A8A]/15",
        },
      ],
    },
    "This Week": {
      dateLabel: "06 Aug - 12 Aug 2026",
      stats: [
        {
          title: "TOTAL REQUESTS",
          value: "8,420",
          trend: "↑ 15% from last week",
          titleColor: "text-[#2D7FF9]",
          valColor: "text-[#1E3A8A]",
          strokeColor: "#2D7FF9",
          hoverBorder: "hover:shadow-[#2D7FF9]/15",
        },
        {
          title: "PENDING",
          value: "1,420",
          trend: "↑ 4% from last week",
          titleColor: "text-[#FF5722]",
          valColor: "text-slate-800",
          strokeColor: "#FF5722",
          hoverBorder: "hover:shadow-[#FF5722]/15",
        },
        {
          title: "RESOLVED",
          value: "6,210",
          trend: "↑ 22% from last week",
          titleColor: "text-[#2E7D32]",
          valColor: "text-[#2E7D32]",
          strokeColor: "#2E7D32",
          hoverBorder: "hover:shadow-[#2E7D32]/15",
        },
        {
          title: "ACTIVE CLUSTERS",
          value: "43",
          trend: "↑ 8 from last week",
          titleColor: "text-[#1E3A8A]",
          valColor: "text-[#1E3A8A]",
          strokeColor: "#1E3A8A",
          hoverBorder: "hover:shadow-[#1E3A8A]/15",
        },
      ],
    },
    "This Month": {
      dateLabel: "01 Aug - 12 Aug 2026",
      stats: [
        {
          title: "TOTAL REQUESTS",
          value: "34,890",
          trend: "↑ 24% from last month",
          titleColor: "text-[#2D7FF9]",
          valColor: "text-[#1E3A8A]",
          strokeColor: "#2D7FF9",
          hoverBorder: "hover:shadow-[#2D7FF9]/15",
        },
        {
          title: "PENDING",
          value: "4,820",
          trend: "↑ 9% from last month",
          titleColor: "text-[#FF5722]",
          valColor: "text-slate-800",
          strokeColor: "#FF5722",
          hoverBorder: "hover:shadow-[#FF5722]/15",
        },
        {
          title: "RESOLVED",
          value: "28,100",
          trend: "↑ 31% from last month",
          titleColor: "text-[#2E7D32]",
          valColor: "text-[#2E7D32]",
          strokeColor: "#2E7D32",
          hoverBorder: "hover:shadow-[#2E7D32]/15",
        },
        {
          title: "ACTIVE CLUSTERS",
          value: "52",
          trend: "↑ 12 from last month",
          titleColor: "text-[#1E3A8A]",
          valColor: "text-[#1E3A8A]",
          strokeColor: "#1E3A8A",
          hoverBorder: "hover:shadow-[#1E3A8A]/15",
        },
      ],
    },
  };

  const currentStats = statsDataByFilter[dateFilter] || statsDataByFilter["Today"];

  // Dynamic Activity Graph Datasets by Timeframe Selection
  const activityGraphByTimeframe = {
    "Last 7 Days": [
      { label: "Mon", value: 15 },
      { label: "Tue", value: 30 },
      { label: "Wed", value: 20 },
      { label: "Thu", value: 48 },
      { label: "Fri", value: 39 },
      { label: "Sat", value: 59 },
      { label: "Sun", value: 42 },
    ],
    "Last 30 Days": [
      { label: "Week 1", value: 180 },
      { label: "Week 2", value: 340 },
      { label: "Week 3", value: 290 },
      { label: "Week 4", value: 470 },
    ],
    "Last 3 Months": [
      { label: "Jun", value: 680 },
      { label: "Jul", value: 920 },
      { label: "Aug", value: 1284 },
    ],
  };

  const currentActivityData =
    activityGraphByTimeframe[activityTimeframe] || activityGraphByTimeframe["Last 7 Days"];

  // SVG Line Graph Geometry
  const width = 480;
  const height = 150;
  const paddingLeft = 35;
  const paddingRight = 25;
  const paddingTop = 15;
  const paddingBottom = 25;

  const maxValue = Math.max(...currentActivityData.map((d) => d.value), 50);

  const points = currentActivityData.map((d, i) => {
    const denominator = currentActivityData.length > 1 ? currentActivityData.length - 1 : 1;
    const x = paddingLeft + (i / denominator) * (width - paddingLeft - paddingRight);
    const y = height - paddingBottom - (d.value / maxValue) * (height - paddingTop - paddingBottom);
    return { x, y, label: d.label, value: d.value };
  });

  const lineD = points.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");

  const areaD =
    points.length > 0
      ? `${lineD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`
      : "";

  // Handlers for modal actions
  const handleAssignCrew = (issueId) => {
    setPriorityIssues((prev) =>
      prev.map((iss) => (iss.id === issueId ? { ...iss, status: "Crew Dispatched" } : iss))
    );
    setActionSuccessMsg(`Repair crew dispatched for ${selectedPriorityIssue?.title}!`);
    setTimeout(() => setActionSuccessMsg(""), 3000);
  };

  const handleResolveIssue = (issueId) => {
    setPriorityIssues((prev) =>
      prev.map((iss) => (iss.id === issueId ? { ...iss, count: Math.max(0, iss.count - 5), status: "Resolved & Closed" } : iss))
    );
    setActionSuccessMsg(`Issue "${selectedPriorityIssue?.title}" marked as resolved!`);
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

      {/* 2. Welcome Header Bar with Functional Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, Admin
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
            <span>{currentStats.dateLabel}</span>
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

      {/* 3. Dynamic Top 4 Stat Cards */}
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

      {/* 4. Priority Issues (Left Column) & Most Common Queries (Right Column) */}
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
              {priorityIssues.slice(0, 5).map((issue) => (
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
              ))}
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
              {commonQueries.map((query, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm text-slate-800 p-2 rounded-xl hover:bg-slate-50 relative z-10 transition border border-transparent hover:border-slate-200"
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
                  <span className="font-black font-mono text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg text-sm">
                    {query.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ENLARGED & FUNCTIONAL MODALS (Increased Size to max-w-2xl / max-w-3xl) */}
      {/* ========================================================================= */}

      {/* 1. PRIORITY ISSUE DETAIL MODAL (15% Font Size Boost applied) */}
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
              <select
                value={priorityFilterDept}
                onChange={(e) => setPriorityFilterDept(e.target.value)}
                className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-bold text-slate-700 outline-none"
              >
                <option value="All">All Departments</option>
                <option value="Electrical Works">Electrical Works</option>
                <option value="Engineering / Road Dept">Engineering / Road Dept</option>
                <option value="Water Supply">Water Supply</option>
              </select>
            </div>

            <div className="mt-2 space-y-3 overflow-y-auto pr-1 flex-1 max-h-96">
              {priorityIssues
                .filter((iss) =>
                  iss.title.toLowerCase().includes(prioritySearch.toLowerCase()) ||
                  iss.location.toLowerCase().includes(prioritySearch.toLowerCase())
                )
                .filter((iss) => priorityFilterDept === "All" || iss.department === priorityFilterDept)
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
                    <span className="font-extrabold font-mono text-[#2D7FF9] text-sm bg-white px-3 py-1 rounded-lg border border-slate-200">
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

      {/* 4. AI INSIGHT AREA / DEPT DETAIL MODAL */}
      {selectedAreaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-sm animate-fadeIn">
          <div className="modal-popup-container w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-sm font-extrabold text-[#2D7FF9] uppercase tracking-wider">
                  AI INSIGHT SPATIAL TARGETING
                </span>
                <h3 className="font-extrabold text-slate-900 text-xl mt-0.5">
                  {selectedAreaModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAreaModal(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 text-base font-bold"
              >
                ✕
              </button>
            </div>

            <div className="my-6 space-y-4 text-sm text-slate-700">
              <p className="bg-emerald-50 p-4 rounded-xl text-emerald-900 font-semibold border border-emerald-200 leading-relaxed text-sm">
                The CivicMirror AI engine has cross-referenced 1,284 incoming reports against active work orders. These target locations/departments represent 82% of current infrastructure delay complaints.
              </p>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 font-bold block text-xs uppercase tracking-wider">INQUIRIES</span>
                  <span className="font-black text-slate-800 text-lg">860</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 font-bold block text-xs uppercase tracking-wider">WARDS AFFECTED</span>
                  <span className="font-black text-slate-800 text-lg">3 Wards</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 font-bold block text-xs uppercase tracking-wider">CONFIDENCE SCORE</span>
                  <span className="font-black text-emerald-600 text-lg">94.8%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-4">
              <button
                onClick={() => setSelectedAreaModal(null)}
                className="rounded-xl bg-[#2D7FF9] px-5 py-2.5 text-sm font-extrabold text-white hover:bg-[#1E4FA3]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
