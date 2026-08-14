import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CitizenSidebar from "./components/CitizenSidebar";
import Overview from "./Overview";
import Request from "./Request";
import Requests from "./Requests";
import TrackRepairs from "./TrackRepairs";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";

export default function CitizenDashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleCitizenNavigation = (page) => {
    navigate(`/citizen/${page}`);
  };

  return (
    <div className="min-h-screen bg-[#F1F4F8] font-['Inter',sans-serif] text-[#0D1B2A]">
      <CitizenSidebar onLogout={onLogout} />

      {/* Mobile Sidebar Toggle Header (Only visible on small screens) */}
      <div className="flex items-center justify-between border-b border-[#DCE7F1] bg-white px-5 py-3 min-[861px]:hidden">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("citizen:toggle-sidebar"))}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#0D1B2A]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>Menu</span>
        </button>
        <span className="text-sm font-black text-[#0D1B2A]">
          Civic<span className="text-[#2D7FF9]">Mirror</span>
        </span>
      </div>

     <main className="min-h-screen min-[861px]:ml-[248px] min-[861px]:w-[calc(100%-248px)]">
  <div className="mx-auto w-full max-w-[1440px]">
        <Routes>
  <Route index element={<Overview />} />

  <Route
    path="request"
    element={
      <div className="px-5 py-6 sm:px-7 sm:py-8 lg:px-10">
        <Request />
      </div>
    }
  />

  <Route
    path="requests"
    element={
      <div className="px-5 py-6 sm:px-7 sm:py-8 lg:px-10">
        <Requests />
      </div>
    }
  />

  <Route
    path="repairs"
    element={
      <div className="px-5 py-6 sm:px-7 sm:py-8 lg:px-10">
        <TrackRepairs onNavigate={handleCitizenNavigation} />
      </div>
    }
  />

  <Route
    path="profile"
    element={
      <div className="px-5 py-6 sm:px-7 sm:py-8 lg:px-10">
        <ProfilePage />
      </div>
    }
  />

  <Route
    path="settings"
    element={
      <div className="px-5 py-6 sm:px-7 sm:py-8 lg:px-10">
        <SettingsPage />
      </div>
    }
  />

  <Route path="*" element={<Navigate to="/citizen" replace />} />
</Routes>
        </div>
      </main>
    </div>
  );
}