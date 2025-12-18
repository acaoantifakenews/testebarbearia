import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // Adicione o nome do seu repositório aqui
  base: "/testebarbearia/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});