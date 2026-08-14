import CitizenSidebar from "./components/CitizenSidebar";
import CitizenTopBar from "./components/CitizenTopBar";
import CivicRequestComposer from "./components/CivicRequestComposer";
import DashboardStatistics from "./components/DashboardStatistics";
import ExploreArea from "./components/ExploreArea";
import RecentRequests from "./components/RecentRequests";
import WelcomeSection from "./components/WelcomeSection";

export default function CitizenHome() {
  return (
    <div className="min-h-screen bg-[#F1F4F8] font-['Inter',sans-serif] text-[#0D1B2A]">
      {/* Fixed top navigation */}
      <CitizenTopBar />

      {/* Fixed sidebar */}
      <CitizenSidebar />

      {/* Main dashboard */}
      <main
        className="
          ml-0
          min-h-screen
          w-full
          px-5
          pb-36
          pt-[92px]

          min-[861px]:ml-[248px]
          min-[861px]:w-[calc(100%-248px)]
          min-[861px]:px-8
          min-[861px]:pt-[104px]

          lg:px-10
          xl:px-12
        "
      >
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Welcome */}
          <WelcomeSection />

          {/* Main dashboard workspace */}
          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-6

              lg:grid-cols-[minmax(270px,0.78fr)_minmax(0,1.65fr)]
            "
          >
            {/* LEFT — Civic activity */}
            <DashboardStatistics />

            {/* RIGHT — Request history */}
            <RecentRequests />
          </div>

          {/* Local area */}
          <div className="mt-8">
            <ExploreArea />
          </div>
        </div>

        {/* Fixed civic composer */}
        <CivicRequestComposer />
      </main>
    </div>
  );
}