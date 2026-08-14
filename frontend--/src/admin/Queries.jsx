import React, { useState, useEffect } from "react";
import { getUniqueQueries, getAdminInquiries } from "../api/admin.api";

export default function Queries({ onNavigate }) {
  // Most Common Queries Modal State
  const [selectedCommonQuery, setSelectedCommonQuery] = useState(null);

  // Inquiries Table Filter & Search State
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dynamic Backend State (Zero / empty by default - populated strictly by Backend API)
  const [commonQueries, setCommonQueries] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [aiInsight, setAiInsight] = useState({
    summaryText: "Loading administrative intelligence from backend...",
    totalRelatedQueries: 0,
    projectRelationPercent: 0,
    mostAffectedLocations: [],
    primaryDepartments: [],
    verifiedCount: 0,
    pendingCount: 0,
    flaggedCount: 0,
  });

  // -------------------------------------------------------------------
  // FETCH BACKEND DATA ON MOUNT
  // -------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    async function loadQueriesData() {
      setLoading(true);
      try {
        // 1. Fetch Inquiries Logs & AI Insight Analytics
        const inquiriesRes = await getAdminInquiries();
        if (isMounted && inquiriesRes?.data) {
          setInquiries(inquiriesRes.data.inquiries || []);
          if (inquiriesRes.data.aiInsight) {
            setAiInsight(inquiriesRes.data.aiInsight);
          }
        }
      } catch (err) {
        console.error("Error fetching inquiries from backend:", err);
      }

      try {
        // 2. Fetch Common Clustered Queries
        const queriesRes = await getUniqueQueries();
        if (isMounted && queriesRes?.data) {
          setCommonQueries(queriesRes.data);
        }
      } catch (err) {
        console.error("Error fetching unique queries from backend:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadQueriesData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter inquiries table dynamically
  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.citizen.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "verified") return matchesSearch && item.aiStatus === "Verified";
    if (activeTab === "pending") return matchesSearch && item.aiStatus === "Pending Review";
    if (activeTab === "flagged") return matchesSearch && item.aiStatus === "Flagged";
    return matchesSearch;
  });

  return (
<<<<<<< HEAD
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#0D1B2A] flex items-center gap-3">
            Citizen Queries & Inquiries Logs
            {loading && <span className="text-xs font-semibold text-slate-400 animate-pulse">(Fetching live data...)</span>}
          </h1>
=======
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* 1. TOP HEADER BANNER MATCHING CITIZEN PORTAL WELCOME SECTION */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        {/* Top Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />
        
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              <span className="h-[3px] w-6 bg-[#2D7FF9] rounded-full inline-block" />
              YOUR CIVIC SPACE
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight">
              Citizen <span className="text-[#2D7FF9]">Queries</span>
            </h1>
            <p className="mt-2 text-lg font-semibold text-[#59687A]">
              What are citizens asking Civic Mirror in your area?
            </p>

            {/* Accent Line Dashes */}
            <div className="flex items-center gap-2 mt-4">
              <span className="h-1.5 w-7 rounded-full bg-[#2D7FF9]" />
              <span className="h-1.5 w-7 rounded-full bg-[#00A68E]" />
              <span className="h-1.5 w-7 rounded-full bg-[#FFC107]" />
              <span className="h-1.5 w-7 rounded-full bg-[#FF5252]" />
            </div>
          </div>

          {/* Metric Box */}
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-3.5 text-base font-semibold">
              <span className="text-[#657386] block text-xs font-black uppercase tracking-wider">Total Inquiries</span>
              <span className="text-[#0D1B2A] font-black font-mono text-xl">220 Logged</span>
            </div>
          </div>
>>>>>>> 995d6d0469b500f838d4adad657b81fc0ef7e544
        </div>
      </div>

      {/* 2. QUERY DISTRIBUTION */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-slate-400 uppercase mb-1">
              <span className="h-[3px] w-6 bg-slate-300 rounded-full inline-block" />
              AGGREGATED BREAKDOWN
            </p>
            <h3 className="text-2xl font-black text-[#0D1B2A] tracking-tight">
              Query Distribution
            </h3>
          </div>
        </div>
<<<<<<< HEAD

        <div className="my-4 border-l-4 border-[#2D7FF9] pl-4 py-1">
          <p className="text-lg font-bold text-white leading-relaxed">
            {aiInsight.summaryText}
          </p>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white/50">
            Supporting Information:
          </span>

          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <span className="block text-2xl font-semibold text-[#2D7FF9]">
                {aiInsight.totalRelatedQueries}
              </span>
              <span className="text-white/70 font-sans text-md">total logged inquiries</span>
            </div>

            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <span className="block text-2xl font-semibold text-[#00A68E]">
                {aiInsight.projectRelationPercent}%
              </span>
              <span className="text-white/70 font-sans text-md">related to active projects</span>
            </div>

            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <span className="block text-md font-black uppercase tracking-wider text-[#FFC107] mb-1 font-sans">
                Most Affected:
              </span>
              <ul className="space-y-0.5 font-sans text-md font-semibold text-white/80">
                {aiInsight.mostAffectedLocations.length > 0 ? (
                  aiInsight.mostAffectedLocations.map((loc, i) => <li key={i}>• {loc}</li>)
                ) : (
                  <li>• None</li>
                )}
              </ul>
            </div>

            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <span className="block text-md font-black uppercase tracking-wider text-[#8DBBFF] mb-1 font-sans">
                Primary Departments:
              </span>
              <ul className="space-y-0.5 font-sans text-md font-semibold text-white/80">
                {aiInsight.primaryDepartments.length > 0 ? (
                  aiInsight.primaryDepartments.map((dept, i) => <li key={i}>• {dept}</li>)
                ) : (
                  <li>• None</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* MOST COMMON CITIZEN QUERIES CARD */}
      <div className="rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm">
        <div className="border-b border-[#D6E6F7] pb-4">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#2D7FF9]">
            MOST COMMON CITIZEN QUERIES
          </span>
          <p className="mt-1 text-sm font-bold text-[#0D1B2A]">
            What are citizens repeatedly asking?
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {loading && commonQueries.length === 0 ? (
            <div className="py-8 text-center text-xs font-semibold text-slate-400 animate-pulse">
              Loading citizen query trends from database...
            </div>
          ) : commonQueries.length === 0 ? (
            <div className="py-8 text-center text-xs font-semibold text-slate-400">
              No repeated citizen queries logged yet.
            </div>
          ) : (
            commonQueries.map((query) => (
              <button
                key={query.id}
                onClick={() => setSelectedCommonQuery(query)}
                className="flex w-full items-center justify-between rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] p-4 text-left transition-all hover:bg-slate-100 hover:border-[#2D7FF9]"
              >
                <div>
                  <p className="font-extrabold text-[#0D1B2A] text-sm">{query.question}</p>
                  <p className="text-xs font-semibold text-[#2D7FF9]">{query.requestCount} requests</p>
                </div>
                <span className="text-xs font-bold text-slate-400 hover:text-[#0D1B2A]">Inspect →</span>
              </button>
            ))
          )}
        </div>
        <p className="mt-4 text-xs font-medium text-slate-400">
          Click any query to inspect related requests, locations, departments, associated projects, and similar clustered queries.
=======
        <p className="text-base text-slate-500 font-medium italic">
          If the backend returns enough aggregated information:
>>>>>>> 995d6d0469b500f838d4adad657b81fc0ef7e544
        </p>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 w-14 h-1.5 bg-[#2D7FF9] rounded-b" />

          <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-5 font-mono">
            QUERY CATEGORIES
          </span>

          <div className="space-y-5">
            {categoryDistribution.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-5 text-base font-semibold">
                <span className="w-36 text-[#0D1B2A] font-black shrink-0 text-base">{cat.name}</span>
                <div className="flex-1 bg-slate-100 rounded-xl h-7 overflow-hidden border border-slate-200/60 p-0.5">
                  <div
                    style={{ width: `${cat.percentage * 2}%` }}
                    className={`h-full rounded-lg ${cat.barColor} transition-all duration-500`}
                  />
                </div>
                <span className="w-16 text-right font-mono font-black text-[#0D1B2A] text-lg">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MOST COMMON CITIZEN QUERIES */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-slate-400 uppercase mb-1">
              <span className="h-[3px] w-6 bg-slate-300 rounded-full inline-block" />
              REQUEST HISTORY
            </p>
            <h3 className="text-2xl font-black text-[#0D1B2A] tracking-tight">
              Most Common Citizen Queries
            </h3>
          </div>
          <span className="rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-black text-slate-700">
            {commonQueries.length} Clustered Topics
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {commonQueries.map((query) => {
            const percentage = Math.round((query.requestCount / query.maxCount) * 100);
            return (
              <div
                key={query.id}
                onClick={() => setSelectedCommonQuery(query)}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-[#2D7FF9] hover:shadow-md cursor-pointer overflow-hidden"
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 w-14 h-1.5 ${query.topAccent} rounded-b`} />

                <div>
                  <div className="flex items-center justify-between mb-3 pt-1">
                    <span className={`rounded-lg border px-3 py-1 text-xs font-black uppercase ${query.badgeStyle}`}>
                      {query.category}
                    </span>
                    <span className="font-mono text-sm font-black text-slate-600">
                      {query.requestCount} Requests
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors leading-snug">
                    {query.question}
                  </h4>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm text-slate-500 font-extrabold mb-2">
                    <span>Frequency</span>
                    <span className="font-mono font-black text-[#0D1B2A] text-base">{percentage}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/60 p-0.5">
                    <div
                      style={{ width: `${percentage}%` }}
                      className={`h-full rounded-full ${query.barColor}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. RECENT PUBLIC INQUIRIES LOGS TABLE */}
      <div className="space-y-3.5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-slate-400 uppercase mb-1">
              <span className="h-[3px] w-6 bg-slate-300 rounded-full inline-block" />
              AUDIT LOGS
            </p>
            <h3 className="text-2xl font-black text-[#0D1B2A]">
              Recent Public Inquiries Logs
            </h3>
          </div>

          {/* Filter Tabs */}
          <div className="flex rounded-xl border border-slate-200/80 bg-white p-1 text-sm font-black shadow-xs">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-lg px-4 py-2 transition ${
                activeTab === "all" ? "bg-[#0D1B2A] text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("verified")}
              className={`rounded-lg px-4 py-2 transition ${
                activeTab === "verified" ? "bg-[#00A68E] text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Verified ({aiInsight.verifiedCount ?? 0})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`rounded-lg px-4 py-2 transition ${
                activeTab === "pending" ? "bg-[#FFC107] text-[#0D1B2A]" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Pending ({aiInsight.pendingCount ?? 0})
            </button>
            <button
              onClick={() => setActiveTab("flagged")}
              className={`rounded-lg px-4 py-2 transition ${
                activeTab === "flagged" ? "bg-[#FF5252] text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Flagged ({aiInsight.flaggedCount ?? 0})
            </button>
          </div>
        </div>

<<<<<<< HEAD
        <div className="my-5">
          <input
            type="text"
            placeholder="Search by topic, ID, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full max-w-md rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] px-4 text-sm text-[#0D1B2A] outline-none focus:border-[#2D7FF9]"
          />
        </div>

        <div className="overflow-x-auto">
          {loading && inquiries.length === 0 ? (
            <div className="py-12 text-center text-xs font-semibold text-slate-400 animate-pulse">
              Loading public inquiries from database...
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="py-12 text-center text-xs font-semibold text-slate-400">
              No inquiries match your current filter or search criteria.
            </div>
          ) : (
            <table className="w-full text-left text-sm text-[#0D1B2A]">
              <thead className="bg-[#FAFAFC] text-xs font-black uppercase text-[#4B5563]">
                <tr>
                  <th className="px-4 py-3">Inquiry ID</th>
                  <th className="px-4 py-3">Topic / Citizen</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">AI Verification</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6E6F7]/60">
                {filteredInquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-mono text-xs font-extrabold text-[#2D7FF9]">{item.id}</td>
                    <td className="px-4 py-4 font-bold max-w-md line-clamp-1">{item.topic}</td>
                    <td className="px-4 py-4 text-xs">{item.department}</td>
                    <td className="px-4 py-4 text-xs font-bold">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full ${
                          item.aiStatus === "Verified"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.aiStatus === "Flagged"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.aiStatus} ({item.confidence})
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="rounded-lg border border-[#D6E6F7] px-3 py-1.5 text-xs font-bold text-[#2D7FF9] hover:bg-slate-100"
                      >
                        Inspect
=======
        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs space-y-5">
          {/* Search */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search topic, citizen name, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4.5 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-[#2D7FF9] focus:bg-white transition"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/70">
            <table className="w-full text-left text-base">
              <thead className="bg-slate-50/80 text-xs font-black text-slate-500 uppercase border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4">Inquiry ID</th>
                  <th className="px-5 py-4">Topic & Citizen</th>
                  <th className="px-5 py-4">Department</th>
                  <th className="px-5 py-4">AI Verification</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {filteredInquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-4.5 font-mono font-black text-[#2D7FF9]">
                      {item.id}
                    </td>
                    <td className="px-5 py-4.5">
                      <span className="font-black text-[#0D1B2A] block text-lg">{item.topic}</span>
                      <span className="text-slate-400 text-xs font-bold">{item.citizen} • {item.date}</span>
                    </td>
                    <td className="px-5 py-4.5 text-slate-700 font-extrabold text-base">
                      {item.department}
                    </td>
                    <td className="px-5 py-4.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black ${
                        item.aiStatus === "Verified"
                          ? "bg-teal-50 text-[#008D78] border border-teal-200"
                          : item.aiStatus === "Pending Review"
                          ? "bg-amber-50 text-[#B48000] border border-amber-200"
                          : "bg-rose-50 text-rose-800 border border-rose-200"
                      }`}>
                        <span className={`h-2 w-2 rounded-full ${
                          item.aiStatus === "Verified" ? "bg-[#008D78]" : item.aiStatus === "Pending Review" ? "bg-[#FFC107]" : "bg-rose-600"
                        }`} />
                        {item.aiStatus} ({item.confidence})
                      </span>
                    </td>
                    <td className="px-5 py-4.5 text-right">
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-black text-[#0D1B2A] hover:bg-[#2D7FF9] hover:text-white hover:border-[#2D7FF9] transition shadow-2xs"
                      >
                        Inspect →
>>>>>>> 995d6d0469b500f838d4adad657b81fc0ef7e544
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
<<<<<<< HEAD
          )}
=======
          </div>
>>>>>>> 995d6d0469b500f838d4adad657b81fc0ef7e544
        </div>
      </div>

      {/* 5. AI QUERY INSIGHT CARD (COMMENTED OUT FOR NOW)
      <div className="space-y-2 pt-2">
        <h3 className="text-xl font-extrabold text-[#0D1B2A] tracking-tight">
          AI Query Insight
        </h3>
        <p className="text-sm text-slate-500 font-medium italic">
          At the bottom:
        </p>

        <div className="rounded-xl border border-slate-800 bg-[#0D1B2A] p-6 text-white shadow-md">
          <span className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
            CIVICMIRROR AI
          </span>

          <div className="space-y-2 text-base">
            <p className="font-bold text-white text-lg leading-relaxed">
              A large proportion of citizen questions relate to delays in infrastructure projects.
            </p>
            <p className="text-slate-300 font-medium text-base">
              This suggests that project timelines and status communication may require attention.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigate && onNavigate("ai_insights")}
              className="rounded-lg border border-slate-600 bg-slate-800/80 px-5 py-2.5 text-sm font-mono font-bold text-slate-200 hover:bg-white hover:text-[#0D1B2A] transition"
            >
              [ Analyze Further ]
            </button>
          </div>
        </div>
      </div>
      */}

      {/* COMMON CITIZEN QUERY DETAILS MODAL */}
      {selectedCommonQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="modal-popup-container w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase">Query Breakdown</span>
                <h3 className="text-2xl font-black text-[#0D1B2A] mt-0.5">{selectedCommonQuery.question}</h3>
              </div>
              <button onClick={() => setSelectedCommonQuery(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">✕</button>
            </div>

            <div className="my-5 max-h-[60vh] overflow-y-auto space-y-4 text-base text-slate-800">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-black text-[#0D1B2A] block mb-1">Related Requests</span>
                <ul className="list-disc pl-4 space-y-1 font-semibold text-slate-700">
                  {selectedCommonQuery.relatedRequests?.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

<<<<<<< HEAD
              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Affected Locations</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCommonQuery.locations?.map((loc, i) => (
                    <span key={i} className="rounded bg-slate-200 px-2 py-0.5 font-bold text-[#0D1B2A]">{loc}</span>
=======
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-black text-[#0D1B2A] block mb-1">Affected Locations</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCommonQuery.locations.map((loc, i) => (
                    <span key={i} className="rounded-lg bg-white px-3 py-1 font-extrabold text-slate-700 border border-slate-200 text-sm">{loc}</span>
>>>>>>> 995d6d0469b500f838d4adad657b81fc0ef7e544
                  ))}
                </div>
              </div>

<<<<<<< HEAD
              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Handling Departments</span>
                <p className="font-bold text-slate-700">{selectedCommonQuery.departments?.join(", ")}</p>
              </div>

              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Associated Capital Projects</span>
                <p className="font-bold text-slate-700">{selectedCommonQuery.projects?.join(", ")}</p>
              </div>

              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Similar Clustered Queries</span>
                <ul className="list-disc pl-4 space-y-1 font-medium text-slate-600">
                  {selectedCommonQuery.similarQueries?.map((sim, i) => (
                    <li key={i}>{sim}</li>
                  ))}
                </ul>
=======
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-black text-[#0D1B2A] block mb-1">Handling Departments</span>
                <p className="font-extrabold text-slate-700">{selectedCommonQuery.departments.join(", ")}</p>
>>>>>>> 995d6d0469b500f838d4adad657b81fc0ef7e544
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedCommonQuery(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUDIT TRAIL INSPECTOR MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="modal-popup-container w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
<<<<<<< HEAD
                <span className="font-mono text-xs font-extrabold text-[#2D7FF9]">{selectedInquiry.id}</span>
                <h3 className="text-xl font-black text-[#0D1B2A]">Inquiry Audit Trail</h3>
                <span className="text-xs font-semibold text-slate-500">Citizen Pincode: {selectedInquiry.pincode}</span>
=======
                <span className="font-mono text-xs font-black text-[#2D7FF9]">{selectedInquiry.id}</span>
                <h3 className="text-2xl font-black text-[#0D1B2A] mt-0.5">{selectedInquiry.topic}</h3>
>>>>>>> 995d6d0469b500f838d4adad657b81fc0ef7e544
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">✕</button>
            </div>

<<<<<<< HEAD
            <div className="my-5 space-y-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-extrabold text-[#0D1B2A] block mb-1">Citizen Inquiry Topic / Description:</span>
                <p className="font-medium text-slate-800 leading-relaxed">{selectedInquiry.topic}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-500 block">Department:</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedInquiry.department}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-500 block">AI Verification Status:</span>
                  <span className="font-extrabold text-[#00A68E]">{selectedInquiry.aiStatus} ({selectedInquiry.confidence})</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-extrabold text-[#0D1B2A] block mb-1">AI Explanation & Summary:</span>
                <p className="font-medium text-slate-800 leading-relaxed">{selectedInquiry.summary}</p>
              </div>
            </div>

            <div className="flex justify-end border-t border-[#D6E6F7] pt-4">
              <button onClick={() => setSelectedInquiry(null)} className="rounded-lg border border-[#D6E6F7] px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100">
                Close
              </button>
=======
            <div className="my-5 space-y-4">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-base">
                <span className="font-black text-slate-500 block mb-1">Summary</span>
                <p className="text-slate-800 font-extrabold leading-relaxed">{selectedInquiry.summary}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button onClick={() => setSelectedInquiry(null)} className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-50">Close</button>
>>>>>>> 995d6d0469b500f838d4adad657b81fc0ef7e544
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
