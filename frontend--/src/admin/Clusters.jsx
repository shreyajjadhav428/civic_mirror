import React, { useState } from "react";

export default function Clusters() {
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [showWhyModal, setShowWhyModal] = useState(null);

  const clusterData = [
    {
      id: "CLS-STREET-01",
      title: "STREETLIGHT CLUSTER",
      category: "Streetlight failures",
      location: "Shanti Nagar",
      complaintCount: 23,
      affectedPopulation: 147,
      department: "Electrical Works",
      priority: "HIGH",
      priorityBg: "bg-red-500/10 text-red-500 border-red-500/30",
      project: "Electrical Maintenance Phase II",
      projectProgress: "82%",
      geographicConcentration: "High (Radius 450m)",
      firstReported: "Aug 05, 2026",
      latestReported: "Aug 13, 2026",
      whyBreakdown: [
        "23 complaints aggregated from single geographic sector",
        "147 potentially affected citizens in residential grid",
        "High geographic concentration around main thoroughfare",
        "Existing infrastructure dependency on Transformer Node #4",
        "Multiple distinct reports submitted within last 7 days"
      ],
      aiRecommendation: "Prioritize completion of the existing Electrical Maintenance Phase II project to resolve transformer load."
    },
    {
      id: "CLS-ROAD-02",
      title: "ROAD DAMAGE CLUSTER",
      category: "Pavement & Pothole Surface Damage",
      location: "Sector 12",
      complaintCount: 17,
      affectedPopulation: 89,
      department: "Engineering & Road Maintenance",
      priority: "MEDIUM",
      priorityBg: "bg-amber-500/10 text-amber-500 border-amber-500/30",
      project: "Sector 12 Resurfacing Phase I",
      projectProgress: "45%",
      geographicConcentration: "Moderate (2 Critical Potholes)",
      firstReported: "Aug 08, 2026",
      latestReported: "Aug 13, 2026",
      whyBreakdown: [
        "17 complaints along commuter transit route",
        "89 affected daily commuters and residents",
        "Pothole depth exceeding safety threshold (> 4 inches)",
        "Overlaps with scheduled heavy transit bypass"
      ],
      aiRecommendation: "Accelerate asphalt cold-patch dispatch ahead of scheduled Phase I resurfacing."
    },
    {
      id: "CLS-WATER-03",
      title: "WATER LEAKAGE CLUSTER",
      category: "Mainline Water Seepage & Pressure Drop",
      location: "Green Park",
      complaintCount: 21,
      affectedPopulation: 210,
      department: "Water Supply & Sanitation",
      priority: "HIGH",
      priorityBg: "bg-red-500/10 text-red-500 border-red-500/30",
      project: "Green Park Pipe Upgrade Project",
      projectProgress: "60%",
      geographicConcentration: "High (Sub-surface pressure drop)",
      firstReported: "Aug 02, 2026",
      latestReported: "Aug 12, 2026",
      whyBreakdown: [
        "21 low-pressure and leakage complaints within 2 blocks",
        "210 estimated affected residents across 3 apartment complexes",
        "Significant potable water volume loss detected by pipe sensors",
        "High risk of structural pavement erosion if unaddressed"
      ],
      aiRecommendation: "Execute emergency pressure regulation valve replacement in Sector B."
    },
    {
      id: "CLS-DRAIN-04",
      title: "DRAINAGE OVERFLOW CLUSTER",
      category: "Stormwater Grate Blockage",
      location: "Eastside Lowland Basin",
      complaintCount: 18,
      affectedPopulation: 115,
      department: "Stormwater Management",
      priority: "MEDIUM",
      priorityBg: "bg-amber-500/10 text-amber-500 border-amber-500/30",
      project: "Flood Mitigation Dredging Phase III",
      projectProgress: "90%",
      geographicConcentration: "Localized Lowland Catchment",
      firstReported: "Aug 09, 2026",
      latestReported: "Aug 13, 2026",
      whyBreakdown: [
        "18 complaints reporting water pooling post-rainfall",
        "115 residents in flood-prone topography",
        "Debris accumulation in primary culvert intake"
      ],
      aiRecommendation: "Deploy hydro-vac crew to clear primary culvert intake before anticipated weekend rain."
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
              AI ENGINE & EXPLAINABILITY
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#0D1B2A]">
            7. COMPLAINT CLUSTERS
          </h1>
          <p className="text-xs font-semibold text-[#4B5563]">
            Instead of treating complaints as independent tickets, AI aggregates related inquiries into actionable intelligence clusters.
          </p>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2D7FF9]/10 px-3.5 py-1 text-xs font-extrabold text-[#2D7FF9] border border-[#2D7FF9]/20">
            <span className="h-2 w-2 rounded-full bg-[#2D7FF9] animate-ping" />
            4 Active AI Clusters
          </span>
        </div>
      </div>

      {/* AI Pipeline Flow Card */}
      <div className="rounded-2xl border border-white/10 bg-[#0D1B2A] p-6 text-white shadow-xl">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8DBBFF]">
          AI Clustering Workflow Demonstration
        </span>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-extrabold">
          <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2">
            <span className="text-[#2D7FF9] font-mono text-sm font-black">23</span>
            <span className="text-white/80">complaints</span>
          </div>

          <span className="text-white/40">↓</span>

          <div className="flex items-center gap-2 rounded-xl bg-[#2D7FF9]/20 border border-[#2D7FF9]/40 px-3.5 py-2 text-[#8DBBFF]">
            <span>✨ AI identifies similarity</span>
          </div>

          <span className="text-white/40">↓</span>

          <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2">
            <span className="text-white font-mono font-black">STREETLIGHT CLUSTER</span>
          </div>

          <span className="text-white/40">↓</span>

          <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-[#FFC107]">
            <span>📍 Shanti Nagar</span>
          </div>

          <span className="text-white/40">↓</span>

          <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-[#00A68E]">
            <span>🏢 Electrical Works</span>
          </div>

          <span className="text-white/40">↓</span>

          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-2 text-emerald-400">
            <span>🛠 Maintenance Phase II</span>
          </div>
        </div>
      </div>

      {/* Cluster Cards Grid */}
      <div>
        <h2 className="mb-4 text-xs font-extrabold tracking-[0.16em] uppercase text-[#1E4FA3]">
          Active Complaint Cluster Cards
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {clusterData.map((cluster) => (
            <div
              key={cluster.id}
              className="group flex flex-col justify-between rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm transition-all hover:border-[#2D7FF9] hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between border-b border-[#D6E6F7] pb-3">
                  <div>
                    <span className="font-mono text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                      {cluster.id}
                    </span>
                    <h3 className="text-lg font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors">
                      {cluster.title}
                    </h3>
                    <p className="text-xs font-bold text-[#2D7FF9]">{cluster.location}</p>
                  </div>

                  <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${cluster.priorityBg}`}>
                    {cluster.priority}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                    <span className="block text-slate-400 font-semibold text-[11px]">Aggregated Complaints</span>
                    <span className="font-mono text-lg font-black text-[#0D1B2A]">{cluster.complaintCount} tickets</span>
                  </div>

                  <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                    <span className="block text-slate-400 font-semibold text-[11px]">Affected Citizens</span>
                    <span className="font-mono text-lg font-black text-[#0D1B2A]">{cluster.affectedPopulation} citizens</span>
                  </div>

                  <div className="col-span-2 rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                    <span className="block text-slate-400 font-semibold text-[11px]">Handling Department</span>
                    <span className="font-bold text-[#0D1B2A]">{cluster.department}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#D6E6F7] pt-4">
                <button
                  onClick={() => setShowWhyModal(cluster)}
                  className="rounded-lg bg-[#0D1B2A] px-3.5 py-2 text-xs font-black text-white hover:bg-[#1E4FA3] transition-all flex items-center gap-1.5"
                >
                  <span>❓ Explain "WHY?"</span>
                </button>

                <button
                  onClick={() => setSelectedCluster(cluster)}
                  className="rounded-lg border border-[#D6E6F7] px-3.5 py-2 text-xs font-extrabold text-[#2D7FF9] hover:bg-slate-50 transition-all flex items-center gap-1"
                >
                  <span>View Details →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. CLUSTER DETAILS MODAL */}
      {selectedCluster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#D6E6F7] pb-4">
              <div>
                <span className="text-xs font-extrabold text-[#2D7FF9] uppercase tracking-wider">
                  8. CLUSTER INTELLIGENCE DETAILS
                </span>
                <h3 className="text-xl font-black text-[#0D1B2A]">{selectedCluster.title}</h3>
                <p className="text-xs font-bold text-slate-500">Location: {selectedCluster.location}</p>
              </div>
              <button
                onClick={() => setSelectedCluster(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Visual Workflow Chain */}
            <div className="my-5 rounded-xl bg-[#0D1B2A] p-4 text-white text-xs">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-2">Clustering Mapping Chain</span>
              <div className="flex flex-wrap items-center gap-2 font-mono">
                <span className="text-[#2D7FF9] font-bold">{selectedCluster.complaintCount} complaints</span>
                <span>↓</span>
                <span className="text-white/80">{selectedCluster.category}</span>
                <span>↓</span>
                <span className="text-[#00A68E] font-bold">{selectedCluster.department}</span>
                <span>↓</span>
                <span className="text-amber-400 font-bold">{selectedCluster.project}</span>
                <span>↓</span>
                <span className="text-emerald-400 font-bold">{selectedCluster.projectProgress} complete</span>
              </div>
            </div>

            {/* Detailed Cluster Information Grid */}
            <div className="space-y-3 text-xs text-[#0D1B2A]">
              <h4 className="font-extrabold uppercase text-[#1E4FA3] tracking-wider">Cluster Metadata & Metrics</h4>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Complaint Count</span>
                  <span className="font-mono text-base font-black text-[#0D1B2A]">{selectedCluster.complaintCount} tickets</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Affected Population Estimate</span>
                  <span className="font-mono text-base font-black text-[#0D1B2A]">{selectedCluster.affectedPopulation} citizens</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Geographic Concentration</span>
                  <span className="font-bold text-[#0D1B2A]">{selectedCluster.geographicConcentration}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Issue Category</span>
                  <span className="font-bold text-[#0D1B2A]">{selectedCluster.category}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Responsible Department</span>
                  <span className="font-bold text-[#0D1B2A]">{selectedCluster.department}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Assigned Priority Level</span>
                  <span className="font-extrabold text-[#FF5252]">{selectedCluster.priority}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">First Reported Date</span>
                  <span className="font-bold text-[#0D1B2A]">{selectedCluster.firstReported}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Latest Reported Date</span>
                  <span className="font-bold text-[#0D1B2A]">{selectedCluster.latestReported}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end gap-3 border-t border-[#D6E6F7] pt-4">
              <button
                onClick={() => {
                  const current = selectedCluster;
                  setSelectedCluster(null);
                  setShowWhyModal(current);
                }}
                className="rounded-lg bg-[#0D1B2A] px-4 py-2 text-xs font-black text-white hover:bg-[#1E4FA3]"
              >
                Open "WHY?" AI Explainability →
              </button>
              <button
                onClick={() => setSelectedCluster(null)}
                className="rounded-lg border border-[#D6E6F7] px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. CLUSTER "WHY?" EXPLAINABLE AI MODAL */}
      {showWhyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0D1B2A] p-6 text-white shadow-2xl">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#2D7FF9] animate-pulse" />
                  <span className="text-xs font-extrabold text-[#8DBBFF] uppercase tracking-wider">
                    9. CLUSTER "WHY?" (EXPLAINABLE AI)
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-black text-white">
                  WHY IS THIS CLUSTER {showWhyModal.priority} PRIORITY?
                </h3>
                <p className="text-xs text-white/70">{showWhyModal.title} — {showWhyModal.location}</p>
              </div>

              <button
                onClick={() => setShowWhyModal(null)}
                className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Explainability Calculation Breakdown */}
            <div className="my-5 rounded-xl border border-white/10 bg-white/5 p-5">
              <span className="text-[11px] font-black uppercase text-[#8DBBFF] tracking-wider block mb-3">
                CivicMirror AI Explainability Calculation:
              </span>

              <div className="space-y-2.5 text-xs font-mono">
                {showWhyModal.whyBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#2D7FF9] font-black">{idx === 0 ? " " : "+"}</span>
                    <span className="text-white/90 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation Box */}
            <div className="rounded-xl border border-[#2D7FF9]/40 bg-[#2D7FF9]/10 p-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8DBBFF] block mb-1">
                AI Recommendation:
              </span>
              <p className="text-sm font-bold text-white leading-relaxed">
                "{showWhyModal.aiRecommendation}"
              </p>
            </div>

            <p className="mt-4 text-[11px] text-white/50 italic">
              CivicMirror Explainable AI: Provides actionable intelligence beyond a simple status priority tag.
            </p>

            {/* Footer Actions */}
            <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setShowWhyModal(null)}
                className="rounded-lg bg-[#2D7FF9] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#1E4FA3]"
              >
                Acknowledge AI Explainability
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
