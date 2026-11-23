export default function GamePageLink({ project }) {
  if (!project.playUrl) return null;
  return (
    <a className="button primary game-page-link" href={project.playUrl}
      aria-label={`${project.title}: ${project.playLabel || 'Visit game page'}`}>
      {project.playLabel || 'Visit game page'}
    </a>
  );
}
