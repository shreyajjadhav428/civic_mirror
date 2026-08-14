import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./landing/Hero";
import Loader from "./landing/Loader";
import Footer from "./landing/Footer";
import HowItWorks from "./landing/HowItWorks";
import Mission from "./landing/Mission";
import Login from "./pages/Login";
import CitizenDashboard from "./citizen/CitizenDashboard";
import AdminDashboard from "./admin/AdminDashboard";

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
      <Route path="/citizen/*" element={<CitizenDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}