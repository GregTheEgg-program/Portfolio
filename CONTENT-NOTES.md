# Details to add next

The portfolio is usable as supplied. These details would make it more complete:

- **Spark gameplay media and links:** gameplay screenshots/trailers and any playable or source links for Surfing Poseidon and The Tower. Both now have the supplied thumbnail artwork; their names, premises, three-person teams, engines, and Gregory’s contributions are included under GAM 300.
- **Game links:** the DigiPen page for Gamblers Never Quit, plus any public build, trailer hosting, or repository for Goblin Man. Add these in `src/data.js`; empty links are not rendered.
- **Project timelines:** confirmed project dates and the development time for each Spark. The supplied public email is active, and expected graduation is listed as May 2028.
- **Performance evidence:** hardware, resolution, particle count, and frame-time/FPS measurements for the 10,000-particle statement. The current wording describes a target, not a measured guarantee, and the browser illustration is not an engine benchmark.
- **Team credits:** full surnames and optional portfolio links for teammates. Existing first names and initials are preserved as supplied.
- **Accessibility:** trailer captions or a transcript would make the original videos more accessible.

## Editorial decisions

- Replaced the About me panel with Gregory’s four supplied personal-blurb paragraphs exactly as written. Only “Scratch” is hyperlinked, and its parenthetical editing instruction is omitted; the separate parenthetical about Project Moon is preserved. The previous assistant-written About me paragraphs and extra LinkedIn prompt were removed, and no new text box was added to the hero.
- Revised descriptions into concise, professional copy and kept each game’s concept separate from Gregory’s individual contributions.
- Retained the supplied team changes, development time, engine languages, and public repository URLs. Added both Spark descriptions from the updated notes, and corrected their course to GAM 300; did not invent dates, download URLs, or job experience.
- Described Goblin Man as remarkably resilient rather than absolutely invincible, because the Bonkera interaction still squashes him.
- Removed informal/profane code comments. Code samples are labeled as abridged or adapted, with original project identifiers largely preserved; they are presentation excerpts, not complete engine source files.
- Both interactive demonstrations are contained in the Goblin Man project breakdown and are not rendered on the home page or in other projects. Their animation and canvas resources are cleaned up when the project closes.
- The Bonkera scene uses the supplied transparent sprites in a top-down view. Its center remains fixed while it grows and turns, stalls, and rapidly shrinks to emulate a stomp. It is translucent during passage and after impact so the Goblittle’s movement and squash remain visible; the side-view floor and vertical travel have been removed.
- The particle example is a JavaScript/Canvas recreation of a pooled-emitter concept. It does not run or benchmark the supplied C++ code.
- The portrait is the supplied photograph. Video posters are frames from the supplied trailers. Goblin Man’s trailer was compressed to a 1280-pixel-wide H.264/AAC MP4 for the web, preserving its audio; the smaller GAM 150 trailer was retained.
- There are no personal site logos, initials graphics, icon libraries, external fonts, or automatic profile scraping. The six supplied game PNGs are used unchanged as project thumbnails, displayed without cropping; original footage inside the team trailers is retained.
- Adapted only the screenshot layout: a wide framed navigation bar, left introduction/right portrait, horizontal gallery with two desktop cards, and three panels for skills, background, and about. The palette remains primarily black with purple and blue accents.
- The reference screenshots are not bundled, rendered on the page, or used for content. No biography, job titles, employers, skills, project descriptions, or project images from the reference portfolio were imported.
- All six current project cards use the supplied thumbnail PNGs. A mechanic-overview fallback remains available for future projects without images; the original trailer posters are kept separately.
- Up We Goat and Rock, Paper, City now include their supplied trailers in their respective project details. The videos retain the original H.264/AAC streams, with MP4 metadata moved to the front for progressive playback; the existing game thumbnails remain unchanged.
- The current master résumé PDF is included unchanged and is downloadable as the fourth link in the bottom contact section, after email, LinkedIn, and GitHub. The older tutor-application résumé is not bundled.

## Sources and limits

Primary sources: the attached `Pasted text.txt`, updated `Pasted text(1).txt`, Gregory’s original five media files, the six supplied game thumbnails, `upwegoat.mp4`, `rockpapercty.mp4`, and `Gregory-Sherris-Master-Resume.pdf`. The two reference screenshots were used only to understand layout. Existing GitHub/LinkedIn links, RTIS education, language/tool lists, and internship availability were retained from the prior website and supplied conversation. The previous version documented public profile retrieval; LinkedIn’s full profile remained inaccessible.

The public Up We Goat repository’s `Assets`, `Packages`, and `ProjectSettings` directories were also checked through GitHub to confirm the Unity project structure.

The original game implementations were not changed or audited. The website’s asset references, React output, production build, and bounded particle simulation were checked locally. Browser-based visual and interaction QA was unavailable in this environment; inspect the layout and controls after running locally.
