import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from "path";

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 9191,
  },
})
