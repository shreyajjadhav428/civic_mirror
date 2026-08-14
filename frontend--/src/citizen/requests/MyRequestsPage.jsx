import { useState } from "react";
import { useNavigate } from "react-router-dom";

const requests = [
  {
    id: 1,
    title: "Pothole near Main Road",
    status: "In Progress",
    date: "14 Aug 2026",
    location: "Main Road, Your Area",
    description:
      "There is a large pothole near my street that is affecting traffic.",
    department: "Road Maintenance Department",
    aiSummary:
      "CivicMirror identified this as a public road maintenance issue.",
    evidence:
      "The request description indicates damage to a public road that may require maintenance.",
    nextStep:
      "The relevant civic department can inspect the location and proceed with the required repair.",
  },
  {
    id: 2,
    title: "Streetlight not working",
    status: "Under Review",
    date: "12 Aug 2026",
    location: "Residential Lane, Your Area",
    description:
      "A streetlight in my area has stopped working.",
    department: "Electrical Department",
    aiSummary:
      "CivicMirror identified this as a public lighting issue.",
    evidence:
      "The reported issue concerns a non-functioning public streetlight.",
    nextStep:
      "The department can review the report and schedule an inspection.",
  },
  {
    id: 3,
    title: "Garbage collection issue",
    status: "Resolved",
    date: "8 Aug 2026",
    location: "Your Area",
    description:
      "Garbage collection was missed in the area.",
    department: "Waste Management Department",
    aiSummary:
      "CivicMirror identified this as a waste collection issue.",
    evidence:
      "The request concerns missed collection of household waste.",
    nextStep:
      "The request has been marked as resolved.",
  },
];

function RequestStatus({ status }) {
  return (
    <span className="rounded-full border px-3 py-1 text-xs font-medium">
      {status}
    </span>
  );
}

function RequestDetailsModal({ request, onClose, onReopen }) {
  if (!request) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-details-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6"
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Request details
            </p>

            <h2
              id="request-details-title"
              className="mt-1 text-xl font-semibold"
            >
              {request.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close request details"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm"
          >
            ✕
          </button>
        </header>

        <div className="mt-6 space-y-5">
          <section>
            <p className="text-xs font-medium text-gray-500">Status</p>

            <div className="mt-2">
              <RequestStatus status={request.status} />
            </div>
          </section>

          <section>
            <p className="text-xs font-medium text-gray-500">
              Submitted
            </p>

            <p className="mt-1 text-sm">{request.date}</p>
          </section>

          <section>
            <p className="text-xs font-medium text-gray-500">
              Location
            </p>

            <p className="mt-1 text-sm">{request.location}</p>
          </section>

          <section>
            <p className="text-xs font-medium text-gray-500">
              Your request
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-700">
              {request.description}
            </p>
          </section>

          <section>
            <p className="text-xs font-medium text-gray-500">
              Department
            </p>

            <p className="mt-1 text-sm">{request.department}</p>
          </section>

          <section>
            <h3 className="text-sm font-semibold">
              CivicMirror summary
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-700">
              {request.aiSummary}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold">
              Supporting evidence
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-700">
              {request.evidence}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold">
              What's next?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-700">
              {request.nextStep}
            </p>
          </section>
        </div>

        <footer className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => onReopen(request)}
            className="rounded-lg border border-gray-900 px-4 py-2 text-sm font-medium"
          >
            Reopen Conversation
          </button>
        </footer>
      </section>
    </div>
  );
}

export default function MyRequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState(null);
    const navigate = useNavigate();
  function handleReopen(request) {
  setSelectedRequest(null);

  const conversationRequest = {
    id: request.id,
    message: request.description,
    createdAt: request.date,
    location: request.location,

    aiResponse: request.aiSummary,

    explanation:
      "CivicMirror previously analyzed this request based on the information provided and its civic category.",

    evidence: [
      {
        id: `${request.id}-evidence`,
        title: "Supporting information",
        description: request.evidence,
      },
    ],

    nextSteps: [request.nextStep],
  };

  navigate("/citizen/request", {
    state: {
      reopenedRequest: conversationRequest,
    },
  });
}

  return (
    <main className="min-h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">My Requests</h1>

        <p className="mt-1 text-sm text-gray-500">
          View and track the civic requests you have submitted.
        </p>
      </header>

      {requests.length > 0 ? (
        <section className="space-y-4" aria-label="My civic requests">
          {requests.map((request) => (
            <article
              key={request.id}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium">{request.title}</h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Submitted on {request.date}
                  </p>
                </div>

                <RequestStatus status={request.status} />
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(request)}
                className="mt-4 text-sm font-medium"
              >
                View details
              </button>
            </article>
          ))}
        </section>
      ) : (
        <section className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="font-medium">No requests yet</h2>

          <p className="mt-2 text-sm text-gray-500">
            Your submitted civic requests will appear here.
          </p>
        </section>
      )}

      <RequestDetailsModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onReopen={handleReopen}
      />
    </main>
  );
}