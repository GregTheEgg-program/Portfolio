# Gregory Sherris — React Portfolio

A standalone React + Vite portfolio with black backgrounds, white text, purple/blue accents, and a portrait on the opening screen. The screenshot-inspired layout includes a framed navigation bar, horizontal project gallery with six supplied game thumbnails, three information panels, six project breakdowns, four trailers, code excerpts, and a downloadable resume.

## Run locally

Use Node.js 22.12 or later (Node 24 works). Open a terminal in the folder containing `package.json` and `wrangler.jsonc`:

```bash
npm ci
npm run dev
```

Open the local URL printed by Wrangler. This serves the React site and the actual game download routes.

## Deploy with Cloudflare Workers

```bash
npm run deploy:check
```

This dry run builds the site and checks the Worker and its static assets without publishing. To test every available download locally after the build, run `npm run test:downloads`.

For the existing Git-connected Worker, keep the deploy command **`npx wrangler deploy`** and set the root to the folder containing `wrangler.jsonc` (the repository root in this ZIP). Wrangler runs the build itself; a separate dashboard build command is optional. If the Worker in the dashboard has a different name, match the `name` field in `wrangler.jsonc` to it. No bucket, external game host, or new domain is needed.

The Worker and the contents of `dist/` deploy together. For someone upgrading the previous GitHub repository, the existing full ZIPs in `public/downloads/` may stay: the build splits the generated copies and keeps the oversized files out of the deployment. The full v14 package includes the parts for every currently available download.

## Edit the site

| File | Purpose |
| --- | --- |
| `src/data.js` | Biography, project descriptions, links, team credits, skills, and code samples |
| `src/App.jsx` | Navigation, portrait hero, information panels, native project dialogs, and page structure |
| `src/ProjectGallery.jsx` | Six project cards, engine filters, carousel arrows, and the all-projects grid |
| `src/GameDownload.jsx` | Windows installer and portable ZIP controls for game cards and details |
| `src/Demos.jsx` | Particle controls and top-down Bonkera scene, shown inside Goblin Man |
| `src/particleEngine.js` | Bounded reusable particle pool for the browser illustration |
| `src/styles.css` | Shared styles for components and dialogs |
| `src/layout.css` | Framed navigation, hero, gallery, three-panel layout, and responsive overrides |
| `src/bonkera.css` | Top-down grow/rotate/shrink stomp animation and project-demo layout |
| `public/media/` | Photograph, trailers, posters, sprites, and the current resume PDF |
| `public/downloads/parts/` | Game archives and installers, split into pieces of at most 16 MiB |
| `cloudflare/worker.mjs` | Streams each game's parts in order as one ZIP attachment |
| `cloudflare/games.mjs` | Exact filenames, byte lengths, part size, and SHA-256 checksums |
| `scripts/prepare-downloads.mjs` | Prepares and verifies every listed download and checks every deployable asset against the Workers size limit |
| `scripts/import-tower.mjs` | Registers the packaged Windows build of The Tower and splits it for hosting |
| `src/GamePageLink.jsx` | Shares the prominent DigiPen link between the card and details |
| `index.html` | Page title and search description |
| `CONTENT-NOTES.md` | Missing details, editorial decisions, and verification limits |

The email address and expected graduation date are configured in `src/data.js`. Add playable/source URLs to the relevant project to enable those links; leave them empty when unavailable.

The About me panel contains Gregory’s supplied personal blurb verbatim, with only “Scratch” linked to his Scratch project search. It shows the first paragraph initially; **More…** reveals the remaining three paragraphs and **Less…** collapses them. Each information panel keeps its own height. Edit the four paragraphs in `profile.about`; the parenthetical linking instruction is not displayed.

The fourth link in the bottom contact section downloads `Gregory-Sherris-Master-Resume.pdf`, below email, LinkedIn, and GitHub. The supplied master resume is included unchanged; update `profile.resume` and the corresponding file in `public/media/` when replacing it.

Up We Goat and Rock, Paper, City offer a smaller offline Windows installer as well as the original portable ZIP. Surfing Poseidon downloads as one portable Windows ZIP. Its executable and all 187 other runtime files match the provided archive; only Unity’s explicitly marked DoNotShip debug directory was omitted. All download buttons work without GitHub access. The Gamblers Never Quit card and details both link to the supplied DigiPen listing directly below the game title.

To add **The Tower**, run `npm run import:tower -- "path/to/TheTower.zip"` with its packaged Windows build. The import verifies that the ZIP contains a game executable and cooked Unreal content, streams it into 16 MiB pieces, and records its hash and size. Commit `cloudflare/tower-release.json` and the resulting `.bin` files. The download button shows up once those files are present and the site is rebuilt. See `GAME-DOWNLOADS-UPDATE.txt` for deployment steps.

The gallery shows two cards at a time on desktop and one on mobile, with arrow controls and native scrolling. Use **View all projects** for a full grid, and filter by custom engines, Unity, or Unreal; filter counts update automatically when you add projects.

Open **Goblin Man** to find both the particle demonstration and the Bonkera scene in its project details. The Bonkera is viewed from above: it stays centered, grows and rotates to rise, then rapidly shrinks to stomp; it is translucent during the pass so the Goblittle remains visible underneath.

The demonstrations have pause controls and start paused when reduced motion is preferred. They mount only when Goblin Man is open and clean up when the project closes. Project dialogs use native keyboard focus management and close with Escape, the Close button, or a click outside the panel; videos play only when a visitor presses play.

All six thumbnails use the supplied PNGs, matched to their project names, with `object-fit: contain` to preserve the complete artwork. The existing trailer-frame posters are stored separately from the thumbnails.

## Included projects

- **Goblin Man:** custom C++ engine, collision and transforms, particles, enemy behavior, ImGui, and development tools.
- **Gamblers Never Quit:** custom C engine, time-based action lists, and the slots minigame.
- **Up We Goat:** obstacles, platforms, particles, and the first finished team project.
- **Rock, Paper, City:** enemy AI, combat, and attack combinations.
- **Surfing Poseidon — Spark 01:** Unity player movement, tricks, slow-motion quick-time events, and the style meter.
- **The Tower — Spark 02:** Unreal Engine 5 block dropping, custom blocks, scoring, and UI, primarily through Blueprints with some C++.

Goblin Man, Gamblers Never Quit, Up We Goat, and Rock, Paper, City have embedded trailers in their project details. The two newly supplied MP4s retain their original video/audio streams and are prepared for progressive web playback without re-encoding.

Both Sparks are listed under GAM 300, following the updated project notes. Add a future GAM 300/350 project to the `projects` array in `src/data.js`; its position in the array determines its gallery position.

The Worker serves the site and its downloads. The site contains no analytics, database, contact form, credentials, external font requests, personal logos, or initials graphics. Supplied game artwork is used for the project thumbnails. The reference screenshots inform layout only; their biography, project descriptions, skills, jobs, and images are not included in the site.

## Checks

Use `npm run deploy:check` to verify the Cloudflare build and `npm run test:downloads` to download every registered file through the local Workers runtime and compare its length, filename, and SHA-256 checksum.
