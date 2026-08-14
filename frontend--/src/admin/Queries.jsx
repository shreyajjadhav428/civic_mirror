import React, { useState } from "react";

export default function Queries() {
  // Most Common Queries Modal State
  const [selectedCommonQuery, setSelectedCommonQuery] = useState(null);

  // Inquiries Table Filter & Search State
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Most Common Citizen Queries Data
  const commonQueries = [
    {
      id: "CQ-101",
      question: "Why is my road repair delayed?",
      requestCount: 84,
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
      requestCount: 63,
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
      requestCount: 41,
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
      requestCount: 32,
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
          
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#0D1B2A]">
            Citizen Queries & Inquiries Logs
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
            A significant concentration of citizen queries relates to infrastructure project delays.
          </p>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white/50">
            Supporting Information:
          </span>

          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <span className="block text-2xl font-semibold text-[#2D7FF9]">84</span>
              <span className="text-white/70 font-sans text-md">related queries</span>
            </div>

            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <span className="block text-2xl font-semibold text-[#00A68E]">67%</span>
              <span className="text-white/70 font-sans text-md">related to ongoing projects</span>
            </div>

            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <span className="block text-md font-black uppercase tracking-wider text-[#FFC107] mb-1 font-sans">
                Most Affected:
              </span>
              <ul className="space-y-0.5 font-sans text-md font-semibold text-white/80">
                <li>• Shanti Nagar</li>
                <li>• Green Park</li>
                <li>• Sector 12</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <span className="block text-md font-black uppercase tracking-wider text-[#8DBBFF] mb-1 font-sans">
                Primary Departments:
              </span>
              <ul className="space-y-0.5 font-sans text-md font-semibold text-white/80">
                <li>• Engineering</li>
                <li>• Electrical Works</li>
                <li>• Water Supply</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 5. MOST COMMON CITIZEN QUERIES CARD */}
      <div className="rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm">
        <div className="border-b border-[#D6E6F7] pb-4">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#2D7FF9]">
            5. MOST COMMON CITIZEN QUERIES
          </span>
          <p className="mt-1 text-sm font-bold text-[#0D1B2A]">
            What are citizens repeatedly asking?
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {commonQueries.map((query) => (
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
          ))}
        </div>
        <p className="mt-4 text-xs font-medium text-slate-400">
          Admin can click a query to see related requests, locations, departments, projects, dates, and similar queries.
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
              Verified
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`rounded-md px-3 py-1.5 ${activeTab === "pending" ? "bg-[#D97706] text-white" : "text-[#4B5563]"}`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("flagged")}
              className={`rounded-md px-3 py-1.5 ${activeTab === "flagged" ? "bg-[#FF5252] text-white" : "text-[#4B5563]"}`}
            >
              Flagged
            </button>
          </div>
        </div>

        <div className="my-5">
          <input
            type="text"
            placeholder="Search by topic, ID, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full max-w-md rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] px-4 text-sm text-[#0D1B2A] outline-none"
          />
        </div>

        <div className="overflow-x-auto">
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
                  <td className="px-4 py-4 font-bold">{item.topic}</td>
                  <td className="px-4 py-4 text-xs">{item.department}</td>
                  <td className="px-4 py-4 text-xs font-bold text-[#00A68E]">{item.aiStatus}</td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => setSelectedInquiry(item)}
                      className="rounded-lg border border-[#D6E6F7] px-3 py-1.5 text-xs font-bold text-[#2D7FF9]"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  {selectedCommonQuery.relatedRequests.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Affected Locations</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCommonQuery.locations.map((loc, i) => (
                    <span key={i} className="rounded bg-slate-200 px-2 py-0.5 font-bold text-[#0D1B2A]">{loc}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Handling Departments</span>
                <p className="font-bold text-slate-700">{selectedCommonQuery.departments.join(", ")}</p>
              </div>

              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Associated Capital Projects</span>
                <p className="font-bold text-slate-700">{selectedCommonQuery.projects.join(", ")}</p>
              </div>

              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Timeline & Activity Dates</span>
                <p className="font-bold text-slate-700">{selectedCommonQuery.dates.join(", ")}</p>
              </div>

              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="font-extrabold text-[#1E4FA3] uppercase block mb-1">Similar Clustered Queries</span>
                <ul className="list-disc pl-4 space-y-1 font-medium text-slate-600">
                  {selectedCommonQuery.similarQueries.map((sim, i) => (
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
                <h3 className="text-xl font-black text-[#0D1B2A]">{selectedInquiry.topic}</h3>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="rounded-full p-1 text-slate-400">✕</button>
            </div>
            <div className="my-5">
              <p className="text-sm text-slate-700">{selectedInquiry.summary}</p>
            </div>
            <div className="flex justify-end border-t border-[#D6E6F7] pt-4">
              <button onClick={() => setSelectedInquiry(null)} className="rounded-lg border border-[#D6E6F7] px-4 py-2 text-xs font-bold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
