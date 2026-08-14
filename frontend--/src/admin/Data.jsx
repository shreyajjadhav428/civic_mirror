import React, { useState } from "react";

export default function Data() {
  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Modal State for Inspecting Document
  const [selectedFileModal, setSelectedFileModal] = useState(null);

  // Upload Pipeline States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState("");
  const [processingSteps, setProcessingSteps] = useState([
    { label: "File uploaded to secure municipal storage", done: false },
    { label: "Extracting tabular & text records", done: false },
    { label: "Classifying departments & project references", done: false },
    { label: "Vector indexing into CivicMirror Knowledge Graph", done: false },
  ]);

  // Municipal Data Library items
  const [filesLibrary, setFilesLibrary] = useState([
    {
      id: "DOC-01",
      filename: "Budget_2026.pdf",
      updatedDate: "12 Aug 2026",
      status: "Indexed",
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      extractedRecords: 428,
      departments: ["Engineering", "Electrical", "Water"],
      relatedProjects: 17,
      size: "4.2 MB",
      fileType: "PDF",
      icon: "📄",
      topAccent: "bg-[#2D7FF9]",
      btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
      contributionSummary: "Provides capital budget cap limits and line-item allocations for municipal infrastructure projects across all city wards."
    },
    {
      id: "DOC-02",
      filename: "RoadProjects.csv",
      updatedDate: "12 Aug 2026",
      status: "Indexed",
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      extractedRecords: 194,
      departments: ["Engineering & Road Ops"],
      relatedProjects: 8,
      size: "1.1 MB",
      fileType: "CSV",
      icon: "📊",
      topAccent: "bg-[#00A68E]",
      btnHover: "hover:bg-[#00A68E] hover:border-[#00A68E] hover:text-white",
      contributionSummary: "Contains geospatial coordinates and contractor work schedules for Sector 12 and Shanti Nagar resurfacing campaigns."
    },
    {
      id: "DOC-03",
      filename: "WorkOrders.xlsx",
      updatedDate: "11 Aug 2026",
      status: "Indexed",
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      extractedRecords: 312,
      departments: ["Electrical Works", "Water Supply"],
      relatedProjects: 12,
      size: "2.8 MB",
      fileType: "XLSX",
      icon: "📋",
      topAccent: "bg-[#FFC107]",
      btnHover: "hover:bg-[#FFC107] hover:border-[#FFC107] hover:text-[#0D1B2A]",
      contributionSummary: "Aggregates historical streetlight maintenance tickets and transformer component inventory logs."
    },
    {
      id: "DOC-04",
      filename: "Zoning_Ordinance_2026.pdf",
      updatedDate: "10 Aug 2026",
      status: "Indexed",
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      extractedRecords: 156,
      departments: ["Urban Planning", "Zoning Compliance"],
      relatedProjects: 6,
      size: "6.4 MB",
      fileType: "PDF",
      icon: "📄",
      topAccent: "bg-[#2D7FF9]",
      btnHover: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
      contributionSummary: "Municipal building codes, setbacks, and commercial zoning boundaries for ward development."
    },
    {
      id: "DOC-05",
      filename: "Infrastructure_Grants.csv",
      updatedDate: "08 Aug 2026",
      status: "Indexed",
      statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
      extractedRecords: 89,
      departments: ["Finance", "Public Works"],
      relatedProjects: 4,
      size: "890 KB",
      fileType: "CSV",
      icon: "📊",
      topAccent: "bg-[#00A68E]",
      btnHover: "hover:bg-[#00A68E] hover:border-[#00A68E] hover:text-white",
      contributionSummary: "State and federal civic development grant disbursals allocated to stormwater drain upgrades."
    },
    {
      id: "DOC-06",
      filename: "Environmental_Report_Q2.xlsx",
      updatedDate: "05 Aug 2026",
      status: "Processing",
      statusStyle: "bg-amber-50 text-amber-700 border-amber-200",
      extractedRecords: 74,
      departments: ["Environmental Protection"],
      relatedProjects: 3,
      size: "3.5 MB",
      fileType: "XLSX",
      icon: "📋",
      topAccent: "bg-[#6366F1]",
      btnHover: "hover:bg-[#6366F1] hover:border-[#6366F1] hover:text-white",
      contributionSummary: "Quarterly groundwater quality, noise density, and air index metrics currently undergoing vector embedding."
    }
  ]);

  // Handle File Ingestion
  const handleUploadSimulate = (fileName, fileType) => {
    setIsUploading(true);
    setUploadProgress(15);
    setUploadSuccessMsg("");
    setProcessingSteps([
      { label: "File uploaded to secure municipal storage", done: false },
      { label: "Extracting tabular & text records", done: false },
      { label: "Classifying departments & project references", done: false },
      { label: "Vector indexing into CivicMirror Knowledge Graph", done: false },
    ]);

    setTimeout(() => {
      setUploadProgress(40);
      setProcessingSteps((prev) => prev.map((s, i) => (i === 0 ? { ...s, done: true } : s)));
    }, 600);

    setTimeout(() => {
      setUploadProgress(65);
      setProcessingSteps((prev) => prev.map((s, i) => (i <= 1 ? { ...s, done: true } : s)));
    }, 1200);

    setTimeout(() => {
      setUploadProgress(85);
      setProcessingSteps((prev) => prev.map((s, i) => (i <= 2 ? { ...s, done: true } : s)));
    }, 1800);

    setTimeout(() => {
      setUploadProgress(100);
      setProcessingSteps((prev) => prev.map((s) => ({ ...s, done: true })));

      const typeExt = fileType || (fileName.endsWith(".csv") ? "CSV" : fileName.endsWith(".xlsx") ? "XLSX" : "PDF");
      const iconMap = { PDF: "📄", CSV: "📊", XLSX: "📋" };
      const accentMap = { PDF: "bg-[#2D7FF9]", CSV: "bg-[#00A68E]", XLSX: "bg-[#FFC107]" };
      const hoverMap = {
        PDF: "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
        CSV: "hover:bg-[#00A68E] hover:border-[#00A68E] hover:text-white",
        XLSX: "hover:bg-[#FFC107] hover:border-[#FFC107] hover:text-[#0D1B2A]"
      };

      const newDoc = {
        id: `DOC-0${filesLibrary.length + 1}`,
        filename: fileName || "New_Municipal_Document.pdf",
        updatedDate: "14 Aug 2026",
        status: "Indexed",
        statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
        extractedRecords: Math.floor(Math.random() * 200) + 100,
        departments: ["Capital Works", "Infrastructure Ops"],
        relatedProjects: Math.floor(Math.random() * 8) + 2,
        size: "3.8 MB",
        fileType: typeExt,
        icon: iconMap[typeExt] || "📄",
        topAccent: accentMap[typeExt] || "bg-[#2D7FF9]",
        btnHover: hoverMap[typeExt] || "hover:bg-[#2D7FF9] hover:border-[#2D7FF9] hover:text-white",
        contributionSummary: "Newly ingested document parsed and vector indexed into CivicMirror Administrative Intelligence knowledge graph."
      };

      setFilesLibrary((prev) => [newDoc, ...prev]);
      setIsUploading(false);
      setUploadSuccessMsg(`Successfully uploaded & indexed "${newDoc.filename}"!`);
    }, 2400);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const ext = file.name.split(".").pop().toUpperCase();
      handleUploadSimulate(file.name, ext);
    }
  };

  // Filtering Logic
  const filteredFiles = filesLibrary.filter((file) => {
    const matchesSearch =
      file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.fileType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.departments.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType =
      selectedFileType === "All" || file.fileType === selectedFileType;

    const matchesStatus =
      selectedStatus === "All" || file.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* 1. HEADER BANNER */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        {/* Top Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              <span className="h-[3px] w-6 bg-[#2D7FF9] rounded-full inline-block" />
              MUNICIPAL DATA
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight">
              Municipal <span className="text-[#2D7FF9]">Knowledge</span>
            </h1>
            <p className="mt-2 text-lg font-semibold text-[#59687A] max-w-2xl">
              Documents currently available to CivicMirror AI.
            </p>

            {/* Accent Line Dashes */}
            <div className="flex items-center gap-2 mt-4">
              <span className="h-1.5 w-7 rounded-full bg-[#2D7FF9]" />
              <span className="h-1.5 w-7 rounded-full bg-[#00A68E]" />
              <span className="h-1.5 w-7 rounded-full bg-[#FFC107]" />
              <span className="h-1.5 w-7 rounded-full bg-[#FF5252]" />
            </div>
          </div>

          {/* Stat Box */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-3 text-base font-semibold">
              <span className="text-[#657386] block text-xs font-black uppercase tracking-wider">Indexed Knowledge</span>
              <span className="text-[#0D1B2A] font-black font-mono text-xl">{filteredFiles.length} Ingested Documents</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. INLINE UPLOAD DOCUMENT SECTION (CENTERED) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xs space-y-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="flex items-center justify-center gap-2 text-xs font-black tracking-widest text-[#2D7FF9] uppercase mb-1">
            <span className="h-2 w-2 rounded-full bg-[#2D7FF9]" />
            DOCUMENT INGESTION
          </p>
          <h2 className="text-2xl font-black text-[#0D1B2A]">
            Upload Municipal Document
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Drag and drop or select files to update CivicMirror AI knowledge base. Supported formats: <strong>PDF • CSV • XLSX</strong>
          </p>
        </div>

        {/* Centered Drag & Drop Zone */}
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2D7FF9]/40 bg-slate-50/70 p-10 text-center transition-all hover:border-[#2D7FF9] hover:bg-slate-100/60 relative">
          <input
            type="file"
            accept=".pdf,.csv,.xlsx"
            onChange={handleFileDrop}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />

          <div className="rounded-2xl bg-[#2D7FF9]/10 p-4 text-[#2D7FF9] mb-4">
            <span className="text-4xl">📤</span>
          </div>

          <h3 className="text-xl font-black text-[#0D1B2A]">
            Drag & Drop Municipal Files Here
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-1 max-w-sm">
            Upload budget spreadsheets, work orders, or engineering PDFs (Max size 25MB)
          </p>

          <div className="mt-6">
            <span className="rounded-xl bg-[#2D7FF9] px-7 py-3 text-xs font-black text-white shadow-sm hover:bg-[#1E4FA3] transition inline-block">
              Browse Files
            </span>
          </div>
        </div>

        {/* Ingestion Progress or Success Feedback */}
        {isUploading && (
          <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-[#0D1B2A]">Uploading & Vector Indexing...</span>
              <span className="text-[#2D7FF9]">{uploadProgress}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="h-full bg-[#2D7FF9] transition-all duration-300"
              />
            </div>
          </div>
        )}

        {uploadSuccessMsg && (
          <div className="max-w-2xl mx-auto rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-extrabold text-emerald-800 flex items-center justify-between">
            <span>✓ {uploadSuccessMsg}</span>
            <span className="font-mono text-[10px] text-emerald-600 uppercase">Indexed into Knowledge Graph</span>
          </div>
        )}
      </div>

      {/* 3. DATA LIBRARY GRID WITH FILTERS */}
      <div className="space-y-4">
        {/* Header & Filter Bar */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4.5 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-[#2D7FF9] focus:bg-white transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Type Filter */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm font-bold">
              <span className="text-slate-500">Type:</span>
              <div className="flex items-center gap-1">
                {["All", "PDF", "CSV", "XLSX"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFileType(type)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-black transition ${
                      selectedFileType === type
                        ? "bg-[#0D1B2A] text-white"
                        : "text-slate-600 hover:bg-slate-200/60"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm font-bold">
              <span className="text-slate-500">Status:</span>
              <div className="flex items-center gap-1">
                {["All", "Indexed", "Processing"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-black transition ${
                      selectedStatus === st
                        ? "bg-[#2D7FF9] text-white"
                        : "text-slate-600 hover:bg-slate-200/60"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* List Header Count */}
        <div className="flex items-center justify-between pt-2">
          <p className="flex items-center gap-2 text-sm font-black tracking-widest text-slate-400 uppercase">
            <span className="h-[3px] w-6 bg-slate-300 rounded-full inline-block" />
            MUNICIPAL DATA LIBRARY
          </p>
          <span className="text-sm font-bold text-slate-500">
            Showing {filteredFiles.length} of {filesLibrary.length} documents
          </span>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-[#2D7FF9] hover:shadow-md overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className={`absolute top-0 left-0 w-14 h-1.5 ${file.topAccent} rounded-b`} />

              <div>
                {/* Header File Info */}
                <div className="flex items-start justify-between mb-3 pt-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{file.icon}</span>
                    <div>
                      <h3 className="text-lg font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors leading-tight">
                        {file.filename}
                      </h3>
                      <span className="text-xs font-semibold text-slate-400">
                        Updated {file.updatedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* File Details Box */}
                <div className="mt-4 rounded-xl bg-slate-50/70 p-4 border border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-500">Status</span>
                    <span className={`rounded-md border px-2.5 py-0.5 text-xs font-black uppercase ${file.statusStyle}`}>
                      ✓ {file.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-500">Extracted Records</span>
                    <span className="font-mono font-black text-[#0D1B2A]">
                      {file.extractedRecords} records
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-500">File Size</span>
                    <span className="font-semibold text-slate-700">{file.size}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedFileModal(file)}
                  className={`rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-black text-[#0D1B2A] ${file.btnHover} transition-all shadow-2xs`}
                >
                  Inspect Knowledge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. DOCUMENT INSPECTOR MODAL */}
      {selectedFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedFileModal.icon}</span>
                <div>
                  <span className="font-mono text-xs font-black text-[#2D7FF9] uppercase tracking-wider block mb-0.5">
                    DOCUMENT KNOWLEDGE METADATA
                  </span>
                  <h3 className="text-xl font-black text-[#0D1B2A]">{selectedFileModal.filename}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedFileModal(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-800 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Document Attributes */}
            <div className="space-y-4 text-sm text-[#0D1B2A]">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Updated Date</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedFileModal.updatedDate}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Indexing Status</span>
                  <span className={`inline-block rounded-md border px-2.5 py-0.5 text-xs font-black uppercase ${selectedFileModal.statusStyle}`}>
                    ✓ {selectedFileModal.status}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Records Extracted</span>
                  <span className="font-mono text-base font-black text-[#2D7FF9]">{selectedFileModal.extractedRecords} records</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Related Projects</span>
                  <span className="font-mono text-base font-black text-[#0D1B2A]">{selectedFileModal.relatedProjects} projects</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                <span className="text-xs font-black text-slate-400 uppercase block mb-1.5">Related Municipal Departments</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFileModal.departments.map((dept, i) => (
                    <span key={i} className="rounded-lg bg-[#2D7FF9]/10 border border-[#2D7FF9]/20 px-2.5 py-1 text-xs font-bold text-[#2D7FF9]">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0D1B2A] p-5 text-white shadow-md">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  How Document Contributes to CivicMirror Knowledge:
                </span>
                <p className="text-sm font-semibold leading-relaxed text-slate-200 mt-1">
                  "{selectedFileModal.contributionSummary}"
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedFileModal(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-50"
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
