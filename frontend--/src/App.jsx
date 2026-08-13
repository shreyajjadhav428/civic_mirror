import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./landing/Hero";
import Loader from "./landing/Loader";
import Footer from "./landing/Footer";
import HowItWorks from "./landing/HowItWorks";
import Mission from "./landing/Mission";
import Login from "./pages/Login";
import CitizenHome from "./citizen/CitizenHome";
import AdminDashboard from "./admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Loader />
              <Hero/>
              <Mission />
              <HowItWorks />
              <Footer />
            </>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Citizen */}
        <Route
          path="/citizen"
          element={<CitizenHome />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}