import React, { useState, useEffect } from "react";
import { getAdminInquiries, getComplaintClusters, updateComplaintStatus } from "../api/admin.api";
import { OFFICIAL_DEPARTMENTS, normalizeDepartment } from "../constants/departments";

export default function Requests() {
  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All Time");
  const [selectedFlagged, setSelectedFlagged] = useState("All");

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(10);

  // Reset pagination when filters or search change
  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery, selectedPincode, selectedCategory, selectedStatus, selectedDate, selectedFlagged]);

  // Selected Request Modal State
  const [selectedRequestModal, setSelectedRequestModal] = useState(null);
  const [showAiExplanation, setShowAiExplanation] = useState(false);
  const [loading, setLoading] = useState(true);

  // Request Data Library (Populated dynamically from backend Supabase complaints table)
  const [requestsList, setRequestsList] = useState([]);

  // Load backend data on mount
  useEffect(() => {
    let isMounted = true;
    async function loadBackendRequests() {
      setLoading(true);
      try {
        const res = await getAdminInquiries();
        if (isMounted && res?.data?.inquiries) {
          const mapped = res.data.inquiries.map((inq, idx) => ({
            id: inq.id || `REQ-10${idx + 1}`,
            request: inq.topic || "Citizen civic issue report.",
            title: inq.topic ? (inq.topic.length > 45 ? inq.topic.slice(0, 45) + "..." : inq.topic) : "Civic Request",
            category: normalizeDepartment(inq.department || inq.category || inq.topic),
            pincode: inq.pincode || "110025",
            area: `Pincode ${inq.pincode || "110025"}`,
            status: inq.aiStatus === "Resolved" ? "Resolved" : inq.aiStatus === "In Progress" ? "In Progress" : "Pending",
            priority: inq.aiStatus === "Flagged" ? "High" : "Medium",
            submittedDate: inq.date || "Recent",
            flagged: inq.aiStatus === "Flagged" || Boolean(inq.admin_flagged),
            aiAnalysis: {
              relatedProject: `${inq.department || "Municipal Operations"} Project`,
              evidenceCount: `${inq.evidenceCount || 5} records`,
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

  // Extract all unique pincodes present in Clusters section and requests list
  const CLUSTER_PINCODES = ["110001", "110025", "110026", "400001", "400008", "400012", "422001"];
  const availablePincodes = [
    "All",
    ...Array.from(
      new Set([
        ...CLUSTER_PINCODES,
        ...requestsList.map((r) => r.pincode).filter(Boolean)
      ])
    ).sort()
  ];

  // Filter Logic
  const filteredRequests = requestsList.filter((req) => {
    const matchesSearch =
      req.request.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPincode = selectedPincode === "All" || req.pincode === selectedPincode;
    const matchesCategory =
      selectedCategory === "All" ||
      req.category.toLowerCase() === selectedCategory.toLowerCase() ||
      req.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(req.category.toLowerCase());
    const matchesStatus = selectedStatus === "All" || req.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesPincode && matchesCategory && matchesStatus;
  });

  // Paginated display slice
  const displayedRequests = filteredRequests.slice(0, visibleCount);

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
              <span className="text-[#0D1B2A] font-black text-xl">{filteredRequests.length} Filtered</span>
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
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#2D7FF9] focus:bg-white transition"
            />
          </div>

          {/* Quick Filter Counts */}
          <div className="text-[13px] font-bold text-slate-500 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
            <span>Showing {displayedRequests.length} of {filteredRequests.length} requests (Total: {requestsList.length})</span>
          </div>
        </div>

        {/* Useful Filters Bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-[13px] font-bold">
          <span className="text-slate-400 uppercase tracking-wider text-[11px]">Useful Filters:</span>

          {/* Pincode Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
            <span className="text-slate-500">Pincode:</span>
            <select
              value={selectedPincode}
              onChange={(e) => setSelectedPincode(e.target.value)}
              className="bg-transparent font-semibold text-[#0D1B2A] outline-none cursor-pointer"
            >
              {availablePincodes.map((pin) => (
                <option key={pin} value={pin}>
                  {pin === "All" ? "All Pincodes" : pin}
                </option>
              ))}
            </select>
          </div>

          {/* Issue Category Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
            <span className="text-slate-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent font-extrabold text-[#0D1B2A] outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              {OFFICIAL_DEPARTMENTS.map((dept) => (
                <option key={dept.name} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
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

          {/* Reset Filters */}
          {(selectedPincode !== "All" || selectedCategory !== "All" || selectedStatus !== "All" || searchQuery !== "") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedPincode("All");
                setSelectedCategory("All");
                setSelectedStatus("All");
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

        <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs space-y-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200/70">
            <table className="w-full text-left text-base">
              <thead className="bg-slate-50/80 text-[12px] font-black text-slate-500 uppercase border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4">Request</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Pincode</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                {displayedRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[12px] font-semibold text-slate-400">
                      No citizen requests match your current search or filter parameters.
                    </td>
                  </tr>
                ) : (
                  displayedRequests.map((item) => (
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
                          <div>
                            <span className="font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition text-[16px] leading-snug block">
                              {item.title}
                            </span>
                            <span className="text-slate-400 text-[12px] font-semibold line-clamp-1 max-w-md">
                              {item.request}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4.5 text-slate-700 font-extrabold text-[14px]">
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-800 font-bold border border-slate-200">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-5 py-4.5 font-black text-slate-800 text-[14px]">
                        {item.pincode}
                      </td>
                      <td className="px-5 py-4.5">
                        <span className={`inline-block rounded-md border px-2.5 py-1 text-[12px] font-black uppercase ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4.5">
                        <span className={`inline-block rounded-md border px-2.5 py-1 text-[12px] font-black uppercase ${getPriorityStyle(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Right-Aligned Show More / Show Less Link */}
          {filteredRequests.length > 10 && (
            <div className="flex justify-end pt-2 pr-2">
              {visibleCount < filteredRequests.length ? (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="text-[#2D7FF9] font-black text-sm hover:underline cursor-pointer bg-transparent border-none p-0 transition"
                >
                  Show More →
                </button>
              ) : (
                <button
                  onClick={() => setVisibleCount(10)}
                  className="text-[#2D7FF9] font-black text-sm hover:underline cursor-pointer bg-transparent border-none p-0 transition"
                >
                  Show Less ↑
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. REQUEST CARD / DETAIL MODAL MATCHING SPECIFICATION */}
      {selectedRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-black text-[#2D7FF9] uppercase tracking-wider block mb-0.5">
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
                  <span className="font-extrabold text-[#0D1B2A]">{selectedRequestModal.pincode}</span>
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