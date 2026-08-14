import { useEffect, useRef, useState } from "react";

const notifications = [
  {
    title: "Repair request updated",
    description: "Your streetlight report is now under review.",
    time: "12 min ago",
    tone: "blue",
  },
  {
    title: "Service update",
    description: "Road repair work is scheduled in your area this week.",
    time: "Yesterday",
    tone: "teal",
  },
];

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" 
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-[#E9A81B] stroke-[#9B6A00]"
      strokeWidth="1.5"
    >
      <path
        d="M18 9.5a6 6 0 0 0-12 0c0 7-3 7-3 8.5h18c0-1.5-3-1.5-3-8.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 21h4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24"
     aria-hidden="true"
     fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" 
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round">
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24"
     aria-hidden="true"
     fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.2 2.2-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.56V20.4h-3.1v-.1a1.7 1.7 0 0 0-1-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.2-2.2.06-.06A1.7 1.7 0 0 0 6.86 15a1.7 1.7 0 0 0-1.56-1H5.2v-3.1h.1a1.7 1.7 0 0 0 1.56-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.2-2.2.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.56V4.5h3.1v.1a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.2 2.2-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1h.1V14h-.1a1.7 1.7 0 0 0-1.56 1Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" 
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round">
      <path d="m10 17 5-5-5-5M15 12H3M14 4h5v16h-5" />
    </svg>
  );
}

export default function CitizenTopBar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const topBarRef = useRef(null);

  useEffect(() => {
    const closeMenus = (event) => {
      if (!topBarRef.current?.contains(event.target)) {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenus);
    return () => document.removeEventListener("mousedown", closeMenus);
  }, []);

  const handleNotificationClick = () => {
    setIsRinging(true);
    setNotificationsOpen((open) => !open);
    setProfileOpen(false);

    window.setTimeout(() => setIsRinging(false), 480);
  };

  return (
    <>
      <style>{`
        @keyframes civic-bell-ring {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(12deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(7deg); }
          80% { transform: rotate(-4deg); }
        }
      `}</style>

      <header
        ref={topBarRef}
        className="fixed inset-x-0 top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#DCE7F1] bg-white px-6 font-['Inter',sans-serif] shadow-[0_4px_14px_rgba(13,27,42,0.06)] min-[861px]:left-[248px] min-[861px]:px-8"
      >
        <div className="flex items-center gap-3">
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-transparent text-[#35516E] transition-colors duration-200 hover:border-[#DCE7F1] hover:bg-[#F4F8FC] hover:text-[#2D7FF9] min-[861px]:hidden"
             type="button"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

          <a
            className="text-[15px] font-extrabold tracking-[0.055em] text-[#0D1B2A] no-underline sm:hidden"
            href="/citizen"
            aria-label="CivicMirror home"
          >
            CIVIC<span className="text-[#2D7FF9]">MIRROR</span>
          </a>

          <div className="hidden h-5 w-px bg-[#DCE7F1] sm:block" />

          <p className="hidden text-sm font-medium text-[#60748A] sm:block">
            Citizen dashboard
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              className="relative grid h-10 w-10 place-items-center rounded-lg border border-transparent text-[#35516E] transition-colors duration-200 hover:border-[#DCE7F1] hover:bg-[#F4F8FC] hover:text-[#2D7FF9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D7FF9]"
              type="button"
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              onClick={handleNotificationClick}
            >
              <span
                className={isRinging ? "origin-top [animation:civic-bell-ring_480ms_ease-in-out]" : ""}
              >
                <BellIcon />
              </span>

              {notifications.length > 0 && (
                <span
                  className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full border-2 border-white bg-[#E9A81B]"
                  aria-label={`${notifications.length} unread notifications`}
                />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-[50px] w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-xl border border-[#D9E5F0] bg-white shadow-[0_14px_32px_rgba(13,27,42,0.13)] [animation:dropdown-in_180ms_ease-out]">
                <style>{`
                  @keyframes dropdown-in {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>

                <div className="flex items-center justify-between border-b border-[#E5EDF5] px-4 py-3">
                  <div>
                    <p className="m-0 text-sm font-bold text-[#0D1B2A]">
                      Notifications
                    </p>
                    <p className="mt-0.5 text-xs text-[#708298]">
                      Recent activity in your area
                    </p>
                  </div>
                  <span className="rounded-full bg-[#FFF5D9] px-2 py-1 text-[11px] font-semibold text-[#9B6A00]">
                    {notifications.length} new
                  </span>
                </div>

                <div className="divide-y divide-[#E9F0F6]">
                  {notifications.map((notification) => (
                    <button
                      className="flex w-full gap-3 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-[#F7FAFD]"
                      type="button"
                      key={notification.title}
                    >
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          notification.tone === "teal"
                            ? "bg-[#00A68E]"
                            : "bg-[#2D7FF9]"
                        }`}
                        aria-hidden="true"
                      />

                      <span>
                        <strong className="block text-[13px] font-semibold text-[#18324C]">
                          {notification.title}
                        </strong>
                        <span className="mt-1 block text-xs leading-5 text-[#6A7D91]">
                          {notification.description}
                        </span>
                        <span className="mt-1.5 block text-[11px] font-medium text-[#8798AA]">
                          {notification.time}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  className="w-full border-t border-[#E5EDF5] px-4 py-3 text-center text-xs font-semibold text-[#2D7FF9] transition-colors duration-150 hover:bg-[#F7FAFD]"
                  type="button"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>

         <div className="relative">
          <button
            className="flex h-8 items-center gap-1 rounded-lg border border-transparent py-0.5 pl-0.5 pr-1 transition-all duration-200 hover:border-[#DCE7F1] hover:bg-[#F7FAFD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D7FF9]"
            type="button"
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
            onClick={() => {
              setProfileOpen((open) => !open);
              setNotificationsOpen(false);
            }}
          >
            <span className="relative grid h-6 w-6 place-items-center rounded-full border border-[#9BC5FF] bg-[linear-gradient(145deg,#EAF4FF,#DDF4EF)] text-[9px] font-bold text-[#1D548F]">
              C
              <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full border border-white bg-[#00A68E]" />
            </span>

            <ChevronIcon />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-[40px] w-[170px] overflow-hidden rounded-lg border border-[#DCE5EE] bg-white py-0.5 shadow-[0_8px_24px_rgba(13,27,42,0.12)]">

              {/* Account header */}
              <div className="border-b border-[#E8EEF4] px-2.5 py-2">
                <p className="m-0 text-[10px] font-bold leading-4 text-[#18324C]">
                  Citizen account
                </p>

                <p className="m-0 text-[9px] leading-3.5 text-[#7A8B9C]">
                  Civic services profile
                </p>
              </div>

              {/* Profile */}
              <button
                className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[10px] font-medium leading-4 text-[#49647D] transition-colors duration-150 hover:bg-[#F5F8FB] hover:text-[#0D1B2A]"
                type="button"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[#EEF5FC] text-[#2D7FF9]">
                  <UserIcon />
                </span>

                <span>Profile</span>
              </button>

              {/* Settings */}
              <button
                className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[10px] font-medium leading-4 text-[#49647D] transition-colors duration-150 hover:bg-[#F5F8FB] hover:text-[#0D1B2A]"
                type="button"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[#F1F4F7] text-[#60748A]">
                  <SettingsIcon />
                </span>

                <span>Settings</span>
              </button>

              {/* Logout */}
              <button
                className="flex w-full items-center gap-2 border-t border-[#E8EEF4] px-2.5 py-1.5 text-left text-[10px] font-medium leading-4 text-[#49647D] transition-colors duration-150 hover:bg-[#FFF5F5] hover:text-[#C44545]"
                type="button"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[#FFF1F1] text-[#C44545]">
                  <LogoutIcon />
                </span>

                <span>Log out</span>
              </button>

            </div>
          )}
        </div>
        </div>
      </header>
    </>
  );
}