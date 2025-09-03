# Development Plan

This document outlines the development goals and progress for the `showinfo` project. Ensure this plan is updated after each pull request.

## Overview
The project aims to build showinfo, an interactive infographic builder that fetches TV-show data through public APIs. Two shows—South Park and Bob's Burgers—provide rich datasets via REST APIs, while Family Guy lacks a comparable public endpoint. Visualization will leverage libraries such as D3.js, Chart.js, and Plotly.js for dynamic charts and graphs.

## Current Goals
- [ ] Apply responsive styling across pages (refine layout, spacing, mobile controls)
- [ ] Improve loading and error states (skeletons, retries, offline)
- [ ] Add more chart presets (lines/stacked bars) and legend toggles
- [ ] Explore data sources for shows without APIs (Family Guy: TMDb/IMDb bridge)
- [ ] Prepare basic deployment (static hosting) instructions

## Task Stubs

### South Park API Client
- [x] Implement South Park API client
  - Create `src/api/southPark.ts` with functions for characters, episodes, locations, and quotes.
  - Map REST endpoints to typed interfaces: `/characters/:id`, `/episodes`, `/quotes`.
  - Include basic caching and error handling for rate-limits or missing data.

### Bob's Burgers API Client
- [x] Implement Bob's Burgers API client
  - Add `src/api/bobsBurgers.ts` that wraps endpoints such as `/episodes`, `/quotes/random`, `/characters/:id`.
  - Provide pagination support and query-by-name filtering.
  - Expose normalized models (Episode, Character, Quote) compatible with other shows.

### Unified Data Model
- [x] Normalize show data
  - [x] Define shared interfaces (`Show`, `Episode`, `Character`, `Quote`) under `src/models/`.
  - [x] Implement conversion functions mapping South Park and Bob's Burgers responses to these interfaces.
  - [x] Store normalized data in a lightweight cache or state management layer.

### Web Interface
- [x] Scaffold a React-based web app with navigation for home and show-specific pages.
- [x] Fetch data through API clients and display basic lists for shows, episodes, and characters.
  - [x] Display episode lists for South Park and Bob's Burgers.
  - [x] Display character lists for each show.
- [ ] Apply responsive styling to ensure usability across devices.
  - [x] Add minimal dark theme and layout containers (MVP via `src/style.css`).
  - [ ] Tune spacing/typography; add mobile-friendly chart container sizing.

### Interactive Visualization Components
- [ ] Build infographic components
  - [x] Set up a React frontend in `src/components/` with a router for different shows.
  - [x] Integrate Chart.js for basic show statistics visualization.
  - [x] Add controls for selecting datasets and chart types; ensure responsive layout.

### Handling Missing Family Guy API
- [x] Gracefully handle missing data sources
  - [x] Detect when a show lacks an API (e.g., Family Guy) and display an informative message.
  - [x] Offer links to alternative sources (IMDb, TMDb) or allow manual data uploads.
  - [x] Log unserved requests for potential future API integrations.

## Completed Work
- [x] Initial project setup.
- [x] Implemented South Park API client with caching and error handling.
- [x] Added Bob's Burgers API client with pagination and name filtering.
- [x] Defined unified data model with normalization helpers and in-memory store.
- [x] Scaffolding for React-based web interface with basic navigation.
- [x] Added episode listings to show pages and handled missing API for Family Guy.
- [x] Added character listings to show pages.
- [x] Introduced Chart.js bar chart for show statistics.
- [x] Added dataset and chart type controls with responsive layout.
- [x] Added logging and alternative source links for shows without APIs.
- [x] Added Vite dev server for fast local preview and build (`index.html`, `vite.config.ts`).
- [x] Updated README with quick run instructions.

## Next Steps (Short Term)
1. Refine responsive styling (mobile-first container widths; chart canvas sizing).
2. Add basic loading skeletons for episodes/characters lists and the chart.
3. Add error banners with retry for transient failures (429, network).
4. Add one more chart option (e.g., line chart of episodes per season).
5. Document simple static deployment (Vercel/Netlify/GitHub Pages) using Vite build.


