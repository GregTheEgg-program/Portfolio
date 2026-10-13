# Gregory Sherris — React Portfolio

A standalone React + Vite portfolio with a black background, white text, and blue/purple accents. No logos, monograms, branded icons, or initials graphics are included.

## Run locally

Install Node.js 22.12+ (or Node.js 20.19+), open a terminal in this folder, and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`. This is a static frontend; no backend, credentials, or hosting account is required.

## Edit

- `src/content.js`: biography, profile links, project descriptions, and skills.
- `src/App.jsx`: React components and page structure.
- `src/styles.css`: colors, typography, layout, and mobile styles.
- `index.html`: page title and description.

Google Fonts are optional; local system fonts are used when unavailable.

## Content sources

Content was gathered on October 13, 2026 from these sources, rather than the previously supplied résumé:

- [GitHub profile README](https://github.com/GregTheEgg-program/GregTheEgg-program/blob/main/README.md): DigiPen RTIS studies, game development, cybersecurity interest, internship search, and Perforce use.
- [LinkedIn profile](https://www.linkedin.com/in/gregory-sherris-computerscience/): publicly indexed headline and snippets identifying RTIS studies, a Summer 2027 internship search, C++/Java/Python skills, and a small business internship.
- [RPS repository](https://github.com/GregTheEgg-program/RPS): Unity project structure and 2024 repository history.
- [enemyScript.cs](https://github.com/GregTheEgg-program/RPS/blob/main/Assets/Scripts/enemyScript.cs): combat results, health, combos, opponent decisions, countdowns, and scene transitions.
- [Interact.cs](https://github.com/GregTheEgg-program/RPS/blob/main/Assets/Scripts/Interact.cs): move selection, sprite changes, health UI, and audio feedback.
- [Exposition.cs](https://github.com/GregTheEgg-program/RPS/blob/main/Assets/Scripts/Exposition.cs): Chronobridge story setting.

LinkedIn rejected direct access, so only its publicly indexed information was used. Detailed employment dates, company names, additional coursework, and other unavailable profile sections were not inferred. Its older indexed About snippet mentions a previous program; the current RTIS headline is corroborated by the GitHub profile README.

The GitHub project index currently contains only a heading. The portfolio therefore features the verified public RPS game, rather than inventing additional projects. Project descriptions summarize the inspected repository; individual team contributions are not claimed without documentation.

The site uses a fixed content snapshot and does not scrape profiles at runtime. No résumé content, PDF, external profile images, or third-party logos are bundled.
