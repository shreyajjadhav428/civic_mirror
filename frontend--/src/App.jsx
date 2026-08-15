import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./landing/Hero";

const Loader = lazy(() => import("./landing/Loader"));
const Footer = lazy(() => import("./landing/Footer"));
const HowItWorks = lazy(() => import("./landing/HowItWorks"));
const Mission = lazy(() => import("./landing/Mission"));
const Login = lazy(() => import("./pages/Login"));
const CitizenDashboard = lazy(() => import("./citizen/CitizenDashboard"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));

export default function App() {
  return (
    <Suspense fallback={null}>
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
        <Route path="/signup" element={<Login initialMode="register" />} />
        <Route path="/register" element={<Login initialMode="register" />} />
        <Route path="/citizen/*" element={<CitizenDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  );
}