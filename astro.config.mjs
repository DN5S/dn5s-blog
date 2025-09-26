// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
   output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Geist",
        cssVariable: "--font-geist",
        fallbacks: ["Kosugi", "Noto Sans KR", "Inter", "sans-serif"],
      },
      {
        provider: fontProviders.google(),
        name: "Kosugi",
        cssVariable: "--font-kosugi",
        fallbacks: ["sans-serif"],
      },
      {
        provider: fontProviders.google(),
        name: "Noto Sans KR",
        cssVariable: "--font-noto-sans-kr",
        fallbacks: ["sans-serif"],
      }
    ]
  },

  adapter: vercel()
});