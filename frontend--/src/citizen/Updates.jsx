const updates = [
  {
    type: "Project update",
    title: "Main Road Improvement Project",
    description: "Road maintenance work is currently underway in the area.",
    date: "14 Aug 2026",
  },
  {
    type: "Civic announcement",
    title: "Scheduled Water Supply Maintenance",
    description: "Maintenance work may temporarily affect water supply in selected areas.",
    date: "13 Aug 2026",
  },
  {
    type: "Local update",
    title: "Community Park Improvement",
    description: "Improvement work is being carried out at a nearby public park.",
    date: "11 Aug 2026",
  },
];

export default function Updates() {
  return (
    <div className="mx-auto max-w-[1120px]">
      <header className="max-w-2xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#70859A]">
          Your area
        </p>
        <h1 className="mt-1.5 text-[28px] font-extrabold tracking-[-0.035em] text-[#0D1B2A]">
          City Updates
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#63768A]">
          Stay informed about announcements, projects, and service updates in your area.
        </p>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="City updates">
        {updates.map((update) => (
          <article key={update.title} className="rounded-xl border border-[#DCE7F1] bg-white p-5 shadow-[0_6px_18px_rgba(13,27,42,0.04)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#6857E8]">{update.type}</p>
            <h2 className="mt-3 text-base font-bold text-[#18324C]">{update.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#63768A]">{update.description}</p>
            <p className="mt-5 border-t border-[#E8EFF5] pt-3 text-xs font-medium text-[#8293A3]">{update.date}</p>
          </article>
        ))}
      </section>
    </div>
  );
}