/**
 * App.tsx — BarberPro
 * Roteamento principal do sistema de agendamento
 * Design: Warm Minimalism / Modern Craft
 *
 * Estrutura de rotas:
 *   / ................. Landing Page (Home)
 *   /login ............ Tela de login
 *   /cadastro ......... Tela de cadastro
 *   /servicos ......... Catálogo de serviços (público)
 *   /barbeiros ........ Equipe de barbeiros (público)
 *   /agendar .......... Fluxo de agendamento (público/cliente)
 *   /minha-conta ...... Área do cliente
 *   /admin ............ Dashboard administrativo
 *   /admin/agendamentos Gerenciamento de agendamentos
 *   /admin/clientes ... Gerenciamento de clientes
 *   /admin/servicos ... CRUD de serviços
 *   /admin/barbeiros .. Gerenciamento de barbeiros
 *   /admin/relatorios . Relatórios e métricas
 *   /admin/configuracoes Configurações do sistema
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Servicos from "./pages/servicos/Servicos";
import Barbeiros from "./pages/barbeiros/Barbeiros";
import Agendar from "./pages/agendar/Agendar";
import MinhaConta from "./pages/minha-conta/MinhaConta";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import Agendamentos from "./pages/admin/Agendamentos";
import Clientes from "./pages/admin/Clientes";
import AdminServicos from "./pages/admin/Servicos";
import AdminBarbeiros from "./pages/admin/Barbeiros";
import Relatorios from "./pages/admin/Relatorios";
import Configuracoes from "./pages/admin/Configuracoes";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/servicos" component={Servicos} />
      <Route path="/barbeiros" component={Barbeiros} />
      <Route path="/agendar" component={Agendar} />
      <Route path="/minha-conta" component={MinhaConta} />

      {/* Admin routes */}
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/agendamentos" component={Agendamentos} />
      <Route path="/admin/clientes" component={Clientes} />
      <Route path="/admin/servicos" component={AdminServicos} />
      <Route path="/admin/barbeiros" component={AdminBarbeiros} />
      <Route path="/admin/relatorios" component={Relatorios} />
      <Route path="/admin/configuracoes" component={Configuracoes} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster richColors position="top-right" />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
