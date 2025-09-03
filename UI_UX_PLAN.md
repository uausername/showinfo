# UI/UX Plan

## Overview
The Showinfo app is an interactive infographic builder that fetches data about TV shows. The interface guides users from a home screen to show-specific pages where data and visualizations are presented.

## Current Layout
- **Home**: lists available shows and links to their pages.
- **Show Page**: displays episode and character lists for supported shows, an interactive chart with selectable datasets and chart types, and when no API is available (e.g., Family Guy) it offers links to IMDb and TMDb while logging the request.

## Styling Status (MVP)
- Added a minimal dark theme (`src/style.css`) with a sticky nav, centered container, card panels, and compact form controls.
- Basic responsive layout via fluid container and flex-wrapped chart controls.
- Next: improve mobile spacing, typography scale, and chart canvas resizing.

## Visual Libraries
To build rich infographics, the app will leverage JavaScript visualization libraries highlighted in `Sourses_info.md`:
- **D3.js** for bespoke, highly customizable visuals.
- **Chart.js** for common chart types with minimal setup.
- **Plotly.js** for advanced interactive charts and graphs.

## Navigation and Responsiveness
- Utilize React Router for page navigation.
- Ensure responsive design so the app works across devices.
  - MVP: fluid container and wrapping controls; chart constrained by parent width.
  - Next: responsive type scale, spacing, and accessible focus styles.

## Next Steps
- Refine styling for mobile readability and spacing.
- Add loading skeletons and clear error banners with retry.
- Consider manual data upload options for shows lacking public APIs.
