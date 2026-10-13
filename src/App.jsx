import { useState } from 'react';

// Edit this content to update the portfolio. Everything below comes from the supplied résumé.
const profile = {
  name: 'Gregory Sherris',
  email: 'gregory.sherris@digipen.edu',
  location: 'Redmond, WA',
  linkedin: 'https://www.linkedin.com/in/gregory-sherris-computerscience/',
  resume: 'Gregory-Sherris-Resume.pdf',
};

const skills = [
  { label: 'Programming', items: ['C++', 'C', 'Debugging', 'Code conversion'] },
  { label: 'Game systems', items: ['ECS architecture', 'Collision detection', 'Testing', 'Problem solving'] },
  { label: 'Working together', items: ['Technical communication', 'Peer support', 'Team development', 'Organization'] },
];

const experience = [
  {
    title: 'Peer Support', organization: 'CS-230 · DigiPen', dates: 'Jan — Apr 2025',
    description: 'Helped classmates understand collision algorithms, debug C and C++ code, and work through the differences when converting C code to C++. My focus was helping people build the confidence to solve the next problem themselves.',
  },
  {
    title: 'Consulting Intern', organization: 'Paloma Valverde Consulting, LLC', dates: 'Summers 2022 — 2025',
    description: 'Researched and verified client and company information, improved client materials, and supported digital workflows using Adobe Acrobat, Grammarly, and AI tools.',
  },
  {
    title: 'Leadership & Volunteering', organization: 'British International School of Boston', dates: 'Jun 2021 — Jun 2024',
    description: 'Served as Captain of Hokusai House, coordinated school and community events, supported fundraising, and helped organize a Dungeons & Dragons club for 10–12 students.',
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function CollisionIllustration() {
  const [moved, setMoved] = useState(false);
  const x = moved ? 240 : 168;
  const radius = 52;
  const colliding = Math.abs(270 - x) <= radius;

  return (
    <div className="lab">
      <div className="lab-top"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>collision_lab</span><span>2D</span></div>
      <div className="lab-canvas">
        <div className="lab-caption"><span className="tiny-dot" /> CIRCLE × LINE</div>
        <svg viewBox="0 0 420 330" role="img" aria-label={colliding ? 'Circle intersects the vertical line.' : 'Circle is separated from the vertical line.'}>
          <defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#35534b" strokeWidth="0.5" /></pattern></defs>
          <rect width="420" height="330" fill="url(#grid)" />
          <line x1={x} y1="177" x2="270" y2="177" stroke="#97b0a7" strokeDasharray="4 6" />
          <line x1="270" y1="75" x2="270" y2="279" stroke={colliding ? '#f7bc76' : '#e1e9de'} strokeWidth="4" strokeLinecap="round" />
          <circle className="demo-circle" cx={x} cy="177" r={radius} fill={colliding ? '#f7bc7618' : '#c4df9b18'} stroke={colliding ? '#f7bc76' : '#c4df9b'} strokeWidth="2" />
          <circle className="demo-circle" cx={x} cy="177" r="4" fill="#c4df9b" />
          <circle cx="270" cy="75" r="5" fill="#e1e9de" /><circle cx="270" cy="279" r="5" fill="#e1e9de" />
          <text x="83" y="276" fill="#b4c9bd" fontFamily="monospace" fontSize="12">circle.position</text>
          <text x="285" y="66" fill="#b4c9bd" fontFamily="monospace" fontSize="12">line</text>
        </svg>
        <div className="lab-status" role="status"><span className={colliding ? 'tiny-dot orange' : 'tiny-dot'} />{colliding ? 'Intersection detected' : 'No intersection'}</div>
      </div>
      <div className="lab-bottom"><span>Interactive illustration</span><button type="button" onClick={() => setMoved(!moved)}>{moved ? 'Reset object' : 'Move object'} <span aria-hidden="true">→</span></button></div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="Gregory Sherris, home"><span className="monogram">gs.</span><span>Gregory Sherris</span></a>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}</button>
          <nav id="navigation" className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation">
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s connect <Arrow /></a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-copy">
            <p className="eyebrow"><span className="tiny-dot" /> GAME PROGRAMMING & TECHNICAL COMMUNICATION</p>
            <h1>Building games.<br />Sharing what<br />I <span className="highlight">learn.</span></h1>
            <p className="intro">Hi, I’m Gregory. I’m a Computer Science–RTIS student at DigiPen, working on game systems in C/C++ and helping others make sense of challenging code.</p>
            <div className="hero-actions"><a className="button primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a><a className="text-link" href={profile.resume} download>Download résumé <span aria-hidden="true">↓</span></a></div>
            <p className="hero-location"><span aria-hidden="true">⌖</span> {profile.location} <span className="divider">/</span> DigiPen Institute of Technology</p>
          </div>
          <div className="hero-visual"><CollisionIllustration /><p className="visual-note">A small illustration of the systems I like to work on.</p></div>
        </section>

        <section className="skills-section container" aria-label="Skills">
          {skills.map((group) => <div className="skill-group" key={group.label}><h2>{group.label}</h2><p>{group.items.join(' · ')}</p></div>)}
        </section>

        <section id="work" className="section container">
          <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Under the hood.</h2></div><span className="section-note">Systems, logic, and a lot of debugging.</span></div>
          <article className="project">
            <div className="project-index" aria-hidden="true">01<span>ENGINE<br />DEVELOPMENT</span></div>
            <div className="project-content"><div className="project-meta"><span className="pill">C++</span><span className="pill">ECS</span><span className="project-date">Sep 2025 — Present</span></div><h3>ECS-based 2D game engine</h3><p>Developing a 2D engine with a five-person programming team for GAM-200 and GAM-250, applying the systems concepts learned in CS-230.</p><div className="contribution"><span className="eyebrow">MY CONTRIBUTIONS</span><p>Implementing and testing circle-to-line and line-to-line collision algorithms, debugging C++ systems, and explaining collision logic to teammates.</p></div><details><summary>More about the work <span aria-hidden="true">+</span></summary><ul><li>Refine code for accuracy, functionality, and performance.</li><li>Track bugs, test systems, and document implementation progress.</li><li>Work through debugging approaches together during development sessions.</li></ul></details></div>
          </article>
        </section>

        <section id="experience" className="section experience-section">
          <div className="container experience-layout"><div className="experience-heading"><p className="eyebrow">02 / EXPERIENCE</p><h2>Good code.<br />Clear communication.</h2><p>Working through problems is a team effort. I bring patience, curiosity, and a willingness to explain the why.</p></div><div className="timeline">{experience.map((item) => <article className="experience-item" key={item.title}><p className="dates">{item.dates}</p><h3>{item.title}</h3><p className="organization">{item.organization}</p><p>{item.description}</p></article>)}</div></div>
        </section>

        <section id="about" className="section container about-layout"><div><p className="eyebrow">03 / ABOUT & EDUCATION</p><h2>Always a student.<br />Sometimes a guide.</h2><p className="about-copy">I enjoy taking a difficult technical problem and breaking it into understandable steps. Whether I’m debugging a collision system or helping a classmate, I want to build understanding that lasts beyond a single solution.</p><p className="about-copy">My background combines game programming, collaborative development, and community leadership.</p></div><div className="education"><p className="eyebrow">EDUCATION</p><h3>DigiPen Institute<br />of Technology</h3><p>B.S. in Computer Science in RTIS</p><span className="dates">Sep 2024 — Present · Redmond, WA</span><hr /><h4>British International School of Boston</h4><p>High School Diploma · IB, IGSE</p><span className="dates">Aug 2020 — Jun 2024</span><details><summary>Additional learning <span aria-hidden="true">+</span></summary><ul><li>DigiPen Academy: Pre-College Game Programming (2024)</li><li>Bunker Hill Community College: MAT 197, Precalculus (2024)</li><li>Duke University: Java Programming (2023)</li><li>CalArts: Game Design & World Design (2023)</li><li>Unity and C# coursework through Udemy and Coursera (2022–2023)</li></ul></details></div></section>

        <section id="contact" className="container contact-section"><div><p className="eyebrow">04 / SAY HELLO</p><h2>Let’s build<br />something together.</h2><p>Have a project, a programming question, or an opportunity?<br className="desktop-break" /> I’d love to hear from you.</p></div><div className="contact-links"><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <Arrow /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <Arrow /></a><a href={profile.resume} download>Download my résumé <span aria-hidden="true">↓</span></a></div></section>
      </main>

      <footer className="container footer"><span>© {new Date().getFullYear()} {profile.name}</span><span>Built with React. Made to keep learning.</span><a href="#home">Back to top <span aria-hidden="true">↑</span></a></footer>
    </>
  );
}
