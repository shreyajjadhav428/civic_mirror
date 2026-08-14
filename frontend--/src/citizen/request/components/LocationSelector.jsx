import { useState } from "react";
import { MapPin, Pencil } from "lucide-react";

export default function LocationSelector() {
  const [isEditing, setIsEditing] = useState(false);
  const [pincode, setPincode] = useState("110025");
  const [area, setArea] = useState("Shanti Nagar");

  return (
    <section className="rounded-xl border border-[#DCE7F1] bg-white p-5 shadow-[0_8px_24px_rgba(13,27,42,0.04)]" aria-labelledby="location-title">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF5FC] text-[#2D7FF9]">
            <MapPin size={17} strokeWidth={1.8} />
          </span>
          <h2 id="location-title" className="text-sm font-semibold text-[#18324C]">
            Request location
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing((current) => !current)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D7FF9] transition-colors hover:text-[#1E4FA3]"
        >
          <Pencil size={13} strokeWidth={2} />
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8293A3]">
            Pincode
          </span>
          <input
            value={pincode}
            disabled={!isEditing}
            onChange={(event) => setPincode(event.target.value)}
            className="mt-1.5 w-full border-0 bg-transparent p-0 text-sm font-semibold text-[#18324C] outline-none disabled:cursor-default"
          />
        </label>

        <div className="h-px bg-[#E6EEF5]" />

        <label className="block">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8293A3]">
            Area
          </span>
          <input
            value={area}
            disabled={!isEditing}
            onChange={(event) => setArea(event.target.value)}
            className="mt-1.5 w-full border-0 bg-transparent p-0 text-sm font-semibold text-[#18324C] outline-none disabled:cursor-default"
          />
        </label>
      </div>
    </section>
  );
}