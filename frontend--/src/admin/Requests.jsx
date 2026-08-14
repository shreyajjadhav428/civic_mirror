import React, { useState, useEffect } from "react";
import { getAdminInquiries, getComplaintClusters, updateComplaintStatus } from "../api/admin.api";

export default function Requests() {
  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All Time");
  const [selectedFlagged, setSelectedFlagged] = useState("All");

  // Selected Request Modal State
  const [selectedRequestModal, setSelectedRequestModal] = useState(null);
  const [showAiExplanation, setShowAiExplanation] = useState(false);
  const [loading, setLoading] = useState(true);

  // Request Data Library (Built around backend cluster/inquiry structure + fallback specs)
  const [requestsList, setRequestsList] = useState([
    {
      id: "REQ-1001",
      request: "Streetlight near my house hasn't worked for three days.",
      title: "Streetlight not working",
      category: "Streetlight",
      pincode: "110025",
      area: "Shanti Nagar",
      status: "Pending",
      priority: "High",
      submittedDate: "12 Aug 2026",
      flagged: false,
      aiAnalysis: {
        relatedProject: "Electrical Maintenance Phase II",
        evidenceCount: "4 records",
        explanation: "Cross-referenced against work order DB and transformer telemetry logs. 4 related citizen tickets logged in Pincode 110025 within 72 hours. Correlated with active capital project PRJ-02 (Smart LED Streetlight Grid)."
      }
    },
    {
      id: "REQ-1002",
      request: "Deep potholes and asphalt erosion near Sector 12 main junction causing traffic jams.",
      title: "Road damage",
      category: "Road",
      pincode: "110025",
      area: "Sector 12",
      status: "In Progress",
      priority: "Medium",
      submittedDate: "11 Aug 2026",
      flagged: false,
      aiAnalysis: {
        relatedProject: "Sector 12 Road Resurfacing Campaign",
        evidenceCount: "8 records",
        explanation: "Correlated with GIS contractor work schedule for Sector 12 resurfacing. Sub-contractor patch team assigned to Ward 4."
      }
    },
    {
      id: "REQ-1003",
      request: "Major underground pipeline leak causing water logging in Green Park block C.",
      title: "Water leakage",
      category: "Water",
      pincode: "110026",
      area: "Green Park Ward 9",
      status: "Resolved",
      priority: "Low",
      submittedDate: "10 Aug 2026",
      flagged: false,
      aiAnalysis: {
        relatedProject: "High-Pressure Main Pipeline Upgrade",
        evidenceCount: "12 records",
        explanation: "Pressure sensor telemetry confirmed pressure stabilization following valve replacement at Ward 9 pump station."
      }
    },
    {
      id: "REQ-1004",
      request: "Uncollected garbage bins overflowing along market area for over 48 hours.",
      title: "Garbage accumulation",
      category: "Sanitation",
      pincode: "400012",
      area: "Central Market",
      status: "Pending",
      priority: "High",
      submittedDate: "13 Aug 2026",
      flagged: true,
      aiAnalysis: {
        relatedProject: "Zero-Waste Segregation Drive",
        evidenceCount: "6 records",
        explanation: "Identified shift discrepancy in sanitation truck routing log #ST-402. Flagged for urgent municipal inspector review."
      }
    },
    {
      id: "REQ-1005",
      request: "Sparking electric transformer near Sector 8 community hall.",
      title: "Transformer hazard",
      category: "Electrical",
      pincode: "400008",
      area: "Sector 8",
      status: "In Progress",
      priority: "High",
      submittedDate: "14 Aug 2026",
      flagged: true,
      aiAnalysis: {
        relatedProject: "Substation Grid Overhaul Phase I",
        evidenceCount: "5 records",
        explanation: "High-priority safety hazard flagged by emergency AI classifier. Field repair team dispatched under work order #EO-991."
      }
    }
  ]);

  // Load backend data if available
  useEffect(() => {
    let isMounted = true;
    async function loadBackendRequests() {
      setLoading(true);
      try {
        const res = await getAdminInquiries();
        if (isMounted && res?.data?.inquiries?.length > 0) {
          const mapped = res.data.inquiries.map((inq, idx) => ({
            id: inq.id || `REQ-10${idx + 1}`,
            request: inq.topic || "Citizen civic issue report.",
            title: inq.topic ? inq.topic.split(" ").slice(0, 4).join(" ") : "Civic Request",
            category: inq.department ? inq.department.split(" ")[0] : "General",
            pincode: inq.pincode || "110025",
            area: inq.citizen ? `${inq.citizen}'s Ward` : "Municipal Area",
            status: inq.aiStatus === "Verified" ? "In Progress" : inq.aiStatus === "Flagged" ? "Pending" : "Pending",
            priority: inq.aiStatus === "Flagged" ? "High" : "Medium",
            submittedDate: inq.date || "14 Aug 2026",
            flagged: inq.aiStatus === "Flagged",
            aiAnalysis: {
              relatedProject: `${inq.department || "Municipal Operations"} Project`,
              evidenceCount: `${Math.floor(Math.random() * 8) + 2} records`,
              explanation: inq.summary || "AI cross-referenced inquiry log against municipal database records."
            }
          }));
          setRequestsList(mapped);
        }
      } catch (err) {
        console.warn("Backend request fetch notice:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadBackendRequests();
    return () => { isMounted = false; };
  }, []);

  // Filter Logic
  const filteredRequests = requestsList.filter((req) => {
    const matchesSearch =
      req.request.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPincode = selectedPincode === "All" || req.pincode === selectedPincode;
    const matchesCategory = selectedCategory === "All" || req.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesStatus = selectedStatus === "All" || req.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesFlagged =
      selectedFlagged === "All" ||
      (selectedFlagged === "Flagged" && req.flagged) ||
      (selectedFlagged === "Unflagged" && !req.flagged);

    return matchesSearch && matchesPincode && matchesCategory && matchesStatus && matchesFlagged;
  });

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Medium":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Low":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "In Progress":
        return "bg-blue-50 text-[#2D7FF9] border-blue-200";
      case "Resolved":
        return "bg-teal-50 text-[#008D78] border-teal-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const handleStatusChange = async (reqId, newStatus) => {
    setRequestsList((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: newStatus } : r))
    );
    if (selectedRequestModal && selectedRequestModal.id === reqId) {
      setSelectedRequestModal((prev) => ({ ...prev, status: newStatus }));
    }
    try {
      await updateComplaintStatus(reqId, { status: newStatus });
    } catch (e) {
      console.warn("Backend update status error:", e);
    }
  };

  return (
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* 1. HEADER BANNER MATCHING SPECIFICATION */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />
        
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              <span className="h-[3px] w-6 bg-[#2D7FF9] rounded-full inline-block" />
              REQUEST INTELLIGENCE
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight">
              Citizen <span className="text-[#2D7FF9]">Requests</span>
            </h1>
            <p className="mt-2 text-lg font-semibold text-[#59687A]">
              Monitor and investigate incoming civic requests in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-3.5 text-base font-semibold">
              <span className="text-[#657386] block text-xs font-black uppercase tracking-wider">Active Requests</span>
              <span className="text-[#0D1B2A] font-black font-mono text-xl">{filteredRequests.length} Filtered</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & USEFUL FILTERS SECTION */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
          {/* Search Requests Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search requests by description, title, area, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4.5 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-[#2D7FF9] focus:bg-white transition"
            />
          </div>

          {/* Quick Filter Counts */}
          <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
            <span>Showing {filteredRequests.length} of {requestsList.length} requests</span>
          </div>
        </div>

        {/* Useful Filters Bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs font-bold">
          <span className="text-slate-400 uppercase font-mono tracking-wider">Useful Filters:</span>

          {/* Pincode Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-slate-500">Pincode:</span>
            <select
              value={selectedPincode}
              onChange={(e) => setSelectedPincode(e.target.value)}
              className="bg-transparent font-extrabold text-[#0D1B2A] outline-none cursor-pointer"
            >
              <option value="All">All Pincodes</option>
              <option value="110025">110025</option>
              <option value="110026">110026</option>
              <option value="400012">400012</option>
              <option value="400008">400008</option>
            </select>
          </div>

          {/* Issue Category Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-slate-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent font-extrabold text-[#0D1B2A] outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Streetlight">Streetlight</option>
              <option value="Road">Road</option>
              <option value="Water">Water</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-slate-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent font-extrabold text-[#0D1B2A] outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-slate-500">Date:</span>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent font-extrabold text-[#0D1B2A] outline-none cursor-pointer"
            >
              <option value="All Time">All Time</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>

          {/* Flagged Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-slate-500">Flagged:</span>
            <select
              value={selectedFlagged}
              onChange={(e) => setSelectedFlagged(e.target.value)}
              className="bg-transparent font-extrabold text-[#0D1B2A] outline-none cursor-pointer"
            >
              <option value="All">All Requests</option>
              <option value="Flagged">Flagged Only</option>
              <option value="Unflagged">Unflagged</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(selectedPincode !== "All" || selectedCategory !== "All" || selectedStatus !== "All" || selectedFlagged !== "All" || searchQuery !== "") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedPincode("All");
                setSelectedCategory("All");
                setSelectedStatus("All");
                setSelectedDate("All Time");
                setSelectedFlagged("All");
              }}
              className="text-[#2D7FF9] hover:underline font-extrabold ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 3. REQUEST LIST TABLE MATCHING SPECIFICATION */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-black tracking-widest text-slate-400 uppercase">
            <span className="h-[3px] w-6 bg-slate-300 rounded-full inline-block" />
            REQUEST LIST
          </p>
          <span className="text-xs font-semibold text-slate-400">Click any request to view details & AI evidence</span>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs overflow-hidden">
          <div className="overflow-x-auto rounded-xl border border-slate-200/70">
            <table className="w-full text-left text-base">
              <thead className="bg-slate-50/80 text-xs font-black text-slate-500 uppercase border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4">Request</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Pincode</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs font-semibold text-slate-400">
                      No citizen requests match your current search or filter parameters.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setSelectedRequestModal(item);
                        setShowAiExplanation(false);
                      }}
                      className="hover:bg-slate-50/80 transition cursor-pointer group"
                    >
                      <td className="px-5 py-4.5">
                        <div className="flex items-center gap-3">
                          {item.flagged && (
                            <span className="text-amber-500 text-sm" title="AI Flagged Request">🚩</span>
                          )}
                          <div>
                            <span className="font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition text-base block">
                              {item.title}
                            </span>
                            <span className="text-slate-400 text-xs font-semibold line-clamp-1 max-w-md">
                              {item.request}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4.5 text-slate-700 font-extrabold text-sm">
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-800 font-bold border border-slate-200">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-5 py-4.5 font-mono font-black text-slate-800 text-sm">
                        {item.pincode}
                      </td>
                      <td className="px-5 py-4.5">
                        <span className={`inline-block rounded-md border px-2.5 py-1 text-xs font-black uppercase ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4.5">
                        <span className={`inline-block rounded-md border px-2.5 py-1 text-xs font-black uppercase ${getPriorityStyle(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. REQUEST CARD / DETAIL MODAL MATCHING SPECIFICATION */}
      {selectedRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-black text-[#2D7FF9] uppercase tracking-wider block mb-0.5">
                  CITIZEN REQUEST DETAIL ({selectedRequestModal.id})
                </span>
                <h3 className="text-2xl font-black text-[#0D1B2A]">{selectedRequestModal.title}</h3>
              </div>
              <button
                onClick={() => setSelectedRequestModal(null)}
                className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-800 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* REQUEST Content Block */}
            <div className="space-y-4 text-sm text-[#0D1B2A]">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <span className="text-xs font-black text-slate-400 uppercase block mb-1.5">REQUEST</span>
                <p className="font-semibold text-slate-800 leading-relaxed text-base">
                  "{selectedRequestModal.request}"
                </p>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Category</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedRequestModal.category}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Pincode</span>
                  <span className="font-mono font-extrabold text-[#0D1B2A]">{selectedRequestModal.pincode}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Area</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedRequestModal.area}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 flex flex-col justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Status</span>
                  <select
                    value={selectedRequestModal.status}
                    onChange={(e) => handleStatusChange(selectedRequestModal.id, e.target.value)}
                    className={`w-full rounded-md border px-2 py-1 text-xs font-black uppercase outline-none cursor-pointer transition focus:ring-2 ${getStatusStyle(selectedRequestModal.status)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 col-span-2">
                  <span className="text-xs font-black text-slate-400 uppercase block mb-1">Submitted</span>
                  <span className="font-extrabold text-[#0D1B2A]">{selectedRequestModal.submittedDate}</span>
                </div>
              </div>

              {/* AI ANALYSIS SECTION MATCHING SPECIFICATION */}
              {selectedRequestModal.aiAnalysis && (
                <div className="rounded-2xl border border-slate-800 bg-[#0D1B2A] p-5 text-white shadow-md space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    AI ANALYSIS
                  </span>

                  <div className="space-y-1 text-sm">
                    <span className="text-slate-400 text-xs font-semibold block">Related project</span>
                    <span className="font-bold text-[#2D7FF9] text-base block">{selectedRequestModal.aiAnalysis.relatedProject}</span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <span className="text-slate-400 text-xs font-semibold block">Evidence</span>
                    <span className="font-mono font-extrabold text-white text-sm">{selectedRequestModal.aiAnalysis.evidenceCount}</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setShowAiExplanation(!showAiExplanation)}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-white hover:text-[#0D1B2A] transition"
                    >
                      [ {showAiExplanation ? "Hide Explanation" : "View Explanation"} ]
                    </button>
                  </div>

                  {showAiExplanation && (
                    <div className="mt-3 pt-3 border-t border-slate-800 text-xs font-medium text-slate-300 leading-relaxed animate-fadeIn">
                      <span className="text-amber-400 font-mono font-bold uppercase tracking-wider block mb-1">
                        AI Reasoning & Vector Correlation:
                      </span>
                      <p>"{selectedRequestModal.aiAnalysis.explanation}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedRequestModal(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-50"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
