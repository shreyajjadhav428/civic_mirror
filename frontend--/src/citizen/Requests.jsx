import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCitizenRequests, getChatHistory } from "../api/citizen.api";
import { useAuth } from "../context/AuthContext";

function statusStyles(status) {
  const stLower = (status || "").toLowerCase();
  if (stLower.includes("resolved") || stLower.includes("completed")) {
    return {
      badge: "border-emerald-200 bg-emerald-50 text-[#008D78]",
      accent: "bg-[#008D78]",
      icon: "border-emerald-200 bg-emerald-50 text-[#008D78]",
    };
  }

  if (stLower.includes("progress")) {
    return {
      badge: "border-blue-200 bg-blue-50 text-[#2D7FF9]",
      accent: "bg-[#2D7FF9]",
      icon: "border-blue-200 bg-blue-50 text-[#2D7FF9]",
    };
  }

  return {
    badge: "border-amber-200 bg-amber-50 text-amber-800",
    accent: "bg-amber-500",
    icon: "border-amber-200 bg-amber-50 text-amber-700",
  };
}

function RequestIcon({ status }) {
  const styles = statusStyles(status);

  return (
    <span
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${styles.icon}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 3.5h7l4 4V21H7z" />
        <path d="M14 3.5V8h4" />
        <path d="M10 12h5M10 15.5h5M10 19h3" />
      </svg>
    </span>
  );
}

export default function Requests() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("complaints"); // 'complaints' | 'chats'
  const [requestsList, setRequestsList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const userId = user?.id || "user-citizen-1";
        
        // 1. Fetch complaints
        const reqRes = await getCitizenRequests(userId);
        if (isMounted && reqRes?.data) {
          const normalized = reqRes.data.map((c) => ({
            ...c,
            status: (() => {
              const s = (c.status || "").toLowerCase();
              if (s.includes("resolved") || s.includes("completed")) return "Resolved";
              if (s.includes("progress")) return "In progress";
              return "Reported";
            })()
          }));
          setRequestsList(normalized);
        }

        // 2. Fetch past chat history & AI sessions
        const chatRes = await getChatHistory(userId);
        if (isMounted && chatRes?.data) {
          setChatHistory(chatRes.data);
        }
      } catch (err) {
        console.error("Error loading citizen requests/history:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const openNewRequest = () => {
    navigate("/citizen");
  };

  return (
    <div className="space-y-8 text-[#0D1B2A] font-['Inter',sans-serif]">
      {/* HEADER BANNER */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs relative overflow-hidden">
        {/* Top Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2D7FF9]" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-black tracking-widest text-[#2D7FF9] uppercase mb-2">
              <span className="h-[2.5px] w-5 bg-[#2D7FF9] rounded-full inline-block" />
              CITIZEN WORKSPACE
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0D1B2A] tracking-tight flex items-center gap-3">
              My <span className="text-[#2D7FF9]">Complaints & History</span>
            </h1>
            <p className="mt-2 text-base font-semibold text-[#59687A] max-w-2xl">
              View your registered civic complaints and review past AI chat conversation history.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openNewRequest}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0D1B2A] px-5 py-3 text-xs font-black text-white hover:bg-[#2D7FF9] transition-all cursor-pointer shadow-xs"
            >
              <span className="text-sm leading-none">+</span>
              Ask AI / Raise Issue
            </button>
          </div>
        </div>

        {/* TAB NAVIGATION SELECTOR */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("complaints")}
            className={`rounded-xl px-4 py-2.5 text-xs font-black transition-all cursor-pointer ${
              activeTab === "complaints"
                ? "bg-[#2D7FF9] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            📋 Registered Complaints ({requestsList.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("chats")}
            className={`rounded-xl px-4 py-2.5 text-xs font-black transition-all cursor-pointer ${
              activeTab === "chats"
                ? "bg-[#2D7FF9] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            💬 Past AI Conversations ({chatHistory.length})
          </button>
        </div>
      </div>

      {/* TAB 1: REGISTERED COMPLAINTS */}
      {activeTab === "complaints" && (
        <section className="space-y-4" aria-label="Your civic requests">
          <div className="flex items-center justify-between pt-1">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              <span className="h-[2px] w-4 bg-slate-300 rounded-full" />
              REGISTERED CIVIC COMPLAINT TICKETS
            </span>
            <span className="text-xs font-bold text-slate-400">
              Realtime Database Sync
            </span>
          </div>

          {requestsList.length === 0 ? (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center text-slate-500 font-semibold text-sm">
              {loading ? "Loading your submitted civic requests..." : "No civic complaints registered yet. Use the chat in Overview to report an issue!"}
            </div>
          ) : (
            requestsList.map((request) => {
              const styles = statusStyles(request.status);

              return (
                <article
                  key={request.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2D7FF9]"
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-1 ${styles.accent}`}
                    aria-hidden="true"
                  />

                  <div className="p-6 pl-7">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-3 py-1 text-[11px] font-black ${styles.badge}`}
                          >
                            {request.status}
                          </span>

                          <span className="text-xs font-bold tracking-wider text-slate-400">
                            {request.id}
                          </span>
                        </div>

                        <div className="mt-4 flex items-start gap-4">
                          <RequestIcon status={request.status} />

                          <div className="min-w-0">
                            <h2 className="text-base font-black text-[#0D1B2A] group-hover:text-[#2D7FF9] transition-colors">
                              {request.title}
                            </h2>

                            <p className="mt-1.5 max-w-2xl text-xs font-medium leading-relaxed text-slate-600">
                              {request.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500">
                          <span>
                            <strong className="font-black text-[#0D1B2A]">
                              Location:
                            </strong>{" "}
                            {request.location}
                          </span>

                          <span className="hidden text-slate-300 sm:inline" aria-hidden="true">
                            ·
                          </span>

                          <span>
                            <strong className="font-black text-[#0D1B2A]">
                              Submitted:
                            </strong>{" "}
                            {request.date}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                        className="shrink-0 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-[#0D1B2A] transition-all hover:border-[#2D7FF9] hover:bg-[#EEF5FF] hover:text-[#2D7FF9] cursor-pointer shadow-xs"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>
      )}

      {/* TAB 2: PAST AI CONVERSATIONS & INQUIRIES */}
      {activeTab === "chats" && (
        <section className="space-y-4" aria-label="Your AI chat history">
          <div className="flex items-center justify-between pt-1">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              <span className="h-[2px] w-4 bg-slate-300 rounded-full" />
              ARCHIVED AI GOVERNANCE CONVERSATIONS
            </span>
            <span className="text-xs font-bold text-slate-400">
              Persisted in Supabase chat_sessions
            </span>
          </div>

          {chatHistory.length === 0 ? (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center text-slate-500 font-semibold text-sm">
              {loading ? "Loading archived conversations..." : "No conversation history found for this account."}
            </div>
          ) : (
            chatHistory.map((session, idx) => {
              const exp = session.explanation || {};
              const isSpam = exp.isSpam;
              const isUnique = exp.isUniqueRequest;

              return (
                <article
                  key={session.id || idx}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-[#2D7FF9]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                          isSpam
                            ? "bg-slate-100 text-slate-600 border-slate-200"
                            : isUnique
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-blue-50 text-[#2D7FF9] border-blue-200"
                        }`}>
                          {isSpam ? "Off-Topic / Casual" : exp.status || "Assessed"}
                        </span>

                        <span className="text-xs font-bold text-slate-400">
                          Pincode: {session.pincode || "110025"}
                        </span>

                        <span className="text-xs text-slate-400">
                          • {session.created_at ? new Date(session.created_at).toLocaleString() : "Recent"}
                        </span>
                      </div>

                      <p className="text-sm font-extrabold text-[#0D1B2A]">
                        💬 "{session.prompt}"
                      </p>

                      <p className="text-xs font-medium text-slate-600 leading-relaxed max-w-2xl bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <strong>AI Summary:</strong> {exp.summary || exp.reason || "AI evaluated against municipal database."}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedChat(session)}
                      className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-black text-[#0D1B2A] hover:bg-[#EEF5FF] hover:border-[#2D7FF9] hover:text-[#2D7FF9] transition-all cursor-pointer shadow-xs"
                    >
                      View AI Decision
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </section>
      )}

      {/* COMPLAINT DETAILS MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#2D7FF9] uppercase block mb-1">
                  Complaint Code: {selectedRequest.id}
                </span>
                <h3 className="text-xl font-black text-[#0D1B2A]">
                  {selectedRequest.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 uppercase block mb-0.5">Status</span>
                <span className="font-black text-[#0D1B2A] text-sm">{selectedRequest.status}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 uppercase block mb-0.5">Category</span>
                <span className="font-black text-[#0D1B2A] text-sm">{selectedRequest.category || "General"}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 uppercase block mb-0.5">Location</span>
                <span className="font-black text-[#0D1B2A] text-sm">{selectedRequest.location || "Local Area"}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 uppercase block mb-0.5">Submitted On</span>
                <span className="font-black text-[#0D1B2A] text-sm">{selectedRequest.date || "Recent"}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Description</span>
              <p className="text-xs font-medium text-slate-700 leading-relaxed">
                {selectedRequest.description}
              </p>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHAT SESSION AI EXPLANATION MODAL */}
      {selectedChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#2D7FF9] uppercase block mb-1">
                  AI Decision Record
                </span>
                <h3 className="text-lg font-black text-[#0D1B2A]">
                  "{selectedChat.prompt}"
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedChat(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-500">Classification:</span>
                  <strong className="text-[#0D1B2A]">{selectedChat.explanation?.status || "Evaluated"}</strong>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-500">Detected Category:</span>
                  <strong className="text-[#0D1B2A]">{selectedChat.explanation?.detectedCategory || "General"}</strong>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-500">Pincode:</span>
                  <strong className="text-[#0D1B2A]">{selectedChat.pincode || "110025"}</strong>
                </div>

                <div className="pt-1">
                  <span className="font-bold text-slate-500 block mb-1">Decision Summary:</span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {selectedChat.explanation?.summary || selectedChat.explanation?.reason}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedChat(null)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-black text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}