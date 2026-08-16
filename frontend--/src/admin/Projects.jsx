import React, { useState, useEffect } from "react";
import { getAdminProjects, createAdminProject, updateAdminProject } from "../api/admin.api";
import { OFFICIAL_DEPARTMENTS } from "../constants/departments";

export default function Projects() {
  const statusOptions = [
    { value: "Pending", label: "Pending", badgeClass: "bg-amber-50 text-amber-800 border-amber-200" },
    { value: "In Progress", label: "In Progress", badgeClass: "bg-blue-50 text-[#2D7FF9] border-blue-200" },
    { value: "Completed", label: "Completed", badgeClass: "bg-teal-50 text-[#008D78] border-teal-200" },
  ];

  // Dynamic Backend Project Data
  const [projectsList, setProjectsList] = useState([]);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  // Pagination state (10 cards per page)
  const [visibleCount, setVisibleCount] = useState(10);

  // Reset pagination when active tab changes
  useEffect(() => {
    setVisibleCount(10);
  }, [activeTab]);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    name: "",
    department: OFFICIAL_DEPARTMENTS[0].name,
    pincode: "",
    startDate: "",
    expectedCompletion: "",
    budget: "",
    utilizedBudget: "",
    affectedCitizens: "",
    status: "In Progress",
    progress: "",
  });
  const [addSuccessMsg, setAddSuccessMsg] = useState("");
  const [addErrorMsg, setAddErrorMsg] = useState("");
  const [modalErrorMsg, setModalErrorMsg] = useState("");

  // -------------------------------------------------------------------
  // FETCH BACKEND PROJECTS ON MOUNT
  // -------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    async function loadProjectsData() {
      setLoading(true);
      try {
        const res = await getAdminProjects();
        if (isMounted && res?.data) {
          setProjectsList(res.data);
        }
      } catch (err) {
        console.error("Error fetching projects from backend:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProjectsData();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const handleStatusChange = async (projectId, newStatus) => {
    const found = statusOptions.find((opt) => opt.value === newStatus) || statusOptions[0];
    const newProg = found.value === "Completed" ? 100 : 50;

    setProjectsList((list) =>
      list.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            status: found.value,
            statusBadge: found.badgeClass,
            progress: newProg,
          };
        }
        return p;
      })
    );

    setSelectedProjectModal((prev) => {
      if (!prev || prev.id !== projectId) return prev;
      return {
        ...prev,
        status: found.value,
        statusBadge: found.badgeClass,
        progress: newProg,
      };
    });

    try {
      await updateAdminProject(projectId, { status: found.value, progress: newProg });
    } catch (err) {
      console.error("Error updating project status in backend:", err);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.pincode.trim() || !newProject.budget) return;

    const budgetNum = Number(newProject.budget) || 0;
    const utilNum = Number(newProject.utilizedBudget) || 0;
    
    // Strict Validation: Utilized budget cannot exceed total budget
    if (utilNum > budgetNum) {
      setAddErrorMsg("Utilized budget can't be greater than total budget.");
      setTimeout(() => setAddErrorMsg(""), 4000);
      return;
    }

    // Strict Validation: Expected completion cannot be before start date
    if (newProject.startDate && newProject.expectedCompletion) {
      if (new Date(newProject.startDate) > new Date(newProject.expectedCompletion)) {
        setAddErrorMsg("Expected completion cannot be before start date.");
        setTimeout(() => setAddErrorMsg(""), 4000);
        return;
      }
    }

    const citizensNum = Number(newProject.affectedCitizens) || 0;
    const foundStatus = statusOptions.find((opt) => opt.value === newProject.status) || statusOptions[0];
    const progressNum =
      newProject.progress !== "" && newProject.progress !== undefined
        ? Math.min(100, Math.max(0, Number(newProject.progress) || 0))
        : (newProject.status === "Completed" ? 100 : 0);

    const tempProject = {
      id: `PRJ-${Date.now()}`,
      name: newProject.name,
      department: newProject.department,
      pincode: newProject.pincode,
      startDate: newProject.startDate || new Date().toISOString().split("T")[0],
      expectedCompletion: newProject.expectedCompletion || "30 Nov 2026",
      progress: progressNum,
      budget: budgetNum,
      utilizedBudget: utilNum,
      remainingBudget: Math.max(0, budgetNum - utilNum),
      relatedComplaintsCount: 0,
      affectedCitizens: citizensNum,
      status: foundStatus.value,
      statusBadge: foundStatus.badgeClass,
      connectedComplaints: [],
    };

    setProjectsList((prev) => [tempProject, ...prev]);

    try {
      const res = await createAdminProject({ ...newProject, progress: progressNum });
      if (res?.data) {
        setProjectsList((prev) =>
          prev.map((p) => (p.id === tempProject.id ? { ...p, ...res.data } : p))
        );
      }
    } catch (err) {
      console.warn("Backend project creation warning, project created locally:", err);
    }

    setNewProject({
      name: "",
      department: OFFICIAL_DEPARTMENTS[0].name,
      pincode: "",
      startDate: "",
      expectedCompletion: "",
      budget: "",
      utilizedBudget: "",
      affectedCitizens: "",
      status: "In Progress",
      progress: "",
    });
    setAddSuccessMsg("Project added successfully!");
    setAddErrorMsg("");
    setTimeout(() => setAddSuccessMsg(""), 3500);
  };

  const handleUtilizedBudgetChange = async (newVal) => {
    if (!selectedProjectModal) return;
    
    const numVal = Number(newVal) || 0;
    const budgetNum = Number(selectedProjectModal.budget) || 0;

    // Reject and show error if utilized is greater than total
    if (numVal > budgetNum) {
      setModalErrorMsg("Utilized budget can't be greater than total budget.");
      setSelectedProjectModal({
        ...selectedProjectModal,
        utilizedBudget: newVal, 
      });
      return;
    }

    setModalErrorMsg(""); // Clear error if valid
    const updated = {
      ...selectedProjectModal,
      utilizedBudget: numVal,
      remainingBudget: Math.max(0, budgetNum - numVal),
    };

    setSelectedProjectModal(updated);
    setProjectsList((list) =>
      list.map((p) => (p.id === selectedProjectModal.id ? updated : p))
    );

    try {
      await updateAdminProject(selectedProjectModal.id, { utilizedBudget: numVal });
    } catch (err) {
      console.error("Error updating project budget in backend:", err);
    }
  };

  const handleExpectedCompletionChange = (newVal) => {
    if (!selectedProjectModal) return;

    // Check if new completion date is before the start date
    if (selectedProjectModal.startDate && newVal) {
      if (new Date(selectedProjectModal.startDate) > new Date(newVal)) {
        setModalErrorMsg("Expected completion cannot be before start date.");
        setSelectedProjectModal({
          ...selectedProjectModal,
          expectedCompletion: newVal, 
        });
        return;
      }
    }

    setModalErrorMsg("");
    const updated = {
      ...selectedProjectModal,
      expectedCompletion: newVal,
    };
    
    setSelectedProjectModal(updated);
    setProjectsList((list) =>
      list.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleProgressChange = (newProgress) => {
    const numVal = Number(newProgress) || 0;
    setSelectedProjectModal((prev) => {
      if (!prev) return prev;
      const isCompleted = numVal === 100;
      const updatedStatus = isCompleted ? "Completed" : "In Progress";
      const updatedBadge = isCompleted
        ? "bg-teal-50 text-[#008D78] border-teal-200"
        : "bg-blue-50 text-[#2D7FF9] border-blue-200";

      const updated = {
        ...prev,
        progress: numVal,
        status: updatedStatus,
        statusBadge: updatedBadge,
      };
      setProjectsList((list) =>
        list.map((p) => (p.id === prev.id ? updated : p))
      );
      return updated;
    });
  };

  const filteredProjects = projectsList.filter((p) => {
    if (activeTab === "all") return true;
    return p.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* 1. HEADER BANNER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-3">
        <div>
          <p className="flex items-center gap-2 text-sm sm:text-base font-bold tracking-widest text-[#2D7FF9] uppercase mb-1.5">
            <span className="h-[2.5px] w-4 bg-[#2D7FF9] rounded-full inline-block" />
            CAPITAL INFRASTRUCTURE & PROJECTS
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A] tracking-tight flex items-center gap-3">
            Municipal <span className="text-[#2D7FF9]">Projects</span>
            {loading && <span className="text-base font-semibold text-slate-400 animate-pulse ml-2">(Fetching live data...)</span>}
          </h1>
          <p className="mt-1.5 text-base sm:text-lg font-normal text-slate-600 leading-relaxed max-w-3xl">
            Track municipal capital works and inspect structural connections to citizen complaint clusters.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm sm:text-base font-semibold shadow-2xs">
            <span className="text-slate-400 block text-xs sm:text-sm font-bold uppercase tracking-wider">Active Infrastructure</span>
            <span className="text-[#0D1B2A] font-bold text-base sm:text-lg">{projectsList.length} Tracked</span>
          </div>
        </div>
      </div>

      {/* 2. ADD PROJECT SECTION */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3.5 gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#0D1B2A]">
              REGISTER NEW CAPITAL PROJECT
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal mt-0.5">
              Input comprehensive infrastructure specifications to correlate incoming citizen inquiries.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {addErrorMsg && (
              <span className="rounded-lg bg-red-50 text-red-600 border border-red-200 px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all">
                ⚠ {addErrorMsg}
              </span>
            )}
            {addSuccessMsg && (
              <span className="rounded-lg bg-teal-50 text-[#008D78] border border-teal-200 px-3.5 py-1.5 text-xs sm:text-sm font-bold transition-all">
                ✓ {addSuccessMsg}
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleAddProject} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Field 1: Project Name */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="e.g. Sector 4 Drainage Upgrade"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm sm:text-base font-semibold text-[#0D1B2A] placeholder:text-slate-400 placeholder:font-normal focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Field 2: Department */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                Department
              </label>
              <select
                value={newProject.department}
                onChange={(e) => setNewProject({ ...newProject, department: e.target.value })}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm sm:text-base font-semibold text-[#0D1B2A] focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                {OFFICIAL_DEPARTMENTS.map((dept) => (
                  <option key={dept.name} value={dept.name}>
                    {dept.icon} {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 3: Pincode */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                Pincode *
              </label>
              <input
                type="text"
                required
                maxLength={6}
                pattern="\d{6}"
                title="6-digit Indian PIN code"
                value={newProject.pincode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setNewProject({ ...newProject, pincode: val });
                }}
                placeholder="e.g. 110025"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm sm:text-base font-semibold text-[#0D1B2A] placeholder:text-slate-400 placeholder:font-normal focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Field 4: Start Date */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                Start Date
              </label>
              <div className="relative h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 focus-within:border-[#2D7FF9] focus-within:bg-white transition-all overflow-hidden cursor-pointer">
                <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                  <span className={newProject.startDate ? "text-[#0D1B2A] text-sm sm:text-base font-semibold" : "text-slate-400 text-sm sm:text-base font-normal"}>
                    {newProject.startDate || "YYYY-MM-DD"}
                  </span>
                </div>
                <input
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:p-0"
                />
              </div>
            </div>

            {/* Field 5: Expected Completion */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                Expected Completion
              </label>
              <div className="relative h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 focus-within:border-[#2D7FF9] focus-within:bg-white transition-all overflow-hidden cursor-pointer">
                <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                  <span className={newProject.expectedCompletion ? "text-[#0D1B2A] text-sm sm:text-base font-semibold" : "text-slate-400 text-sm sm:text-base font-normal"}>
                    {newProject.expectedCompletion || "YYYY-MM-DD"}
                  </span>
                </div>
                <input
                  type="date"
                  min={newProject.startDate}
                  value={newProject.expectedCompletion}
                  onChange={(e) => setNewProject({ ...newProject, expectedCompletion: e.target.value })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:p-0"
                />
              </div>
            </div>

            {/* Field 6: Total Budget */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                Total Budget (₹) *
              </label>
              <input
                type="number"
                required
                value={newProject.budget}
                onChange={(e) => {
                  const val = e.target.value;
                  setNewProject({ ...newProject, budget: val });
                  if (Number(newProject.utilizedBudget) <= Number(val)) setAddErrorMsg("");
                }}
                placeholder="e.g. 2500000"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm sm:text-base font-semibold text-[#0D1B2A] placeholder:text-slate-400 placeholder:font-normal focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Field 7: Utilized Budget */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                Utilized Budget (₹)
              </label>
              <input
                type="number"
                value={newProject.utilizedBudget}
                onChange={(e) => {
                  const val = e.target.value;
                  setNewProject({ ...newProject, utilizedBudget: val });
                  if (Number(val) > Number(newProject.budget)) {
                    setAddErrorMsg("Utilized budget can't be greater than total budget.");
                  } else {
                    setAddErrorMsg("");
                  }
                }}
                placeholder="e.g. 500000"
                className={`h-11 w-full rounded-xl border bg-slate-50/70 px-4 text-sm sm:text-base font-semibold placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  addErrorMsg && Number(newProject.utilizedBudget) > Number(newProject.budget) 
                    ? "border-red-400 text-red-600 focus:border-red-500" 
                    : "border-slate-200 text-[#0D1B2A] focus:border-[#2D7FF9]"
                }`}
              />
            </div>

            {/* Field 8: Affected Citizens */}
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                Impacted Citizens
              </label>
              <input
                type="number"
                value={newProject.affectedCitizens}
                onChange={(e) => setNewProject({ ...newProject, affectedCitizens: e.target.value })}
                placeholder="e.g. 150"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm sm:text-base font-semibold text-[#0D1B2A] placeholder:text-slate-400 placeholder:font-normal focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Row 3: Status, Execution Progress & Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-3 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                  Initial Status
                </label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm sm:text-base font-semibold text-[#0D1B2A] focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all cursor-pointer"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase text-slate-500 tracking-wider mb-1.5">
                  Execution Progress (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newProject.progress}
                  onChange={(e) => setNewProject({ ...newProject, progress: e.target.value })}
                  placeholder="e.g. 0, 25, 50"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 text-sm sm:text-base font-semibold text-[#0D1B2A] placeholder:text-slate-400 placeholder:font-normal focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={Number(newProject.utilizedBudget) > Number(newProject.budget)}
              className="h-11 rounded-xl bg-[#2D7FF9] px-7 text-sm sm:text-base font-bold text-white hover:bg-[#1E4FA3] disabled:bg-slate-300 disabled:cursor-not-allowed active:scale-95 transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              + Add Project
            </button>
          </div>
        </form>
      </div>

      {/* 3. DASHBOARD FILTER CONTROLS */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <span className="h-[2.5px] w-4 bg-slate-400 rounded-full inline-block" />
            Project Status & Audit
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal mt-1">Filter projects by operational status and inspect detailed infrastructure specifications.</p>
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1.5 text-xs sm:text-sm font-bold gap-1 flex-wrap">
          {["all", "pending", "in progress", "completed"].map((tab) => (
            <button
              key={tab}
              id={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 uppercase transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[#0D1B2A] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab === "all" ? `All (${projectsList.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. PROJECTS GRID CARDS */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredProjects.slice(0, visibleCount).map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-2xl hover:border-slate-300 hover:shadow-xs transition-all space-y-5"
            >
              <div>
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs sm:text-sm font-bold tracking-wider text-[#2D7FF9] uppercase block mb-1">
                      {project.id}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors leading-snug">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">📍 Pincode: {project.pincode} • {project.department}</p>
                  </div>

                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value)}
                    className={`rounded-md border px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer focus:outline-none transition-all ${project.statusBadge}`}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-white text-slate-900 font-semibold">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                    <span className="text-slate-500">Execution Progress</span>
                    <span className="text-[#2D7FF9] font-bold">{project.progress}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      style={{ width: `${project.progress}%` }}
                      className="h-full bg-[#2D7FF9] rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Budget Summary */}
                <div className="mt-4 grid grid-cols-2 gap-3.5 text-sm">
                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <span className="block text-slate-400 font-semibold text-xs uppercase mb-1">Total Budget</span>
                    <span className="text-sm sm:text-base font-bold text-[#0D1B2A]">{formatINR(project.budget)}</span>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <span className="block text-slate-400 font-semibold text-xs uppercase mb-1">Utilized Budget</span>
                    <span className="text-sm sm:text-base font-bold text-[#008D78]">{formatINR(project.utilizedBudget)}</span>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <span className="block text-slate-400 font-semibold text-xs uppercase mb-1">Connected Complaints</span>
                    <span className="text-sm sm:text-base font-bold text-[#2D7FF9]">{project.relatedComplaintsCount} tickets</span>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <span className="block text-slate-400 font-semibold text-xs uppercase mb-1">Impacted Citizens</span>
                    <span className="text-sm sm:text-base font-bold text-[#0D1B2A]">{project.affectedCitizens} residents</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(project)}
                  className="rounded-xl border border-slate-200 px-4.5 py-2 text-xs sm:text-sm font-semibold text-[#2D7FF9] hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
                >
                  Project Specs →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SHOW MORE BUTTON IF MORE THAN VISIBLE COUNT */}
        {filteredProjects.length > 10 && (
          <div className="flex justify-end pt-3 pr-1">
            {visibleCount < filteredProjects.length ? (
              <button
                onClick={() => setVisibleCount((prev) => prev + 10)}
                className="text-[#2D7FF9] font-bold text-sm sm:text-base hover:underline cursor-pointer bg-transparent border-none p-0 transition flex items-center gap-1.5"
              >
                Show More Projects ({filteredProjects.length - visibleCount} remaining) →
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(10)}
                className="text-[#2D7FF9] font-bold text-sm sm:text-base hover:underline cursor-pointer bg-transparent border-none p-0 transition flex items-center gap-1.5"
              >
                Show Less ↑
              </button>
            )}
          </div>
        )}
      </div>

      {/* 5. FULL PROJECT SPECIFICATIONS MODAL */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-2xl space-y-6 text-[#0D1B2A]">
            
            {/* Modal Error Banner */}
            {modalErrorMsg && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 mb-2 text-xs sm:text-sm font-semibold text-red-600 transition-all">
                ⚠ {modalErrorMsg}
              </div>
            )}

            <div className="flex items-start justify-between border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs sm:text-sm font-semibold text-[#2D7FF9] uppercase tracking-wider block mb-1">
                  FULL INFRASTRUCTURE SPECIFICATIONS
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0D1B2A]">{selectedProjectModal.name}</h3>
                
                <div className="flex items-center gap-2.5 mt-2.5">
                  <span className="text-xs sm:text-sm font-semibold text-slate-400 uppercase">Status:</span>
                  <select
                    value={selectedProjectModal.status}
                    onChange={(e) => handleStatusChange(selectedProjectModal.id, e.target.value)}
                    className={`rounded-md border px-3 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer focus:outline-none transition-all ${selectedProjectModal.statusBadge}`}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-white text-slate-900 font-semibold">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedProjectModal(null);
                  setModalErrorMsg("");
                }}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm sm:text-base">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase mb-1 text-xs">Department</span>
                  <span className="font-bold text-[#0D1B2A] text-sm sm:text-base">{selectedProjectModal.department}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase mb-1 text-xs">Pincode</span>
                  <span className="font-bold text-[#0D1B2A] text-sm sm:text-base">📍 {selectedProjectModal.pincode}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase mb-1 text-xs">Start Date</span>
                  <span className="font-bold text-[#0D1B2A] text-sm sm:text-base">{selectedProjectModal.startDate}</span>
                </div>

                {/* EDITABLE EXPECTED COMPLETION */}
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 focus-within:border-[#2D7FF9] focus-within:bg-white transition-all">
                  <label className="text-slate-400 block font-semibold uppercase mb-1 text-xs flex items-center justify-between">
                    <span>Expected Completion</span>
                    <span className="text-[#2D7FF9] text-xs font-bold">✏️ EDITABLE</span>
                  </label>
                  <div className="relative h-7 w-full mt-1 border-b border-dashed border-slate-300 focus-within:border-[#2D7FF9] overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 flex items-center pointer-events-none">
                      <span className={selectedProjectModal.expectedCompletion ? "text-[#0D1B2A] text-sm sm:text-base font-bold" : "text-slate-400 text-sm font-normal"}>
                        {selectedProjectModal.expectedCompletion || "YYYY-MM-DD"}
                      </span>
                    </div>
                    <input
                      type="date"
                      min={selectedProjectModal.startDate}
                      value={selectedProjectModal.expectedCompletion}
                      onChange={(e) => handleExpectedCompletionChange(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:p-0"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase mb-1 text-xs">Total Budget</span>
                  <span className="text-base sm:text-lg font-bold text-[#0D1B2A]">{formatINR(selectedProjectModal.budget)}</span>
                </div>

                {/* EDITABLE UTILIZED BUDGET */}
                <div className={`rounded-xl bg-slate-50 p-4 border transition-all ${
                  modalErrorMsg ? "border-red-400 focus-within:border-red-500" : "border-slate-200 focus-within:border-[#008D78] focus-within:bg-white"
                }`}>
                  <label className="text-slate-400 block font-semibold uppercase mb-1 text-xs flex items-center justify-between">
                    <span className={modalErrorMsg ? "text-red-500 font-normal text-xs" : ""}>Utilized Budget (₹)</span>
                    <span className="text-[#008D78] text-xs font-bold">✏️ EDITABLE</span>
                  </label>
                  <input
                    type="number"
                    value={selectedProjectModal.utilizedBudget}
                    onChange={(e) => handleUtilizedBudgetChange(e.target.value)}
                    className={`w-full bg-transparent text-base sm:text-lg font-bold focus:outline-none border-b border-dashed pb-0.5 mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      modalErrorMsg ? "text-red-600 border-red-300 focus:border-red-500" : "text-[#008D78] border-slate-300 focus:border-[#008D78]"
                    }`}
                    placeholder="Enter amount in ₹"
                  />
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase mb-1 text-xs">Remaining Budget</span>
                  <span className="text-base sm:text-lg font-bold text-[#2D7FF9]">{formatINR(selectedProjectModal.remainingBudget)}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <span className="text-slate-400 block font-semibold uppercase mb-1 text-xs">Affected Citizens</span>
                  <span className="text-base sm:text-lg font-bold text-[#0D1B2A]">{selectedProjectModal.affectedCitizens} citizens</span>
                </div>
              </div>

              {/* EDITABLE EXECUTION PROGRESS */}
              <div className="rounded-xl bg-slate-50 p-4.5 border border-slate-200 focus-within:border-[#2D7FF9] transition-all space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 uppercase font-bold">Execution Progress</span>
                    <span className="text-[#2D7FF9] text-xs font-bold">✏️ EDITABLE</span>
                  </div>
                  <span className="text-[#2D7FF9] font-bold text-base">{selectedProjectModal.progress}%</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedProjectModal.progress}
                  onChange={(e) => handleProgressChange(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2D7FF9]"
                />

                <div className="grid grid-cols-5 gap-2 pt-1 border-t border-slate-100">
                  {[0, 25, 50, 75, 100].map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => handleProgressChange(step)}
                      className={`py-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                        selectedProjectModal.progress === step
                          ? "bg-[#2D7FF9] text-white shadow-xs scale-105"
                          : "bg-white border border-slate-200 text-slate-600 hover:border-[#2D7FF9] hover:text-[#2D7FF9]"
                      }`}
                    >
                      {step}%
                    </button>
                  ))}
                </div>
              </div>

              {/* CONNECTED CITIZEN COMPLAINTS SECTION */}
              <div className="rounded-xl bg-slate-50 p-4.5 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Connected Citizen Inquiries ({selectedProjectModal.connectedComplaints?.length || 0})
                  </span>
                  <span className="text-xs font-bold text-[#2D7FF9]">Realtime Database Sync</span>
                </div>

                {(!selectedProjectModal.connectedComplaints || selectedProjectModal.connectedComplaints.length === 0) ? (
                  <div className="rounded-lg bg-white p-4 text-center text-xs font-medium text-slate-400 border border-slate-100">
                    No citizen inquiries or complaints linked to this project yet.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedProjectModal.connectedComplaints.map((c, cIdx) => (
                      <div
                        key={c.id || cIdx}
                        className="rounded-lg bg-white p-3 border border-slate-200/80 shadow-2xs flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-black text-[#2D7FF9] text-[11px]">{c.id}</span>
                            <span className="text-slate-400 font-bold text-[10px]">{c.citizen || "Citizen"}</span>
                          </div>
                          <p className="font-semibold text-slate-700 line-clamp-2 leading-relaxed">
                            {c.title || c.description || "Inquiry recorded for this project."}
                          </p>
                        </div>

                        <span className={`shrink-0 px-2 py-0.5 rounded-md font-bold text-[10px] uppercase border ${
                          (c.status || "").toLowerCase().includes("resolved")
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : (c.status || "").toLowerCase().includes("progress")
                            ? "bg-blue-50 text-[#2D7FF9] border-blue-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}>
                          {c.status || "In Progress"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setSelectedProjectModal(null);
                  setModalErrorMsg("");
                }}
                className="rounded-xl bg-[#0D1B2A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2D7FF9] transition-all cursor-pointer"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}