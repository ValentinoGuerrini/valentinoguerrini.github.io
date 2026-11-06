# Valentino Guerrini — an engineer’s journey

A static Astro portfolio for https://valentinoguerrini.github.io. A curved vertical route on the left connects Piacenza, Milan, Chicago and Zürich. A small 3D traveller follows the route; at each city it pauses while the visitor scrolls through a deck of short cards on the right.

## Development

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

The output is `dist/`. No backend, API keys or tracking are required. Astro serves static HTML with a navigation script and a lazy-loaded Three.js scene. WebGL renders the procedural landmarks and character where available; live SVG rendering provides a fallback. The root base path is configured for this user-level GitHub Pages repository.

## Edit the content and interaction

- `src/chapters.ts`: stop names, dates, card introductions and project links.
- `src/journey.ts`: project descriptions used by the additional detail panels.
- `src/config.ts`: social/contact configuration.
- `src/pages/index.astro`: map path, stop labels, cards, dialogs and metadata.
- `src/styles/journey.css`: responsive split layout, deck appearance and reading mode.
- `src/scripts/timeline.mjs`: hold, card-turn and travel durations; direct-navigation anchors.
- `src/scripts/journey.ts`: native-scroll sampling, deck transforms, path progress and controls.
- `src/scripts/scene.ts`: farmhouse, Duomo, Chicago skyline, Zürich landmark and articulated traveller.
- `tests/timeline.test.mjs`: card-anchor, travel-order, forward/reverse boundary and endpoint checks.
- `public/assets/journey-banner.webp`: original reference banner, used only for social previews.

The itinerary groups work by place; the Milan and Chicago dates overlap because of the double degree. Each card has one short introduction. Longer project information remains available from the Index. Warm ivory, teal and brass preserve the palette of the original illustration; DM Sans and IBM Plex Mono are loaded via Google Fonts.

## Interaction and accessibility

Native document scrolling is preserved, without wheel or touch interception. Scrolling advances through stationary reading intervals, card turns and travel between stops. The character's feet follow the SVG path; it stays at the city during all of that city's cards. Scrolling backwards reverses the same timeline. Arrows, card dots, map links and the Index offer direct navigation.

Only the current card is interactive and exposed to assistive technology. Reduced-motion preferences, or the Motion control in the Index, show every card in a static reading layout. Dialogs support Escape, keyboard navigation and focus restoration. Without JavaScript, introductions and project/contact links remain readable. The map stays on the left on phones, with smaller landmarks and a narrow route.

The scene renders on demand during travel and after resizing or a stop change. Card turns do not redraw stationary 3D geometry. If scene rendering fails, the route, labels and a simple moving CSS traveller remain functional.

## Deployment

`.github/workflows/astro.yml` runs the timeline tests, builds the site and deploys `dist/` to GitHub Pages on `main`. Pull requests test and build without deploying. The repository's Pages source is GitHub Actions.

Previous designs remain available in Git history.
