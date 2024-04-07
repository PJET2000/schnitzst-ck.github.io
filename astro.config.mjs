import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

// import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), svelte()],
  site: 'https://schnitzstück.de ',

 // vite: {   plugins: [svgr()],  },
});