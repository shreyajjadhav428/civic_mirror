import React, { useState } from "react";

export default function Geography() {
  const [searchQuery, setSearchQuery] = useState("110025");
  const [selectedAreaId, setSelectedAreaId] = useState("SHANTI_NAGAR");
  const [selectedIssueCategoryModal, setSelectedIssueCategoryModal] = useState(null);

  // Geographic Areas Dataset
  const areasData = {
    SHANTI_NAGAR: {
      pincode: "110025",
      name: "Shanti Nagar",
      zone: "Zone A - Central",
      activeIssues: 42,
      resolvedIssues: 87,
      ongoingProjects: 5,
      mapCoordinates: { x: 35, y: 40 },
      issueBreakdown: [
        { category: "Streetlights", count: 18, icon: "💡", color: "bg-amber-500" },
        { category: "Roads", count: 11, icon: "🛣️", color: "bg-red-500" },
        { category: "Water", count: 7, icon: "🚰", color: "bg-[#2D7FF9]" },
        { category: "Drainage", count: 6, icon: "🌧️", color: "bg-[#00A68E]" },
      ],
      complaintsList: {
        Streetlights: [
          { id: "REQ-7712", location: "Main St Pole #409", citizen: "Amit Sharma", status: "In Progress", cluster: "STREETLIGHT CLUSTER", project: "Electrical Maintenance Phase II" },
          { id: "REQ-7734", location: "Block C Crossway", citizen: "Pooja Verma", status: "Pending", cluster: "STREETLIGHT CLUSTER", project: "Electrical Maintenance Phase II" },
          { id: "REQ-7790", location: "Shanti Nagar Park Rd", citizen: "Rohan Patel", status: "Verified", cluster: "STREETLIGHT CLUSTER", project: "Electrical Maintenance Phase II" },
          { id: "REQ-7801", location: "Sector 4 Junction", citizen: "Meera Das", status: "In Progress", cluster: "STREETLIGHT CLUSTER", project: "Electrical Maintenance Phase II" },
        ],
        Roads: [
          { id: "REQ-8821", location: "Shanti Nagar Arterial Road", citizen: "Vikram Malhotra", status: "In Progress", cluster: "ROAD DAMAGE CLUSTER", project: "Shanti Nagar Resurfacing" },
          { id: "REQ-8845", location: "Lane 3 Intersection", citizen: "Sujata Roy", status: "Pending", cluster: "ROAD DAMAGE CLUSTER", project: "Shanti Nagar Resurfacing" },
        ],
        Water: [
          { id: "REQ-9102", location: "Apt Complex Line B", citizen: "Sunil Kumar", status: "In Progress", cluster: "WATER LEAKAGE CLUSTER", project: "Water Main Upgrade" },
        ],
        Drainage: [
          { id: "REQ-6021", location: "South Culvert Gate", citizen: "Anjali Gupta", status: "Pending", cluster: "DRAINAGE OVERFLOW CLUSTER", project: "Flood Control Dredging" },
        ]
      }
    },
    SECTOR_12: {
      pincode: "110048",
      name: "Sector 12",
      zone: "Zone B - West",
      activeIssues: 31,
      resolvedIssues: 104,
      ongoingProjects: 3,
      mapCoordinates: { x: 70, y: 30 },
      issueBreakdown: [
        { category: "Roads", count: 17, icon: "🛣️", color: "bg-red-500" },
        { category: "Streetlights", count: 8, icon: "💡", color: "bg-amber-500" },
        { category: "Water", count: 4, icon: "🚰", color: "bg-[#2D7FF9]" },
        { category: "Drainage", count: 2, icon: "🌧️", color: "bg-[#00A68E]" },
      ],
      complaintsList: {
        Roads: [
          { id: "REQ-8901", location: "Sector 12 Main Ave", citizen: "Rajesh Iyer", status: "In Progress", cluster: "ROAD DAMAGE CLUSTER", project: "Sector 12 Resurfacing Phase I" },
          { id: "REQ-8914", location: "Commercial Hub Bypass", citizen: "Tina Singh", status: "Pending", cluster: "ROAD DAMAGE CLUSTER", project: "Sector 12 Resurfacing Phase I" }
        ],
        Streetlights: [
          { id: "REQ-7810", location: "East Gate Blvd", citizen: "Karan Johar", status: "In Progress", cluster: "STREETLIGHT CLUSTER", project: "Smart Lighting Campaign" }
        ],
        Water: [],
        Drainage: []
      }
    },
    GREEN_PARK: {
      pincode: "110016",
      name: "Green Park",
      zone: "Zone C - South",
      activeIssues: 38,
      resolvedIssues: 92,
      ongoingProjects: 4,
      mapCoordinates: { x: 50, y: 70 },
      issueBreakdown: [
        { category: "Water", count: 21, icon: "🚰", color: "bg-[#2D7FF9]" },
        { category: "Drainage", count: 9, icon: "🌧️", color: "bg-[#00A68E]" },
        { category: "Streetlights", count: 5, icon: "💡", color: "bg-amber-500" },
        { category: "Roads", count: 3, icon: "🛣️", color: "bg-red-500" },
      ],
      complaintsList: {
        Water: [
          { id: "REQ-9210", location: "Green Park Market Gate", citizen: "Sanjay Gupta", status: "In Progress", cluster: "WATER LEAKAGE CLUSTER", project: "Green Park Pipe Upgrade Project" },
          { id: "REQ-9225", location: "Block F Residential", citizen: "Neha Reddy", status: "Verified", cluster: "WATER LEAKAGE CLUSTER", project: "Green Park Pipe Upgrade Project" }
        ],
        Drainage: [],
        Streetlights: [],
        Roads: []
      }
    },
    EASTSIDE_BASIN: {
      pincode: "110091",
      name: "Eastside Lowland Basin",
      zone: "Zone D - East",
      activeIssues: 29,
      resolvedIssues: 65,
      ongoingProjects: 2,
      mapCoordinates: { x: 80, y: 65 },
      issueBreakdown: [
        { category: "Drainage", count: 18, icon: "🌧️", color: "bg-[#00A68E]" },
        { category: "Roads", count: 6, icon: "🛣️", color: "bg-red-500" },
        { category: "Water", count: 3, icon: "🚰", color: "bg-[#2D7FF9]" },
        { category: "Streetlights", count: 2, icon: "💡", color: "bg-amber-500" },
      ],
      complaintsList: {
        Drainage: [
          { id: "REQ-6110", location: "Lowland Canal Bridge", citizen: "Farhan Akhtar", status: "In Progress", cluster: "DRAINAGE OVERFLOW CLUSTER", project: "Flood Mitigation Dredging Phase III" }
        ],
        Roads: [],
        Water: [],
        Streetlights: []
      }
    }
  };

  const currentArea = areasData[selectedAreaId] || areasData.SHANTI_NAGAR;

  // Handle Search Input or Pill Selection
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    const matchKey = Object.keys(areasData).find((key) => {
      const area = areasData[key];
      return area.pincode.includes(query) || area.name.toLowerCase().includes(query);
    });

    if (matchKey) {
      setSelectedAreaId(matchKey);
    } else {
      alert(`No geographic data found for "${searchQuery}". Showing nearest zone.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-px w-6 bg-[#2D7FF9]" />
            <span className="text-[11px] font-extrabold tracking-[0.18em] text-[#1E4FA3] uppercase">
              GEOSPATIAL ANALYTICS & PINCODE INTELLIGENCE
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#0D1B2A]">
            10. GEOGRAPHIC / PINCODE INTELLIGENCE
          </h1>
          <p className="text-xs font-semibold text-[#4B5563]">
            Dedicated geography section providing spatial issue distribution, pincode filtering, and structural dependency mapping.
          </p>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#00A68E]/10 px-3.5 py-1 text-xs font-extrabold text-[#00A68E] border border-[#00A68E]/20">
            <span className="h-2 w-2 rounded-full bg-[#00A68E] animate-pulse" />
            Live GIS Integration
          </span>
        </div>
      </div>

      {/* 12. PINCODE -> ISSUE -> CLUSTER -> PROJECT Structural Relationship Banner */}
      <div className="rounded-2xl border border-white/10 bg-[#0D1B2A] p-6 text-white shadow-xl">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8DBBFF]">
          12. PINCODE → ISSUE → CLUSTER → PROJECT Administrative Intelligence Pipeline
        </span>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold">
          <div className="rounded-lg bg-white/10 px-3 py-1.5 text-white">PINCODE</div>
          <span className="text-white/40">↓</span>
          <div className="rounded-lg bg-[#2D7FF9]/30 text-[#8DBBFF] px-3 py-1.5 border border-[#2D7FF9]/40">AREA</div>
          <span className="text-white/40">↓</span>
          <div className="rounded-lg bg-amber-500/20 text-amber-300 px-3 py-1.5 border border-amber-500/30">ISSUE CATEGORY</div>
          <span className="text-white/40">↓</span>
          <div className="rounded-lg bg-white/10 px-3 py-1.5 text-white">COMPLAINTS</div>
          <span className="text-white/40">↓</span>
          <div className="rounded-lg bg-emerald-500/20 text-emerald-300 px-3 py-1.5 border border-emerald-500/30">CLUSTER</div>
          <span className="text-white/40">↓</span>
          <div className="rounded-lg bg-white/10 px-3 py-1.5 text-white">DEPARTMENT</div>
          <span className="text-white/40">↓</span>
          <div className="rounded-lg bg-[#2D7FF9]/30 text-[#8DBBFF] px-3 py-1.5">PROJECT</div>
          <span className="text-white/40">↓</span>
          <div className="rounded-lg bg-purple-500/20 text-purple-300 px-3 py-1.5 border border-purple-500/30">EVIDENCE</div>
        </div>
      </div>

      {/* Pincode & Area Search Input Bar */}
      <div className="rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#1E4FA3]">
          GEOGRAPHIC INTELLIGENCE LOOKUP
        </span>

        <form onSubmit={handleSearchSubmit} className="mt-3 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="[ Enter Pincode / Area ] e.g. 110025 or Shanti Nagar"
              className="h-12 w-full rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] px-4 font-mono text-sm text-[#0D1B2A] outline-none focus:border-[#2D7FF9]"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded-xl bg-[#2D7FF9] px-6 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-[#1E4FA3]"
          >
            Search Geographic Zone
          </button>
        </form>

        {/* Quick Area Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-slate-400 font-semibold">Quick Select:</span>
          {Object.keys(areasData).map((key) => {
            const area = areasData[key];
            const isSelected = selectedAreaId === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedAreaId(key);
                  setSearchQuery(area.pincode);
                }}
                className={`rounded-lg px-3 py-1.5 transition-all border ${
                  isSelected
                    ? "bg-[#0D1B2A] text-white border-[#0D1B2A] shadow-sm"
                    : "bg-[#FAFAFC] text-slate-600 border-[#D6E6F7] hover:border-[#2D7FF9]"
                }`}
              >
                {area.name} ({area.pincode})
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Area Summary Cards (Metrics) */}
      <div className="rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-4">
          <div>
            <span className="font-mono text-xs font-black text-[#2D7FF9]">{currentArea.pincode}</span>
            <h2 className="text-2xl font-black text-[#0D1B2A] uppercase">{currentArea.name}</h2>
            <span className="text-xs font-semibold text-slate-400">{currentArea.zone}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-extrabold text-emerald-600">
              Active Municipal Coverage
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] p-5">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">ACTIVE ISSUES</span>
            <p className="mt-2 text-3xl font-black text-[#FF5252]">{currentArea.activeIssues}</p>
          </div>

          <div className="rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] p-5">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">RESOLVED ISSUES</span>
            <p className="mt-2 text-3xl font-black text-[#00A68E]">{currentArea.resolvedIssues}</p>
          </div>

          <div className="rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] p-5">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">ONGOING PROJECTS</span>
            <p className="mt-2 text-3xl font-black text-[#2D7FF9]">{currentArea.ongoingProjects}</p>
          </div>
        </div>
      </div>

      {/* Grid: 13. GEOGRAPHIC MAP & 11. AREA ISSUE BREAKDOWN */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

        {/* 13. INTERACTIVE GEOGRAPHIC MAP (7 Columns) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#D6E6F7] pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#1E4FA3]">
                13. GEOGRAPHIC MAP
              </span>
              <h3 className="text-lg font-black text-[#0D1B2A]">
                Interactive City GIS Zone Map
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-400">Click a marker to select zone</span>
          </div>

          <div className="mt-5 relative rounded-2xl border border-white/10 bg-[#0D1B2A] p-6 text-white h-72 flex items-center justify-center overflow-hidden">
            {/* SVG City GIS Overlay Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simulated GIS Contour Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 500 300">
              <path d="M 50 150 Q 150 50 250 150 T 450 150" fill="none" stroke="#2D7FF9" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 100 220 Q 250 120 400 220" fill="none" stroke="#00A68E" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {/* Clickable Map Area Pins */}
            {Object.keys(areasData).map((key) => {
              const area = areasData[key];
              const isSelected = selectedAreaId === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedAreaId(key);
                    setSearchQuery(area.pincode);
                  }}
                  style={{ top: `${area.mapCoordinates.y}%`, left: `${area.mapCoordinates.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group flex items-center gap-2 rounded-full p-2 transition-all ${
                    isSelected ? "scale-125 z-20" : "hover:scale-110 z-10"
                  }`}
                >
                  <span className={`relative flex h-5 w-5 items-center justify-center rounded-full ${
                    isSelected ? "bg-[#FF5252] shadow-lg shadow-red-500/50" : "bg-[#2D7FF9]"
                  }`}>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span className={`rounded-lg px-2.5 py-1 text-[11px] font-black uppercase shadow-md transition-all ${
                    isSelected ? "bg-[#2D7FF9] text-white" : "bg-black/70 text-white/90 group-hover:bg-black"
                  }`}>
                    {area.name}
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-3 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-[10px] font-mono text-slate-300 backdrop-blur-sm">
              GIS Vector Grid Layer • Interactive Navigation Map
            </div>
          </div>
        </div>

        {/* 11. AREA ISSUE BREAKDOWN (5 Columns) */}
        <div className="lg:col-span-5 rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-[#D6E6F7] pb-4">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#2D7FF9]">
                11. AREA ISSUE BREAKDOWN
              </span>
              <h3 className="mt-1 text-lg font-black text-[#0D1B2A]">
                TOP ISSUES — {currentArea.name.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-400 font-medium">Click an issue category to open all relevant complaints.</p>
            </div>

            <div className="mt-5 space-y-3">
              {currentArea.issueBreakdown.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIssueCategoryModal(item.category)}
                  className="flex w-full items-center justify-between rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] p-4 text-left transition-all hover:bg-slate-100 hover:border-[#2D7FF9]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-extrabold text-[#0D1B2A] text-sm">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-black text-[#0D1B2A]">{item.count}</span>
                    <span className="text-xs font-bold text-[#2D7FF9]">Open Tickets →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-[#D6E6F7] pt-4 text-xs font-semibold text-slate-400">
            Clicking any issue opens all linked citizen complaint tickets for {currentArea.name}.
          </div>
        </div>

      </div>

      {/* LINKED COMPLAINTS MODAL (When clicking Streetlights - 18, etc.) */}
      {selectedIssueCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#D6E6F7] pb-4">
              <div>
                <span className="text-xs font-extrabold text-[#2D7FF9] uppercase tracking-wider">
                  LINKED COMPLAINTS ({currentArea.name} - {selectedIssueCategoryModal})
                </span>
                <h3 className="text-xl font-black text-[#0D1B2A]">
                  All Relevant Citizen Complaints ({currentArea.complaintsList[selectedIssueCategoryModal]?.length || 0})
                </h3>
              </div>
              <button
                onClick={() => setSelectedIssueCategoryModal(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Complaints List Table */}
            <div className="my-5 space-y-3">
              {(currentArea.complaintsList[selectedIssueCategoryModal] || []).length > 0 ? (
                currentArea.complaintsList[selectedIssueCategoryModal].map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] p-4 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-[#2D7FF9]">{ticket.id}</span>
                      <span className="rounded bg-emerald-500/10 px-2.5 py-0.5 font-bold text-emerald-600">{ticket.status}</span>
                    </div>

                    <div className="font-extrabold text-[#0D1B2A] text-sm">
                      📍 {ticket.location}
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-slate-500 font-semibold gap-2 border-t border-[#D6E6F7] pt-2">
                      <span>Citizen: <strong className="text-[#0D1B2A]">{ticket.citizen}</strong></span>
                      <span>Cluster: <strong className="text-[#2D7FF9]">{ticket.cluster}</strong></span>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      Associated Project: <span className="font-bold text-[#0D1B2A]">{ticket.project}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs font-semibold">
                  No open individual tickets found for this specific issue category in {currentArea.name}.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-[#D6E6F7] pt-4">
              <button
                onClick={() => setSelectedIssueCategoryModal(null)}
                className="rounded-lg bg-[#0D1B2A] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#1E4FA3]"
              >
                Close Complaint Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
