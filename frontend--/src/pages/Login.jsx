import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
  setMounted(false);

  setTimeout(() => {
    navigate("/");
  }, 550);
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call backend login
      const user = await login(email, password);
      
      // Auto-route based on role returned from backend!
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/citizen');
      }
    } catch (err) {
      alert(err.message || 'Invalid credentials');
    }
  };

  return (
    <main className="h-screen overflow-hidden bg-[#FAFAFC] px-4 py-4 font-['Inter',sans-serif] text-[#0D1B2A] sm:px-6 sm:py-6 lg:px-10 lg:py-8">
      <div className={`relative mx-auto grid h-full w-full max-w-[1480px] overflow-hidden border border-[#D6E6F7] bg-white shadow-[0_30px_100px_rgba(13,27,42,0.14)] lg:grid-cols-[1.08fr_0.92fr] transition-all duration-700 ease-out ${
        mounted ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-[0.985]"
      }`}>
        
        {/* Cancel Button */}
        <button
          onClick={handleClose}
          className={`absolute top-5 right-5 sm:top-7 sm:right-7 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-500 hover:rotate-90 hover:scale-105 hover:bg-slate-50 hover:text-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2D7FF9]/40 ${
            mounted ? "translate-y-0 opacity-100 scale-100" : "-translate-y-3 opacity-0 scale-95"
          }`}
          aria-label="Close login page"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* =========================================================
            LEFT BRAND PANEL
        ========================================================= */}

        <section className="relative flex h-full flex-col justify-between overflow-hidden bg-[#0D1B2A] px-7 py-8 sm:px-10 sm:py-10 lg:px-20 lg:py-12 xl:px-24">

          {/* Background glow */}
          <div
            aria-hidden="true"
            className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#2D7FF9]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-36 -left-28 h-[420px] w-[420px] rounded-full bg-[#5B5BD6]/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute right-[12%] top-[34%] h-40 w-40 rounded-full bg-[#00A68E]/[0.07] blur-2xl"
          />

          {/* Subtle grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Decorative lines */}
          <div
            aria-hidden="true"
            className="absolute right-[-80px] top-[22%] h-px w-[55%] bg-[#2D7FF9]/30"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[24%] left-[-60px] h-px w-[42%] bg-[#00A68E]/30"
          />

          <div
            aria-hidden="true"
            className="absolute right-[9%] top-[20%] h-3 w-3 border border-[#FFC107]/70"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[27%] left-[12%] h-2 w-2 rounded-full bg-[#00A68E]"
          />

          {/* Logo */}
          <div className="relative z-10">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
              className="inline-flex items-center text-xl font-black tracking-[0.08em] outline-none transition-opacity hover:opacity-80 focus-visible:ring-4 focus-visible:ring-[#2D7FF9]/30"
            >
              <span className="text-white">CIVIC</span><span className="relative inline-block text-[#2D7FF9] after:absolute after:bottom-[-2.5px] after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100">MIRROR</span>
            </a>
          </div>

          {/* Main message */}
          <div className="relative z-10 max-w-xl lg:my-auto lg:py-8">

            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#2D7FF9]" />

              <span className="text-xs font-extrabold tracking-[0.18em] text-[#8DBBFF]">
                CIVIC INTELLIGENCE PLATFORM
              </span>
            </div>

            {/* Main heading */}
            <h1 className="max-w-lg text-[2.6rem] font-black leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]">
              Public decisions,
              <br />
              <span className="text-white">made clearer.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-md text-[15px] leading-7 text-white/65">
              CivicMirror brings municipal knowledge, evidence, and
              explainable AI together in one trustworthy place.
            </p>

            {/* Accent line */}
            <div className="mt-8 flex items-center gap-2">
              <span className="h-1.5 w-10 bg-[#2D7FF9]" />
              <span className="h-1.5 w-6 bg-[#00A68E]" />
              <span className="h-1.5 w-4 bg-[#5B5BD6]" />
              <span className="h-1.5 w-3 bg-[#FFC107]" />
            </div>
          </div>

          {/* Feature indicators */}
          <div className="relative z-10 grid max-w-xl grid-cols-3 border-t border-white/10 pt-6">

            <div className="border-r border-white/10 pr-5">
              <span className="block text-sm font-extrabold tracking-[0.12em] text-[#8DBBFF]">
                CLEAR
              </span>

              <span className="mt-2 block text-sm leading-6 text-white/55">
                Civic answers
              </span>
            </div>

            <div className="border-r border-white/10 px-5">
              <span className="block text-sm font-extrabold tracking-[0.12em] text-[#00A68E]">
                GROUNDED
              </span>

              <span className="mt-2 block text-sm leading-6 text-white/55">
                In evidence
              </span>
            </div>

            <div className="pl-5">
              <span className="block text-sm font-extrabold tracking-[0.12em] text-[#5B5BD6]">
                OPEN
              </span>

              <span className="mt-2 block text-sm leading-6 text-white/55">
                By design
              </span>
            </div>

          </div>
        </section>

        {/* =========================================================
            RIGHT LOGIN PANEL
        ========================================================= */}

        <section className="relative flex h-full items-center overflow-hidden bg-[#FAFAFC] px-6 py-7 sm:px-12 sm:py-8 lg:px-[clamp(3rem,7vw,7rem)]">

          {/* Background accents */}
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#5B5BD6]/[0.055] blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#00A68E]/[0.045] blur-3xl"
          />

          <div className="relative z-10 mx-auto w-full max-w-md">

            {/* Heading */}
            <div className="mb-8">

              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#2D7FF9]" />

                <p className="text-xs font-extrabold tracking-[0.18em] text-[#1E4FA3]">
                  SECURE ACCESS
                </p>
              </div>

              <h2 className="text-3xl font-black tracking-[-0.035em] text-[#0D1B2A] sm:text-4xl">
                {isSignUp ? (
                  <>
                    Sign in to <span className="text-black">CIVIC</span>
                    <span className="text-[#2D7FF9]">MIRROR</span>
                  </>
                ) : (
                  "Welcome back"
                )}
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#4B5563]">
                {isSignUp
                  ? "Create your account to access CivicMirror."
                  : "Sign in to access your CivicMirror workspace."}
              </p>

            </div>

            {/* User / Admin Toggle Control */}
            <div className="mb-6 flex rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setUserRole("user")}
                className={`flex-1 py-2 text-center text-xs font-black tracking-wider uppercase rounded-md transition-all duration-200 ${
                  userRole === "user"
                    ? "bg-white text-[#0D1B2A] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Resident / User
              </button>
              <button
                type="button"
                onClick={() => setUserRole("admin")}
                className={`flex-1 py-2 text-center text-xs font-black tracking-wider uppercase rounded-md transition-all duration-200 ${
                  userRole === "admin"
                    ? "bg-white text-[#0D1B2A] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Government / Admin
              </button>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email / Username */}
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-2 block text-sm font-bold text-[#0D1B2A]"
                >
                  Email / Username
                </label>

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="Enter your email or username"
                  className="h-14 w-full rounded-lg border border-[#D6E6F7] bg-white px-4 text-base text-[#0D1B2A] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-[#B9D2EE] focus:border-[#2D7FF9] focus:ring-4 focus:ring-[#2D7FF9]/10"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-[#0D1B2A]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="h-14 w-full rounded-lg border border-[#D6E6F7] bg-white px-4 pr-20 text-base text-[#0D1B2A] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-[#B9D2EE] focus:border-[#2D7FF9] focus:ring-4 focus:ring-[#2D7FF9]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((visible) => !visible)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-black tracking-[0.1em] text-[#1E4FA3] outline-none transition-colors hover:text-[#2D7FF9] focus-visible:ring-2 focus-visible:ring-[#2D7FF9]/40"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-lg bg-[#0D1B2A] px-6 text-sm font-black tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(13,27,42,0.14)] outline-none transition-all duration-200 hover:bg-[#162B42] hover:shadow-[0_12px_26px_rgba(13,27,42,0.18)] focus-visible:ring-4 focus-visible:ring-[#2D7FF9]/20 active:scale-[0.995]"
              >
                <span className="relative z-10">
                  {isSignUp ? "SIGN IN" : "LOGIN"}
                </span>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[3px] w-full bg-[#2D7FF9] transition-colors duration-200 group-hover:bg-[#2D7FF9]"
                />
              </button>

              {isSignUp ? (
                <div className="pt-1 text-center">
                  <p className="text-sm text-[#4B5563]">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="font-semibold text-[#2D7FF9] outline-none transition-colors hover:text-[#1E4FA3] focus-visible:ring-2 focus-visible:ring-[#2D7FF9]/40"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              ) : (
                <div className="pt-1 text-center">
                  <a
                    href="#forgot-password"
                    className="text-sm font-semibold text-[#4B5563] underline decoration-[#D6E6F7] underline-offset-4 outline-none transition-colors hover:text-[#2D7FF9] hover:decoration-[#2D7FF9] focus-visible:ring-2 focus-visible:ring-[#2D7FF9]/40"
                  >
                    Forgot password?
                  </a>

                  <p className="mt-3 text-sm text-[#4B5563]">
                    New user?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="font-semibold text-[#2D7FF9] outline-none transition-colors hover:text-[#1E4FA3] focus-visible:ring-2 focus-visible:ring-[#2D7FF9]/40"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              )}

            </form>



          </div>
        </section>

      </div>
    </main>
  );
}
