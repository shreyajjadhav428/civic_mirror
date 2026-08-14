import { useLocation } from "react-router-dom";
import CitizenSidebar from "../components/CitizenSidebar";
import CitizenTopBar from "../components/CitizenTopBar";
import LocationSelector from "./components/LocationSelector";
import RequestComposer from "./components/RequestComposer";
import RequestHeader from "./components/RequestHeader";
import ConversationThread from "./components/ConversationThread";

const mockRequest = {
  message: "There is a large pothole near my street that is affecting traffic.",
  createdAt: "14 Aug 2026",
  location: "My area",

  aiResponse:
    "CivicMirror has identified this as a road maintenance issue. The request can be directed to the relevant civic department for review.",

  explanation:
    "The request describes damage to a public road, which falls under civic road maintenance responsibilities.",

  evidence: [
    {
      id: 1,
      title: "Request information",
      description:
        "Your description indicates a road surface problem affecting people in the area.",
    },
    {
      id: 2,
      title: "Civic category",
      description:
        "Road damage can be classified under public infrastructure and maintenance.",
    },
  ],

  nextSteps: [
    "The request can be reviewed by the relevant civic department.",
    "You can track the progress of this request from My Requests.",
  ],
};

export default function CitizenRequestPage() {
  const location = useLocation();

  const initialDraft = location.state?.draft || "";
  const initialAttachment = location.state?.attachment || "";
  const reopenedRequest = location.state?.reopenedRequest || null;
  const conversationRequest = reopenedRequest || mockRequest;

  return (
    <div className="min-h-screen bg-[#F1F4F8] font-['Inter',sans-serif] text-[#0D1B2A]">
      <CitizenTopBar />
      <CitizenSidebar />

      <main className="min-h-screen px-5 pb-12 pt-[92px] min-[861px]:ml-[248px] min-[861px]:w-[calc(100%-248px)] min-[861px]:px-8 min-[861px]:pt-[104px] lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-[1120px]">
          <RequestHeader />

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <section className="min-w-0">
              <div className="rounded-2xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.045)] sm:p-6">
                <RequestComposer
                  initialAttachment={initialAttachment}
                  initialValue={initialDraft}
                />

                <p className="mt-3 text-xs leading-5 text-[#718398]">
                  Attach a photo or document when it helps explain the issue.
                  CivicMirror will help route your request to the right team.
                </p>
              </div>

              <div className="mt-6">
                <ConversationThread
                request={conversationRequest}
                isProcessing={false}
                onFollowUp={(message) => {
                    console.log("Follow-up:", message);
                }}
                />
              </div>
            </section>

            <aside className="space-y-5">
              <LocationSelector />

              <section className="rounded-xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.04)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6857E8]">
                  How it works
                </p>

                <ol className="mt-4 space-y-3 text-sm leading-5 text-[#63768A]">
                  <li>
                    <strong className="mr-2 text-[#18324C]">1.</strong>
                    Describe the issue.
                  </li>

                  <li>
                    <strong className="mr-2 text-[#18324C]">2.</strong>
                    Add supporting details.
                  </li>

                  <li>
                    <strong className="mr-2 text-[#18324C]">3.</strong>
                    Review before submitting.
                  </li>
                </ol>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}