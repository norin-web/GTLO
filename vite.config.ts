import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // No custom domain: served at https://norin-web.github.io/getting-out/.
  // If a custom domain is added (public/CNAME), switch to "/" in the same commit or every asset 404s.
  base: "/getting-out/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
