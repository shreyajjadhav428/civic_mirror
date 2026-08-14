
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

  const navigationClassName = ({ isActive }) =>
    [
      "group relative flex min-h-[42px] w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[14px] font-medium",
      "transition-all duration-200 ease-out",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF]",

      isActive
        ? [
            "bg-[#183B60]",
            "text-white",
            "shadow-[0_4px_14px_rgba(5,18,33,0.10)]",
            "before:absolute before:left-0 before:top-1/2 before:h-5 before:w-[3px]",
            "before:-translate-y-1/2 before:rounded-r-full",
            "before:bg-[#4E95FB]",
          ].join(" ")
        : [
            "text-[#B9CBDE]",
            "hover:bg-white/[0.045]",
            "hover:text-white",
          ].join(" "),
    ].join(" ");

  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 flex w-[248px] flex-col justify-between overflow-y-auto bg-[#102B47] px-4 pb-[18px] pt-6 font-['Inter',sans-serif] text-[#DCE8F5] shadow-[1px_0_0_rgba(255,255,255,0.06),8px_0_24px_rgba(5,18,33,0.12)] max-[860px]:static max-[860px]:w-full max-[860px]:overflow-visible max-[860px]:p-3"
      aria-label="Citizen dashboard navigation"
    >
      <div className="max-[860px]:flex max-[860px]:items-center max-[860px]:gap-[18px]">

        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/citizen")}
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

            <small className="mt-0.5 block text-[11px] font-medium text-[#A8BDD2] max-[560px]:hidden">
              Citizen portal
            </small>
          </span>
        </button>

        {/* Divider */}
        <div className="mx-2 my-[22px] h-px bg-white/[0.07] max-[860px]:hidden" />

        {/* Main navigation */}
        <nav
          className="grid gap-1 max-[860px]:flex max-[860px]:flex-1 max-[860px]:gap-1 max-[860px]:overflow-x-auto"
          aria-label="Primary navigation"
        >
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#809BB7] max-[860px]:hidden">
            Workspace
          </p>

          {primaryNavigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={`${navigationClassName} max-[860px]:w-auto max-[860px]:flex-none max-[860px]:px-2.5 max-[860px]:py-2 max-[560px]:px-2`}
            >
              <SidebarIcon name={item.icon} />

              <span className="leading-none max-[560px]:hidden">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Account section */}
      <div className="max-[860px]:hidden">
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
            onClick={() => navigate("/citizen/profile")}
            className="flex min-h-[36px] w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left text-[12px] font-medium text-[#B8CADB] transition-all duration-150 hover:bg-white/[0.045] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#73ADFF]"
          >
            <SidebarIcon name="profile" />
            <span>Profile</span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => navigate("/citizen/settings")}
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
  );
}