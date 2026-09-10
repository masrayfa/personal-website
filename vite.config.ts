import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from './vite-plugins/cloudflare.ts';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { fileURLToPath } from 'url';

const config = defineConfig({
  plugins: [
    cloudflare,
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    mdx({
      development: process.env.NODE_ENV !== 'production',
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    }),
    tanstackStart(),
    viteReact(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['masrayfa.up.railway.app'],
  },
});

export default config;
