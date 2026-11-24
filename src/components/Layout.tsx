import { profile } from "../data/profile";
import { yearOf } from "../lib/timeline";
import type { Project } from "../types";

export function Header() {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a href="#top" className="brand">
          {profile.nameEn}
        </a>
        <nav className="topnav" aria-label="주요 메뉴">
          <a href="#works">Works</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export function Hero({ projects, loading }: { projects: Project[]; loading: boolean }) {
  const years = [...new Set(projects.map(yearOf))].sort();
  const range = years.length ? `${years[0]}–${years[years.length - 1]}` : "";
  const placeholder = loading ? "—" : "0";

  return (
    <section className="hero wrap">
      <p className="eyebrow">Portfolio{range && ` · ${range}`}</p>
      <h1 className="hero-title">
        {profile.headline[0]}
        <br />
        {profile.headline[1]}
      </h1>
      <p className="hero-lead">{profile.lead}</p>
      <dl className="stats">
        <div>
          <dt>Projects</dt>
          <dd>{projects.length || placeholder}</dd>
        </div>
        <div>
          <dt>Years</dt>
          <dd>{years.length || placeholder}</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>{profile.focus}</dd>
        </div>
      </dl>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="about wrap" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title">
        About
      </h2>
      <div className="about-grid">
        <p className="about-text">{profile.about}</p>
        <dl className="skills">
          {profile.skills.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="wrap footer-inner">
        <p className="footer-title">함께 일하고 싶으시다면</p>
        <a className="footer-mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <ul className="footer-links">
          {profile.links.map((l) => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <p className="copyright">
          © {new Date().getFullYear()} {profile.nameEn}
        </p>
      </div>
    </footer>
  );
}
