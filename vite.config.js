import { fileURLToPath, URL } from "node:url"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // O nome do repositório é usado como caminho base para o deploy no GitHub Pages
  base: '/testebarbearia/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
  },
})