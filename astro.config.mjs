// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages at https://cosmicstasia.github.io/unho-ethnography-portfolio/
export default defineConfig({
  site: 'https://cosmicstasia.github.io',
  base: '/unho-ethnography-portfolio',
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()]
  }
});
