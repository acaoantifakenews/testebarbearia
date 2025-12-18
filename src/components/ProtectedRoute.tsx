import { Outlet } from "react-router-dom";

export function ProtectedRoute() {
  // Para fins de demonstração, a autenticação foi desativada.
  // Todas as rotas protegidas agora são públicas.
  return <Outlet />;
}