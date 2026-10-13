import { useState } from 'react';
import { profile, skills, project, background } from './content.js';

function ExternalLink({ href, children, className = '' }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

function ProjectExplorer() {
  const [active, setActive] = useState(0);
  const area = project.focusAreas[active];

  return (
    <div className="project-explorer">
      <div className="explorer-heading">
        <p className="eyebrow">INSIDE THE PROJECT</p>
        <span className="small-label">Unity / C#</span>
      </div>
      <div className="explorer-tabs" aria-label="Explore project systems">
        {project.focusAreas.map((item, index) => (
          <button
            type="button"
            key={item.label}
            aria-pressed={active === index}
            className={active === index ? 'active' : ''}
            onClick={() => setActive(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="explorer-content" aria-live="polite">
        <span className="system-number">0{active + 1}</span>
        <h4>{area.title}</h4>
        <p>{area.description}</p>
        <ul>
          {area.details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
        <ExternalLink href={area.source} className="source-link">
          Read {area.file}
        </ExternalLink>
      </div>
      <div className="explorer-footer">Source available in the public RPS repository.</div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="site-name" href="#home">{profile.name}</a>
          <button
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
          <nav
            id="navigation"
            className={`navigation ${menuOpen ? 'open' : ''}`}
            aria-label="Main navigation"
          >
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#contact" className="nav-contact" onClick={closeMenu}>
              Let’s connect <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-topline">
            <p className="eyebrow">GAME DEVELOPER / RTIS STUDENT</p>
            <span className="availability">Seeking a Summer 2027 internship</span>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <h1>Gregory<br />Sherris<span className="accent-period">.</span></h1>
              <p className="hero-subtitle">Learning by building.<br />Building through <span>play.</span></p>
            </div>
            <div className="hero-intro">
              <p className="intro">{profile.introduction}</p>
              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  Explore my work <span aria-hidden="true">↓</span>
                </a>
                <ExternalLink href={profile.github} className="button secondary">GitHub</ExternalLink>
              </div>
              <div className="hero-study">
                <span className="small-label">CURRENTLY STUDYING</span>
                <p>Computer Science in<br />Real-Time Interactive Simulation</p>
                <span className="study-school">DigiPen Institute of Technology</span>
              </div>
            </div>
          </div>
          <div className="hero-bottomline">
            <span>Game development</span><span>Programming</span><span>Curiosity for cybersecurity</span>
            <a href="#projects">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section id="projects" className="section container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / FEATURED PROJECT</p>
              <h2>A familiar game.<br /><span className="accent-text">A different set of rules.</span></h2>
            </div>
            <ExternalLink className="text-link" href={profile.github}>Browse my GitHub</ExternalLink>
          </div>
          <article className="project-layout">
            <div className="project-copy">
              <div className="project-meta">
                <span className="pill">Unity</span><span className="pill purple">C#</span>
                <span className="small-label">{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p>{project.description}</p>
              <p>{project.setting}</p>
              <div className="project-facts">
                <div><span className="small-label">CORE MECHANIC</span><p>Rock / paper / scissors combat</p></div>
                <div><span className="small-label">SYSTEMS</span><p>Combos, health, enemy decisions</p></div>
              </div>
              <ExternalLink href={project.repository} className="button primary">View the repository</ExternalLink>
            </div>
            <ProjectExplorer />
          </article>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-layout">
            <div className="about-copy">
              <p className="eyebrow">02 / ABOUT ME</p>
              <h2>Games are the start.<br /><span className="accent-text">Curiosity keeps me going.</span></h2>
              <p>{profile.about}</p>
              <p>{profile.interests}</p>
              <ExternalLink href={profile.linkedin} className="text-link">More on LinkedIn</ExternalLink>
            </div>
            <div className="background-list">
              {background.map((item) => (
                <article key={item.title}>
                  <p className="small-label">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section container">
          <div className="section-heading">
            <div><p className="eyebrow">03 / SKILLS & TOOLS</p><h2>What I work with.</h2></div>
            <p className="section-note">From programming foundations to playable systems.</p>
          </div>
          <div className="skills-list">
            {skills.map((group, index) => (
              <div className="skill-row" key={group.label}>
                <span className="skill-index">0{index + 1}</span>
                <h3>{group.label}</h3>
                <div className="skill-items">
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="container contact-section">
          <div>
            <p className="eyebrow">04 / NEXT UP</p>
            <h2>Let’s make<br /><span>something playable.</span></h2>
            <p>I’m looking for a Summer 2027 internship and opportunities to keep developing games and exploring programming.</p>
          </div>
          <div className="contact-links">
            <ExternalLink href={profile.linkedin}>Connect on LinkedIn</ExternalLink>
            <ExternalLink href={profile.github}>Explore my GitHub</ExternalLink>
          </div>
        </section>
      </main>
      <footer className="container footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Game development & programming</span>
        <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </>
  );
}
