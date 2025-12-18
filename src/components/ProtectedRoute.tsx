import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { session } = useAuth();

  if (!session) {
    // Usuário não logado, redireciona para a página de login
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}