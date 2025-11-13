import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import path from "path";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), flowbiteReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173,
    middlewareMode: false,
    fs: {
      allow: ["."],
    },
  },
  // Konfigurasi server development untuk menangani rute secara kustom
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // admin: resolve(__dirname, "admin.html"),
      },
    },
  },
});