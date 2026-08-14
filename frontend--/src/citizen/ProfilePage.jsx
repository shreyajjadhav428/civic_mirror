import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../api/auth.api";
import { getCitizenRequests } from "../api/citizen.api";

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState({
    id: user?.id || "user-citizen-1",
    email: user?.email || "citizen@civicmirror.com",
    area: "Shanti Nagar",
    pincode: "110025",
    role: "citizen",
  });

  const [stats, setStats] = useState({
    submitted: 0,
    resolved: 0,
    active: 0,
  });

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    area: "",
    pincode: "",
  });

  const userId = user?.id || "user-citizen-1";

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        // 1. Load user profile from Supabase
        const profRes = await getUserProfile(userId);
        if (isMounted && profRes?.data) {
          setProfile(profRes.data);
          setFormData({
            email: profRes.data.email || "",
            password: "",
            area: profRes.data.area || "Shanti Nagar",
            pincode: profRes.data.pincode || "110025",
          });
        }

        // 2. Load citizen request activity counts
        const reqRes = await getCitizenRequests(userId);
        if (isMounted && reqRes?.data) {
          const list = reqRes.data;
          const total = list.length;
          const resolved = list.filter((r) =>
            (r.status || "").toLowerCase().includes("resolved") ||
            (r.status || "").toLowerCase().includes("completed")
          ).length;
          const active = total - resolved;

          setStats({
            submitted: total,
            resolved,
            active,
          });
        }
      } catch (err) {
        console.error("Error loading profile page data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleEditOpen = () => {
    setFormData({
      email: profile.email || "",
      password: "",
      area: profile.area || "Shanti Nagar",
      pincode: profile.pincode || "110025",
    });
    setIsEditing(true);
    setSuccessMsg("");
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      const res = await updateUserProfile(userId, payload);
      if (res?.data) {
        setProfile(res.data);
        setIsEditing(false);
        setSuccessMsg("Profile credentials updated successfully in database!");
        setTimeout(() => setSuccessMsg(""), 4000);

        // Keep AuthContext in sync so area/pincode are fresh everywhere without reload
        if (typeof login === "function") {
          const updatedUser = {
            ...user,
            area: res.data.area || user?.area,
            pincode: res.data.pincode || user?.pincode,
            email: res.data.email || user?.email,
          };
          const stored = localStorage.getItem("civicmirror_user");
          if (stored) {
            localStorage.setItem("civicmirror_user", JSON.stringify(updatedUser));
          }
        }
      }
    } catch (err) {
      console.error("Failed to update user profile:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1120px] font-['Inter',sans-serif]">
      {/* Header */}
      <header className="max-w-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2D7FF9]">
          Citizen workspace
        </p>

        <h1 className="mt-1.5 text-[30px] font-extrabold tracking-[-0.035em] text-[#0D1B2A] sm:text-[34px]">
          Your profile
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#63768A] sm:text-[15px]">
          Manage your citizen information, update credentials, and view civic activity.
        </p>

        {successMsg && (
          <div className="mt-4 rounded-xl border border-[#BFE9DE] bg-[#E9F8F4] p-3 text-xs font-bold text-[#087F6A]">
            ✓ {successMsg}
          </div>
        )}
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
              {/* Avatar: first letter of email address as initial */}
              {(profile.email || "C").charAt(0).toUpperCase()}

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#00A68E]" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#2D7FF9]">
                Account ({profile.id})
              </p>

              <h2 className="mt-0.5 text-lg font-extrabold tracking-[-0.02em] text-[#18324C]">
                Citizen Account
              </h2>

              <p className="mt-0.5 text-xs text-[#718398]">
                CivicMirror Verified Citizen
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="grid gap-x-8 gap-y-6 px-5 py-6 sm:grid-cols-2 sm:px-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                Citizen ID
              </p>

              <p className="mt-1.5 text-[14px] font-semibold text-[#18324C]">
                {profile.id}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                Email Address
              </p>

              <p className="mt-1.5 break-all text-[14px] font-semibold text-[#18324C]">
                {profile.email}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                Area / Locality
              </p>

              <p className="mt-1.5 text-[14px] font-semibold text-[#18324C]">
                {profile.area || "Shanti Nagar"}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#8293A3]">
                Pincode
              </p>

              <p className="mt-1.5 text-[14px] font-semibold text-[#18324C]">
                {profile.pincode || "110025"}
              </p>
            </div>
          </div>

          {/* Profile metadata strip */}
          <div className="mx-5 mb-5 rounded-xl border border-[#E3ECF4] bg-[#F8FAFC] px-4 py-3 sm:mx-6">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#00A68E]" />
                <span className="text-[11px] font-semibold text-[#49647D]">
                  Account Active in Supabase
                </span>
              </div>

              <span className="hidden h-3 w-px bg-[#D6E2EC] sm:block" />

              <span className="text-[11px] font-medium text-[#7A8D9F]">
                AI Prompt Pincode Auto-Resolution Enabled
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="border-t border-[#E8EFF5] bg-[#FBFCFE] px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={handleEditOpen}
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
              Edit profile credentials
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
                  {loading ? "..." : stats.submitted}
                </strong>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-xs font-medium text-[#63768A]">
                  Resolved requests
                </span>

                <strong className="text-lg font-extrabold text-[#00A68E]">
                  {loading ? "..." : stats.resolved}
                </strong>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xs font-medium text-[#63768A]">
                  Active requests
                </span>

                <strong className="text-lg font-extrabold text-[#E0A000]">
                  {loading ? "..." : stats.active}
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
        </aside>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07111D]/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#BFD3E4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8EFF5] pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#2D7FF9]">
                  Update Credentials
                </p>
                <h3 className="text-lg font-extrabold text-[#0D1B2A]">
                  Edit Citizen Profile
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-[#60788F] hover:text-[#18324C]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.08em] text-[#536D83]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1.5 w-full rounded-xl border border-[#CBDCE9] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0D1B2A] outline-none focus:border-[#2D7FF9] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.08em] text-[#536D83]">
                  New Password (Optional)
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Leave blank to keep existing password"
                  className="mt-1.5 w-full rounded-xl border border-[#CBDCE9] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0D1B2A] outline-none focus:border-[#2D7FF9] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.08em] text-[#536D83]">
                  Area / Locality Name
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  required
                  placeholder="e.g. Shanti Nagar"
                  className="mt-1.5 w-full rounded-xl border border-[#CBDCE9] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0D1B2A] outline-none focus:border-[#2D7FF9] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.08em] text-[#536D83]">
                  Pincode (6 digits)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => {
                    // Strip any non-digit characters so only numbers can be entered
                    const digits = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, pincode: digits });
                  }}
                  required
                  placeholder="e.g. 110025"
                  className="mt-1.5 w-full rounded-xl border border-[#CBDCE9] bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0D1B2A] outline-none focus:border-[#2D7FF9] focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8EFF5]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg border border-[#CADDEA] bg-white px-4 py-2 text-xs font-bold text-[#536D83] hover:bg-[#F2F7FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#2D7FF9] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#1A6AE3] disabled:bg-[#93C2FF]"
                >
                  {saving ? "Saving to Database..." : "Save Credentials"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}