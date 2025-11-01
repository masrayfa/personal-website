import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "./vite-plugins/cloudflare.ts";
import neon from "./vite-plugins/neon.ts";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const config = defineConfig({
  plugins: [
    cloudflare,
    neon,
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    }),
  ],
});

export default config;
