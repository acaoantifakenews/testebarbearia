import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-lg font-bold">
            Luxe Barber Suite
          </Link>
          <nav className="flex items-center gap-4">
            <Button asChild><Link to="/login">Login</Link></Button>
          </nav>
        </div>
      </header>
      <main className="flex-1"><Outlet /></main>
    </div>
  );
}