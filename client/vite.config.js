import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",  
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  resolve: {
    alias: {
      "@server": "/../server/src", // optional if you share code
    },
  },
  optimizeDeps: {
    exclude: ["@prisma/client"], // don’t prebundle prisma
  },
  build: {
    rollupOptions: {
      external: ["@prisma/client"], // don’t try to bundle prisma
    },
  },
});
