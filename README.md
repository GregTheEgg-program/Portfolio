# Gregory Sherris — React Portfolio

A standalone React + Vite portfolio with black backgrounds, white text, purple/blue accents, and a portrait on the opening screen. The screenshot-inspired layout includes a framed navigation bar, horizontal project gallery with six supplied game thumbnails, three information panels, six project breakdowns, four trailers, code excerpts, and a downloadable résumé.

## Run locally

Use Node.js 22.12+ (or 20.19+). Open a terminal in this folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The site needs a local server; opening `index.html` directly will not run React.

## Production build

```bash
npm run build
npm run preview
```

Vite generates the static site in `dist/`. The included `base: './'` supports deployment in a subdirectory, and all media is bundled locally.

## Edit the site

| File | Purpose |
| --- | --- |
| `src/data.js` | Biography, project descriptions, links, team credits, skills, and code samples |
| `src/App.jsx` | Navigation, portrait hero, information panels, native project dialogs, and page structure |
| `src/ProjectGallery.jsx` | Six project cards, engine filters, carousel arrows, and the all-projects grid |
| `src/Demos.jsx` | Particle controls and top-down Bonkera scene, shown inside Goblin Man |
| `src/particleEngine.js` | Bounded reusable particle pool for the browser illustration |
| `src/styles.css` | Shared styles for components and dialogs |
| `src/layout.css` | Framed navigation, hero, gallery, three-panel layout, and responsive overrides |
| `src/bonkera.css` | Top-down grow/rotate/shrink stomp animation and project-demo layout |
| `public/media/` | Photograph, trailers, posters, sprites, and the current résumé PDF |
| `index.html` | Page title and search description |
| `CONTENT-NOTES.md` | Missing details, editorial decisions, and verification limits |

The email address and expected graduation date are configured in `src/data.js`. Add playable/source URLs to the relevant project to enable those links; leave them empty when unavailable.

The About me panel contains Gregory’s supplied personal blurb verbatim, with only “Scratch” linked to his Scratch project search. Edit its four paragraphs in `profile.about`; the parenthetical linking instruction is not displayed.

The fourth link in the bottom contact section downloads `Gregory-Sherris-Master-Resume.pdf`, below email, LinkedIn, and GitHub. The supplied master résumé is included unchanged; update `profile.resume` and the corresponding file in `public/media/` when replacing it.

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

The site contains no analytics, backend, contact form, credentials, external font requests, personal logos, or initials graphics. Supplied game artwork is used for the project thumbnails. The reference screenshots inform layout only; their biography, project descriptions, skills, jobs, and images are not included in the site.

## Checks

The production build, React server rendering, local media and anchor references, and particle-pool behavior were verified. Interactive browser and visual QA could not be performed in the current environment, so check the mobile layout, dialogs, videos, and animation controls locally before publishing.
