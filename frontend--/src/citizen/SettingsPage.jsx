import CitizenSidebar from "./components/CitizenSidebar";
import CitizenTopBar from "./components/CitizenTopBar";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F1F4F8] font-['Inter',sans-serif] text-[#0D1B2A]">
      <CitizenTopBar />
      <CitizenSidebar />

      <main className="min-h-screen px-5 pb-12 pt-[92px] min-[861px]:ml-[248px] min-[861px]:w-[calc(100%-248px)] min-[861px]:px-8 min-[861px]:pt-[104px] lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-[900px]">

          <header className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#70859A]">
              Account
            </p>

            <h1 className="mt-1.5 text-[28px] font-extrabold tracking-[-0.03em] text-[#0D1B2A]">
              Settings
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#687C90]">
              Manage your CivicMirror preferences.
            </p>
          </header>

          <div className="space-y-5">

            {/* Notifications */}
            <section className="rounded-2xl border border-[#DCE7F1] bg-white p-6 shadow-[0_8px_24px_rgba(13,27,42,0.045)]">
              <div>
                <h2 className="text-base font-bold text-[#18324C]">
                  Notifications
                </h2>

                <p className="mt-1 text-sm text-[#718398]">
                  Choose how CivicMirror keeps you informed.
                </p>
              </div>

              <div className="mt-6 divide-y divide-[#E8EFF5]">

                <label className="flex items-center justify-between gap-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-[#18324C]">
                      Request updates
                    </p>

                    <p className="mt-1 text-xs text-[#718398]">
                      Get notified when the status of your request changes.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-[#2D7FF9]"
                  />
                </label>

                <label className="flex items-center justify-between gap-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-[#18324C]">
                      City updates
                    </p>

                    <p className="mt-1 text-xs text-[#718398]">
                      Receive important updates from your area.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-[#2D7FF9]"
                  />
                </label>

              </div>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-[#DCE7F1] bg-white p-6 shadow-[0_8px_24px_rgba(13,27,42,0.045)]">
              <h2 className="text-base font-bold text-[#18324C]">
                Location preferences
              </h2>

              <p className="mt-1 text-sm text-[#718398]">
                Your area is used to show relevant civic information.
              </p>

              <div className="mt-5 rounded-xl border border-[#E3EBF3] bg-[#F8FAFC] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8293A3]">
                  Current area
                </p>

                <p className="mt-1 text-sm font-semibold text-[#18324C]">
                  Shanti Nagar
                </p>

                <p className="mt-1 text-xs text-[#718398]">
                  Pincode 110025
                </p>
              </div>
            </section>

            {/* Privacy */}
            <section className="rounded-2xl border border-[#DCE7F1] bg-white p-6 shadow-[0_8px_24px_rgba(13,27,42,0.045)]">
              <h2 className="text-base font-bold text-[#18324C]">
                Privacy
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#718398]">
                Your civic requests and account information are associated
                with your citizen account.
              </p>

              <button
                type="button"
                className="mt-5 rounded-lg border border-[#DCE7F1] px-4 py-2.5 text-xs font-semibold text-[#49647D]"
              >
                Manage privacy preferences
              </button>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}