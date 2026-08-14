import React, { useState } from "react";

export default function AiInsights() {
  const [selectedWhyModal, setSelectedWhyModal] = useState(null);
  const [selectedEvidenceDrawer, setSelectedEvidenceDrawer] = useState(null);

  // Observations Dataset (Section 21)
  const observationsList = [
    {
      id: "OBS-01",
      icon: "✦",
      text: "23 complaints appear connected to one ongoing project (Electrical Maintenance Phase II).",
      location: "Shanti Nagar",
      department: "Electrical Works",
      whyReason: "Spatial overlay of 23 complaint coordinates perfectly matches Transformer Node #4 coverage area under Phase II maintenance.",
      evidenceFiles: [
        { name: "Electrical Maintenance Work Order", type: "PDF", records: 42, summary: "Work order specifying transformer replacement schedule." },
        { name: "Engineering Dependency Report", type: "PDF", records: 18, summary: "Circuit line diagrams showing grid connection." }
      ]
    },
    {
      id: "OBS-02",
      icon: "✦",
      text: "Shanti Nagar has the highest concentration of electrical issues in Ward 4.",
      location: "Shanti Nagar",
      department: "Electrical Works",
      whyReason: "Density calculation indicates 4.2 complaints per square kilometer versus city average of 0.8.",
      evidenceFiles: [
        { name: "GIS Density Analysis 2026", type: "CSV", records: 194, summary: "Raw spatial density points across central ward." }
      ]
    },
    {
      id: "OBS-03",
      icon: "✦",
      text: "Existing project may address multiple active complaints simultaneously.",
      location: "Shanti Nagar & Sector 12",
      department: "Multi-Departmental",
      whyReason: "Resolving the primary transformer node will automatically restore power to 147 connected residential households.",
      evidenceFiles: [
        { name: "Budget Allocation Statement 2026", type: "PDF", records: 428, summary: "Capital expenditure authorization log." }
      ]
    },
    {
      id: "OBS-04",
      icon: "✦",
      text: "Independent repair operations may result in duplicated effort and budget waste.",
      location: "Shanti Nagar",
      department: "Audit & Finance",
      whyReason: "Dispatching ad-hoc repair crews independently of Phase II will incur an unnecessary ₹1,20,000 duplicated labor expense.",
      evidenceFiles: [
        { name: "Project Status Report Phase II", type: "XLSX", records: 86, summary: "Contractor milestone payment log." }
      ]
    }
  ];

  // Recommendations Dataset (Section 22 & 23)
  const recommendationsList = [
    {
      id: "REC-01",
      title: "Prioritize completion of Electrical Maintenance Phase II.",
      department: "Electrical Works",
      reasons: [
        "23 related complaints aggregated from Shanti Nagar",
        "147 potentially affected citizens in residential sector",
        "82% project completion already achieved",
        "Existing project already covers the affected infrastructure area"
      ],
      expectedImpact: "Potentially address 23 active complaints upon project completion.",
      evidenceDrawer: [
        { name: "Electrical Maintenance Work Order", type: "PDF", records: 42, summary: "Work order specifying transformer replacement schedule." },
        { name: "Engineering Dependency Report", type: "PDF", records: 18, summary: "Circuit line diagrams showing grid connection." },
        { name: "Budget Allocation Statement 2026", type: "PDF", records: 428, summary: "Capital expenditure line-item allocation." },
        { name: "Project Status Report Phase II", type: "XLSX", records: 86, summary: "Contractor milestone verification log." }
      ]
    },
    {
      id: "REC-02",
      title: "Deploy temporary asphalt patch crew to Sector 12 arterial route.",
      department: "Engineering & Road Maintenance",
      reasons: [
        "17 pothole complaints along high-volume transit route",
        "Critical potholes (#5102, #5119, #5140) exceed 4-inch hazard threshold",
        "Phase I resurfacing is delayed (45% complete)",
        "Mitigates immediate traffic safety risks while contractor mobilizes"
      ],
      expectedImpact: "Temporarily mitigate 17 road safety complaints prior to major resurfacing.",
      evidenceDrawer: [
        { name: "Road Damage Inspection Log", type: "CSV", records: 64, summary: "Field inspection measurements of pothole depth." },
        { name: "Sector 12 Contractor Delay Notice", type: "PDF", records: 12, summary: "Official explanation for asphalt supply delay." }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="h-px w-6 bg-[#2D7FF9]" />
            <span className="text-[11px] font-extrabold tracking-[0.18em] text-[#1E4FA3] uppercase">
              EXPLAINABLE MUNICIPAL INTELLIGENCE
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#0D1B2A]">
            21. CIVICMIRROR AI INSIGHTS
          </h1>
          <p className="text-xs font-semibold text-[#4B5563]">
            Dedicated administrative intelligence portal separating analytical observations from actionable recommendations, backed by transparent evidence drawers.
          </p>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2D7FF9]/10 px-3.5 py-1 text-xs font-extrabold text-[#2D7FF9] border border-[#2D7FF9]/20">
            <span className="h-2 w-2 rounded-full bg-[#2D7FF9] animate-ping" />
            AI Analytical Engine Active
          </span>
        </div>
      </div>

      {/* 21. AI OBSERVATIONS (INSIGHTS) CARD */}
      <div className="rounded-2xl border border-white/10 bg-[#0D1B2A] p-6 text-white shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8DBBFF]">
              21. CIVICMIRROR AI INSIGHTS
            </span>
            <h2 className="text-xl font-black text-white">
              Real-time Analytical Observations
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8DBBFF]">
            {observationsList.length} Active Insights
          </span>
        </div>

        <div className="space-y-3">
          {observationsList.map((obs) => (
            <div
              key={obs.id}
              className="group relative flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-xs sm:flex-row sm:items-center sm:justify-between transition-all overflow-hidden"
            >
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
                  strokeWidth="2"
                  pathLength="100"
                  className="card-circle-stroke opacity-0"
                />
              </svg>

              <div className="flex items-start gap-3 relative z-10">
                <span className="text-sm text-[#2D7FF9] font-black">{obs.icon}</span>
                <div>
                  <p className="font-extrabold text-white text-sm leading-relaxed">{obs.text}</p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-white/50">
                    <span>Location: <strong className="text-amber-300">{obs.location}</strong></span>
                    <span>•</span>
                    <span>Department: <strong className="text-emerald-300">{obs.department}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 relative z-10">
                <button
                  onClick={() => setSelectedWhyModal(obs)}
                  className="rounded-lg bg-white/10 px-3 py-1.5 font-bold text-white hover:bg-white/20 transition-all"
                >
                  Why? →
                </button>

                <button
                  onClick={() => setSelectedEvidenceDrawer({ title: obs.text, files: obs.evidenceFiles })}
                  className="rounded-lg bg-[#2D7FF9] px-3.5 py-1.5 font-extrabold text-white hover:bg-[#1E4FA3] transition-all"
                >
                  View Evidence →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 22. AI RECOMMENDATIONS SECTION */}
      <div className="rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm">
        <div className="border-b border-[#D6E6F7] pb-4 mb-5">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#2D7FF9]">
            22. ACTIONABLE AI RECOMMENDATIONS
          </span>
          <h2 className="text-xl font-black text-[#0D1B2A]">
            Administrative Action Recommendations
          </h2>
          <p className="text-xs text-slate-400 font-medium">Distinct from analytical observations — provides clear rationale and expected impact.</p>
        </div>

        <div className="space-y-6">
          {recommendationsList.map((rec) => (
            <div
              key={rec.id}
              className="group relative rounded-2xl border border-[#D6E6F7] bg-[#FAFAFC] p-6 shadow-sm space-y-4 overflow-hidden"
            >
              <svg className="absolute inset-0 h-full w-full pointer-events-none rounded-2xl">
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="15"
                  ry="15"
                  fill="none"
                  stroke="#2D7FF9"
                  strokeWidth="2.5"
                  pathLength="100"
                  className="card-circle-stroke opacity-0"
                />
              </svg>

              {/* Recommendation Title */}
              <div className="relative z-10">
                <span className="text-[11px] font-black uppercase text-[#2D7FF9] tracking-wider block mb-1">
                  AI RECOMMENDATION
                </span>
                <h3 className="text-lg font-black text-[#0D1B2A]">{rec.title}</h3>
                <span className="text-xs font-bold text-slate-400">Target Department: {rec.department}</span>
              </div>

              {/* Rationale Breakdown */}
              <div className="rounded-xl border border-[#D6E6F7] bg-white p-4 text-xs space-y-2">
                <span className="text-[11px] font-black uppercase text-[#0D1B2A] tracking-wider block mb-1">
                  Reason & Supporting Factors:
                </span>
                <div className="space-y-1 font-mono">
                  {rec.reasons.map((r, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[#00A68E] font-black">✓</span>
                      <span className="text-slate-700 font-semibold">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Impact Box */}
              <div className="rounded-xl border border-[#00A68E]/30 bg-[#00A68E]/10 p-4 text-xs">
                <span className="text-[11px] font-black uppercase text-[#00A68E] tracking-wider block mb-0.5">
                  Expected Impact:
                </span>
                <p className="font-extrabold text-[#0D1B2A] text-sm">
                  {rec.expectedImpact}
                </p>
              </div>

              {/* 23. EVIDENCE CONTROLS */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#D6E6F7] pt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedWhyModal({ text: rec.title, whyReason: rec.reasons.join(" • ") })}
                    className="rounded-lg border border-[#D6E6F7] bg-white px-3.5 py-2 text-xs font-extrabold text-[#0D1B2A] hover:bg-slate-100"
                  >
                    [ WHY? ]
                  </button>

                  <button
                    onClick={() => setSelectedEvidenceDrawer({ title: rec.title, files: rec.evidenceDrawer })}
                    className="rounded-lg bg-[#0D1B2A] px-4 py-2 text-xs font-black text-white hover:bg-[#1E4FA3] flex items-center gap-1.5"
                  >
                    <span>📄 [ VIEW EVIDENCE ]</span>
                  </button>
                </div>

                <button
                  className="rounded-lg bg-[#2D7FF9] px-4 py-2 text-xs font-black text-white hover:bg-[#1E4FA3]"
                >
                  Approve & Dispatch Work Order →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY? EXPLAINABLE REASONING MODAL */}
      {selectedWhyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0D1B2A] p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-extrabold text-[#8DBBFF] uppercase tracking-wider">
                  AI INSIGHT REASONING ("WHY?")
                </span>
                <h3 className="text-base font-black text-white mt-1">{selectedWhyModal.text}</h3>
              </div>
              <button
                onClick={() => setSelectedWhyModal(null)}
                className="rounded-full p-1 text-white/60 hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="my-5 rounded-xl border border-[#2D7FF9]/40 bg-[#2D7FF9]/10 p-5 text-xs text-white">
              <span className="text-[11px] font-black uppercase text-[#8DBBFF] block mb-2">
                CivicMirror Reasoning Engine Logic:
              </span>
              <p className="font-bold text-white text-sm leading-relaxed">
                "{selectedWhyModal.whyReason}"
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedWhyModal(null)}
                className="rounded-lg bg-[#2D7FF9] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#1E4FA3]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 23. EVIDENCE DRAWER MODAL */}
      {selectedEvidenceDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-2xl text-[#0D1B2A]">
            <div className="flex items-start justify-between border-b border-[#D6E6F7] pb-4">
              <div>
                <span className="text-xs font-extrabold text-[#2D7FF9] uppercase tracking-wider">
                  23. EVIDENCE FOR ADMIN AI
                </span>
                <h3 className="text-lg font-black text-[#0D1B2A]">Evidence Document Inspection Drawer</h3>
                <p className="text-xs text-slate-400 font-medium">{selectedEvidenceDrawer.title}</p>
              </div>
              <button
                onClick={() => setSelectedEvidenceDrawer(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Evidence File Cards List */}
            <div className="my-5 space-y-3">
              <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                Supporting Municipal Evidence ({selectedEvidenceDrawer.files.length} Documents):
              </span>

              {selectedEvidenceDrawer.files.map((file, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] p-4 text-xs space-y-2 transition-all hover:border-[#2D7FF9]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📄</span>
                      <h4 className="font-extrabold text-[#0D1B2A]">{file.name}</h4>
                    </div>
                    <span className="rounded bg-[#0D1B2A] px-2 py-0.5 font-mono text-[10px] text-white font-bold">
                      {file.type}
                    </span>
                  </div>

                  <p className="text-slate-600 font-medium">"{file.summary}"</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold border-t border-[#D6E6F7] pt-2">
                    <span>Extracted Records: <strong className="text-[#2D7FF9]">{file.records}</strong></span>
                    <span className="text-[#2D7FF9] font-bold">
                      Source Vector Verified ✓
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end border-t border-[#D6E6F7] pt-4">
              <button
                onClick={() => setSelectedEvidenceDrawer(null)}
                className="rounded-lg bg-[#0D1B2A] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#1E4FA3]"
              >
                Close Evidence Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
