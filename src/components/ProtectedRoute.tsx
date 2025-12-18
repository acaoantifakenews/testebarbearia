import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";

export function ProtectedRoute() {
  const { session } = useAuth();

  if (!session) {
    // Se não houver sessão, redireciona para a página de login
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}