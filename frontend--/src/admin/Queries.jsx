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

  // Dynamic Backend State (Populated strictly by database)
  const [commonQueries, setCommonQueries] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [aiInsight, setAiInsight] = useState({
    summaryText: "Syncing citizen inquiry data from Supabase complaints table...",
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
        const queriesRes = await getUniqueQueries();
        if (isMounted && queriesRes?.data) {
          setCommonQueries(queriesRes.data || []);
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
      (item.citizen && item.citizen.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "resolved" || activeTab === "verified") return matchesSearch && (item.aiStatus === "Resolved" || item.aiStatus === "Verified");
    if (activeTab === "pending") return matchesSearch && (item.aiStatus === "Pending Review" || item.aiStatus === "Pending");
    if (activeTab === "flagged") return matchesSearch && item.aiStatus === "Flagged";
    return matchesSearch;
  });

  // Compute category distribution dynamically from live backend inquiries
  const categoryCounts = {};
  inquiries.forEach((item) => {
    const dept = item.department || "General Administration";
    categoryCounts[dept] = (categoryCounts[dept] || 0) + 1;
  });

  const totalInquiriesCount = inquiries.length || 1;
  const barColors = [
    "bg-[#2D7FF9]",
    "bg-[#00A68E]",
    "bg-[#FFC107]",
    "bg-[#FF5252]",
    "bg-[#8E24AA]",
    "bg-[#00ACC1]",
  ];

  const categoryDistribution = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count], idx) => ({
      name,
      count,
      percentage: Math.round((count / totalInquiriesCount) * 100),
      barColor: barColors[idx % barColors.length],
    }));

  return (
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* 1. TOP HEADER BANNER MATCHING DASHBOARD DESIGN */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />
        
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              <span className="h-[3px] w-6 bg-[#2D7FF9] rounded-full inline-block" />
              CIVIC INTELLIGENCE
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight flex items-center gap-3">
              Citizen <span className="text-[#2D7FF9]">Queries</span>
              {loading && <span className="text-xs font-semibold text-slate-400 animate-pulse">(Live Sync...)</span>}
            </h1>
            <p className="mt-2 text-lg font-semibold text-[#59687A]">
              Real-time audit of citizen inquiries and vector-clustered topic trends.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-3.5 text-base font-semibold">
              <span className="text-[#657386] block text-xs font-black uppercase tracking-wider">Total Inquiries</span>
              <span className="text-[#0D1B2A] font-black text-xl">{inquiries.length} Logged</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. QUERY CATEGORIES DISTRIBUTION BAR */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 w-14 h-1.5 bg-[#2D7FF9] rounded-b" />

        <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-5">
          QUERY CATEGORIES DISTRIBUTION
        </span>

        <div className="space-y-5">
          {categoryDistribution.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-5 text-base font-semibold">
              <span className="w-44 text-[#0D1B2A] font-black shrink-0 text-base">{cat.name}</span>
              <div className="flex-1 bg-slate-100 rounded-xl h-7 overflow-hidden border border-slate-200/60 p-0.5">
                <div
                  style={{ width: `${cat.percentage * 2}%` }}
                  className={`h-full rounded-lg ${cat.barColor} transition-all duration-500`}
                />
              </div>
              <span className="w-16 text-right font-black text-[#0D1B2A] text-lg">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MOST COMMON CITIZEN QUERIES */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-slate-400 uppercase mb-1">
              <span className="h-[3px] w-6 bg-slate-300 rounded-full inline-block" />
              TOPIC CLUSTERS
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
          {commonQueries.map((query) => (
            <div
              key={query.id}
              onClick={() => setSelectedCommonQuery(query)}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-[#2D7FF9] hover:shadow-md cursor-pointer overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-14 h-1.5 ${query.topAccent || "bg-[#2D7FF9]"} rounded-b`} />

              <div>
                <div className="flex items-center justify-between mb-3 pt-1">
                  <span className={`rounded-lg border px-3 py-1 text-xs font-black uppercase ${query.badgeStyle || "bg-blue-50 text-[#2D7FF9] border-blue-200"}`}>
                    {query.category || "General"}
                  </span>
                  <span className="text-sm font-black text-slate-600">
                    {query.requestCount} Requests
                  </span>
                </div>
                <h4 className="text-lg font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors leading-snug">
                  {query.question}
                </h4>
              </div>
            </div>
          ))}
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
              onClick={() => setActiveTab("resolved")}
              className={`rounded-lg px-4 py-2 transition ${
                activeTab === "resolved" || activeTab === "verified" ? "bg-[#00A68E] text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Resolved ({aiInsight.verifiedCount ?? 0})
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

        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs space-y-5">
          {/* Search */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search by topic, citizen name, department, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4.5 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-[#2D7FF9] focus:bg-white transition"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/70">
            {filteredInquiries.length === 0 ? (
              <div className="py-12 text-center text-xs font-semibold text-slate-400">
                No inquiries match your current filter or search criteria.
              </div>
            ) : (
              <table className="w-full text-left text-base">
                <thead className="bg-slate-50/80 text-[13px] font-black text-slate-500 uppercase border-b border-slate-200">
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
                      <td className="px-5 py-4.5 font-black text-[#2D7FF9] text-[15px]">
                        {item.id}
                      </td>
                      <td className="px-5 py-4.5">
                        <span className="font-black text-[#0D1B2A] block text-[17px] leading-snug">{item.topic}</span>
                        <span className="text-slate-400 text-[13px] font-bold">{item.citizen || "Citizen"} • {item.date || "14 Aug 2026"}</span>
                      </td>
                      <td className="px-5 py-4.5 text-slate-700 font-extrabold text-[15px]">
                        {item.department}
                      </td>
                      <td className="px-5 py-4.5">
                        <span className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-black ${
                          item.aiStatus === "Resolved" || item.aiStatus === "Verified"
                            ? "bg-teal-50 text-[#008D78] border border-teal-200"
                            : item.aiStatus === "Pending Review" || item.aiStatus === "Pending"
                            ? "bg-amber-50 text-[#B48000] border border-amber-200"
                            : "bg-rose-50 text-rose-800 border border-rose-200"
                        }`}>
                          <span className={`h-2 w-2 rounded-full ${
                            item.aiStatus === "Resolved" || item.aiStatus === "Verified" ? "bg-[#008D78]" : item.aiStatus === "Pending Review" || item.aiStatus === "Pending" ? "bg-[#FFC107]" : "bg-rose-600"
                          }`} />
                          {item.aiStatus === "Verified" ? "Resolved" : item.aiStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4.5 text-right">
                        <button
                          onClick={() => setSelectedInquiry(item)}
                          className="rounded-xl border border-slate-200 px-4.5 py-2 text-[13px] font-black text-[#0D1B2A] hover:bg-[#2D7FF9] hover:text-white hover:border-[#2D7FF9] transition shadow-2xs"
                        >
                          Inspect →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* COMMON CITIZEN QUERY DETAILS MODAL */}
      {selectedCommonQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Query Topic Breakdown</span>
                <h3 className="text-2xl font-black text-[#0D1B2A] mt-0.5">{selectedCommonQuery.question}</h3>
              </div>
              <button
                onClick={() => setSelectedCommonQuery(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-800 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#0D1B2A]">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <span className="font-bold text-slate-500">Category & Volume</span>
                <span className="font-extrabold text-[#2D7FF9]">{selectedCommonQuery.category} • {selectedCommonQuery.requestCount} requests</span>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <span className="text-xs font-black text-slate-400 uppercase block mb-1.5">Responsible Departments</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCommonQuery.departments?.map((d, i) => (
                    <span key={i} className="rounded-lg bg-[#2D7FF9]/10 border border-[#2D7FF9]/20 px-2.5 py-1 text-xs font-bold text-[#2D7FF9]">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <span className="text-xs font-black text-slate-400 uppercase block mb-1.5">Clustered Citizen Inquiry Examples</span>
                <ul className="space-y-1.5 font-semibold text-slate-700">
                  {selectedCommonQuery.relatedRequests?.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#2D7FF9]">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedCommonQuery(null)}
                className="rounded-xl border border-slate-200 px-5 py-2 text-xs font-black text-slate-600 hover:bg-slate-50"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INDIVIDUAL INQUIRY INSPECTION MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black text-[#2D7FF9] uppercase tracking-wider">{selectedInquiry.id}</span>
                <h3 className="text-xl font-black text-[#0D1B2A] mt-0.5">{selectedInquiry.topic}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-800 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-sm text-[#0D1B2A]">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-0.5">Submitted By</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedInquiry.citizen || "Anonymous Resident"}</span>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-0.5">Assigned Department</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedInquiry.department}</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <span className="text-xs font-black text-slate-400 uppercase block mb-1">AI Audit & Verification Log</span>
                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                  {selectedInquiry.summary || "Inquiry cross-referenced against active project records."}
                </p>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-teal-50 p-3.5 border border-teal-200 text-xs font-black text-[#008D78]">
                <span>Status: {selectedInquiry.aiStatus === "Verified" ? "Resolved" : selectedInquiry.aiStatus}</span>
                <span>Pincode: {selectedInquiry.pincode || "400012"}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-50"
              >
                Close Audit Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}