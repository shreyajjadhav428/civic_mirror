import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Overview from "./Overview";
import Requests from "./Requests";
import Queries from "./Queries";
import Clusters from "./Clusters";
import Data from "./Data";
import Projects from "./Projects";
import AiInsights from "./AiInsights";

function AdminSidebarIcon({ name }) {
  const icons = {
    overview: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    clusters: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </>
    ),
    requests: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v5h5M10 13h5M10 17h5" />
      </>
    ),
    queries: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
    data: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </>
    ),
    projects: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
    ai_insights: (
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    ),
    logout: <path d="M10 17l5-5-5-5M15 12H3M14 4h5v16h-5" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px] shrink-0 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
    >
      {icons[name]}
    </svg>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabFromPath = (path) => {
    if (path.includes("/requests")) return "requests";
    if (path.includes("/queries")) return "queries";
    if (path.includes("/clusters")) return "clusters";
    if (path.includes("/data")) return "data";
    if (path.includes("/projects")) return "projects";
    if (path.includes("/ai_insights")) return "ai_insights";
    return "overview";
  };

  const [activeNav, setActiveNav] = useState(getTabFromPath(location.pathname));
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setActiveNav(getTabFromPath(location.pathname));
  }, [location.pathname]);

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "clusters", label: "Clusters" },
    { id: "requests", label: "Requests" },
    { id: "queries", label: "Queries" },
    { id: "data", label: "Data" },
    { id: "projects", label: "Projects" },
    { id: "ai_insights", label: "AI Insights" }
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    setIsMobileSidebarOpen(false);
    navigate(`/admin/${id === "overview" ? "" : id}`);
  };

  const getNavClassName = (isActive) =>
    [
      "group relative flex min-h-[44px] w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-left text-[14px] font-medium",
      "transition-all duration-200 ease-out",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF]",
      isActive
        ? [
            "bg-[#234D78]",
            "text-white",
            "shadow-[0_3px_12px_rgba(5,18,33,0.16)]",
            "ring-1 ring-inset ring-white/[0.06]",
            "before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[3px]",
            "before:-translate-y-1/2 before:rounded-r-full",
            "before:bg-[#69A8FF]",
          ].join(" ")
        : [
            "text-[#B9CBDE]",
            "hover:bg-white/[0.055]",
            "hover:text-white",
            "hover:translate-x-[1px]",
          ].join(" "),
    ].join(" ");

  return (
    <div className="admin-dashboard-container flex h-screen w-full overflow-hidden bg-[#FAFAFC] font-['Inter',sans-serif] text-[#0D1B2A]">
      
      {/* Mobile backdrop */}
      <div
        className={[
          "fixed inset-0 z-40 bg-[#071727]/45 backdrop-blur-[2px] transition-opacity duration-300 min-[861px]:hidden",
          isMobileSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setIsMobileSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col justify-between overflow-y-auto bg-[#102B47] px-4 pb-[18px] pt-6 font-['Inter',sans-serif] text-[#DCE8F5]",
          "shadow-[1px_0_0_rgba(255,255,255,0.06),8px_0_24px_rgba(5,18,33,0.18)]",
          "transition-transform duration-300 ease-out",
          "min-[861px]:static min-[861px]:translate-x-0",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "min-[861px]:z-30",
        ].join(" ")}
        aria-label="Admin dashboard navigation"
      >
        <div>
          {/* Logo & Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5 pl-7 pr-2">
            <button
              type="button"
              onClick={() => {
                navigate("/admin");
                setActiveNav("overview");
                setIsMobileSidebarOpen(false);
              }}
              className="group inline-flex items-center text-4xl font-black tracking-tight outline-none cursor-pointer"
              aria-label="CivicMirror admin home"
            >
              <span className="text-white">C</span>
              <span className="relative text-[#69A8FF] after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                M
              </span>
            </button>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-lg text-[#9FB5CA] transition-colors hover:bg-white/[0.06] hover:text-white min-[861px]:hidden"
              aria-label="Close navigation menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {/* Main navigation */}
          <nav className="grid gap-1 mt-6" aria-label="Primary navigation">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#809BB7]">
              Workspace
            </p>

            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={getNavClassName(isActive)}
                >
                  <AdminSidebarIcon name={item.id} />
                  <span
                    className={[
                      "leading-none",
                      isActive ? "font-semibold text-white" : "font-medium",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Account / Logout section */}
        <div>
          <div className="mx-2 my-[22px] h-px bg-white/[0.07]" />

          <div className="grid gap-0.5">
            {/* Logout */}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex min-h-[36px] w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left text-[12px] font-medium text-[#B8CADB] transition-all duration-150 hover:bg-white/[0.045] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF]"
            >
              <AdminSidebarIcon name="logout" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-y-auto relative">
        {/* Mobile Sidebar Toggle Button */}
        <div className="p-4 pb-0 min-[861px]:hidden flex items-center justify-between">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Menu
          </button>
        </div>

        {/* Dynamic Section Content based on activeNav */}
        <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">

          {/* VIEW 1: OVERVIEW TAB */}
          {activeNav === "overview" && <Overview />}

          {/* VIEW 2: CLUSTERS TAB */}
          {activeNav === "clusters" && <Clusters onNavigate={setActiveNav} />}

          {/* VIEW 3: REQUESTS TAB */}
          {activeNav === "requests" && <Requests />}

          {/* VIEW 4: QUERIES TAB */}
          {activeNav === "queries" && <Queries onNavigate={setActiveNav} />}

          {/* VIEW 5: DATA TAB */}
          {activeNav === "data" && <Data />}

          {/* VIEW 6: PROJECTS TAB */}
          {activeNav === "projects" && <Projects />}

          {/* VIEW 7: AI INSIGHTS TAB */}
          {activeNav === "ai_insights" && <AiInsights />}

        </div>
      </main>
    </div>
  );
}