import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext.tsx";

export function ProtectedRoute() {
  const { session, loading } = useAuth();

  if (loading) {
    // Opcional: Substitua por um componente de spinner/loading mais elaborado
    return <div className="flex h-full items-center justify-center">Carregando...</div>;
  }

  if (!session && !loading) {
    // Se não houver sessão, redireciona para a página de login
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}