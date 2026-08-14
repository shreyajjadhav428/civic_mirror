const updates = [
  {
    id: 1,
    type: "Project Update",
    title: "Main Road Improvement Project",
    description:
      "Road maintenance work is currently underway in the area.",
    date: "14 Aug 2026",
  },
  {
    id: 2,
    type: "Civic Announcement",
    title: "Scheduled Water Supply Maintenance",
    description:
      "Maintenance work may temporarily affect water supply in selected areas.",
    date: "13 Aug 2026",
  },
  {
    id: 3,
    type: "Local Update",
    title: "Community Park Improvement",
    description:
      "Improvement work is being carried out at a nearby public park.",
    date: "11 Aug 2026",
  },
];

function UpdateCard({ update }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {update.type}
      </p>

      <h2 className="mt-2 text-base font-semibold">
        {update.title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        {update.description}
      </p>

      <p className="mt-4 text-xs text-gray-500">
        {update.date}
      </p>
    </article>
  );
}

export default function CityUpdatesPage() {
  return (
    <main className="min-h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">City Updates</h1>

        <p className="mt-1 text-sm text-gray-500">
          Stay informed about announcements, projects, and updates in your
          area.
        </p>
      </header>

      <section
        className="space-y-4"
        aria-label="City updates"
      >
        {updates.map((update) => (
          <UpdateCard key={update.id} update={update} />
        ))}
      </section>
    </main>
  );
}