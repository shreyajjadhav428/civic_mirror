import React, { useState } from "react";

export default function AiInsights() {
  // Available clusters for Root Cause Analysis dropdown
  const clustersList = [
    {
      id: "CLT-01",
      name: "Streetlight – Shanti Nagar",
      pincode: "400012",
      department: "Electrical Works",
      complaintCount: 23,
      rootCause: "Multiple streetlight complaints appear to be concentrated within Shanti Nagar and may be associated with ongoing municipal infrastructure activity (Electrical Maintenance Phase II).",
      whyFactors: [
        "23 complaints aggregated across 0.5 sq km",
        "High geographic concentration in Ward 4",
        "Repeated infrastructure issue around Transformer Node #4",
        "Related municipal information matches Phase II maintenance schedule"
      ],
      recommendation: "Prioritize investigation and accelerated completion of the existing municipal infrastructure activity affecting the area.",
      reasoning: "Addressing a common underlying transformer issue will automatically resolve multiple citizen complaints simultaneously instead of treating each ticket independently.",
      evidence: [
        { id: "DOC-101", name: "Work Order (Electrical Maintenance Phase II)", type: "PDF", records: 42, summary: "Official work order specifying transformer replacement schedule for Shanti Nagar." },
        { id: "DOC-102", name: "Engineering Report (Circuit & Grid Map)", type: "PDF", records: 18, summary: "Circuit line diagrams showing grid connection to 147 households." },
        { id: "DOC-103", name: "Project Record (Phase II Milestone Log)", type: "XLSX", records: 86, summary: "Contractor milestone verification log showing 82% physical progress." },
        { id: "DOC-104", name: "Budget Information (Capital Expenditure 2026)", type: "PDF", records: 428, summary: "Line-item budget allocation statement authorized for electrical overhaul." }
      ]
    },
    {
      id: "CLT-02",
      name: "Water Pipeline Leak – Ward 3",
      pincode: "400005",
      department: "Water Supply & Sewage",
      complaintCount: 18,
      rootCause: "Sub-surface pressure fluctuation at Main Feeder Junction B-12 caused minor joint rupture following heavy transit loads.",
      whyFactors: [
        "18 low-pressure & water seepage reports within 300 meters",
        "High geographic concentration around Feeder Junction B-12",
        "Repeated pressure surge logs registered at 03:00 AM",
        "Related municipal telemetry confirms 14% flow drop"
      ],
      recommendation: "Deploy Emergency Valve Crew to isolate Junction B-12 and execute automated pressure regulation.",
      reasoning: "Preventative valve stabilization prevents secondary road sub-base erosion and restores normal pressure to 300+ residential connections.",
      evidence: [
        { id: "DOC-201", name: "Telemetry Pressure Log (Junction B-12)", type: "CSV", records: 312, summary: "24-hour sensor telemetry recording pressure drop at 03:14 AM." },
        { id: "DOC-202", name: "Water Network Schematic Ward 3", type: "PDF", records: 24, summary: "Feeder pipe geometry and valve positioning map." },
        { id: "DOC-203", name: "Emergency Dispatch Ticket #892", type: "PDF", records: 12, summary: "Rapid-response crew dispatch log and equipment checklist." }
      ]
    },
    {
      id: "CLT-03",
      name: "Road Resurfacing Delay – Sector 12",
      pincode: "400018",
      department: "Engineering & Roads",
      complaintCount: 15,
      rootCause: "Contractor asphalt mix delivery delayed due to quarry supply bottleneck during monsoon transition.",
      whyFactors: [
        "15 pothole & road damage complaints along Sector 12 arterial route",
        "High concentration on 1.2 km transit corridor",
        "Repeated vehicle damage claims logged by commuters",
        "Related municipal contract indicates 45% completion delay"
      ],
      recommendation: "Issue formal contractor compliance notice and deploy temporary cold-mix patch crew immediately.",
      reasoning: "Temporary cold-mix patching mitigates immediate traffic safety hazards while formal contract escalation enforces timeline adherence.",
      evidence: [
        { id: "DOC-301", name: "Road Inspection Audit (Sector 12)", type: "PDF", records: 64, summary: "Physical inspection log recording 17 distinct surface deformities." },
        { id: "DOC-302", name: "Contractor Penalty Notice #410", type: "PDF", records: 8, summary: "Legal notice issued for missing Milestone #3 resurfacing deadline." },
        { id: "DOC-303", name: "Cold-Mix Material Inventory", type: "XLSX", records: 35, summary: "Municipal depot stock availability for immediate deployment." }
      ]
    }
  ];

  // Active state selection
  const [selectedClusterId, setSelectedClusterId] = useState(clustersList[0].id);
  const [activeCluster, setActiveCluster] = useState(clustersList[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedSuccess, setAnalyzedSuccess] = useState(false);
  const [selectedEvidenceDoc, setSelectedEvidenceDoc] = useState(null);

  // Trigger simulated AI Analysis
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalyzedSuccess(false);

    setTimeout(() => {
      const cluster = clustersList.find((c) => c.id === selectedClusterId) || clustersList[0];
      setActiveCluster(cluster);
      setIsAnalyzing(false);
      setAnalyzedSuccess(true);
      setTimeout(() => setAnalyzedSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* 1. HEADER BANNER MATCHING DASHBOARD DESIGN SYSTEM */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              EXPLAINABLE MUNICIPAL INTELLIGENCE
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight">
              AI <span className="text-[#2D7FF9]">Insights</span>
              {isAnalyzing && (
                <span className="text-sm font-semibold text-[#2D7FF9] animate-pulse ml-3">
                  (Running AI correlation...)
                </span>
              )}
            </h1>
            <p className="mt-2 text-base font-semibold text-[#59687A]">
              Transform complaint patterns into explainable administrative intelligence and root cause analysis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-3.5 text-base font-semibold">
              <span className="text-[#657386] block text-sm font-black uppercase tracking-wider">Reasoning Engine</span>
              <span className="text-[#0D1B2A] font-black text-xl">{clustersList.length} Correlated Clusters</span>
            </div>
          </div>
        </div>

        {/* 2. TARGET CLUSTER SELECTOR & ACTION BAR */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 max-w-xl flex items-center gap-3">
            <label className="text-sm font-black uppercase tracking-wider text-slate-500 whitespace-nowrap">
              Target Cluster:
            </label>
            <select
              value={selectedClusterId}
              onChange={(e) => setSelectedClusterId(e.target.value)}
              className="h-[42px] w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-sm font-bold text-[#0D1B2A] focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all cursor-pointer"
            >
              {clustersList.map((cluster) => (
                <option key={cluster.id} value={cluster.id}>
                  {cluster.name} ({cluster.pincode} • {cluster.complaintCount} complaints)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="h-[42px] rounded-xl bg-[#2D7FF9] px-6 text-sm font-black text-white hover:bg-[#1E4FA3] active:scale-95 transition-all shadow-xs disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            {isAnalyzing ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>ANALYZING WITH AI...</span>
              </>
            ) : (
              <>
                <span>✦ ANALYZE WITH CIVICMIRROR AI</span>
              </>
            )}
          </button>
        </div>

        {analyzedSuccess && (
          <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-sm font-black text-[#008D78] flex items-center gap-2">
            <span>✓</span>
            <span>AI Root Cause Analysis updated successfully for {activeCluster.name}.</span>
          </div>
        )}
      </div>

      {/* 3. SUB-SECTION DIVIDER HEADER */}
      <div className="flex items-center justify-between pt-1 border-b border-slate-200/60 pb-3">
        <h2 className="text-sm font-black uppercase tracking-widest text-[#2D7FF9]">
          — ROOT CAUSE & EVIDENCE CORRELATION
        </h2>
        <span className="text-sm font-bold text-slate-400">
          Endpoint: POST /api/admin/insights
        </span>
      </div>

      {/* 4. ROW-WISE CONTAINER LAYOUT */}
      <div className="space-y-6">
        {/* ROW 1: CIVICMIRROR AI ROOT CAUSE & WHY BREAKDOWN */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#2D7FF9]">
                CIVICMIRROR AI ANALYSIS
              </h3>
              <p className="text-sm font-bold text-slate-500 mt-0.5">
                Cluster Ref: {activeCluster.id} • {activeCluster.department}
              </p>
            </div>
            <span className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-1 text-sm font-black text-[#2D7FF9] uppercase tracking-wider">
              HIGH PRIORITY CORRELATION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Box: Root Cause Identified */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-50/80 p-5 border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-sm font-black uppercase tracking-wider text-slate-500 block mb-2">
                  ROOT CAUSE IDENTIFIED
                </span>
                <p className="text-base font-black text-[#0D1B2A] leading-relaxed">
                  "{activeCluster.rootCause}"
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-sm font-bold text-slate-500">
                <span>Location Pincode</span>
                <span className="font-black text-[#0D1B2A]">{activeCluster.pincode}</span>
              </div>
            </div>

            {/* Right Box: Why Is This Cluster Important? */}
            <div className="lg:col-span-7 space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black uppercase tracking-wider text-[#0D1B2A]">
                  WHY IS THIS CLUSTER IMPORTANT?
                </span>
                <span className="rounded-lg bg-[#0D1B2A] text-white px-3 py-1 text-sm font-black">
                  {activeCluster.complaintCount} Citizen Complaints Aggregated
                </span>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200/90 divide-y divide-slate-100 overflow-hidden shadow-xs">
                {activeCluster.whyFactors.map((factor, idx) => (
                  <div key={idx} className="p-3.5 flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#2D7FF9]/10 text-[#2D7FF9] text-sm font-black shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: AI RECOMMENDATION & ADMINISTRATIVE ACTION */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div>
                <span className="text-sm font-black uppercase tracking-wider text-[#008D78] block mb-1">
                  AI RECOMMENDATION
                </span>
                <h3 className="text-xl font-black text-[#0D1B2A]">
                  {activeCluster.recommendation}
                </h3>
              </div>

              <div className="rounded-xl bg-[#008D78]/5 p-4 border border-[#008D78]/20 space-y-1">
                <span className="text-sm font-black uppercase tracking-wider text-[#008D78] block">
                  ADMINISTRATIVE REASONING
                </span>
                <p className="text-sm font-bold text-[#0D1B2A] leading-relaxed">
                  "{activeCluster.reasoning}"
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center lg:justify-end">
              <button
                onClick={() => alert(`Work Order dispatched for ${activeCluster.name}`)}
                className="h-[46px] w-full sm:w-auto rounded-xl bg-[#008D78] px-7 text-sm font-black text-white hover:bg-[#0D1B2A] active:scale-95 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Approve & Dispatch Work Order</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* ROW 3: SUPPORTING EVIDENCE (GRID OF CARDS ROW-WISE) */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black uppercase tracking-wider text-[#0D1B2A]">
                SUPPORTING EVIDENCE & SOURCE RECORDS
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-0.5">
                Inspect vector-indexed source records correlated with this cluster.
              </p>
            </div>
            <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-black text-slate-700">
              {activeCluster.evidence.length} Vector Index Files
            </span>
          </div>

          {/* Row-wise Horizontal Grid of Evidence Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeCluster.evidence.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedEvidenceDoc(doc)}
                className="text-left rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 hover:border-[#2D7FF9] hover:bg-white transition-all group cursor-pointer flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#2D7FF9] text-sm font-black">
                      📄
                    </span>
                    <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-sm font-black text-slate-600">
                      {doc.type}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors leading-snug">
                    {doc.name}
                  </h4>

                  <p className="text-sm font-medium text-slate-600 line-clamp-3 leading-snug">
                    {doc.summary}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-sm font-bold text-slate-400 border-t border-slate-100">
                  <span>{doc.records} Records</span>
                  <span className="text-[#2D7FF9] font-black group-hover:underline">Inspect →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. EVIDENCE DOCUMENT INSPECTION MODAL */}
      {selectedEvidenceDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#2D7FF9] text-lg font-black">
                  📄
                </span>
                <div>
                  <span className="text-sm font-black text-[#2D7FF9] uppercase tracking-wider block mb-0.5">
                    SUPPORTING EVIDENCE INSPECTION ({selectedEvidenceDoc.id})
                  </span>
                  <h3 className="text-lg font-black text-[#0D1B2A]">{selectedEvidenceDoc.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvidenceDoc(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-800 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1">
                <span className="text-sm font-black text-slate-400 uppercase block">Document Summary</span>
                <p className="font-semibold text-[#0D1B2A] leading-relaxed">
                  "{selectedEvidenceDoc.summary}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="text-slate-400 block font-bold uppercase text-sm mb-0.5">File Format</span>
                  <span className="text-sm font-black text-[#0D1B2A]">{selectedEvidenceDoc.type}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <span className="text-slate-400 block font-bold uppercase text-sm mb-0.5">Extracted Vector Records</span>
                  <span className="text-sm font-black text-[#2D7FF9]">{selectedEvidenceDoc.records} records</span>
                </div>
              </div>

              <div className="rounded-xl bg-teal-50 border border-teal-200 p-3.5 text-sm font-black text-[#008D78] flex items-center justify-between">
                <span>Knowledge Graph Status</span>
                <span>Verified Source ✓</span>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-3">
              <button
                onClick={() => setSelectedEvidenceDoc(null)}
                className="h-[42px] rounded-xl bg-[#0D1B2A] px-5 text-sm font-black text-white hover:bg-[#2D7FF9] transition-all cursor-pointer"
              >
                Close Inspection Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
