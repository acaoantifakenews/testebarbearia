import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // Para o deploy no GitHub Pages, é mais robusto usar um caminho relativo.
  // O Vite irá lidar com isso corretamente durante o build.
  // Se o deploy for para um subdiretório, o nome do repositório deve ser incluído.
  base: "/testebarbearia/", // Manter esta linha está correto para o subdiretório.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});