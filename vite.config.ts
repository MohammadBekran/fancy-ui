/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "FancyUI",
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: [
        {
          format: "cjs",
          dir: "dist/cjs",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") return "fancy-ui.css";
            return assetInfo.name;
          },
        },
        {
          format: "es",
          dir: "dist/esm",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") return "fancy-ui.css";
            return assetInfo.name;
          },
        },
      ],
    },
    sourcemap: true, // Helps debug build
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
