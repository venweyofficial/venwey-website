// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Emit privacy-policy.html, terms.html, disclaimer.html (same URLs as the original site).
  build: { format: "file" },
  vite: {
    plugins: [tailwindcss()],
  },
});
