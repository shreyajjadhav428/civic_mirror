import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./landing/Hero";
import Loader from "./landing/Loader";
import Footer from "./landing/Footer";
import HowItWorks from "./landing/HowItWorks";
import Mission from "./landing/Mission";
import Login from "./pages/Login";
import CitizenHome from "./citizen/CitizenHome";
import CitizenRequestPage from "./citizen/request/CitizenRequestPage";
import TrackRepairsPage from "./citizen/repairs/TrackRepairsPage";
import AdminDashboard from "./admin/AdminDashboard";
import MyRequestsPage from "./citizen/requests/MyRequestsPage";
import CityUpdatesPage from "./citizen/updates/CityUpdatesPage";
import ProfilePage from "./citizen/ProfilePage";
import SettingsPage from "./citizen/SettingsPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Loader />
            <Hero />
            <Mission />
            <HowItWorks />
            <Footer />
          </>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/citizen/profile" element={<ProfilePage />} />
      <Route path="/citizen" element={<CitizenHome />} />
      <Route path="/citizen/request" element={<CitizenRequestPage />} />
      <Route path="/citizen/requests" element={<MyRequestsPage />} />
      <Route path="/citizen/repairs" element={<TrackRepairsPage />} />
      <Route path="/citizen/updates" element={<CityUpdatesPage />} />
      <Route path="/citizen/settings" element={<SettingsPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}