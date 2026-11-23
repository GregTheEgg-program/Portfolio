import { downloadFile } from './data.js';

export default function GameDownload({ project }) {
  if (!project.download) return null;

  return (
    <div className="game-download">
      <a
        className="button primary"
        href={downloadFile(project.download)}
        download={project.download}
        aria-label={`Download ${project.title} game (ZIP)`}
      >
        Download game (ZIP)
      </a>
      <span>{project.download} · {project.downloadSize}</span>
    </div>
  );
}
