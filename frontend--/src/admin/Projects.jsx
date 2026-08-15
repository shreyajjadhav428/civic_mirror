import React, { useState, useEffect } from "react";
import { getAdminProjects, createAdminProject, updateAdminProject } from "../api/admin.api";

export default function Projects() {
  const statusOptions = [
    { value: "Pending", label: "Pending", badgeClass: "bg-amber-50 text-amber-700 border-amber-200" },
    { value: "In Progress", label: "In Progress", badgeClass: "bg-teal-50 text-[#008D78] border-teal-200" },
    { value: "Completed", label: "Completed", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-300" },
  ];

  // Dynamic Backend Project Data
  const [projectsList, setProjectsList] = useState([]);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    name: "",
    department: "Engineering & Road Ops",
    pincode: "",
    startDate: "",
    expectedCompletion: "",
    budget: "",
    utilizedBudget: "",
    affectedCitizens: "",
    status: "In Progress",
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

    const citizensNum = Number(newProject.affectedCitizens) || 0;
    const foundStatus = statusOptions.find((opt) => opt.value === newProject.status) || statusOptions[0];

    const tempProject = {
      id: `PRJ-${Date.now()}`,
      name: newProject.name,
      department: newProject.department,
      pincode: newProject.pincode,
      startDate: newProject.startDate || new Date().toISOString().split("T")[0],
      expectedCompletion: newProject.expectedCompletion || new Date().toISOString().split("T")[0],
      progress: newProject.status === "Completed" ? 100 : 15,
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
      const res = await createAdminProject(newProject);
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
      department: "Engineering & Road Ops",
      pincode: "",
      startDate: "",
      expectedCompletion: "",
      budget: "",
      utilizedBudget: "",
      affectedCitizens: "",
      status: "In Progress",
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
    setSelectedProjectModal((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        expectedCompletion: newVal,
      };
      setProjectsList((list) =>
        list.map((p) => (p.id === prev.id ? updated : p))
      );
      return updated;
    });
  };

  const handleProgressChange = (newProgress) => {
    const numVal = Number(newProgress) || 0;
    setSelectedProjectModal((prev) => {
      if (!prev) return prev;
      const isCompleted = numVal === 100;
      const updatedStatus = isCompleted ? "Completed" : "In Progress";
      const updatedBadge = isCompleted
        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
        : "bg-teal-50 text-[#008D78] border-teal-200";

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
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />
        
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              CAPITAL INFRASTRUCTURE & PROJECTS
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0D1B2A] tracking-tight">
              Municipal <span className="text-[#2D7FF9]">Projects</span>
            </h1>
            <p className="mt-2 text-base font-semibold text-[#59687A]">
              Track municipal capital works and inspect structural connections to citizen complaint clusters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 px-5 py-3.5 text-base font-semibold">
              <span className="text-[#657386] block text-sm font-black uppercase tracking-wider">Active Infrastructure</span>
              <span className="text-[#0D1B2A] font-black text-xl">{projectsList.length} Tracked</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ADD PROJECT SECTION */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-2">
          <div>
            <h2 className="text-base font-black uppercase tracking-wider text-[#0D1B2A]">
              REGISTER NEW CAPITAL PROJECT
            </h2>
            <p className="text-sm text-[#59687A] font-medium mt-0.5">
              Input comprehensive infrastructure specifications to correlate incoming citizen inquiries.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {addErrorMsg && (
              <span className="rounded-lg bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 text-xs font-normal transition-all">
                ⚠ {addErrorMsg}
              </span>
            )}
            {addSuccessMsg && (
              <span className="rounded-lg bg-emerald-50 text-[#008D78] border border-emerald-200 px-3 py-1 text-sm font-black transition-all">
                ✓ {addSuccessMsg}
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleAddProject} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Field 1: Project Name */}
            <div>
              <label className="block text-sm font-black uppercase text-slate-500 tracking-wider mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="e.g. Sector 4 Drainage Upgrade"
                className="h-[42px] w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-sm font-semibold text-[#0D1B2A] placeholder:text-slate-400 placeholder:font-normal focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Field 2: Department */}
            <div>
              <label className="block text-sm font-black uppercase text-slate-500 tracking-wider mb-1">
                Department
              </label>
              <select
                value={newProject.department}
                onChange={(e) => setNewProject({ ...newProject, department: e.target.value })}
                className="h-[42px] w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-sm font-semibold text-[#0D1B2A] focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="Engineering & Road Ops">Engineering & Road Ops</option>
                <option value="Electrical Works">Electrical Works</option>
                <option value="Water Supply & Sanitation">Water Supply & Sanitation</option>
                <option value="Stormwater Operations">Stormwater Operations</option>
                <option value="Public Health & Sanitation">Public Health & Sanitation</option>
              </select>
            </div>

            {/* Field 3: Pincode */}
            <div>
              <label className="block text-sm font-black uppercase text-slate-500 tracking-wider mb-1">
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
                  const val = e.target.value.replace(/\D/g, ""); // strip non-digits instantly
                  setNewProject({ ...newProject, pincode: val });
                }}
                placeholder="e.g. 110025"
                className="h-[42px] w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-sm font-semibold text-[#0D1B2A] placeholder:text-slate-400 placeholder:font-normal focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Field 4: Start Date (Custom YYYY-MM-DD overlay logic) */}
            <div>
              <label className="block text-sm font-black uppercase text-slate-500 tracking-wider mb-1">
                Start Date
              </label>
              <div className="relative h-[42px] w-full rounded-xl border border-slate-200 bg-slate-50/70 focus-within:border-[#2D7FF9] focus-within:bg-white transition-all overflow-hidden cursor-pointer">
                {/* Visible overlay for exact format */}
                <div className="absolute inset-0 flex items-center px-3.5 pointer-events-none">
                  <span className={newProject.startDate ? "text-[#0D1B2A] text-sm font-semibold" : "text-slate-400 text-sm font-normal"}>
                    {newProject.startDate || "YYYY-MM-DD"}
                  </span>
                </div>
                {/* Hidden native date input that catches clicks */}
                <input
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:p-0"
                />
              </div>
            </div>

            {/* Field 5: Expected Completion (Custom YYYY-MM-DD overlay logic) */}
            <div>
              <label className="block text-sm font-black uppercase text-slate-500 tracking-wider mb-1">
                Expected Completion
              </label>
              <div className="relative h-[42px] w-full rounded-xl border border-slate-200 bg-slate-50/70 focus-within:border-[#2D7FF9] focus-within:bg-white transition-all overflow-hidden cursor-pointer">
                {/* Visible overlay for exact format */}
                <div className="absolute inset-0 flex items-center px-3.5 pointer-events-none">
                  <span className={newProject.expectedCompletion ? "text-[#0D1B2A] text-sm font-semibold" : "text-slate-400 text-sm font-normal"}>
                    {newProject.expectedCompletion || "YYYY-MM-DD"}
                  </span>
                </div>
                {/* Hidden native date input that catches clicks */}
                <input
                  type="date"
                  value={newProject.expectedCompletion}
                  onChange={(e) => setNewProject({ ...newProject, expectedCompletion: e.target.value })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:p-0"
                />
              </div>
            </div>

            {/* Field 6: Total Budget */}
            <div>
              <label className="block text-sm font-black uppercase text-slate-500 tracking-wider mb-1">
                Total Budget (₹) *
              </label>
              <input
                type="number"
                required
                value={newProject.budget}
                onChange={(e) => {
                  const val = e.target.value;
                  setNewProject({ ...newProject, budget: val });
                  // Clear error dynamically if budget increases past utilized
                  if (Number(newProject.utilizedBudget) <= Number(val)) setAddErrorMsg("");
                }}
                placeholder="e.g. 2500000"
                className="h-[42px] w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-sm font-semibold text-[#0D1B2A] placeholder:text-slate-400 placeholder:font-normal focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Field 7: Utilized Budget */}
            <div>
              <label className="block text-sm font-black uppercase text-slate-500 tracking-wider mb-1">
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
                className={`h-[42px] w-full rounded-xl border bg-slate-50/70 px-3.5 text-sm font-semibold placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  addErrorMsg && Number(newProject.utilizedBudget) > Number(newProject.budget) 
                    ? "border-red-400 text-red-600 focus:border-red-500" 
                    : "border-slate-200 text-[#0D1B2A] focus:border-[#2D7FF9]"
                }`}
              />
            </div>

            {/* Field 8: Affected Citizens */}
            <div>
              <label className="block text-sm font-black uppercase text-slate-500 tracking-wider mb-1">
                Impacted Citizens
              </label>
              <input
                type="number"
                value={newProject.affectedCitizens}
                onChange={(e) => setNewProject({ ...newProject, affectedCitizens: e.target.value })}
                placeholder="e.g. 150"
                className="h-[42px] w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-sm font-semibold text-[#0D1B2A] placeholder:text-slate-400 placeholder:font-normal focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Row 3: Status & Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="w-full sm:w-64">
              <label className="block text-sm font-black uppercase text-slate-500 tracking-wider mb-1">
                Initial Status
              </label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                className="h-[42px] w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-sm font-semibold text-[#0D1B2A] focus:border-[#2D7FF9] focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={Number(newProject.utilizedBudget) > Number(newProject.budget)}
              className="h-[42px] rounded-xl bg-[#2D7FF9] px-6 text-sm font-black text-white hover:bg-[#1E4FA3] disabled:bg-slate-300 disabled:cursor-not-allowed active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              + Add Project
            </button>
          </div>
        </form>
      </div>

      {/* 3. DASHBOARD FILTER CONTROLS */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-500">
            Project Status & Audit
          </h2>
          <p className="text-sm text-[#59687A] font-semibold">Filter projects by operational status and inspect detailed infrastructure specifications.</p>
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1.5 text-sm font-black gap-1 flex-wrap">
          {["all", "pending", "in progress", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 uppercase transition-all ${
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-[#2D7FF9] hover:shadow-md transition-all space-y-5"
          >
            <div>
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-sm font-black tracking-wider text-[#2D7FF9] uppercase block mb-1">
                    {project.id}
                  </span>
                  <h3 className="text-xl font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm font-bold text-slate-500 mt-1">📍 Pincode: {project.pincode} • {project.department}</p>
                </div>

                <select
                  value={project.status}
                  onChange={(e) => handleStatusChange(project.id, e.target.value)}
                  className={`rounded-md border px-2.5 py-1 text-sm font-black uppercase tracking-wider cursor-pointer focus:outline-none transition-all ${project.statusBadge}`}
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white text-slate-900 font-semibold">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-sm font-extrabold">
                  <span className="text-slate-500">Execution Progress</span>
                  <span className="text-[#2D7FF9] font-black">{project.progress}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    style={{ width: `${project.progress}%` }}
                    className="h-full bg-[#2D7FF9] rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              {/* Budget Summary */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="block text-slate-400 font-bold text-sm uppercase mb-1">Total Budget</span>
                  <span className="text-base font-black text-[#0D1B2A]">{formatINR(project.budget)}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="block text-slate-400 font-bold text-sm uppercase mb-1">Utilized Budget</span>
                  <span className="text-base font-black text-[#008D78]">{formatINR(project.utilizedBudget)}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="block text-slate-400 font-bold text-sm uppercase mb-1">Connected Complaints</span>
                  <span className="text-base font-black text-[#2D7FF9]">{project.relatedComplaintsCount} tickets</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="block text-slate-400 font-bold text-sm uppercase mb-1">Impacted Citizens</span>
                  <span className="text-base font-black text-[#0D1B2A]">{project.affectedCitizens} residents</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={() => setSelectedProjectModal(project)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-black text-[#2D7FF9] hover:bg-slate-50 transition-all cursor-pointer"
              >
                Project Specs →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. FULL PROJECT SPECIFICATIONS MODAL */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl space-y-6 text-[#0D1B2A]">
            
            {/* Modal Error Banner */}
            {modalErrorMsg && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 mb-4 text-xs font-normal text-red-600 transition-all">
                ⚠ {modalErrorMsg}
              </div>
            )}

            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-sm font-black text-[#2D7FF9] uppercase tracking-wider block mb-1">
                  FULL INFRASTRUCTURE SPECIFICATIONS
                </span>
                <h3 className="text-2xl font-black text-[#0D1B2A]">{selectedProjectModal.name}</h3>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-black text-slate-400 uppercase">Status:</span>
                  <select
                    value={selectedProjectModal.status}
                    onChange={(e) => handleStatusChange(selectedProjectModal.id, e.target.value)}
                    className={`rounded-md border px-3 py-0.5 text-sm font-black uppercase tracking-wider cursor-pointer focus:outline-none transition-all ${selectedProjectModal.statusBadge}`}
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
                onClick={() => {
                  setSelectedProjectModal(null);
                  setModalErrorMsg(""); // Clear errors on close
                }}
                className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-800 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-slate-400 block font-bold uppercase mb-1 text-xs">Department</span>
                  <span className="font-extrabold text-[#0D1B2A] text-sm">{selectedProjectModal.department}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-slate-400 block font-bold uppercase mb-1 text-xs">Pincode</span>
                  <span className="font-extrabold text-[#0D1B2A] text-sm">📍 {selectedProjectModal.pincode}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-slate-400 block font-bold uppercase mb-1 text-xs">Start Date</span>
                  <span className="font-extrabold text-[#0D1B2A] text-sm">{selectedProjectModal.startDate}</span>
                </div>

                {/* EDITABLE EXPECTED COMPLETION (Custom YYYY-MM-DD overlay logic) */}
                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 focus-within:border-[#2D7FF9] focus-within:bg-white transition-all">
                  <label className="text-slate-400 block font-bold uppercase mb-1 text-xs flex items-center justify-between">
                    <span>Expected Completion</span>
                    <span className="text-[#2D7FF9] text-xs font-black">✏️ EDITABLE</span>
                  </label>
                  <div className="relative h-6 w-full mt-1 border-b border-dashed border-slate-300 focus-within:border-[#2D7FF9] overflow-hidden cursor-pointer">
                    {/* Visible overlay */}
                    <div className="absolute inset-0 flex items-center pointer-events-none">
                      <span className={selectedProjectModal.expectedCompletion ? "text-[#0D1B2A] text-sm font-extrabold" : "text-slate-400 text-sm font-normal"}>
                        {selectedProjectModal.expectedCompletion || "YYYY-MM-DD"}
                      </span>
                    </div>
                    {/* Hidden native input */}
                    <input
                      type="date"
                      value={selectedProjectModal.expectedCompletion}
                      onChange={(e) => handleExpectedCompletionChange(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:p-0"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-slate-400 block font-bold uppercase mb-1 text-xs">Total Budget</span>
                  <span className="text-base font-black text-[#0D1B2A]">{formatINR(selectedProjectModal.budget)}</span>
                </div>

                {/* EDITABLE UTILIZED BUDGET */}
                <div className={`rounded-xl bg-slate-50 p-3.5 border transition-all ${
                  modalErrorMsg ? "border-red-400 focus-within:border-red-500" : "border-slate-200 focus-within:border-[#008D78] focus-within:bg-white"
                }`}>
                  <label className="text-slate-400 block font-bold uppercase mb-1 text-xs flex items-center justify-between">
                    <span className={modalErrorMsg ? "text-red-500 font-normal text-xs" : ""}>Utilized Budget (₹)</span>
                    <span className="text-[#008D78] text-xs font-black">✏️ EDITABLE</span>
                  </label>
                  <input
                    type="number"
                    value={selectedProjectModal.utilizedBudget}
                    onChange={(e) => handleUtilizedBudgetChange(e.target.value)}
                    className={`w-full bg-transparent text-base font-black focus:outline-none border-b border-dashed pb-0.5 mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      modalErrorMsg ? "text-red-600 border-red-300 focus:border-red-500" : "text-[#008D78] border-slate-300 focus:border-[#008D78]"
                    }`}
                    placeholder="Enter amount in ₹"
                  />
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-slate-400 block font-bold uppercase mb-1 text-xs">Remaining Budget</span>
                  <span className="text-base font-black text-[#2D7FF9]">{formatINR(selectedProjectModal.remainingBudget)}</span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="text-slate-400 block font-bold uppercase mb-1 text-xs">Affected Citizens</span>
                  <span className="text-base font-black text-[#0D1B2A]">{selectedProjectModal.affectedCitizens} citizens</span>
                </div>
              </div>

              {/* EDITABLE EXECUTION PROGRESS */}
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 focus-within:border-[#2D7FF9] transition-all space-y-3">
                <div className="flex justify-between items-center font-bold text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 uppercase font-black">Execution Progress</span>
                    <span className="text-[#2D7FF9] text-xs font-black">✏️ EDITABLE</span>
                  </div>
                  <span className="text-[#2D7FF9] font-black text-sm">{selectedProjectModal.progress}%</span>
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
                      className={`py-1.5 rounded-lg text-sm font-black transition-all text-center cursor-pointer ${
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
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-3">
              <button
                onClick={() => {
                  setSelectedProjectModal(null);
                  setModalErrorMsg("");
                }}
                className="rounded-xl bg-[#0D1B2A] px-5 py-2.5 text-sm font-black text-white hover:bg-[#2D7FF9] transition-all cursor-pointer"
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