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
    { id: "requests", label: "Requests", icon: "📑" },
    { id: "queries", label: "Queries", icon: "💬" },
    { id: "clusters", label: "Clusters", icon: "🧩" },
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
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
                className="group inline-flex items-center text-2xl font-black tracking-tight outline-none"
              >
                <span className="text-white">C</span>
                <span className="relative text-[#2D7FF9] after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                  M
                </span>
              </a>
              <span className="text-xs font-semibold text-slate-400">Admin portal</span>
            </div>
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
          <div className="px-2 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-lg font-black text-[#2D7FF9] border border-slate-700">
                A
              </div>
              <div>
                <span className="block text-md font-black text-white leading-tight">Admin account</span>
                <span className="block text-md font-medium text-slate-400">Manage system</span>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-1.5 text-md font-bold text-slate-400">
              <button
                onClick={() => handleNavClick("overview")}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-white/5 hover:text-white transition"
              >
                <span>👤</span> Profile
              </button>
              <button
                onClick={() => handleNavClick("overview")}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-white/5 hover:text-white transition"
              >
                <span>⚙</span> Settings
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition"
              >
                <span>➔</span> Log out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        
        {/* Top Header Bar matching Citizen Portal */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-6 py-4 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 md:hidden"
            >
              ☰
            </button>

            <span className="text-sm font-semibold text-slate-500">
              Admin dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
                aria-label="Notifications"
              >
                🔔
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-white">
                  2
                </span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl z-50">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-bold text-slate-900">System Notifications</span>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">2 new</span>
                  </div>
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                      <span className="font-bold text-slate-800 block">Critical Issue Flagged</span>
                      <span className="text-slate-500 text-[11px]">Water pipe burst reported in Ward 3 • 10m ago</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                      <span className="font-bold text-slate-800 block">AI Explainability Audit Completed</span>
                      <span className="text-slate-500 text-[11px]">22 inquiries verified • 1h ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar dropdown icon */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D1B2A] text-xs font-black text-white border border-slate-200">
              A
            </div>
          </div>
        </header>

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
