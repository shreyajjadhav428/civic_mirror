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
      {/* 1. HEADER BANNER (100% Identical Layout & Styling to Complaint Clusters) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        {/* Top Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              <span className="h-[3px] w-6 bg-[#2D7FF9] rounded-full inline-block" />
              EXPLAINABLE MUNICIPAL INTELLIGENCE
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight flex items-center gap-3">
              AI <span className="text-[#2D7FF9]">Insights</span>
              {isAnalyzing && <span className="text-xs font-semibold text-slate-400 animate-pulse">(Running AI correlation...)</span>}
            </h1>
            <p className="mt-2 text-lg font-semibold text-[#59687A] max-w-2xl">
              Transform complaint patterns into <strong>explainable administrative intelligence</strong> and root cause analysis.
            </p>
          </div>

          {/* Stat Box */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-3 text-base font-semibold">
              <span className="text-[#657386] block text-xs font-black uppercase tracking-wider">Reasoning Engine</span>
              <span className="text-[#0D1B2A] font-black text-xl">{clustersList.length} Correlated Clusters</span>
            </div>
          </div>
        </div>

        {/* 2. CLUSTER SELECTOR & SEARCH/TRIGGER BAR INSIDE BANNER */}
        <div className="mt-7 pt-6 border-t border-slate-100 flex flex-col gap-3.5 sm:flex-row sm:items-center justify-between">
          {/* Target Cluster Dropdown */}
          <div className="flex-1 max-w-xl flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm font-bold">
            <span className="text-slate-500 whitespace-nowrap">Target Cluster:</span>
            <select
              value={selectedClusterId}
              onChange={(e) => setSelectedClusterId(e.target.value)}
              className="w-full bg-transparent text-[#0D1B2A] font-black outline-none cursor-pointer text-sm"
            >
              {clustersList.map((cluster) => (
                <option key={cluster.id} value={cluster.id}>
                  {cluster.name} ({cluster.pincode} • {cluster.complaintCount} complaints)
                </option>
              ))}
            </select>
          </div>

          {/* Analyze Trigger Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="rounded-xl bg-[#0D1B2A] px-6 py-3 text-xs font-black text-white hover:bg-[#2D7FF9] transition-all shadow-xs disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>ANALYZING WITH AI...</span>
                </>
              ) : (
                <>
                  <span>✦ ANALYZE WITH CIVICMIRROR AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {analyzedSuccess && (
          <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-black text-[#008D78] flex items-center gap-2">
            <span>✓</span>
            <span>AI Root Cause Analysis updated successfully for {activeCluster.name}.</span>
          </div>
        )}
      </div>

      {/* SUB-SECTION HEADER LINE (Matching Complaint Clusters layout) */}
      <div className="flex items-center justify-between pt-1">
        <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
          <span className="h-[2px] w-4 bg-slate-300 rounded-full" />
          ROOT CAUSE & EVIDENCE CORRELATION
        </span>
        <span className="text-xs font-bold text-slate-400">
          Endpoint: POST /api/admin/insights
        </span>
      </div>

      {/* 3. AI ANALYSIS & ROOT CAUSE DISPLAY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Root Cause & Why Breakdown & Recommendation */}
        <div className="lg:col-span-7 space-y-6">
          {/* CIVICMIRROR AI ANALYSIS CARD */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-black uppercase tracking-wider text-[#2D7FF9]">
                CIVICMIRROR AI ANALYSIS
              </span>
              <span className="text-xs font-extrabold text-slate-500">
                Cluster Ref: {activeCluster.id}
              </span>
            </div>

            {/* Root Cause Box */}
            <div className="rounded-xl bg-slate-50/80 p-4.5 border border-slate-200 space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                ROOT CAUSE IDENTIFIED
              </span>
              <p className="text-base font-extrabold text-[#0D1B2A] leading-relaxed">
                "{activeCluster.rootCause}"
              </p>
            </div>

            {/* Why Is This Cluster Important? Breakdown */}
            <div className="space-y-3 pt-1">
              <span className="text-sm font-black uppercase tracking-wider text-[#0D1B2A] block">
                WHY IS THIS CLUSTER IMPORTANT?
              </span>

              <div className="rounded-xl bg-slate-50/80 p-4 border border-slate-200 space-y-2.5 text-sm font-bold">
                <div className="flex items-center gap-2 text-[#0D1B2A]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0D1B2A] text-xs font-black text-white">
                    #
                  </span>
                  <span className="font-extrabold text-base">{activeCluster.complaintCount} Citizen Complaints Aggregated</span>
                </div>

                {activeCluster.whyFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-slate-600 pl-1 pt-2 border-t border-slate-200/60">
                    <span className="text-[#2D7FF9] font-black text-base leading-none">+</span>
                    <span className="font-semibold text-slate-700 text-[13px]">{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI RECOMMENDATION CARD */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#008D78]">
                AI RECOMMENDATION
              </span>
              <h3 className="text-xl font-black text-[#0D1B2A] mt-0.5">
                {activeCluster.recommendation}
              </h3>
            </div>

            {/* Reasoning Box */}
            <div className="rounded-xl bg-teal-50/60 p-4 border border-teal-200/80 space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#008D78] block">
                ADMINISTRATIVE REASONING
              </span>
              <p className="text-sm font-bold text-[#0D1B2A] leading-relaxed">
                "{activeCluster.reasoning}"
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => alert(`Work Order dispatched for ${activeCluster.name}`)}
                className="rounded-xl bg-[#008D78] px-5 py-2.5 text-sm font-black text-white hover:bg-[#0D1B2A] transition-all shadow-xs cursor-pointer"
              >
                Approve & Dispatch Work Order →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: SUPPORTING EVIDENCE WITH AI INSIGHTS */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4 sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#0D1B2A]">
                  SUPPORTING EVIDENCE
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  Click any document to inspect vector-indexed source records.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-black text-slate-700">
                {activeCluster.evidence.length} Files
              </span>
            </div>

            {/* Clickable Evidence List */}
            <div className="space-y-2.5">
              {activeCluster.evidence.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedEvidenceDoc(doc)}
                  className="w-full text-left rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 hover:border-[#2D7FF9] hover:bg-white transition-all group cursor-pointer space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📄</span>
                      <span className="text-sm font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors">
                        {doc.name}
                      </span>
                    </div>
                    <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-xs font-black text-slate-600">
                      {doc.type}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 line-clamp-2 pl-6">
                    {doc.summary}
                  </p>
                  <div className="pl-6 pt-1 flex items-center justify-between text-[11px] font-bold text-slate-400 border-t border-slate-100">
                    <span>{doc.records} Extracted Records</span>
                    <span className="text-[#2D7FF9] group-hover:underline">Inspect Document →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. EVIDENCE DOCUMENT INSPECTION MODAL */}
      {selectedEvidenceDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="modal-popup-container w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📄</span>
                <div>
                  <span className="text-xs font-black text-[#2D7FF9] uppercase tracking-wider block mb-0.5">
                    SUPPORTING EVIDENCE INSPECTION ({selectedEvidenceDoc.id})
                  </span>
                  <h3 className="text-lg font-black text-[#0D1B2A]">{selectedEvidenceDoc.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvidenceDoc(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-800 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-1">
                <span className="text-[11px] font-black text-slate-400 uppercase block">Document Summary</span>
                <p className="font-bold text-[#0D1B2A] leading-relaxed">
                  "{selectedEvidenceDoc.summary}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-slate-400 block font-bold uppercase text-[10px] mb-0.5">File Format</span>
                  <span className="text-sm font-black text-[#0D1B2A]">{selectedEvidenceDoc.type}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-slate-400 block font-bold uppercase text-[10px] mb-0.5">Extracted Vector Records</span>
                  <span className="text-sm font-black text-[#2D7FF9]">{selectedEvidenceDoc.records} records</span>
                </div>
              </div>

              <div className="rounded-xl bg-teal-50 border border-teal-200 p-3.5 text-xs font-black text-[#008D78] flex items-center justify-between">
                <span>Knowledge Graph Status</span>
                <span>Verified Source ✓</span>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-4">
              <button
                onClick={() => setSelectedEvidenceDoc(null)}
                className="rounded-xl bg-[#0D1B2A] px-5 py-2.5 text-xs font-black text-white hover:bg-[#2D7FF9] transition-all cursor-pointer"
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
