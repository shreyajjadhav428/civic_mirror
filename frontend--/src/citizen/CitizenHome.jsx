import "./CitizenHome.css";

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

const stats = [
  {
    label: "Total requests",
    value: "12",
    description: "Your submissions",
    variant: "blue",
  },
  {
    label: "Pending requests",
    value: "04",
    description: "Awaiting resolution",
    variant: "yellow",
  },
  {
    label: "Resolved requests",
    value: "08",
    description: "Successfully resolved",
    variant: "teal",
  },
];

export default function CitizenHome() {
  return (
    <div className="citizen-home">
      <header className="citizen-header">
        <div className="citizen-header__left">
          <button className="icon-button" type="button" aria-label="Open menu">
            <MenuIcon />
          </button>

          <a className="civic-logo" href="/citizen" aria-label="CivicMirror home">
            <span>CIVIC</span>
            <strong>MIRROR</strong>
          </a>
        </div>

        <div className="citizen-header__actions">
          <button className="icon-button" type="button" aria-label="Notifications">
            <BellIcon />
          </button>
          <button className="profile-button" type="button" aria-label="Profile">
            <UserIcon />
          </button>
        </div>
      </header>

      <main className="citizen-content">
        <section className="welcome-section" aria-labelledby="welcome-title">
          <p className="eyebrow">CITIZEN HOME</p>
          <h1 id="welcome-title">Welcome to CivicMirror</h1>
          <h2>How can we help with your city today?</h2>
          <p>
            Report an issue, understand a civic decision, or explore what&apos;s
            happening in your area.
          </p>
        </section>

        <section className="stats-grid" aria-label="Your request statistics">
          {stats.map((stat) => (
            <article className={`stat-card stat-card--${stat.variant}`} key={stat.label}>
              <span className="stat-card__accent" />
              <p className="stat-card__label">{stat.label}</p>
              <p className="stat-card__number">{stat.value}</p>
              <p className="stat-card__description">{stat.description}</p>
            </article>
          ))}
        </section>

        <section className="action-section" aria-label="Start a new request">
          <button className="raise-request" type="button">
            <span className="raise-request__plus" aria-hidden="true">+</span>
            <span className="raise-request__content">
              <strong>Raise a civic request</strong>
              <small>Report an issue or ask about your city</small>
            </span>
            <span className="raise-request__arrow" aria-hidden="true">→</span>
          </button>
        </section>

        <section className="area-section" aria-labelledby="area-title">
          <h2 id="area-title">Explore your area</h2>

          <article className="area-card">
            <div className="area-card__top">
              <div className="location-icon" aria-hidden="true">
                <PinIcon />
              </div>

              <div>
                <p className="area-card__label">Your area</p>
                <p className="area-card__pincode">110025</p>
                <p className="area-card__name">Shanti Nagar</p>
              </div>
            </div>

            <div className="area-card__footer">
              <div className="area-card__metrics" aria-label="Area statistics">
                <span>12 active issues</span>
                <span>7 resolved</span>
                <span>3 ongoing projects</span>
              </div>

              <button className="explore-button" type="button">
                Explore <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}