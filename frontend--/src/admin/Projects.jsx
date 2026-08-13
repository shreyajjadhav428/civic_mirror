import React, { useState } from "react";

export default function Projects() {
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [selectedTreeModal, setSelectedTreeModal] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const projectsData = [
    {
      id: "PRJ-ELEC-01",
      name: "Electrical Maintenance Phase II",
      department: "Electrical Works",
      location: "Shanti Nagar",
      startDate: "01 June 2026",
      expectedCompletion: "30 August 2026",
      progress: 82,
      budget: 2200000,
      utilizedBudget: 1840000,
      remainingBudget: 360000,
      relatedComplaintsCount: 23,
      affectedCitizens: 147,
      status: "Active",
      statusBadge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
      connectedComplaints: [
        { id: "#4921", title: "Streetlight complaint #4921 (Main St Pole #409)", citizen: "Amit Sharma", status: "In Progress" },
        { id: "#4932", title: "Streetlight complaint #4932 (Block C Crossway)", citizen: "Pooja Verma", status: "Pending" },
        { id: "#4951", title: "Streetlight complaint #4951 (Shanti Nagar Park Rd)", citizen: "Rohan Patel", status: "Verified" },
        { id: "#4967", title: "Streetlight complaint #4967 (Sector 4 Junction)", citizen: "Meera Das", status: "In Progress" },
        { id: "#4988", title: "Streetlight complaint #4988 (Lane 2 Transformer)", citizen: "Kavita Rao", status: "In Progress" },
      ]
    },
    {
      id: "PRJ-ROAD-02",
      name: "Sector 12 Resurfacing Phase I",
      department: "Engineering & Road Ops",
      location: "Sector 12",
      startDate: "15 May 2026",
      expectedCompletion: "15 September 2026",
      progress: 45,
      budget: 4500000,
      utilizedBudget: 2400000,
      remainingBudget: 2100000,
      relatedComplaintsCount: 17,
      affectedCitizens: 89,
      status: "Delayed",
      statusBadge: "bg-red-500/10 text-red-500 border-red-500/30",
      connectedComplaints: [
        { id: "#5102", title: "Pothole complaint #5102 (Sector 12 Main Ave)", citizen: "Rajesh Iyer", status: "In Progress" },
        { id: "#5119", title: "Asphalt Cracking #5119 (Bypass Junction)", citizen: "Tina Singh", status: "Pending" },
        { id: "#5140", title: "Road Surface Subsidence #5140 (Block D)", citizen: "Farhan Qureshi", status: "Verified" },
      ]
    },
    {
      id: "PRJ-WATER-03",
      name: "Green Park Water Pipe Upgrade",
      department: "Water Supply & Sanitation",
      location: "Green Park",
      startDate: "10 July 2026",
      expectedCompletion: "01 October 2026",
      progress: 60,
      budget: 3800000,
      utilizedBudget: 2280000,
      remainingBudget: 1520000,
      relatedComplaintsCount: 21,
      affectedCitizens: 210,
      status: "Active",
      statusBadge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
      connectedComplaints: [
        { id: "#6012", title: "Water Seepage #6012 (Market Gate #2)", citizen: "Sanjay Gupta", status: "In Progress" },
        { id: "#6034", title: "Mainline Pressure Drop #6034 (Block F)", citizen: "Neha Reddy", status: "In Progress" },
      ]
    },
    {
      id: "PRJ-DRAIN-04",
      name: "Flood Mitigation Dredging Phase III",
      department: "Stormwater Operations",
      location: "Eastside Lowland Basin",
      startDate: "20 August 2026",
      expectedCompletion: "15 November 2026",
      progress: 10,
      budget: 1800000,
      utilizedBudget: 180000,
      remainingBudget: 1620000,
      relatedComplaintsCount: 18,
      affectedCitizens: 115,
      status: "Planned",
      statusBadge: "bg-amber-500/10 text-amber-600 border-amber-500/30",
      connectedComplaints: [
        { id: "#7101", title: "Storm Drain Blockage #7101 (Lowland Culvert)", citizen: "Farhan Akhtar", status: "Pending" }
      ]
    }
  ];

  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const filteredProjects = projectsData.filter((p) => {
    if (activeTab === "all") return true;
    return p.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-px w-6 bg-[#2D7FF9]" />
            <span className="text-[11px] font-extrabold tracking-[0.18em] text-[#1E4FA3] uppercase">
              CAPITAL PROJECTS & COMPLAINT INTEGRATION
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#0D1B2A]">
            18. PROJECT INTELLIGENCE
          </h1>
          <p className="text-xs font-semibold text-[#4B5563]">
            Track municipal capital projects and their direct structural connection to citizen inquiry clusters.
          </p>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2D7FF9]/10 px-3.5 py-1 text-xs font-extrabold text-[#2D7FF9] border border-[#2D7FF9]/20">
            <span className="h-2 w-2 rounded-full bg-[#2D7FF9] animate-ping" />
            4 Tracked Infrastructure Projects
          </span>
        </div>
      </div>

      {/* Quote Callout Banner */}
      <div className="rounded-2xl border border-white/10 bg-[#0D1B2A] p-6 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-[#00A68E] animate-pulse" />
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8DBBFF]">
            CivicMirror Platform Philosophy
          </span>
        </div>

        <div className="border-l-4 border-[#2D7FF9] pl-4 py-1">
          <p className="text-base font-bold text-white italic leading-relaxed">
            "CivicMirror doesn't merely store complaints — it connects them to municipal reality."
          </p>
        </div>
      </div>

      {/* Projects Dashboard Controls & Filter Tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-4">
        <div>
          <h2 className="text-xs font-extrabold tracking-[0.16em] uppercase text-[#1E4FA3]">
            20. PROJECT STATUS & AUDIT
          </h2>
          <p className="text-xs text-slate-400 font-medium">Select a project to inspect budget utilization and complaint tree.</p>
        </div>

        <div className="flex rounded-lg bg-[#FAFAFC] border border-[#D6E6F7] p-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab("all")}
            className={`rounded-md px-3 py-1.5 ${activeTab === "all" ? "bg-[#0D1B2A] text-white" : "text-[#4B5563]"}`}
          >
            All ({projectsData.length})
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`rounded-md px-3 py-1.5 ${activeTab === "active" ? "bg-[#00A68E] text-white" : "text-[#4B5563]"}`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab("delayed")}
            className={`rounded-md px-3 py-1.5 ${activeTab === "delayed" ? "bg-[#FF5252] text-white" : "text-[#4B5563]"}`}
          >
            Delayed
          </button>
          <button
            onClick={() => setActiveTab("planned")}
            className={`rounded-md px-3 py-1.5 ${activeTab === "planned" ? "bg-amber-600 text-white" : "text-[#4B5563]"}`}
          >
            Planned
          </button>
        </div>
      </div>

      {/* Projects Grid Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col justify-between rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm transition-all hover:border-[#2D7FF9] hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between border-b border-[#D6E6F7] pb-4">
                <div>
                  <span className="font-mono text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                    {project.id}
                  </span>
                  <h3 className="text-lg font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-500">📍 {project.location} • {project.department}</p>
                </div>

                <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${project.statusBadge}`}>
                  {project.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-500">Current Progress</span>
                  <span className="font-mono text-[#2D7FF9] font-black">{project.progress}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    style={{ width: `${project.progress}%` }}
                    className="h-full bg-[#2D7FF9] transition-all duration-500"
                  />
                </div>
              </div>

              {/* Budget & Complaints Summary Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="block text-slate-400 font-semibold text-[11px]">Total Budget</span>
                  <span className="font-mono text-sm font-black text-[#0D1B2A]">{formatINR(project.budget)}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="block text-slate-400 font-semibold text-[11px]">Utilized Budget</span>
                  <span className="font-mono text-sm font-black text-[#00A68E]">{formatINR(project.utilizedBudget)}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="block text-slate-400 font-semibold text-[11px]">Related Complaints</span>
                  <span className="font-mono text-sm font-black text-[#2D7FF9]">{project.relatedComplaintsCount} complaints</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="block text-slate-400 font-semibold text-[11px]">Affected Area</span>
                  <span className="font-extrabold text-[#0D1B2A]">{project.location}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#D6E6F7] pt-4">
              <button
                onClick={() => setSelectedTreeModal(project)}
                className="rounded-lg bg-[#0D1B2A] px-3.5 py-2 text-xs font-black text-white hover:bg-[#1E4FA3] transition-all flex items-center gap-1.5"
              >
                <span>🌿 19. Complaint Tree</span>
              </button>

              <button
                onClick={() => setSelectedProjectModal(project)}
                className="rounded-lg border border-[#D6E6F7] px-3.5 py-2 text-xs font-extrabold text-[#2D7FF9] hover:bg-slate-50 transition-all"
              >
                Full Project Specs →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 19. PROJECT -> COMPLAINT CONNECTION TREE MODAL */}
      {selectedTreeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0D1B2A] p-6 text-white shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-extrabold text-[#8DBBFF] uppercase tracking-wider">
                  19. PROJECT → COMPLAINT CONNECTION
                </span>
                <h3 className="text-xl font-black text-white">{selectedTreeModal.name}</h3>
                <p className="text-xs text-white/70">Location: {selectedTreeModal.location} • Department: {selectedTreeModal.department}</p>
              </div>

              <button
                onClick={() => setSelectedTreeModal(null)}
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Tree View Structure */}
            <div className="my-5 rounded-2xl border border-white/10 bg-white/5 p-6 font-mono text-xs text-white">
              <span className="text-[10px] font-black uppercase text-[#8DBBFF] block mb-3">
                PROJECT METADATA TREE
              </span>

              <div className="space-y-1">
                <div className="font-bold text-white text-sm">
                  PROJECT: <span className="text-[#2D7FF9]">{selectedTreeModal.name}</span>
                </div>

                {selectedTreeModal.connectedComplaints.map((ticket, i, arr) => {
                  const isLast = i === arr.length - 1;
                  return (
                    <div key={ticket.id} className="flex items-start gap-2 text-white/90 pl-3">
                      <span className="text-white/40">{isLast ? "└──" : "├──"}</span>
                      <div>
                        <span className="font-semibold text-white/90">{ticket.title}</span>
                        <span className="ml-2 rounded bg-white/10 px-2 py-0.5 text-[10px] text-emerald-400">
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="pl-3 text-white/40 italic mt-2">
                  └── ... ({selectedTreeModal.relatedComplaintsCount} total aggregated citizen complaints connected)
                </div>
              </div>
            </div>

            <p className="text-xs font-medium text-white/60 italic border-t border-white/10 pt-3">
              CivicMirror demonstrates structural accountability by linking citizen issues directly to capital projects.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTreeModal(null)}
                className="rounded-lg bg-[#2D7FF9] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#1E4FA3]"
              >
                Close Connection Tree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 20. PROJECT STATUS & METRICS SPECIFICATION MODAL */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-2xl text-[#0D1B2A]">
            
            <div className="flex items-start justify-between border-b border-[#D6E6F7] pb-4">
              <div>
                <span className="text-xs font-extrabold text-[#2D7FF9] uppercase tracking-wider">
                  20. FULL PROJECT SPECIFICATIONS
                </span>
                <h3 className="text-xl font-black text-[#0D1B2A]">{selectedProjectModal.name}</h3>
                <span className={`mt-1 inline-block rounded-full border px-3 py-0.5 text-xs font-black uppercase ${selectedProjectModal.statusBadge}`}>
                  {selectedProjectModal.status}
                </span>
              </div>

              <button
                onClick={() => setSelectedProjectModal(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="my-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Handling Department</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedProjectModal.department}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Project Location</span>
                  <span className="font-extrabold text-[#0D1B2A]">📍 {selectedProjectModal.location}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Start Date</span>
                  <span className="font-bold text-[#0D1B2A]">{selectedProjectModal.startDate}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Expected Completion</span>
                  <span className="font-bold text-[#0D1B2A]">{selectedProjectModal.expectedCompletion}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Total Budget</span>
                  <span className="font-mono text-base font-black text-[#0D1B2A]">{formatINR(selectedProjectModal.budget)}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Utilized Budget</span>
                  <span className="font-mono text-base font-black text-[#00A68E]">{formatINR(selectedProjectModal.utilizedBudget)}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Remaining Budget</span>
                  <span className="font-mono text-base font-black text-[#2D7FF9]">{formatINR(selectedProjectModal.remainingBudget)}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Affected Citizens</span>
                  <span className="font-mono text-base font-black text-[#0D1B2A]">{selectedProjectModal.affectedCitizens} citizens</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#FAFAFC] p-4 border border-[#D6E6F7]">
                <div className="flex justify-between font-bold text-xs mb-1">
                  <span>Execution Progress</span>
                  <span className="text-[#2D7FF9] font-mono font-black">{selectedProjectModal.progress}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    style={{ width: `${selectedProjectModal.progress}%` }}
                    className="h-full bg-[#2D7FF9]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-[#D6E6F7] pt-4">
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="rounded-lg bg-[#0D1B2A] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#1E4FA3]"
              >
                Close Specifications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
