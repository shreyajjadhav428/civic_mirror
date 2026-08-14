export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1120px]">
      {/* Header */}
      <header className="max-w-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2D7FF9]">
          Citizen workspace
        </p>

        <h1 className="mt-1.5 text-[30px] font-extrabold tracking-[-0.035em] text-[#0D1B2A] sm:text-[34px]">
          Settings
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#63768A] sm:text-[15px]">
          Manage your CivicMirror preferences and how you receive civic
          information.
        </p>
      </header>

      <div className="mt-8 space-y-5">
        {/* Notifications */}
        <section className="overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_8px_28px_rgba(13,27,42,0.055)]">
          <div className="flex items-start justify-between gap-4 border-b border-[#E8EFF5] px-5 py-5 sm:px-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#2D7FF9]">
                Notifications
              </p>

              <h2 className="mt-1 text-base font-extrabold text-[#18324C]">
                Stay informed
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#718398]">
                Choose how CivicMirror keeps you updated.
              </p>
            </div>

            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#EEF5FF] text-[#2D7FF9]">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 9.5a6 6 0 0 0-12 0c0 7-3 7-3 8.5h18c0-1.5-3-1.5-3-8.5Z" />
                <path d="M10 21h4" />
              </svg>
            </span>
          </div>

          <div className="divide-y divide-[#E8EFF5] px-5 sm:px-6">
            {/* Request updates */}
            <label className="flex cursor-pointer items-center justify-between gap-5 py-5">
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#18324C]">
                  Request updates
                </p>

                <p className="mt-1 text-xs leading-5 text-[#718398]">
                  Get notified when the status of your request changes.
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 shrink-0 accent-[#2D7FF9]"
              />
            </label>

            {/* City updates */}
            <label className="flex cursor-pointer items-center justify-between gap-5 py-5">
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#18324C]">
                  City updates
                </p>

                <p className="mt-1 text-xs leading-5 text-[#718398]">
                  Receive important announcements and updates from your area.
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 shrink-0 accent-[#2D7FF9]"
              />
            </label>
          </div>
        </section>

        {/* Location */}
        <section className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_28px_rgba(13,27,42,0.055)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#00A68E]">
                Location
              </p>

              <h2 className="mt-1 text-base font-extrabold text-[#18324C]">
                Location preferences
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#718398]">
                Your area helps CivicMirror show relevant civic information.
              </p>
            </div>

            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#E9F8F4] text-[#00A68E]">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.2" />
              </svg>
            </span>
          </div>

          <div className="mt-5 rounded-xl border border-[#DDEBE7] bg-[#F5FBF9] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8293A3]">
                  Current area
                </p>

                <p className="mt-1 text-sm font-extrabold text-[#18324C]">
                  Shanti Nagar
                </p>

                <p className="mt-1 text-xs font-medium text-[#718398]">
                  Pincode 110025
                </p>
              </div>

              <span className="flex w-fit items-center gap-2 rounded-full border border-[#BFE9DE] bg-white px-3 py-1.5 text-[10px] font-bold text-[#087F6A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00A68E]" />
                Active area
              </span>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_28px_rgba(13,27,42,0.055)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#E0A000]">
                Privacy
              </p>

              <h2 className="mt-1 text-base font-extrabold text-[#18324C]">
                Privacy preferences
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-[#718398]">
                Your civic requests and account information are associated
                with your citizen account and used to provide CivicMirror
                services.
              </p>
            </div>

            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#FFF5DC] text-[#C18A00]">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="10" width="14" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                <path d="M12 14v2" />
              </svg>
            </span>
          </div>

          <div className="mt-5 border-t border-[#E8EFF5] pt-5">
            <button
              type="button"
              className="
                rounded-lg
                border
                border-[#C9D8E6]
                bg-white
                px-4
                py-2.5
                text-xs
                font-bold
                text-[#49647D]
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:border-[#2D7FF9]
                hover:bg-[#EEF5FF]
                hover:text-[#2D7FF9]
              "
            >
              Manage privacy preferences
            </button>
          </div>
        </section>

        {/* Account information */}
        <section className="overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_8px_28px_rgba(13,27,42,0.055)]">
          <div className="h-1 bg-[linear-gradient(90deg,#2D7FF9,#00A68E,#E9A81B)]" />

          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6857E8]">
                Account
              </p>

              <p className="mt-1 text-sm font-extrabold text-[#18324C]">
                CivicMirror citizen account
              </p>

              <p className="mt-1 text-xs leading-5 text-[#718398]">
                Your preferences are saved to your citizen profile.
              </p>
            </div>

            <span className="flex w-fit items-center gap-2 rounded-full border border-[#BFE9DE] bg-[#E9F8F4] px-3 py-1.5 text-[10px] font-bold text-[#087F6A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A68E]" />
              Account active
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}