import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    proxy: {
      '/Api': {
        target: 'http://localhost:5277',
        changeOrigin: true,
      },
      '/Gamehub': {
        target: 'http://localhost:5277',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
