import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Overview from "./Overview";
import Requests from "./Requests";
import Queries from "./Queries";
import Clusters from "./Clusters";
import Data from "./Data";
import Projects from "./Projects";
import AiInsights from "./AiInsights";

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
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setActiveNav(getTabFromPath(location.pathname));
  }, [location.pathname]);

  const navItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "clusters", label: "Clusters", icon: "🧩" },
    { id: "requests", label: "Requests", icon: "📑" },
    { id: "queries", label: "Queries", icon: "💬" },
    { id: "data", label: "Data", icon: "📁" },
    { id: "projects", label: "Projects", icon: "🏗️" },
    { id: "ai_insights", label: "AI Insights", icon: "⚡" }
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    setIsMobileSidebarOpen(false);
    navigate(`/admin/${id === "overview" ? "" : id}`);
  };

  return (
    <div className="admin-dashboard-container flex h-screen w-full overflow-hidden bg-[#FAFAFC] font-['Inter',sans-serif] text-[#0D1B2A]">
      
      {/* Sidebar Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#0D1B2A]/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Persistent Sidebar Shell */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-68 flex-col justify-between border-r border-white/10 bg-[#0B1727] text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo & Header */}
          <div className="flex items-center justify-between border-b border-white/10 py-5 pr-6 pl-[48px]">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="group inline-flex items-center text-4xl font-black tracking-tight outline-none"
            >
              <span className="text-white">C</span>
              <span className="relative text-[#2D7FF9] after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                M
              </span>
            </a>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white md:hidden"
            >
              ✕
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-5 px-3 space-y-1">
            <div className="px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-400">
              WORKSPACE
            </div>

            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-extrabold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#1E293B] text-white shadow-sm border border-slate-700/50"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className={`text-lg font-black ${isActive ? "text-[#2D7FF9]" : "text-slate-500"}`}>•</span>
                  <span className="text-lg">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Account Profile Widget */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => navigate("/login")}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-md font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition"
          >
            <span>➔</span> Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-y-auto relative">
        {/* Mobile Sidebar Toggle Button */}
        <div className="p-4 pb-0 md:hidden flex items-center justify-between">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-xs"
          >
            ☰ Menu
          </button>
        </div>

        {/* Dynamic Section Content based on activeNav */}
        <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">

          {/* VIEW 1: OVERVIEW TAB */}
          {activeNav === "overview" && <Overview />}

          {/* VIEW 2: REQUESTS TAB */}
          {activeNav === "requests" && <Requests />}

          {/* VIEW 3: QUERIES TAB */}
          {activeNav === "queries" && <Queries onNavigate={setActiveNav} />}

          {/* VIEW 3: CLUSTERS TAB */}
          {activeNav === "clusters" && <Clusters onNavigate={setActiveNav} />}

          {/* VIEW 4: DATA TAB */}
          {activeNav === "data" && <Data />}

          {/* VIEW 5: PROJECTS TAB */}
          {activeNav === "projects" && <Projects />}

          {/* VIEW 6: AI INSIGHTS TAB */}
          {activeNav === "ai_insights" && <AiInsights />}

        </div>
      </main>
    </div>
  );
}
