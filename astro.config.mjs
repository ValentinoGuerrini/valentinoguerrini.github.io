// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://valentinoguerrini.github.io',
  // no `base` needed for a personal site repo named <username>.github.io
  base: '/devportfolio'
});
