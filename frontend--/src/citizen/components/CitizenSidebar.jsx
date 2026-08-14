import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const primaryNavigation = [
  { label: "Overview", to: "/citizen", icon: "overview", end: true },
  { label: "My requests", to: "/citizen/requests", icon: "requests" },
  { label: "Track repairs", to: "/citizen/repairs", icon: "repairs" },
  { label: "City updates", to: "/citizen/updates", icon: "updates" },
];

function SidebarIcon({ name }) {
  const icons = {
    overview: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),

    requests: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v5h5M10 13h5M10 17h5" />
      </>
    ),

    repairs: (
      <>
        <path d="M19 10c0 4.4-7 10-7 10S5 14.4 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),

    updates: (
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    ),

    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.2 2.2-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.56V20.4h-3.1v-.1a1.7 1.7 0 0 0-1-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.2-2.2.06-.06A1.7 1.7 0 0 0 6.86 15a1.7 1.7 0 0 0-1.56-1H5.2v-3.1h.1a1.7 1.7 0 0 0 1.56-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.2-2.2.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.56V4.5h3.1v.1a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.2 2.2-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1h.1V14h-.1a1.7 1.7 0 0 0-1.56 1Z" />
      </>
    ),

    profile: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),

    logout: <path d="M10 17l5-5-5-5M15 12H3M14 4h5v16h-5" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[17px] w-[17px] shrink-0 fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]"
    >
      {icons[name]}
    </svg>
  );
}

export default function CitizenSidebar({ onLogout }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const toggleSidebar = () => {
      setMobileOpen((open) => !open);
    };

    const closeSidebar = () => {
      setMobileOpen(false);
    };

    window.addEventListener("citizen:toggle-sidebar", toggleSidebar);
    window.addEventListener("citizen:close-sidebar", closeSidebar);

    return () => {
      window.removeEventListener("citizen:toggle-sidebar", toggleSidebar);
      window.removeEventListener("citizen:close-sidebar", closeSidebar);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  const handleNavigation = () => {
    closeMobileSidebar();
  };

  const navigationClassName = ({ isActive }) =>
    [
      "group relative flex min-h-[44px] w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-left text-[14px] font-medium",
      "transition-all duration-200 ease-out",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF]",

      isActive
        ? [
            "bg-[#234D78]",
            "text-white",
            "shadow-[0_3px_12px_rgba(5,18,33,0.16)]",
            "ring-1 ring-inset ring-white/[0.06]",
            "before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[3px]",
            "before:-translate-y-1/2 before:rounded-r-full",
            "before:bg-[#69A8FF]",
          ].join(" ")
        : [
            "text-[#B9CBDE]",
            "hover:bg-white/[0.055]",
            "hover:text-white",
            "hover:translate-x-[1px]",
          ].join(" "),
    ].join(" ");

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={[
          "fixed inset-0 z-40 bg-[#071727]/45 backdrop-blur-[2px] transition-opacity duration-300 min-[861px]:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={closeMobileSidebar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col justify-between overflow-y-auto bg-[#102B47] px-4 pb-[18px] pt-6 font-['Inter',sans-serif] text-[#DCE8F5]",
          "shadow-[1px_0_0_rgba(255,255,255,0.06),8px_0_24px_rgba(5,18,33,0.18)]",
          "transition-transform duration-300 ease-out",
          "min-[861px]:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "min-[861px]:z-30",
        ].join(" ")}
        aria-label="Citizen dashboard navigation"
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                navigate("/citizen");
                handleNavigation();
              }}
              className="flex items-center gap-3 px-2 py-[5px] text-left text-white outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF]"
              aria-label="CivicMirror home"
            >
              <span
                className="grid h-[34px] w-[34px] place-items-center rounded-lg border border-[#A0C6ED]/30 bg-[#173B61] text-[11px] font-extrabold tracking-[-0.04em] text-[#9DC6FF]"
                aria-hidden="true"
              >
                CM
              </span>

              <span>
                <strong className="block text-[15px] font-bold tracking-[-0.02em]">
                  Civic<span className="text-[#69A8FF]">Mirror</span>
                </strong>

                <small className="mt-0.5 block text-[11px] font-medium text-[#A8BDD2]">
                  Citizen portal
                </small>
              </span>
            </button>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={closeMobileSidebar}
              className="grid h-9 w-9 place-items-center rounded-lg text-[#9FB5CA] transition-colors hover:bg-white/[0.06] hover:text-white min-[861px]:hidden"
              aria-label="Close navigation menu"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="mx-2 my-[22px] h-px bg-white/[0.07]" />

          {/* Main navigation */}
          <nav
            className="grid gap-1"
            aria-label="Primary navigation"
          >
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#809BB7]">
              Workspace
            </p>

            {primaryNavigation.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={handleNavigation}
                className={navigationClassName}
              >
                {({ isActive }) => (
                  <>
                    <SidebarIcon name={item.icon} />

                    <span
                      className={[
                        "leading-none",
                        isActive
                          ? "font-semibold text-white"
                          : "font-medium",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Account section */}
        <div>
          <div className="mx-2 my-[22px] h-px bg-white/[0.07]" />

          <div className="flex items-center gap-2.5 px-2.5 pb-[15px]">
            <span
              className="grid h-[31px] w-[31px] shrink-0 place-items-center rounded-full border border-[#A0C6ED]/25 bg-[#1A3D61] text-xs font-bold text-[#CCE2FF]"
              aria-hidden="true"
            >
              C
            </span>

            <span>
              <strong className="block text-xs font-semibold text-[#F0F6FC]">
                Citizen account
              </strong>

              <small className="mt-0.5 block text-[10px] text-[#93ACC4]">
                Manage your profile
              </small>
            </span>
          </div>

          <div className="grid gap-0.5">
            {/* Profile */}
            <button
              type="button"
              onClick={() => {
                navigate("/citizen/profile");
                handleNavigation();
              }}
              className="flex min-h-[36px] w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left text-[12px] font-medium text-[#B8CADB] transition-all duration-150 hover:bg-white/[0.045] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF]"
            >
              <SidebarIcon name="profile" />
              <span>Profile</span>
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={() => {
                navigate("/citizen/settings");
                handleNavigation();
              }}
              className="flex min-h-[36px] w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left text-[12px] font-medium text-[#B8CADB] transition-all duration-150 hover:bg-white/[0.045] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF]"
            >
              <SidebarIcon name="settings" />
              <span>Settings</span>
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={onLogout}
              className="mt-1 flex min-h-[36px] w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left text-[12px] font-medium text-[#B8CADB] transition-all duration-150 hover:bg-white/[0.045] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF]"
            >
              <SidebarIcon name="logout" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}