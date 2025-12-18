import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { HashRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index.tsx";
import Booking from "./pages/Booking.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import { MainLayout } from "./components/MainLayout.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";

const App = () => (
  <>
    <Toaster />
    <Sonner />
    <HashRouter>
      <Routes>
        {/* Rotas Privadas com MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/booking" element={<Booking />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </>
);

export default App;
