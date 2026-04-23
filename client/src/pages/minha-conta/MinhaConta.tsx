/**
 * MinhaConta.tsx — BarberPro / Tela: minha-conta
 * Pasta: pages/minha-conta/
 * Design: Warm Minimalism / Modern Craft
 * Endpoints:
 *   GET /api/appointments?clientId=:id
 *   PATCH /api/appointments/:id/cancel
 *   GET /api/users/:id
 *   PUT /api/users/:id
 */

import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { useAuth } from "@/contexts/AuthContext";
import {
  MOCK_APPOINTMENTS,
  formatCurrency,
  formatDateShort,
  getStatusLabel,
  getStatusClass,
} from "@/lib/mockData";
import { toast } from "sonner";
import {
  CalendarDays,
  User,
  Clock,
  Scissors,
  XCircle,
  Plus,
} from "lucide-react";

export default function MinhaConta() {
  const { user } = useAuth();
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");

  const myAppointments = MOCK_APPOINTMENTS.filter(
    (a) => a.clientId === user?.id
  );

  const upcoming = myAppointments.filter(
    (a) => a.status === "confirmed" || a.status === "pending"
  );
  const history = myAppointments.filter(
    (a) => a.status === "completed" || a.status === "cancelled"
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <PublicNavbar />
        <div className="container py-20 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Acesso restrito
          </h2>
          <p className="text-muted-foreground mb-6">
            Faça login para acessar sua conta.
          </p>
          <Link href="/login">
            <Button>Fazer Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <div className="container py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="accent-line" />
            <h1 className="font-display text-3xl font-bold text-foreground">
              Minha Conta
            </h1>
            <p className="text-muted-foreground mt-1">
              Olá, {user.name.split(" ")[0]}! Gerencie seus agendamentos e dados.
            </p>
          </div>
          <Link href="/agendar">
            <Button className="gap-2 font-semibold">
              <Plus className="w-4 h-4" />
              Novo Agendamento
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Próximos", value: upcoming.length, icon: CalendarDays },
            { label: "Realizados", value: history.filter((a) => a.status === "completed").length, icon: Scissors },
            { label: "Cancelados", value: history.filter((a) => a.status === "cancelled").length, icon: XCircle },
          ].map((stat) => (
            <Card key={stat.label} className="border-border">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="agendamentos">
          <TabsList className="mb-6">
            <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
          </TabsList>

          {/* Agendamentos */}
          <TabsContent value="agendamentos">
            {upcoming.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-xl">
                <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="font-semibold text-foreground mb-1">Nenhum agendamento próximo</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Que tal reservar seu próximo horário?
                </p>
                <Link href="/agendar">
                  <Button size="sm">Agendar agora</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcoming.map((apt) => (
                  <Card key={apt.id} className="border-border">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Scissors className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{apt.serviceName}</h3>
                            <p className="text-muted-foreground text-sm">com {apt.barberName}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <CalendarDays className="w-3 h-3" />
                                {formatDateShort(apt.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {apt.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusClass(apt.status)}`}>
                            {getStatusLabel(apt.status)}
                          </span>
                          <span className="font-bold text-primary">
                            {formatCurrency(apt.servicePrice)}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive text-xs"
                            onClick={() => toast.success("Agendamento cancelado.")}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Histórico */}
          <TabsContent value="historico">
            {history.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-xl">
                <p className="text-muted-foreground">Nenhum histórico encontrado.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((apt) => (
                  <Card key={apt.id} className="border-border opacity-80">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground text-sm">{apt.serviceName}</p>
                          <p className="text-muted-foreground text-xs">
                            {apt.barberName} — {formatDateShort(apt.date)} às {apt.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusClass(apt.status)}`}>
                            {getStatusLabel(apt.status)}
                          </span>
                          <span className="font-semibold text-sm text-foreground">
                            {formatCurrency(apt.servicePrice)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Perfil */}
          <TabsContent value="perfil">
            <Card className="border-border max-w-lg">
              <CardHeader>
                <CardTitle className="font-display text-lg">Dados pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-muted-foreground text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Nome completo</Label>
                  <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>E-mail</Label>
                  <Input value={user.email} disabled className="bg-muted" />
                </div>
                <div className="space-y-1.5">
                  <Label>Telefone</Label>
                  <Input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                </div>
                <Button
                  className="font-semibold"
                  onClick={() => toast.success("Dados atualizados com sucesso!")}
                >
                  Salvar alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
