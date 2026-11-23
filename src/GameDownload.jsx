import { downloadFile } from './data.js';
import { games, windowsInstallers } from '../cloudflare/games.mjs';

const sizeLabel = bytes => `${(bytes / (1024 * 1024)).toFixed(1)} MiB`;

export default function GameDownload({ project }) {
  if (!project.download) return null;
  const installer = windowsInstallers[project.download];
  const portable = games.find(game => game.file === project.download);
  if (!portable) return null;
  const primaryFile = installer?.file ?? project.download;

  return (
    <div className="game-download">
      <a
        className="button primary"
        href={downloadFile(primaryFile)}
        download={primaryFile}
        aria-label={`Download ${project.title} ${installer ? 'Windows installer' : 'game (ZIP)'}`}
      >
        {installer ? 'Download Windows installer' : 'Download game (ZIP)'}
      </a>
      {installer ? (
        <>
          <span>.exe · {sizeLabel(installer.bytes)}</span>
          <a className="text-link" href={downloadFile(project.download)} download={project.download}
            aria-label={`Download ${project.title} portable ZIP`}>
            Portable ZIP · {portable ? sizeLabel(portable.bytes) : project.downloadSize}
          </a>
        </>
      ) : <span>Windows · {sizeLabel(portable.bytes)}</span>}
    </div>
  );
}
