# UI/UX Plan

## Overview
The Showinfo app is an interactive infographic builder that fetches data about TV shows. The interface guides users from a home screen to show-specific pages where data and visualizations are presented.

## Current Layout
- **Home**: lists available shows and links to their pages.
- **Show Page**: displays episode and character lists for supported shows, a bar chart summarizing counts, and informs users when no API is available (e.g., Family Guy).

## Visual Libraries
To build rich infographics, the app will leverage JavaScript visualization libraries highlighted in `Sourses_info.md`:
- **D3.js** for bespoke, highly customizable visuals.
- **Chart.js** for common chart types with minimal setup.
- **Plotly.js** for advanced interactive charts and graphs.

## Navigation and Responsiveness
- Utilize React Router for page navigation.
- Ensure responsive design so the app works across devices.

## Next Steps
- Apply basic styling and layout improvements.
- Expand Chart.js visualizations with user-selectable datasets and chart types.
- Investigate alternative data sources or uploads for shows lacking public APIs.
