export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-[1120px]">
      {/* Header */}
      <header className="max-w-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2D7FF9]">
          Citizen workspace
        </p>

        <h1 className="mt-1.5 text-[30px] font-extrabold tracking-[-0.035em] text-[#0D1B2A] sm:text-[34px]">
          Your profile
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#63768A] sm:text-[15px]">
          Manage your citizen information and view your civic activity.
        </p>
      </header>

      {/* Main content */}
      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Profile card */}
        <section className="overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_8px_28px_rgba(13,27,42,0.055)]">
          {/* Identity */}
          <div className="flex items-center gap-4 border-b border-[#E8EFF5] px-5 py-5 sm:px-6">
            <div
              className="
                relative
                grid
                h-14
                w-14
                shrink-0
                place-items-center
                rounded-full
                border
                border-[#9BC5FF]
                bg-[linear-gradient(145deg,#EAF4FF,#DDF4EF)]
                text-lg
                font-extrabold
                text-[#1D548F]
                shadow-[0_5px_16px_rgba(45,127,249,0.10)]
              "
              aria-hidden="true"
            >
              C

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#00A68E]" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#2D7FF9]">
                Account
              </p>

              <h2 className="mt-0.5 text-lg font-extrabold tracking-[-0.02em] text-[#18324C]">
                Citizen account
              </h2>

              <p className="mt-0.5 text-xs text-[#718398]">
                Civic services profile
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="grid gap-x-8 gap-y-6 px-5 py-6 sm:grid-cols-2 sm:px-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                Name
              </p>

              <p className="mt-1.5 text-[14px] font-semibold text-[#18324C]">
                Citizen
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                Email
              </p>

              <p className="mt-1.5 break-all text-[14px] font-semibold text-[#18324C]">
                citizen@example.com
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                Area
              </p>

              <p className="mt-1.5 text-[14px] font-semibold text-[#18324C]">
                Shanti Nagar
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                Pincode
              </p>

              <p className="mt-1.5 text-[14px] font-semibold text-[#18324C]">
                110025
              </p>
            </div>
          </div>

          {/* Profile metadata strip */}
          <div className="mx-5 mb-5 rounded-xl border border-[#E3ECF4] bg-[#F8FAFC] px-4 py-3 sm:mx-6">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00A68E]" />
                <span className="text-[11px] font-semibold text-[#49647D]">
                  Account active
                </span>
              </div>

              <span className="hidden h-3 w-px bg-[#D6E2EC] sm:block" />

              <span className="text-[11px] font-medium text-[#7A8D9F]">
                CivicMirror citizen
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="border-t border-[#E8EFF5] bg-[#FBFCFE] px-5 py-4 sm:px-6">
            <button
              type="button"
              className="
                rounded-lg
                bg-[#0D1B2A]
                px-4
                py-2.5
                text-xs
                font-bold
                text-white
                shadow-[0_5px_14px_rgba(13,27,42,0.12)]
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:bg-[#18324C]
              "
            >
              Edit profile
            </button>
          </div>
        </section>

        {/* Right column */}
        <aside className="space-y-5">
          {/* Civic activity */}
          <section className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_28px_rgba(13,27,42,0.055)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#2D7FF9]">
                  Civic activity
                </p>

                <p className="mt-1 text-xs text-[#8293A3]">
                  Your participation
                </p>
              </div>

              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF5FF] text-[#2D7FF9]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19V5" />
                  <path d="M4 19h16" />
                  <path d="m7 15 3-4 3 2 5-7" />
                </svg>
              </span>
            </div>

            <div className="mt-5 divide-y divide-[#E8EEF4]">
              <div className="flex items-center justify-between py-3 first:pt-0">
                <span className="text-xs font-medium text-[#63768A]">
                  Requests submitted
                </span>

                <strong className="text-lg font-extrabold text-[#2D7FF9]">
                  4
                </strong>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-xs font-medium text-[#63768A]">
                  Resolved requests
                </span>

                <strong className="text-lg font-extrabold text-[#00A68E]">
                  2
                </strong>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xs font-medium text-[#63768A]">
                  Active requests
                </span>

                <strong className="text-lg font-extrabold text-[#E0A000]">
                  2
                </strong>
              </div>
            </div>
          </section>

          {/* Account status */}
          <section className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_28px_rgba(13,27,42,0.055)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#00A68E]">
              Account status
            </p>

            <div className="mt-4 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00A68E] opacity-25" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00A68E]" />
              </span>

              <span className="text-sm font-bold text-[#18324C]">
                Active
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-[#718398]">
              Your citizen account is currently active and ready to use
              CivicMirror services.
            </p>
          </section>

          {/* Citizen participation */}
          <section className="overflow-hidden rounded-2xl border border-[#DCE7F1] bg-white shadow-[0_8px_28px_rgba(13,27,42,0.055)]">
            <div className="h-1 bg-[linear-gradient(90deg,#2D7FF9,#00A68E,#E9A81B)]" />

            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#E0A000]">
                Civic participation
              </p>

              <p className="mt-2 text-sm font-bold leading-5 text-[#18324C]">
                Your reports help keep your area informed.
              </p>

              <p className="mt-2 text-xs leading-5 text-[#718398]">
                Continue reporting issues and following their progress through
                CivicMirror.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}