import React, { useState, useEffect } from "react";
import { getUniqueQueries, getAdminInquiries } from "../api/admin.api";

export default function Queries() {
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
      item.department.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "verified") return matchesSearch && item.aiStatus === "Verified";
    if (activeTab === "pending") return matchesSearch && item.aiStatus === "Pending Review";
    if (activeTab === "flagged") return matchesSearch && item.aiStatus === "Flagged";
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#0D1B2A] flex items-center gap-3">
            Citizen Queries & Inquiries Logs
            {loading && <span className="text-xs font-semibold text-slate-400 animate-pulse">(Fetching live data...)</span>}
          </h1>
        </div>
      </div>

      {/* AI INSIGHT / ADMINISTRATIVE INTELLIGENCE CARD */}
      <div className="rounded-2xl border border-white/10 bg-[#0D1B2A] p-6 text-white shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00A68E] animate-pulse" />
            <h3 className="text-lg font-black uppercase tracking-[0.16em] text-[#8DBBFF]">
              AI Insight
            </h3>
          </div>
          <span className="rounded bg-[#2D7FF9]/20 px-2.5 py-1 text-[15px] font-extrabold tracking-[0.14em] text-[#8DBBFF] uppercase">
            Administrative Intelligence
          </span>
        </div>

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
        </p>
      </div>

      {/* Inquiries Table */}
      <div className="rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-5">
          <div>
            <h2 className="text-lg font-black text-[#0D1B2A]">Recent Public Inquiries & AI Evidence Logs</h2>
            <p className="text-xs text-[#4B5563]">Monitor citizen requests and automated explainability outputs</p>
          </div>

          <div className="flex rounded-lg bg-[#FAFAFC] border border-[#D6E6F7] p-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-md px-3 py-1.5 ${activeTab === "all" ? "bg-[#0D1B2A] text-white" : "text-[#4B5563]"}`}
            >
              All ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("verified")}
              className={`rounded-md px-3 py-1.5 ${activeTab === "verified" ? "bg-[#00A68E] text-white" : "text-[#4B5563]"}`}
            >
              Verified ({aiInsight.verifiedCount ?? 0})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`rounded-md px-3 py-1.5 ${activeTab === "pending" ? "bg-[#D97706] text-white" : "text-[#4B5563]"}`}
            >
              Pending ({aiInsight.pendingCount ?? 0})
            </button>
            <button
              onClick={() => setActiveTab("flagged")}
              className={`rounded-md px-3 py-1.5 ${activeTab === "flagged" ? "bg-[#FF5252] text-white" : "text-[#4B5563]"}`}
            >
              Flagged ({aiInsight.flaggedCount ?? 0})
            </button>
          </div>
        </div>

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
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* COMMON CITIZEN QUERY DETAILS MODAL */}
      {selectedCommonQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#D6E6F7] pb-4">
              <div>
                <span className="text-xs font-extrabold text-[#2D7FF9] uppercase">Query Breakdown</span>
                <h3 className="text-lg font-black text-[#0D1B2A]">{selectedCommonQuery.question}</h3>
                <p className="text-xs font-bold text-emerald-600">{selectedCommonQuery.requestCount} Repeated Citizen Requests</p>
              </div>
              <button
                onClick={() => setSelectedCommonQuery(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="my-5 max-h-[60vh] overflow-y-auto space-y-4 text-xs text-[#0D1B2A] pr-1">
              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Related Requests</span>
                <ul className="list-disc pl-4 space-y-1 font-semibold text-slate-700">
                  {selectedCommonQuery.relatedRequests?.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Affected Locations</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCommonQuery.locations?.map((loc, i) => (
                    <span key={i} className="rounded bg-slate-200 px-2 py-0.5 font-bold text-[#0D1B2A]">{loc}</span>
                  ))}
                </div>
              </div>

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
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#D6E6F7] pt-4">
              <button
                onClick={() => setSelectedCommonQuery(null)}
                className="rounded-lg border border-[#D6E6F7] px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Trail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#D6E6F7] pb-4">
              <div>
                <span className="font-mono text-xs font-extrabold text-[#2D7FF9]">{selectedInquiry.id}</span>
                <h3 className="text-xl font-black text-[#0D1B2A]">Inquiry Audit Trail</h3>
                <span className="text-xs font-semibold text-slate-500">Citizen Pincode: {selectedInquiry.pincode}</span>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="rounded-full p-1 text-slate-400">✕</button>
            </div>

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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
