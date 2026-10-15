import { useEffect, useRef, useState } from 'react';
import { media, projects } from './data.js';

const filters = [
  { id: 'all', label: 'All projects' },
  { id: 'custom', label: 'Custom engines' },
  { id: 'unity', label: 'Unity' },
  { id: 'unreal', label: 'Unreal' },
];

function ProjectCard({ project, index, onOpen }) {
  return (
    <article className={`project-card ${project.image ? 'has-image' : 'text-project'}`}>
      <button
        className={`project-image-button ${project.image ? '' : 'project-schematic'}`}
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Explore ${project.title}${project.trailer ? ' and watch the trailer' : ''}`}
      >
        {project.image ? (
          <img
            src={media(project.image)}
            alt={project.imageAlt}
            width="1280"
            height="720"
            loading="lazy"
          />
        ) : (
          <div className="mechanic-overview" aria-hidden="true">
            <span className="tiny-label">MECHANIC OVERVIEW</span>
            <div className="mechanic-steps">
              {(project.focusSteps || project.stack.slice(0, 3)).map((step, stepIndex) => (
                <span key={step}>
                  <small>{String(stepIndex + 1).padStart(2, '0')}</small>
                  {step}
                </span>
              ))}
            </div>
            <span className="schematic-engine">{project.stack[0]}</span>
          </div>
        )}
        <span className="project-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        {project.trailer && (
          <span className="trailer-badge">
            <span aria-hidden="true">▷</span> Trailer & project details
          </span>
        )}
      </button>

      <div className="project-card-copy">
        <div className="project-topline">
          <span className="eyebrow">{project.course}</span>
          <span className="project-type">{project.type}</span>
        </div>
        <h3>
          <button type="button" onClick={() => onOpen(project)}>
            {project.title}<span aria-hidden="true">↗</span>
          </button>
        </h3>
        <p className="project-summary">{project.summary}</p>
        <div className="my-contribution">
          <span className="tiny-label">MY CONTRIBUTION</span>
          <p>{project.contribution}</p>
        </div>
        <div className="project-bottomline">
          <div className="tags">
            {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <button
            type="button"
            className="project-open"
            onClick={() => onOpen(project)}
            aria-label={`View ${project.title} project details`}
          >
            Details <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProjectGallery({ onOpen }) {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [canScroll, setCanScroll] = useState({ previous: false, next: true });
  const trackRef = useRef(null);
  const visibleProjects = projects.filter((project) => filter === 'all' || project.category === filter);

  useEffect(() => {
    const track = trackRef.current;
    track.scrollLeft = 0;
    const update = () => setCanScroll({
      previous: track.scrollLeft > 3,
      next: track.scrollWidth - track.clientWidth - track.scrollLeft > 3,
    });
    update();
    track.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [filter, expanded]);

  const move = (direction) => {
    const track = trackRef.current;
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section id="projects" className="projects-section container" aria-labelledby="projects-title">
      <div className="section-strip">
        <div><span className="section-index" aria-hidden="true">01</span><h2 id="projects-title">Selected projects</h2></div>
        <button
          type="button"
          className="text-link"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls="project-gallery-track"
        >
          {expanded ? 'Return to gallery' : 'View all projects'} <span aria-hidden="true">{expanded ? '↙' : '↗'}</span>
        </button>
      </div>

      <div className="gallery-toolbar">
        <div className="project-filters" aria-label="Filter projects">
          {filters.map((item) => {
            const count = projects.filter((project) => item.id === 'all' || project.category === item.id).length;
            return (
              <button
                type="button"
                key={item.id}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}<span>{String(count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>
        {!expanded && (
          <div className="gallery-arrows" role="group" aria-label="Project gallery controls">
            <button type="button" aria-label="Previous projects" aria-controls="project-gallery-track" disabled={!canScroll.previous} onClick={() => move(-1)}>←</button>
            <button type="button" aria-label="Next projects" aria-controls="project-gallery-track" disabled={!canScroll.next} onClick={() => move(1)}>→</button>
          </div>
        )}
      </div>

      <p className="sr-only" role="status">Showing {visibleProjects.length} projects</p>
      <div
        ref={trackRef}
        id="project-gallery-track"
        className={`project-track ${expanded ? 'is-grid' : ''}`}
        role="region"
        aria-label={expanded ? 'All matching projects' : 'Scrollable project gallery'}
        tabIndex={expanded ? undefined : 0}
      >
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} onOpen={onOpen} />
        ))}
      </div>
      <p className="gallery-note">{expanded ? 'Each project includes a breakdown of my individual contributions.' : 'Scroll through the gallery or view all projects. Select a card for the full breakdown.'}</p>
    </section>
  );
}
