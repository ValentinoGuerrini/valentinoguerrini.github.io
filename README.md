# Valentino Guerrini — an engineer’s journey

A static Astro portfolio for https://valentinoguerrini.github.io. The opening is an illustrated, scroll-driven journey from Piacenza through Milan and Chicago to Zürich, followed by selected work, background and contact links.

## Development

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The output is `dist/`. No backend, API keys, tracking, animation library or runtime framework is required. `astro.config.mjs` uses the root base path for this user-level GitHub Pages repository.

## Edit the content

- `src/journey.ts`: chapters, featured projects and other work.
- `src/config.ts`: existing social/contact configuration.
- `src/pages/index.astro`: page structure, biography and metadata.
- `src/styles/journey.css`: responsive layout and visual design.
- `src/scripts/journey.ts`: native-scroll scene, chapter navigation, motion control and project filters.
- `public/assets/journey-panorama.webp`: painted world, created from the owner's supplied visual reference.
- `public/assets/journey-banner.webp`: supplied reference banner, used for social previews.

The visual direction follows the owner's travel-poster illustration: warm ivory, teal, ochre, painted cities and a lakeside path. The traveller is a small articulated SVG so its limbs can follow scroll progress without loading a sprite animation. Instrument Serif, DM Sans and IBM Plex Mono are loaded via Google Fonts.

## Accessibility and motion

Native document scrolling is preserved; there is no wheel or touch interception. Chapter links, a skip link and ordinary navigation allow direct access. Inactive animated chapters are `inert` and hidden from the accessibility tree. Reduced-motion preferences, or the Motion button, show all chapters in a static readable layout. Without JavaScript, all content remains available. All work remains visible until a filter is explicitly selected.

## Deployment

One workflow, `.github/workflows/astro.yml`, builds the site and deploys `dist/` to GitHub Pages on `main`. Pull requests build without deploying. The repository's Pages source must be **GitHub Actions**. The earlier duplicate workflow was removed to prevent two deployments racing for the same site.

The previous design remains available in Git history before this redesign.
