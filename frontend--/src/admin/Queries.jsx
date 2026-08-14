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

  // Dynamic Backend State (Populated by Backend API or rich defaults)
  const [commonQueries, setCommonQueries] = useState([
    {
      id: "Q-101",
      question: "When will Sector 12 road resurfacing be completed?",
      category: "Road Infrastructure",
      requestCount: 78,
      maxCount: 100,
      topAccent: "bg-[#2D7FF9]",
      badgeStyle: "bg-blue-50 text-[#2D7FF9] border-blue-200",
      barColor: "bg-[#2D7FF9]",
      departments: ["Engineering & Road Ops"],
      locations: ["Sector 12", "Shanti Nagar"],
      projects: ["PRJ-01 (Sector 12 Resurfacing)"],
      relatedRequests: [
        "Status update for Sector 12 tarring",
        "Expected completion date for road construction near Ward 4",
        "Contractor delay reports for Sector 12 roadwork"
      ]
    },
    {
      id: "Q-102",
      question: "Frequent water pressure drop issues during peak hours",
      category: "Water Supply",
      requestCount: 64,
      maxCount: 100,
      topAccent: "bg-[#00A68E]",
      badgeStyle: "bg-teal-50 text-[#00A68E] border-teal-200",
      barColor: "bg-[#00A68E]",
      departments: ["Water Supply & Hydro Ops"],
      locations: ["Ward 3", "Green Park Ward 9"],
      projects: ["PRJ-03 (High-Pressure Pipeline Installation)"],
      relatedRequests: [
        "Low water volume in morning supply",
        "Pipeline maintenance timeline in Green Park",
        "Water booster pump replacement schedule"
      ]
    },
    {
      id: "Q-103",
      question: "Broken streetlights along Western Bypass highway corridor",
      category: "Electrical Works",
      requestCount: 42,
      maxCount: 100,
      topAccent: "bg-[#FFC107]",
      badgeStyle: "bg-amber-50 text-amber-800 border-amber-200",
      barColor: "bg-[#FFC107]",
      departments: ["Electrical Maintenance"],
      locations: ["Western Highway Bypass", "Outer Ring Ward 14"],
      projects: ["PRJ-02 (Smart LED Streetlight Grid)"],
      relatedRequests: [
        "Dark stretches on Western Bypass at night",
        "Repair request for poles #45 through #52",
        "Solar light battery replacement timeline"
      ]
    },
    {
      id: "Q-104",
      question: "Timetable for municipal garbage segregation rollout",
      category: "Sanitation",
      requestCount: 36,
      maxCount: 100,
      topAccent: "bg-[#6366F1]",
      badgeStyle: "bg-indigo-50 text-indigo-700 border-indigo-200",
      barColor: "bg-[#6366F1]",
      departments: ["Solid Waste Management"],
      locations: ["Central Ward", "Sector 8"],
      projects: ["PRJ-05 (Zero-Waste Segregation Drive)"],
      relatedRequests: [
        "Wet waste vs dry waste pickup schedule",
        "Compost bin distribution program",
        "Sanitation vehicle arrival notifications"
      ]
    }
  ]);

  const [inquiries, setInquiries] = useState([
    {
      id: "INQ-9481",
      topic: "Road resurfacing progress query for Sector 12 area",
      citizen: "Rajesh Sharma",
      date: "14 Aug 2026",
      department: "Engineering & Road Ops",
      aiStatus: "Resolved",
      confidence: "98%",
      pincode: "400012",
      summary: "Inquiry cross-referenced against PRJ-01 active work order. AI verified contractor status is on schedule."
    },
    {
      id: "INQ-9482",
      topic: "Water supply disruption report for Green Park colony",
      citizen: "Priya Nair",
      date: "14 Aug 2026",
      department: "Water Supply",
      aiStatus: "Resolved",
      confidence: "95%",
      pincode: "400009",
      summary: "Matched with pipeline maintenance ticket #WM-204. Supply restoration estimated within 4 hours."
    },
    {
      id: "INQ-9483",
      topic: "Request for street light replacement near Sector 8 main gate",
      citizen: "Amitabh Sen",
      date: "13 Aug 2026",
      department: "Electrical Works",
      aiStatus: "Pending Review",
      confidence: "74%",
      pincode: "400008",
      summary: "Pending verification against streetlight inventory DB. Dispatched to ward inspector."
    },
    {
      id: "INQ-9484",
      topic: "Duplicate complaint regarding drainage overflow in Ward 4",
      citizen: "Sunita Verma",
      date: "13 Aug 2026",
      department: "Public Works",
      aiStatus: "Flagged",
      confidence: "89%",
      pincode: "400004",
      summary: "Flagged by AI as duplicate submission of INQ-9460. Merged into active ticket."
    }
  ]);

  const [aiInsight, setAiInsight] = useState({
    summaryText: "A high proportion (68%) of recent citizen inquiries relate to road infrastructure and water supply work schedules.",
    totalRelatedQueries: 220,
    projectRelationPercent: 68,
    mostAffectedLocations: ["Sector 12", "Green Park Ward 9", "Western Bypass"],
    primaryDepartments: ["Engineering & Road Ops", "Water Supply"],
    verifiedCount: 154,
    pendingCount: 42,
    flaggedCount: 24,
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
        if (isMounted && inquiriesRes?.data && inquiriesRes.data.inquiries?.length > 0) {
          setInquiries(inquiriesRes.data.inquiries);
          if (inquiriesRes.data.aiInsight) {
            setAiInsight(inquiriesRes.data.aiInsight);
          }
        }
      } catch (err) {
        console.error("Error fetching inquiries from backend:", err);
      }

      try {
        const queriesRes = await getUniqueQueries();
        if (isMounted && queriesRes?.data && queriesRes.data.length > 0) {
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
      (item.citizen && item.citizen.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "resolved" || activeTab === "verified") return matchesSearch && (item.aiStatus === "Resolved" || item.aiStatus === "Verified");
    if (activeTab === "pending") return matchesSearch && (item.aiStatus === "Pending Review" || item.aiStatus === "Pending");
    if (activeTab === "flagged") return matchesSearch && item.aiStatus === "Flagged";
    return matchesSearch;
  });

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
              <span className="text-[#0D1B2A] font-black font-mono text-xl">{inquiries.length} Logged</span>
            </div>
          </div>
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
          {commonQueries.map((query) => {
            const percentage = Math.round(((query.requestCount || 50) / (query.maxCount || 100)) * 100);
            return (
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
                    <span className="font-mono text-sm font-black text-slate-600">
                      {query.requestCount} Requests
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors leading-snug">
                    {query.question}
                  </h4>
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
                      <td className="px-5 py-4.5 font-mono font-black text-[#2D7FF9] text-[15px]">
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
              <button onClick={() => setSelectedCommonQuery(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">✕</button>
            </div>

            <div className="my-5 max-h-[60vh] overflow-y-auto space-y-4 text-sm text-slate-800">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-black text-[#0D1B2A] block mb-1">Sample Related Requests</span>
                <ul className="list-disc pl-4 space-y-1 font-semibold text-slate-700">
                  {selectedCommonQuery.relatedRequests?.map((req, i) => (
                    <li key={i}>{req}</li>
                  )) || <li>No additional related requests logged.</li>}
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-black text-[#0D1B2A] block mb-1.5">Affected Locations</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCommonQuery.locations?.map((loc, i) => (
                    <span key={i} className="rounded-lg bg-white px-3 py-1 font-extrabold text-slate-700 border border-slate-200 text-xs">{loc}</span>
                  )) || <span className="text-xs text-slate-400">All Wards</span>}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-black text-[#0D1B2A] block mb-1">Handling Departments</span>
                <p className="font-extrabold text-slate-700">{selectedCommonQuery.departments?.join(", ") || "General Administrative Desk"}</p>
              </div>

              {selectedCommonQuery.projects && selectedCommonQuery.projects.length > 0 && (
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="font-black text-[#0D1B2A] block mb-1">Associated Projects</span>
                  <p className="font-extrabold text-[#2D7FF9]">{selectedCommonQuery.projects.join(", ")}</p>
                </div>
              )}
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
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-black text-[#2D7FF9]">{selectedInquiry.id}</span>
                <h3 className="text-2xl font-black text-[#0D1B2A] mt-0.5">{selectedInquiry.topic}</h3>
                {selectedInquiry.pincode && (
                  <span className="text-xs font-bold text-slate-400">Citizen Pincode: {selectedInquiry.pincode}</span>
                )}
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">✕</button>
            </div>

            <div className="space-y-4 text-sm text-[#0D1B2A]">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="font-black text-slate-500 block mb-1">Summary / AI Audit Trail</span>
                <p className="text-slate-800 font-semibold leading-relaxed">{selectedInquiry.summary || selectedInquiry.topic}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Department</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedInquiry.department}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">AI Verification Status</span>
                  <span className="font-extrabold text-[#00A68E]">{selectedInquiry.aiStatus === "Verified" ? "Resolved" : selectedInquiry.aiStatus}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button onClick={() => setSelectedInquiry(null)} className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-50">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
