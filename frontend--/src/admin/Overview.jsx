import React, { useState } from "react";

export default function Overview() {
  // Timeframe selector state for Request Activity visual trend
  const [timeframe, setTimeframe] = useState("7days");

  // Priority Issues Modal State
  const [selectedPriorityIssue, setSelectedPriorityIssue] = useState(null);

  // Priority Issues Data
  const priorityIssues = [
    {
      id: "ISS-01",
      title: "Streetlight Issues",
      count: 34,
      color: "bg-[#FF5252]",
      urgency: "Critical High",
      department: "Electrical & Public Works",
      location: "Ward 4 & Downtown Corridor",
      description: "Multiple non-functional LED fixtures causing low-visibility safety hazards during evening hours."
    },
    {
      id: "ISS-02",
      title: "Road Damage",
      count: 27,
      color: "bg-[#FF7A00]",
      urgency: "High Priority",
      department: "Road Maintenance & Asphalt Ops",
      location: "North Avenue & 5th Expressway",
      description: "Severe pothole formation and pavement surface cracking following heavy seasonal rainfall."
    },
    {
      id: "ISS-03",
      title: "Water Leakage",
      count: 21,
      color: "bg-[#FF7A00]",
      urgency: "High Priority",
      department: "Municipal Water Utility",
      location: "Green Valley Sector 7",
      description: "Sub-surface main line pressure anomaly resulting in localized water pressure drop and seepage."
    },
    {
      id: "ISS-04",
      title: "Drainage",
      count: 18,
      color: "bg-[#FFC107]",
      urgency: "Moderate Priority",
      department: "Stormwater & Drainage Control",
      location: "Eastside Lowland Basin",
      description: "Clogged stormwater grates and runoff blockage during high surge tides."
    }
  ];

  // Chart data per timeframe
  const chartDataMap = {
    today: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
      values: [12, 18, 85, 142, 190, 110, 45],
      total: "602 Requests Today",
    },
    "7days": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [140, 210, 310, 260, 180, 95, 89],
      total: "1,284 Requests (7 Days)",
    },
    "30days": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [1120, 1480, 1890, 1340],
      total: "5,830 Requests (30 Days)",
    },
    "3months": {
      labels: ["June", "July", "August"],
      values: [4200, 5600, 6890],
      total: "16,690 Requests (3 Months)",
    },
  };

  const currentChart = chartDataMap[timeframe] || chartDataMap["7days"];

  const renderChartPath = (values) => {
    const maxVal = Math.max(...values, 1);
    const minVal = 0;
    const width = 600;
    const height = 140;
    const padding = 20;

    const points = values.map((val, idx) => {
      const x = padding + (idx / (values.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((val - minVal) / (maxVal - minVal)) * (height - 2 * padding);
      return { x, y, val };
    });

    const d = points.reduce((acc, pt, idx, arr) => {
      if (idx === 0) return `M ${pt.x} ${pt.y}`;
      const prev = arr[idx - 1];
      const cx = (prev.x + pt.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
    }, "");

    const areaD = `${d} L ${points[points.length - 1].x} ${height - 10} L ${points[0].x} ${height - 10} Z`;

    return { points, lineD: d, areaD };
  };

  const chartGeometry = renderChartPath(currentChart.values);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-px w-6 bg-[#2D7FF9]" />
            <span className="text-[11px] font-extrabold tracking-[0.18em] text-[#1E4FA3] uppercase">
              ADMIN HOME SCREEN
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#0D1B2A]">
            Top Statistics & Request Overview
          </h1>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#00A68E]/10 px-3.5 py-1 text-xs font-extrabold text-[#00A68E] border border-[#00A68E]/20">
            <span className="h-2 w-2 rounded-full bg-[#00A68E] animate-pulse" />
            Live Backend Values
          </span>
        </div>
      </div>

      {/* Top Statistics Cards */}
      <div>
        <h2 className="mb-3 text-xs font-extrabold tracking-[0.16em] uppercase text-[#1E4FA3]">
          Top Statistics
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#D6E6F7] bg-white p-5 shadow-sm">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#4B5563]">TOTAL REQUESTS</span>
            <p className="mt-3 text-3xl font-black text-[#0D1B2A]">1,284</p>
          </div>

          <div className="rounded-2xl border border-[#D6E6F7] bg-white p-5 shadow-sm">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#4B5563]">PENDING</span>
            <p className="mt-3 text-3xl font-black text-[#0D1B2A]">214</p>
          </div>

          <div className="rounded-2xl border border-[#D6E6F7] bg-white p-5 shadow-sm">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#4B5563]">RESOLVED</span>
            <p className="mt-3 text-3xl font-black text-[#0D1B2A]">927</p>
          </div>

          <div className="rounded-2xl border border-[#D6E6F7] bg-white p-5 shadow-sm">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#4B5563]">ACTIVE CLUSTERS</span>
            <p className="mt-3 text-3xl font-black text-[#0D1B2A]">43</p>
          </div>
        </div>
      </div>

      {/* 3.1 Request Overview Trend Graph */}
      <div className="rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-[#0D1B2A]">Request Overview</h2>
            </div>
            <p className="text-xs text-[#4B5563]">Show a visual trend:</p>
          </div>

          <div className="flex flex-wrap items-center gap-1 rounded-xl bg-[#FAFAFC] border border-[#D6E6F7] p-1 text-xs font-extrabold">
            <button
              onClick={() => setTimeframe("today")}
              className={`rounded-lg px-3 py-2 transition-all ${
                timeframe === "today" ? "bg-[#0D1B2A] text-white" : "text-[#4B5563] hover:text-[#0D1B2A]"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeframe("7days")}
              className={`rounded-lg px-3 py-2 transition-all ${
                timeframe === "7days" ? "bg-[#0D1B2A] text-white" : "text-[#4B5563] hover:text-[#0D1B2A]"
              }`}
            >
              7 days
            </button>
            <button
              onClick={() => setTimeframe("30days")}
              className={`rounded-lg px-3 py-2 transition-all ${
                timeframe === "30days" ? "bg-[#0D1B2A] text-white" : "text-[#4B5563] hover:text-[#0D1B2A]"
              }`}
            >
              30 days
            </button>
            <button
              onClick={() => setTimeframe("3months")}
              className={`rounded-lg px-3 py-2 transition-all ${
                timeframe === "3months" ? "bg-[#0D1B2A] text-white" : "text-[#4B5563] hover:text-[#0D1B2A]"
              }`}
            >
              3 months
            </button>
          </div>
        </div>

        <div className="mt-6">
          <span className="mb-3 block text-xs font-black uppercase tracking-[0.16em] text-[#1E4FA3]">
            REQUEST ACTIVITY
          </span>

          <div className="relative rounded-2xl border border-[#D6E6F7] bg-[#0D1B2A] p-6 text-white">
            <svg viewBox="0 0 600 140" className="w-full h-36 overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2D7FF9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#2D7FF9" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d={chartGeometry.areaD} fill="url(#chartGradient)" />
              <path d={chartGeometry.lineD} fill="none" stroke="#2D7FF9" strokeWidth="3" />
              {chartGeometry.points.map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#FFFFFF" stroke="#2D7FF9" strokeWidth="2" />
              ))}
            </svg>

            <div className="mt-2 flex justify-between border-t border-white/10 pt-3 text-xs font-bold text-white/70">
              {currentChart.labels.map((lbl, idx) => (
                <span key={idx}>{lbl}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PRIORITY ISSUES CARD */}
      <div className="rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm">
        <div className="border-b border-[#D6E6F7] pb-4">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#1E4FA3]">
            ISSUES REQUIRING ATTENTION
          </span>
          <h3 className="mt-1 text-lg font-black text-[#0D1B2A]">
            PRIORITY ISSUES
          </h3>
        </div>

        <div className="mt-5 space-y-3">
          {priorityIssues.map((issue) => (
            <button
              key={issue.id}
              onClick={() => setSelectedPriorityIssue(issue)}
              className="flex w-full items-center justify-between rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] p-4 text-left transition-all hover:bg-slate-100 hover:border-[#2D7FF9]"
            >
              <div className="flex items-center gap-3">
                <span className={`h-3.5 w-3.5 rounded-full ${issue.color} shadow-sm shrink-0`} />
                <span className="font-extrabold text-[#0D1B2A] text-sm">{issue.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-base font-black text-[#0D1B2A]">{issue.count}</span>
                <span className="text-xs font-bold text-[#2D7FF9]">Details →</span>
              </div>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs font-medium text-slate-400">Clicking an issue opens its details.</p>
      </div>

      {/* PRIORITY ISSUE DETAILS MODAL */}
      {selectedPriorityIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D6E6F7] pb-4">
              <div className="flex items-center gap-3">
                <span className={`h-4 w-4 rounded-full ${selectedPriorityIssue.color}`} />
                <h3 className="text-xl font-black text-[#0D1B2A]">{selectedPriorityIssue.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPriorityIssue(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="my-5 space-y-4 text-sm text-[#0D1B2A]">
              <div className="flex items-center justify-between rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="text-xs font-extrabold text-slate-500 uppercase">Reported Count</span>
                <span className="font-mono text-xl font-black text-[#FF5252]">{selectedPriorityIssue.count} Active Reports</span>
              </div>

              <div>
                <span className="text-xs font-extrabold text-slate-400 uppercase">Assigned Department</span>
                <p className="font-bold text-[#0D1B2A]">{selectedPriorityIssue.department}</p>
              </div>

              <div>
                <span className="text-xs font-extrabold text-slate-400 uppercase">Primary Location</span>
                <p className="font-bold text-[#0D1B2A]">{selectedPriorityIssue.location}</p>
              </div>

              <div>
                <span className="text-xs font-extrabold text-slate-400 uppercase">Description</span>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed bg-[#FAFAFC] p-3 rounded-lg border border-[#D6E6F7]">
                  {selectedPriorityIssue.description}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#D6E6F7] pt-4">
              <button
                onClick={() => setSelectedPriorityIssue(null)}
                className="rounded-lg border border-[#D6E6F7] px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Dispatch command issued for ${selectedPriorityIssue.title}`);
                  setSelectedPriorityIssue(null);
                }}
                className="rounded-lg bg-[#2D7FF9] px-4 py-2 text-xs font-extrabold text-white shadow-md hover:bg-[#1E4FA3]"
              >
                Dispatch Response Crew
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
