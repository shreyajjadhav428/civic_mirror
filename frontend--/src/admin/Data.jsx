import React, { useState } from "react";

export default function Data() {
  const [selectedFileModal, setSelectedFileModal] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingSteps, setProcessingSteps] = useState([
    { label: "File uploaded", done: false },
    { label: "Information extracted", done: false },
    { label: "Records classified", done: false },
    { label: "Data indexed", done: false },
    { label: "CivicMirror knowledge updated", done: false },
  ]);
  const [activeTab, setActiveTab] = useState("all");

  const [filesLibrary, setFilesLibrary] = useState([
    {
      id: "DOC-01",
      filename: "Budget_2026.pdf",
      uploadDate: "12 August 2026",
      status: "Indexed",
      statusColor: "text-[#00A68E] bg-[#00A68E]/10 border-[#00A68E]/30",
      extractedRecords: 428,
      departments: ["Engineering", "Electrical", "Water"],
      relatedProjects: 17,
      size: "4.2 MB",
      fileType: "PDF",
      contributionSummary: "Provides capital budget cap limits and line-item allocations for municipal infrastructure projects across all city wards."
    },
    {
      id: "DOC-02",
      filename: "RoadProjects.csv",
      uploadDate: "12 August 2026",
      status: "Indexed",
      statusColor: "text-[#00A68E] bg-[#00A68E]/10 border-[#00A68E]/30",
      extractedRecords: 194,
      departments: ["Engineering & Road Ops"],
      relatedProjects: 8,
      size: "1.1 MB",
      fileType: "CSV",
      contributionSummary: "Contains geospatial coordinates and contractor work schedules for Sector 12 and Shanti Nagar resurfacing campaigns."
    },
    {
      id: "DOC-03",
      filename: "WorkOrders.xlsx",
      uploadDate: "11 August 2026",
      status: "Indexed",
      statusColor: "text-[#00A68E] bg-[#00A68E]/10 border-[#00A68E]/30",
      extractedRecords: 312,
      departments: ["Electrical Works", "Water Supply"],
      relatedProjects: 12,
      size: "2.8 MB",
      fileType: "XLSX",
      contributionSummary: "Aggregates historical streetlight maintenance tickets and transformer component inventory logs."
    },
    {
      id: "DOC-04",
      filename: "EngineeringReports.pdf",
      uploadDate: "10 August 2026",
      status: "Indexed",
      statusColor: "text-[#00A68E] bg-[#00A68E]/10 border-[#00A68E]/30",
      extractedRecords: 86,
      departments: ["Public Works", "Structural Assessment"],
      relatedProjects: 5,
      size: "8.5 MB",
      fileType: "PDF",
      contributionSummary: "Structural safety certifications and soil drainage density metrics for low-lying urban sectors."
    }
  ]);

  // Simulate Demo Ingestion Pipeline Process
  const handleSimulateUpload = (fileName, fileType) => {
    setIsUploading(true);
    setUploadProgress(10);
    setProcessingSteps([
      { label: "File uploaded", done: false },
      { label: "Information extracted", done: false },
      { label: "Records classified", done: false },
      { label: "Data indexed", done: false },
      { label: "CivicMirror knowledge updated", done: false },
    ]);

    setTimeout(() => {
      setUploadProgress(30);
      setProcessingSteps((prev) => prev.map((s, i) => (i === 0 ? { ...s, done: true } : s)));
    }, 600);

    setTimeout(() => {
      setUploadProgress(55);
      setProcessingSteps((prev) => prev.map((s, i) => (i <= 1 ? { ...s, done: true } : s)));
    }, 1200);

    setTimeout(() => {
      setUploadProgress(75);
      setProcessingSteps((prev) => prev.map((s, i) => (i <= 2 ? { ...s, done: true } : s)));
    }, 1800);

    setTimeout(() => {
      setUploadProgress(90);
      setProcessingSteps((prev) => prev.map((s, i) => (i <= 3 ? { ...s, done: true } : s)));
    }, 2400);

    setTimeout(() => {
      setUploadProgress(100);
      setProcessingSteps((prev) => prev.map((s) => ({ ...s, done: true })));

      const newDoc = {
        id: `DOC-0${filesLibrary.length + 1}`,
        filename: fileName || "New_Municipal_Doc.pdf",
        uploadDate: "13 August 2026",
        status: "Indexed",
        statusColor: "text-[#00A68E] bg-[#00A68E]/10 border-[#00A68E]/30",
        extractedRecords: 142,
        departments: ["Capital Infrastructure", "Planning"],
        relatedProjects: 6,
        size: "3.4 MB",
        fileType: fileType || "PDF",
        contributionSummary: "Newly ingested data source indexed into CivicMirror Administrative Intelligence knowledge graph."
      };

      setFilesLibrary((prev) => [newDoc, ...prev]);
      setIsUploading(false);
    }, 3000);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const ext = file.name.split(".").pop().toUpperCase();
      handleSimulateUpload(file.name, ext);
    }
  };

  const handleDeleteFile = (id) => {
    if (confirm("Are you sure you want to delete/archive this municipal data document?")) {
      setFilesLibrary((prev) => prev.filter((f) => f.id !== id));
      if (selectedFileModal?.id === id) setSelectedFileModal(null);
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
              DATA INGESTION & EXPLAINABLE KNOWLEDGE GRAPH
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#0D1B2A]">
            14. MUNICIPAL DATA UPLOAD
          </h1>
          <p className="text-xs font-semibold text-[#4B5563]">
            Dedicated data ingestion screen for uploading municipal budgets, work orders, CSV data, and engineering reports.
          </p>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#00A68E]/10 px-3.5 py-1 text-xs font-extrabold text-[#00A68E] border border-[#00A68E]/20">
            <span className="h-2 w-2 rounded-full bg-[#00A68E] animate-pulse" />
            Knowledge Engine Active
          </span>
        </div>
      </div>

      {/* Grid: 14. Drag & Drop Upload Zone & 15. Real-time Processing Pipeline */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

        {/* 14. DRAG & DROP UPLOAD ZONE (7 Columns) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-[#D6E6F7] pb-4">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#1E4FA3]">
                MUNICIPAL DATA
              </span>
              <h3 className="text-lg font-black text-[#0D1B2A]">
                Upload Municipal Information
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Supported formats: <strong className="text-[#0D1B2A]">PDF • CSV • XLSX</strong>
              </p>
            </div>

            {/* Drop Zone Box */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="mt-5 relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2D7FF9]/40 bg-[#FAFAFC] p-8 text-center transition-all hover:border-[#2D7FF9] hover:bg-slate-50"
            >
              <input
                type="file"
                accept=".pdf,.csv,.xlsx"
                onChange={handleFileDrop}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div className="rounded-full bg-[#2D7FF9]/10 p-4 text-[#2D7FF9] mb-3">
                <span className="text-2xl">↑</span>
              </div>

              <p className="text-sm font-black text-[#0D1B2A]">
                Upload or Drag & Drop Files Here
              </p>
              <p className="mt-1 text-xs text-slate-400 font-medium">
                PDF • CSV • XLSX (Max file size 25MB)
              </p>
            </div>
          </div>

          {/* Quick Demo Upload Buttons */}
          <div className="mt-6 border-t border-[#D6E6F7] pt-4">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
              Demo File Ingestion Presets:
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-extrabold">
              <button
                disabled={isUploading}
                onClick={() => handleSimulateUpload("Master_Budget_2026.pdf", "PDF")}
                className="rounded-lg border border-[#D6E6F7] bg-[#FAFAFC] px-3 py-1.5 text-[#2D7FF9] hover:bg-slate-100 disabled:opacity-50"
              >
                + Ingest Budget_2026.pdf
              </button>

              <button
                disabled={isUploading}
                onClick={() => handleSimulateUpload("Sector_Roads_Log.csv", "CSV")}
                className="rounded-lg border border-[#D6E6F7] bg-[#FAFAFC] px-3 py-1.5 text-[#00A68E] hover:bg-slate-100 disabled:opacity-50"
              >
                + Ingest RoadProjects.csv
              </button>

              <button
                disabled={isUploading}
                onClick={() => handleSimulateUpload("Electrical_WorkOrders.xlsx", "XLSX")}
                className="rounded-lg border border-[#D6E6F7] bg-[#FAFAFC] px-3 py-1.5 text-amber-600 hover:bg-slate-100 disabled:opacity-50"
              >
                + Ingest WorkOrders.xlsx
              </button>
            </div>
          </div>
        </div>

        {/* 15. UPLOAD PROCESSING PIPELINE STEPPER (5 Columns) */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0D1B2A] p-6 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8DBBFF]">
                  15. UPLOAD PROCESSING
                </span>
                <h3 className="text-base font-black text-white">
                  Knowledge Ingestion Pipeline
                </h3>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-mono font-black uppercase ${
                isUploading ? "bg-amber-500/20 text-amber-300 animate-pulse" : "bg-emerald-500/20 text-emerald-300"
              }`}>
                {isUploading ? "PROCESSING..." : "READY"}
              </span>
            </div>

            {/* Stepper Checklist */}
            <div className="mt-5 space-y-3 font-mono text-xs">
              {processingSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between rounded-xl p-3 border transition-all ${
                    step.done
                      ? "bg-white/10 border-emerald-500/30 text-white"
                      : "bg-white/5 border-white/5 text-white/40"
                  }`}
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <span>{step.done ? "✓" : "○"}</span>
                    <span>{step.label}</span>
                  </span>
                  <span className="text-[10px] text-white/50">{step.done ? "DONE" : "WAITING"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-xs font-mono font-extrabold mb-1">
              <span className="text-white/60">Extraction Status</span>
              <span className="text-[#8DBBFF]">{uploadProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="h-full bg-[#2D7FF9] transition-all duration-300"
              />
            </div>
          </div>
        </div>

      </div>

      {/* 16. MUNICIPAL DATA LIBRARY */}
      <div className="rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#D6E6F7] pb-5">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#2D7FF9]">
              16. MUNICIPAL DATA LIBRARY
            </span>
            <h2 className="text-xl font-black text-[#0D1B2A]">
              Uploaded Municipal Data Repository ({filesLibrary.length})
            </h2>
            <p className="text-xs text-slate-400 font-medium">Admin can view, download, archive, or inspect knowledge contribution of files.</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex rounded-lg bg-[#FAFAFC] border border-[#D6E6F7] p-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-md px-3 py-1.5 ${activeTab === "all" ? "bg-[#0D1B2A] text-white" : "text-[#4B5563]"}`}
            >
              All Files ({filesLibrary.length})
            </button>
            <button
              onClick={() => setActiveTab("PDF")}
              className={`rounded-md px-3 py-1.5 ${activeTab === "PDF" ? "bg-[#2D7FF9] text-white" : "text-[#4B5563]"}`}
            >
              PDFs
            </button>
            <button
              onClick={() => setActiveTab("CSV")}
              className={`rounded-md px-3 py-1.5 ${activeTab === "CSV" ? "bg-[#00A68E] text-white" : "text-[#4B5563]"}`}
            >
              CSVs
            </button>
            <button
              onClick={() => setActiveTab("XLSX")}
              className={`rounded-md px-3 py-1.5 ${activeTab === "XLSX" ? "bg-[#D97706] text-white" : "text-[#4B5563]"}`}
            >
              Spreadsheets
            </button>
          </div>
        </div>

        {/* Files Grid / List */}
        <div className="mt-5 space-y-3">
          {filesLibrary
            .filter((f) => activeTab === "all" || f.fileType === activeTab)
            .map((file) => (
              <div
                key={file.id}
                className="flex flex-col gap-4 rounded-xl border border-[#D6E6F7] bg-[#FAFAFC] p-4 text-xs sm:flex-row sm:items-center sm:justify-between transition-all hover:bg-slate-50 hover:border-[#2D7FF9]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1B2A] text-white font-mono font-black text-xs shrink-0">
                    {file.fileType}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-[#0D1B2A] text-sm">{file.filename}</h4>
                      <span className={`rounded border px-2 py-0.5 text-[10px] font-black uppercase ${file.statusColor}`}>
                        ✓ {file.status}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-slate-400 font-semibold text-[11px]">
                      <span>Uploaded: <strong className="text-[#0D1B2A]">{file.uploadDate}</strong></span>
                      <span>•</span>
                      <span>Extracted Records: <strong className="text-[#2D7FF9] font-mono">{file.extractedRecords}</strong></span>
                      <span>•</span>
                      <span>Size: <strong>{file.size}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedFileModal(file)}
                    className="rounded-lg bg-[#2D7FF9] px-3.5 py-1.5 font-extrabold text-white hover:bg-[#1E4FA3]"
                  >
                    Inspect Knowledge →
                  </button>

                  <button
                    className="rounded-lg border border-[#D6E6F7] bg-white px-3 py-1.5 font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Download ⬇
                  </button>

                  <button
                    onClick={() => handleDeleteFile(file.id)}
                    className="rounded-lg border border-red-200 bg-white px-2.5 py-1.5 font-extrabold text-[#FF5252] hover:bg-red-50"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* DOCUMENT KNOWLEDGE CONTRIBUTION MODAL */}
      {selectedFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B2A]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-[#D6E6F7] bg-white p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#D6E6F7] pb-4">
              <div>
                <span className="font-mono text-xs font-black text-[#2D7FF9] uppercase">
                  Document Knowledge Metadata
                </span>
                <h3 className="text-xl font-black text-[#0D1B2A] uppercase">{selectedFileModal.filename}</h3>
              </div>
              <button
                onClick={() => setSelectedFileModal(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Document Attributes */}
            <div className="my-5 space-y-4 text-xs text-[#0D1B2A]">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Uploaded Date</span>
                  <span className="font-extrabold text-[#0D1B2A] text-sm">{selectedFileModal.uploadDate}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Indexing Status</span>
                  <span className="font-extrabold text-[#00A68E] text-sm">✓ {selectedFileModal.status}</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Records Extracted</span>
                  <span className="font-mono text-lg font-black text-[#2D7FF9]">{selectedFileModal.extractedRecords} records</span>
                </div>

                <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                  <span className="text-slate-400 block font-semibold">Related Capital Projects</span>
                  <span className="font-mono text-lg font-black text-[#0D1B2A]">{selectedFileModal.relatedProjects} projects</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#FAFAFC] p-3 border border-[#D6E6F7]">
                <span className="text-slate-400 block font-semibold mb-1">Related Municipal Departments</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFileModal.departments.map((dept, i) => (
                    <span key={i} className="rounded bg-[#2D7FF9]/10 px-2.5 py-1 font-bold text-[#2D7FF9]">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-[#0D1B2A] p-4 text-white">
                <span className="text-[10px] font-black uppercase text-[#8DBBFF] block mb-1">
                  How Document Contributes to CivicMirror Knowledge:
                </span>
                <p className="text-xs font-semibold leading-relaxed text-white/90">
                  "{selectedFileModal.contributionSummary}"
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 border-t border-[#D6E6F7] pt-4">
              <button
                onClick={() => setSelectedFileModal(null)}
                className="rounded-lg border border-[#D6E6F7] px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
