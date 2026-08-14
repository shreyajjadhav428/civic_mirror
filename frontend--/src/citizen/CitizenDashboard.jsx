import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CitizenSidebar from "./components/CitizenSidebar";
import CitizenTopBar from "./components/CitizenTopBar";
import Overview from "./Overview";
import Request from "./Request";
import Requests from "./Requests";
import TrackRepairs from "./TrackRepairs";
import Updates from "./Updates";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";

export default function CitizenDashboard() {
    const navigate = useNavigate();

const handleCitizenNavigation = (page) => {
  navigate(`/citizen/${page}`);
};
  return (
    <div className="min-h-screen bg-[#F1F4F8] font-['Inter',sans-serif] text-[#0D1B2A]">
      <CitizenTopBar />
      <CitizenSidebar />

      <main className="min-h-screen px-5 pb-12 pt-[92px] min-[861px]:ml-[248px] min-[861px]:w-[calc(100%-248px)] min-[861px]:px-8 min-[861px]:pt-[104px] lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="request" element={<Request />} />
            <Route path="requests" element={<Requests />} />
            <Route
  path="repairs"
  element={<TrackRepairs onNavigate={handleCitizenNavigation} />}
/>
            <Route path="updates" element={<Updates />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/citizen" replace />} />
            </Routes>
        </div>
      </main>
    </div>
  );
}