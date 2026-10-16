import { useEffect, useRef, useState } from 'react';
import { media, profile, projects, skills, snippets } from './data.js';
import ProjectGallery from './ProjectGallery.jsx';
import { BonkeraDemo, ParticleDemo } from './Demos.jsx';

function ExternalLink({ href, children, className = '' }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>;
}

function CodeSample({ snippet }) {
  return (
    <details className="code-sample">
      <summary><span>{snippet.title}</span><span className="code-language">{snippet.language} <span aria-hidden="true">+</span></span></summary>
      <div className="code-file">{snippet.file}</div>
      <pre tabIndex="0" aria-label={`${snippet.title}, ${snippet.language} code`}><code>{snippet.code}</code></pre>
      <p>{snippet.note}</p>
    </details>
  );
}

function AboutParagraph({ text }) {
  const word = 'Scratch';
  const index = text.indexOf(word);
  if (index === -1) return <p>{text}</p>;
  return (
    <p>
      {text.slice(0, index)}
      <a className="scratch-link" href="https://scratch.mit.edu/search/projects?q=gregsherris">Scratch</a>
      {text.slice(index + word.length)}
    </p>
  );
}

export function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.querySelector('video')?.pause();
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="dialog-shell">
        <div className="dialog-toolbar"><span>{project.course} <span aria-hidden="true">/</span> {project.type}</span><button type="button" className="quiet-button" onClick={onClose} aria-label="Close project details">Close <span aria-hidden="true">×</span></button></div>
        <div className="dialog-body">
          <p className="eyebrow">PROJECT BREAKDOWN</p>
          <h2 id="project-dialog-title">{project.title}</h2>
          <p className="dialog-intro">{project.introduction}</p>
          <dl className="project-facts">
            <div><dt>My role</dt><dd>{project.role}</dd></div>
            <div><dt>Team</dt><dd>{project.teamSize}</dd></div>
            {project.duration && <div><dt>Development</dt><dd>{project.duration}</dd></div>}
            <div><dt>Built with</dt><dd>{project.stack.join(' / ')}</dd></div>
          </dl>
          {project.trailer && (
            <figure className="project-trailer">
              <video controls playsInline preload="none" poster={media(project.poster || project.image)} aria-label={project.trailerLabel}>
                <source src={media(project.trailer)} type="video/mp4" />
                Your browser does not support embedded video. <a href={media(project.trailer)}>Open the trailer</a>.
              </video>
              <figcaption>Original team trailer{project.trailerDuration && <> · {project.trailerDuration}</>}</figcaption>
            </figure>
          )}
          <div className="dialog-contributions"><h3>What I contributed</h3>{project.highlights.map((item) => <section key={item.title}><h4>{item.title}</h4><p>{item.text}</p></section>)}</div>
          {project.id === 'goblin-man' && (
            <section className="project-demos" aria-labelledby="goblin-man-demos-title">
              <h3 id="goblin-man-demos-title">See the systems in motion</h3>
              <p className="muted">Interactive browser recreations of my particle system and Bonkera behavior.</p>
              <div className="demo-grid"><ParticleDemo /><BonkeraDemo /></div>
            </section>
          )}
          {!!project.code.length && <section className="dialog-code"><h3>A closer look at the code</h3><p className="muted">Selected excerpts from my implementation.</p>{project.code.map((key) => <CodeSample key={key} snippet={snippets[key]} />)}</section>}
          {project.teams && <details className="team-details"><summary>Team credits</summary>{project.teams.map((team) => <p key={team.label}><strong>{team.label}</strong>{team.people}</p>)}</details>}
          <div className="dialog-links">
            {project.repository && <ExternalLink className="button primary" href={project.repository}>View source on GitHub</ExternalLink>}
            {project.playUrl && <ExternalLink className="button primary" href={project.playUrl}>Play the game</ExternalLink>}
            <button type="button" className="button secondary" onClick={onClose}>Back to portfolio <span aria-hidden="true">↙</span></button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onEscape);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      }
    }, { rootMargin: '-15% 0px -60% 0px' });
    for (const id of ['home', 'projects', 'about', 'contact']) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => {
      document.removeEventListener('keydown', onEscape);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="site-name" onClick={closeMenu}>
            <span>{profile.name}</span>
            <small>GAMEPLAY & ENGINE PROGRAMMER</small>
          </a>
          <button
            type="button"
            className="menu-button"
            aria-controls="navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close' : 'Menu'}
            <span aria-hidden="true">{menuOpen ? '−' : '+'}</span>
          </button>
          <nav
            id="navigation"
            className={menuOpen ? 'navigation open' : 'navigation'}
            aria-label="Main navigation"
          >
            <a href="#home" aria-current={activeSection === 'home' ? 'location' : undefined} onClick={closeMenu}>Home</a>
            <a href="#projects" aria-current={activeSection === 'projects' ? 'location' : undefined} onClick={closeMenu}>Projects</a>
            <a href="#about" aria-current={activeSection === 'about' ? 'location' : undefined} onClick={closeMenu}>About</a>
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
            <a href="#contact" className="nav-contact" aria-current={activeSection === 'contact' ? 'location' : undefined} onClick={closeMenu}>Contact</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero-section" aria-labelledby="hero-title">
          <div className="hero container">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">GAMEPLAY & ENGINE PROGRAMMER</p>
              <h1 id="hero-title">Gregory<br /><span>Sherris</span></h1>
              <p className="hero-intro">{profile.introduction}</p>
              <div className="hero-actions">
                <a href="#projects" className="button primary">View projects <span aria-hidden="true">↗</span></a>
                <a href="#contact" className="button secondary">Contact me <span aria-hidden="true">→</span></a>
              </div>
              <p className="availability"><span aria-hidden="true" />{profile.availability}</p>
            </div>
            <figure className="hero-portrait">
              <div className="portrait-frame">
                <img
                  src={media(profile.portrait)}
                  alt="Portrait of Gregory Sherris"
                  width="800"
                  height="800"
                  fetchPriority="high"
                />
              </div>
              <figcaption className="portrait-legend">
                <span>C / C++ / C#</span>
                <span>DigiPen · RTIS</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <ProjectGallery onOpen={setActiveProject} />

        <section id="about" className="information-section container" aria-labelledby="about-title">
          <h2 id="about-title" className="sr-only">About Gregory Sherris</h2>
          <div className="information-grid">
            <article className="info-panel skills-panel">
              <h3><span aria-hidden="true">01</span> Skills & tools</h3>
              <div className="panel-content">
                {skills.map((group) => (
                  <div className="panel-skill-group" key={group.label}>
                    <h4>{group.label}</h4>
                    <div className="tags">
                      {group.items.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="info-panel background-panel">
              <h3><span aria-hidden="true">02</span> Education & teamwork</h3>
              <div className="panel-content">
                <div className="background-entry">
                  <h4>Computer Science — RTIS</h4>
                  <p className="background-place">DigiPen Institute of Technology</p>
                  <p>Expected graduation: <strong>{profile.graduation}</strong></p>
                </div>
                <div className="background-entry">
                  <h4>Team game development</h4>
                  <p className="background-place">Course projects & Pre-College</p>
                  <p>I’ve contributed engine systems, player mechanics, and gameplay tools to teams of three to six people.</p>
                </div>
                <a href="#projects" className="text-link">Explore my contributions <span aria-hidden="true">↗</span></a>
              </div>
            </article>

            <article className="info-panel about-panel">
              <h3><span aria-hidden="true">03</span> About me</h3>
              <div className="panel-content">
                {profile.about.map((paragraph, index) => <AboutParagraph key={index} text={paragraph} />)}
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="contact-section container" aria-labelledby="contact-title">
          <div className="contact-copy">
            <p className="eyebrow">CONTACT</p>
            <h2 id="contact-title">Let’s build<br /><span>something worth playing.</span></h2>
            <p>I’m looking for a Summer 2027 internship where I can contribute to gameplay and engine development, learn from a team, and keep building better games.</p>
          </div>
          <div className="contact-links">
            <a href={'mailto:' + profile.email}>{profile.email} <span aria-hidden="true">↗</span></a>
            <ExternalLink href={profile.linkedin}>Connect on LinkedIn</ExternalLink>
            <ExternalLink href={profile.github}>Explore my GitHub</ExternalLink>
            <a href={media(profile.resume)} download={profile.resume}>Download my résumé <span aria-hidden="true">↓</span></a>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Gameplay & engine programming</span>
        <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
      {activeProject && <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />}
    </>
  );
}
