# Details to add next

The portfolio is usable as supplied. These details would make it more complete:

- **Spark media and links:** screenshots/trailers and any playable or source links for Surfing Poseidon and The Tower. Their names, premises, three-person teams, engines, and Gregory’s contributions are now included under GAM 300.
- **Game links:** the DigiPen page for Gamblers Never Quit, plus any public build, trailer hosting, or repository for Goblin Man. Add these in `src/data.js`; empty links are not rendered.
- **Project timelines:** confirmed project dates and the development time for each Spark. The supplied public email is active, and expected graduation is listed as May 2028.
- **More project media:** screenshots for Up We Goat and Rock, Paper, City would strengthen their cards. The existing cards use text rather than invented gameplay images.
- **Performance evidence:** hardware, resolution, particle count, and frame-time/FPS measurements for the 10,000-particle statement. The current wording describes a target, not a measured guarantee, and the browser illustration is not an engine benchmark.
- **Team credits:** full surnames and optional portfolio links for teammates. Existing first names and initials are preserved as supplied.
- **Accessibility:** trailer captions or a transcript would make the original videos more accessible.

## Editorial decisions

- Revised descriptions into concise, professional copy and kept each game’s concept separate from Gregory’s individual contributions.
- Retained the supplied team changes, development time, engine languages, and public repository URLs. Added both Spark descriptions from the updated notes, and corrected their course to GAM 300; did not invent dates, download URLs, or job experience.
- Described Goblin Man as remarkably resilient rather than absolutely invincible, because the Bonkera interaction still squashes him.
- Removed informal/profane code comments. Code samples are labeled as abridged or adapted, with original project identifiers largely preserved; they are presentation excerpts, not complete engine source files.
- The Bonkera scene uses the supplied transparent sprites. It loops through a climb, stall, and slam, fades the mushroom during passage, and squashes the Goblittle.
- The particle example is a JavaScript/Canvas recreation of a pooled-emitter concept. It does not run or benchmark the supplied C++ code.
- The portrait is the supplied photograph. Video posters are frames from the supplied trailers. Goblin Man’s trailer was compressed to a 1280-pixel-wide H.264/AAC MP4 for the web, preserving its audio; the smaller GAM 150 trailer was retained.
- There are no site logos, initials graphics, icon libraries, external fonts, or automatic profile scraping. Original footage inside the supplied team trailers is retained.
- Adapted only the screenshot layout: a wide framed navigation bar, left introduction/right portrait, horizontal gallery with two desktop cards, and three panels for skills, background, and about. The palette remains primarily black with purple and blue accents.
- The reference screenshots are not bundled, rendered on the page, or used for content. No biography, job titles, employers, skills, project descriptions, or project images from the reference portfolio were imported.
- Project cards without supplied game images show a labeled, original mechanic overview built with HTML/CSS. These diagrams are not screenshots of the games.

## Sources and limits

Primary sources: the attached `Pasted text.txt`, updated `Pasted text(1).txt`, and Gregory’s five media files. The two newly supplied screenshots were used only to understand layout. Existing GitHub/LinkedIn links, RTIS education, language/tool lists, and internship availability were retained from the prior website and supplied conversation. The previous version documented public profile retrieval; LinkedIn’s full profile remained inaccessible.

The public Up We Goat repository’s `Assets`, `Packages`, and `ProjectSettings` directories were also checked through GitHub to confirm the Unity project structure.

The original game implementations were not changed or audited. The website’s asset references, React output, production build, and bounded particle simulation were checked locally. Browser-based visual and interaction QA was unavailable in this environment; inspect the layout and controls after running locally.
