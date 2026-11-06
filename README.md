# Valentino Guerrini — an engineer’s journey

A static Astro portfolio for https://valentinoguerrini.github.io. Native scrolling moves a small traveller along a continuous path from Piacenza through Milan and Chicago to Zürich. One chapter and one live 3D object appear at a time; project details open on demand.

## Development

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The output is `dist/`. No backend, API keys or tracking are required. Astro serves static HTML with a small navigation script and a lazy-loaded Three.js scene. The scene uses WebGL where available and live SVG rendering otherwise. `astro.config.mjs` uses the root base path for this user-level GitHub Pages repository.

## Edit the content

- `src/chapters.ts`: the six journey chapters.
- `src/journey.ts`: featured projects and other work.
- `src/config.ts`: social/contact configuration.
- `src/pages/index.astro`: page structure, detail panels, biography and metadata.
- `src/styles/journey.css`: responsive layout and visual design.
- `src/scripts/journey.ts`: native-scroll progress, chapter navigation, dialogs and motion control.
- `src/scripts/scene.ts`: procedural 3D objects, articulated traveller, camera and pointer rotation.
- `public/assets/journey-banner.webp`: supplied reference banner, used only for social previews.

Warm ivory, teal and brass carry the palette of the owner's original illustration into a minimal interactive scene. DM Sans and IBM Plex Mono are loaded via Google Fonts. Drag the object with a mouse to turn it. Animation renders only while scrolling, dragging or resizing; no continuous idle loop is needed.

## Accessibility and motion

Native document scrolling is preserved without wheel or touch interception. The Index provides direct chapter and project access. Inactive animated chapters are inert and hidden from the accessibility tree. Reduced-motion preferences, or the Motion control in the Index, show the chapters in a static reading layout. Dialogs support keyboard navigation, Escape and focus restoration. Without JavaScript, the chapter introductions and direct contact/profile links remain readable. If scene rendering fails, a small inline illustration preserves the layout while the content and navigation continue to work.

## Deployment

`.github/workflows/astro.yml` builds the site and deploys `dist/` to GitHub Pages on `main`. Pull requests build without deploying. The repository's Pages source is GitHub Actions.

Previous designs remain available in Git history.
