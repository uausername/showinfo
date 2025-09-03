# showinfo

showinfo is an interactive infographic builder that fetches TV-show data through public APIs and presents them with dynamic charts.

## Features
- South Park and Bob's Burgers API clients with data normalization and caching.
- Unified TypeScript models for shows, episodes, characters, and quotes.
- React-based interface for browsing shows, episodes, and characters.
- Interactive Chart.js component with selectable datasets (counts or episodes per season) and chart types (bar or pie).
- Graceful handling when no API is available (e.g., Family Guy).

## APIs
- [South Park API](https://publicapi.dev/south-park-quotes-api/) for characters, episodes, locations, and quotes.
- [Bob's Burgers API](https://publicapi.dev/bob-s-burgers-api/) for episodes, characters, and quotes.
- Family Guy currently lacks a public API; future updates may link to alternative sources like IMDb or TMDb.

## Visualization Libraries
- **Chart.js** is currently integrated for quick bar and pie charts.
- Future plans include exploring **D3.js** and **Plotly.js** for richer, interactive infographics.

## Development Status
- ✅ South Park API client
- ✅ Bob's Burgers API client
- ✅ Unified data model and in-memory store
- ✅ React web interface with navigation
- ✅ Dataset and chart-type controls in visualization component
- 🚧 Apply responsive styling across the app
- 🚧 Investigate alternative data sources or uploads for shows lacking public APIs

See [DEV_PLAN.md](DEV_PLAN.md) for the full roadmap.

## Run The App (MVP)
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open the URL shown in the terminal (usually `http://localhost:5173`).

## Running Tests
1. Install dependencies: `npm install`
2. Run unit tests: `npm test`

## Deployment
- Build the app: `npm run build`
- Preview locally: `npm run preview`
- Static hosting options:
  - Vercel/Netlify: import the repo, set build command `npm run build` and output dir `dist`.
  - GitHub Pages: push the `dist` folder to a `gh-pages` branch or use an action that deploys `dist` after build.
