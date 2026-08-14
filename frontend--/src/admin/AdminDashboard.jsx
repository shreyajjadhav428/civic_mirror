import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Overview from "./Overview";
import Queries from "./Queries";
import Clusters from "./Clusters";
import Data from "./Data";
import Projects from "./Projects";
import AiInsights from "./AiInsights";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "requests", label: "Requests" },
    { id: "queries", label: "Queries" },
    { id: "clusters", label: "Clusters" },
    { id: "data", label: "Data" },
    { id: "projects", label: "Projects" },
    { id: "ai_insights", label: "AI Insights" }
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    setIsMobileSidebarOpen(false);
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
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-white/10 bg-[#0D1B2A] text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="inline-flex items-center text-lg font-black tracking-[0.08em] outline-none transition-opacity hover:opacity-85"
            >
              <span className="text-white">CIVIC</span>
              <span className="relative inline-block text-[#2D7FF9]">MIRROR</span>
            </a>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white md:hidden"
            >
              ✕
            </button>
          </div>

          <div className="px-6 pt-4 pb-2">
            <span className="inline-block rounded bg-[#2D7FF9]/20 px-2.5 py-1 text-[12px] font-extrabold tracking-[0.16em] text-[#8DBBFF] uppercase">
              Gov Admin Portal
            </span>
          </div>

          <nav className="mt-3 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-bold tracking-[0.06em] uppercase transition-all ${
                    isActive
                      ? "bg-[#2D7FF9] text-white shadow-lg shadow-[#2D7FF9]/25 font-black"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>● {item.label}</span>
                </button>
              );
            })}

            <div className="my-4 border-t border-white/10" />

            <button
              onClick={() => handleNavClick("settings")}
              className={`flex w-full items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-bold tracking-[0.06em] uppercase transition-all ${
                activeNav === "settings"
                  ? "bg-[#2D7FF9] text-white shadow-lg shadow-[#2D7FF9]/25 font-black"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>⚙ Settings</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => navigate("/login")}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-extrabold tracking-[0.12em] text-[#FF5252] hover:bg-red-500/10 uppercase transition-all"
          >
            <span>➔ Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#D6E6F7] bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="rounded-lg border border-[#D6E6F7] p-2 text-[#0D1B2A] hover:bg-slate-50 md:hidden"
            >
              ☰
            </button>

            <div>
              <span className="text-xl font-black tracking-[0.08em] text-[#0D1B2A]">
                CIVIC<span className="text-[#2D7FF9]">MIRROR</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 rounded-full border border-[#D6E6F7] bg-[#FAFAFC] px-3.5 py-1.5 shadow-sm">
              <span className="text-xs font-extrabold tracking-[0.14em] text-[#0D1B2A] uppercase">ADMIN 👤</span>
            </div>
          </div>
        </header>

        {/* Dynamic Section Content based on activeNav */}
        <div className="p-6 space-y-6">

          {/* VIEW 1: OVERVIEW TAB */}
          {activeNav === "overview" && <Overview />}

          {/* VIEW 2: QUERIES TAB */}
          {activeNav === "queries" && <Queries />}

          {/* VIEW 3: CLUSTERS TAB */}
          {activeNav === "clusters" && <Clusters />}

          {/* VIEW 4: DATA TAB */}
          {activeNav === "data" && <Data />}

          {/* VIEW 5: PROJECTS TAB */}
          {activeNav === "projects" && <Projects />}

          {/* VIEW 6: AI INSIGHTS TAB */}
          {activeNav === "ai_insights" && <AiInsights />}

          {/* VIEW 7: OTHER TABS */}
          {activeNav !== "overview" && activeNav !== "queries" && activeNav !== "clusters" && activeNav !== "data" && activeNav !== "projects" && activeNav !== "ai_insights" && (
            <div className="rounded-2xl border border-[#D6E6F7] bg-white p-8 text-center space-y-3 shadow-sm">
              <span className="inline-block rounded-full bg-[#2D7FF9]/10 p-3 text-[#2D7FF9]">
                ⚙
              </span>
              <h2 className="text-xl font-black text-[#0D1B2A] capitalize">
                {activeNav.replace("_", " ")} Workspace
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Viewing active municipal analytics and explainability logs for {activeNav.replace("_", " ")}.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
