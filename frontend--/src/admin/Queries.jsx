import React, { useState } from "react";

export default function Queries({ onNavigate }) {
  // Most Common Queries Modal State
  const [selectedCommonQuery, setSelectedCommonQuery] = useState(null);

  // Inquiries Table Filter & Search State
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Query Distribution Data with distinct category colors matching citizen portal
  const categoryDistribution = [
    { name: "Infrastructure", percentage: 45, count: 84, barColor: "bg-[#2D7FF9]", accentClass: "border-l-4 border-l-[#2D7FF9]" },
    { name: "Water", percentage: 32, count: 63, barColor: "bg-[#00A68E]", accentClass: "border-l-4 border-l-[#00A68E]" },
    { name: "Roads", percentage: 25, count: 41, barColor: "bg-[#FFC107]", accentClass: "border-l-4 border-l-[#FFC107]" },
    { name: "Streetlights", percentage: 18, count: 32, barColor: "bg-[#6366F1]", accentClass: "border-l-4 border-l-[#6366F1]" },
  ];

  // Most Common Citizen Queries Data
  const commonQueries = [
    {
      id: "CQ-101",
      question: "Why is my road repair delayed?",
      category: "Infrastructure",
      badgeStyle: "bg-blue-50 text-[#2D7FF9] border-blue-200",
      barColor: "bg-[#2D7FF9]",
      topAccent: "bg-[#2D7FF9]",
      requestCount: 84,
      maxCount: 100,
      relatedRequests: ["REQ-8821: Resurfacing Timeline", "REQ-8845: Contractor Schedule", "REQ-8902: Asphalt Supply"],
      locations: ["Ward 3 (Main St)", "Ward 5 (Oak District)", "Ward 8 (Highway 12 Junction)"],
      departments: ["Department of Public Works", "Capital Infrastructure Bureau"],
      projects: ["Project 2026-B: Urban Resurfacing", "Metro Transit Overlay Initiative"],
      dates: ["Aug 01, 2026 - Present"],
      similarQueries: [
        "When will Main Street repaving finish?",
        "Is there a delay in road construction on 5th Ave?",
        "Road repair status update request"
      ]
    },
    {
      id: "CQ-102",
      question: "When will water supply resume?",
      category: "Utilities",
      badgeStyle: "bg-emerald-50 text-[#00A68E] border-emerald-200",
      barColor: "bg-[#00A68E]",
      topAccent: "bg-[#00A68E]",
      requestCount: 63,
      maxCount: 100,
      relatedRequests: ["REQ-9102: Mainline Maintenance", "REQ-9140: Valve Replacement", "REQ-9188: Pressure Check"],
      locations: ["Sector 7 Residential", "Harbor View Apartments", "Westside Suburb"],
      departments: ["Municipal Water & Sanitation Department"],
      projects: ["Project Water-2026: Pipe Upgrades"],
      dates: ["Aug 12, 2026 - Aug 14, 2026"],
      similarQueries: [
        "Water outage duration in Sector 7",
        "Why is there low water pressure today?",
        "Emergency water supply schedule"
      ]
    },
    {
      id: "CQ-103",
      question: "Why hasn't my streetlight been repaired?",
      category: "Electrical",
      badgeStyle: "bg-amber-50 text-[#D97706] border-amber-200",
      barColor: "bg-[#FFC107]",
      topAccent: "bg-[#FFC107]",
      requestCount: 41,
      maxCount: 100,
      relatedRequests: ["REQ-7712: Pole #409 Dark", "REQ-7734: Transformer Fuse", "REQ-7790: LED Replacement"],
      locations: ["Downtown Commercial Zone", "Parkside Walkway", "Station Road"],
      departments: ["Municipal Electrical & Lighting Department"],
      projects: ["Smart Streetlight Retrofit Campaign"],
      dates: ["Aug 05, 2026 - Present"],
      similarQueries: [
        "Dark street lights on 4th street",
        "Streetlight outage report follow-up",
        "Repair status for streetlight ticket"
      ]
    },
    {
      id: "CQ-104",
      question: "Why is drainage work taking so long?",
      category: "Sanitation",
      badgeStyle: "bg-indigo-50 text-[#6366F1] border-indigo-200",
      barColor: "bg-[#6366F1]",
      topAccent: "bg-[#6366F1]",
      requestCount: 32,
      maxCount: 100,
      relatedRequests: ["REQ-6021: Canal Dredging", "REQ-6088: Culvert Extension", "REQ-6110: Storm Grate Clearance"],
      locations: ["Eastside Lowland Basin", "Riverbed Culvert Zone"],
      departments: ["Stormwater Management & Environmental Protection"],
      projects: ["Flood Mitigation Plan Phase 3"],
      dates: ["July 20, 2026 - Present"],
      similarQueries: [
        "Drainage clearance completion date",
        "Why are storm drains blocked in Eastside?",
        "Status of flood barrier installation"
      ]
    }
  ];

  // Inquiries Table Data
  const [inquiries] = useState([
    {
      id: "INQ-2026-881",
      topic: "Downtown Bikeway Expansion Project",
      department: "Urban Transit & Infrastructure",
      date: "Aug 13, 2026",
      citizen: "Marcus Vance",
      aiStatus: "Verified",
      confidence: "99.2%",
      evidenceCount: 14,
      summary: "Query regarding environmental impact report & budget allocation breakdown for Phase 2."
    },
    {
      id: "INQ-2026-879",
      topic: "Zoning Variance: Green Valley Housing",
      department: "City Planning & Zoning",
      date: "Aug 12, 2026",
      citizen: "Elena Rostova",
      aiStatus: "Pending Review",
      confidence: "94.5%",
      evidenceCount: 8,
      summary: "Requesting municipal ordinance references and public hearing transcripts for residential density changes."
    },
    {
      id: "INQ-2026-875",
      topic: "Municipal Solar Grid Subsidy Allocation",
      department: "Energy & Sustainability",
      date: "Aug 11, 2026",
      citizen: "Devon Miller",
      aiStatus: "Verified",
      confidence: "98.7%",
      evidenceCount: 22,
      summary: "Inquiry into eligibility criteria and public funding distribution algorithm for rooftop solar."
    },
    {
      id: "INQ-2026-870",
      topic: "Public Park Water Management Ordinance",
      department: "Parks & Recreation",
      date: "Aug 10, 2026",
      citizen: "Sophia Chen",
      aiStatus: "Flagged",
      confidence: "87.1%",
      evidenceCount: 5,
      summary: "AI detected ambiguity in water conservation citation requirement #402. Needs official staff clarification."
    },
    {
      id: "INQ-2026-864",
      topic: "Commercial Noise Limitation Regulations",
      department: "Public Safety & Code Enforcement",
      date: "Aug 09, 2026",
      citizen: "Arthur Pendelton",
      aiStatus: "Verified",
      confidence: "97.9%",
      evidenceCount: 11,
      summary: "Clarification request on decibel thresholds for evening construction permits in Mixed-Use Zones."
    }
  ]);

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
        <p className="text-base text-slate-500 font-medium italic">
          If the backend returns enough aggregated information:
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
              Verified
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`rounded-lg px-4 py-2 transition ${
                activeTab === "pending" ? "bg-[#FFC107] text-[#0D1B2A]" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("flagged")}
              className={`rounded-lg px-4 py-2 transition ${
                activeTab === "flagged" ? "bg-[#FF5252] text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Flagged
            </button>
          </div>
        </div>

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
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                  {selectedCommonQuery.relatedRequests.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-black text-[#0D1B2A] block mb-1">Affected Locations</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCommonQuery.locations.map((loc, i) => (
                    <span key={i} className="rounded-lg bg-white px-3 py-1 font-extrabold text-slate-700 border border-slate-200 text-sm">{loc}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="font-black text-[#0D1B2A] block mb-1">Handling Departments</span>
                <p className="font-extrabold text-slate-700">{selectedCommonQuery.departments.join(", ")}</p>
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
                <span className="font-mono text-xs font-black text-[#2D7FF9]">{selectedInquiry.id}</span>
                <h3 className="text-2xl font-black text-[#0D1B2A] mt-0.5">{selectedInquiry.topic}</h3>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">✕</button>
            </div>

            <div className="my-5 space-y-4">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-base">
                <span className="font-black text-slate-500 block mb-1">Summary</span>
                <p className="text-slate-800 font-extrabold leading-relaxed">{selectedInquiry.summary}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button onClick={() => setSelectedInquiry(null)} className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
