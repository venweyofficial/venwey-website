// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Emit routes as trailing-slash directories, such as /about/ and /services/branding/.
  build: { format: "directory" },
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});
