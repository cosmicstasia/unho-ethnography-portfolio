# UNHO 207 Ethnography Portfolio

Team **Three is a Magic Number**: Emma Waggenspack, Ella Black, Anastasia Coffman, Janice Lo, Channing Brown.

Live site: https://cosmicstasia.github.io/unho-ethnography-portfolio/

Built with Astro, Svelte, and Tailwind. Uses Bun.

```sh
bun install
bun run dev      # local preview at http://localhost:4321/unho-ethnography-portfolio/
bun run build    # static output in dist/
```

Content lives in `src/data/` (plan, interviews, evidence) and `src/content/` (narratives).
Pushing to `main` redeploys the site through GitHub Actions.

Participants are referred to as P1 to P5. Do not add participant names, audio, or the team contract.

## Color themes

The theme switcher offers every Omarchy theme. The palettes are generated from the
Omarchy theme files and committed, so the build does not need Omarchy installed:

```sh
bun scripts/gen-themes.ts /usr/share/omarchy/themes
```

That writes `src/styles/themes.css` and `src/data/themes.json`. Text colors are adjusted
to reach WCAG AA contrast on each theme. A link can pick a theme with `?theme=nord`.
