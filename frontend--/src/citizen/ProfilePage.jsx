import CitizenSidebar from "./components/CitizenSidebar";
import CitizenTopBar from "./components/CitizenTopBar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F1F4F8] font-['Inter',sans-serif] text-[#0D1B2A]">
      <CitizenTopBar />
      <CitizenSidebar />

      <main className="min-h-screen px-5 pb-12 pt-[92px] min-[861px]:ml-[248px] min-[861px]:w-[calc(100%-248px)] min-[861px]:px-8 min-[861px]:pt-[104px] lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-[1000px]">

          {/* Header */}
          <header className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#70859A]">
              Account
            </p>

            <h1 className="mt-1.5 text-[28px] font-extrabold tracking-[-0.03em] text-[#0D1B2A]">
              Your profile
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#687C90]">
              Manage your citizen information and view your civic activity.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">

            {/* Profile information */}
            <section className="rounded-2xl border border-[#DCE7F1] bg-white p-6 shadow-[0_8px_24px_rgba(13,27,42,0.045)]">
              <div className="flex items-center gap-4 border-b border-[#E8EFF5] pb-6">
                <div
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#9BC5FF] bg-[#EEF5FF] text-lg font-bold text-[#1D548F]"
                  aria-hidden="true"
                >
                  C
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#18324C]">
                    Citizen account
                  </h2>

                  <p className="mt-1 text-sm text-[#718398]">
                    Civic services profile
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8293A3]">
                    Name
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#18324C]">
                    Citizen
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8293A3]">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#18324C]">
                    citizen@example.com
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8293A3]">
                    Area
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#18324C]">
                    Shanti Nagar
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#8293A3]">
                    Pincode
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#18324C]">
                    110025
                  </p>
                </div>

              </div>

              <div className="mt-7 border-t border-[#E8EFF5] pt-5">
                <button
                  type="button"
                  className="rounded-lg bg-[#0D1B2A] px-4 py-2.5 text-xs font-bold text-white"
                >
                  Edit profile
                </button>
              </div>
            </section>

            {/* Civic activity */}
            <aside className="space-y-5">

              <section className="rounded-xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.04)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6857E8]">
                  Civic activity
                </p>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#63768A]">
                      Requests submitted
                    </span>

                    <strong className="text-base text-[#18324C]">
                      4
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#63768A]">
                      Resolved requests
                    </span>

                    <strong className="text-base text-[#18324C]">
                      2
                    </strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#63768A]">
                      Active requests
                    </span>

                    <strong className="text-base text-[#18324C]">
                      2
                    </strong>
                  </div>

                </div>
              </section>

              <section className="rounded-xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.04)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6857E8]">
                  Account status
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00A68E]" />

                  <span className="text-sm font-medium text-[#18324C]">
                    Active
                  </span>
                </div>

                <p className="mt-3 text-xs leading-5 text-[#718398]">
                  Your citizen account is currently active and ready to use
                  CivicMirror services.
                </p>
              </section>

            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}