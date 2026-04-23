/**
 * AdminLayout — BarberPro
 * Wrapper de layout para páginas do painel administrativo
 */

import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const { user } = useAuth();

  if (!user || (user.role !== "admin" && user.role !== "barber")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Acesso Restrito
          </h2>
          <p className="text-muted-foreground">
            Você não tem permissão para acessar esta área.
          </p>
          <Link href="/login">
            <Button>Fazer Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-6">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
