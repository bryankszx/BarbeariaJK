/**
 * Dashboard.tsx — BarberPro / Tela: admin/dashboard
 * Pasta: pages/admin/
 * Design: Warm Minimalism / Modern Craft
 * Endpoints:
 *   GET /api/admin/stats
 *   GET /api/appointments?date=today
 *   GET /api/admin/revenue?period=month
 */

import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MOCK_APPOINTMENTS,
  DASHBOARD_STATS,
  formatCurrency,
  formatDateShort,
  getStatusLabel,
  getStatusClass,
} from "@/lib/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  CalendarDays,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";

const WEEKLY_DATA = [
  { day: "Seg", agendamentos: 6, receita: 320 },
  { day: "Ter", agendamentos: 8, receita: 440 },
  { day: "Qua", agendamentos: 5, receita: 280 },
  { day: "Qui", agendamentos: 9, receita: 510 },
  { day: "Sex", agendamentos: 12, receita: 680 },
  { day: "Sáb", agendamentos: 15, receita: 850 },
  { day: "Dom", agendamentos: 0, receita: 0 },
];

const MONTHLY_DATA = [
  { month: "Jan", receita: 3200 },
  { month: "Fev", receita: 3800 },
  { month: "Mar", receita: 3500 },
  { month: "Abr", receita: 4200 },
  { month: "Mai", receita: 3840 },
];

const STAT_CARDS = [
  {
    title: "Agendamentos Hoje",
    value: DASHBOARD_STATS.totalAppointmentsToday,
    icon: CalendarDays,
    change: "+12%",
    positive: true,
  },
  {
    title: "Receita do Mês",
    value: formatCurrency(DASHBOARD_STATS.totalRevenuMonth),
    icon: DollarSign,
    change: "+8%",
    positive: true,
  },
  {
    title: "Novos Clientes",
    value: DASHBOARD_STATS.newClientsMonth,
    icon: Users,
    change: "+5%",
    positive: true,
  },
  {
    title: "Taxa de Ocupação",
    value: `${DASHBOARD_STATS.occupancyRate}%`,
    icon: TrendingUp,
    change: "+3%",
    positive: true,
  },
];

const todayStr = new Date().toISOString().split("T")[0];
const todayAppointments = MOCK_APPOINTMENTS.filter((a) => a.date >= todayStr).slice(0, 5);

export default function Dashboard() {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle={`Visão geral — ${new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}`}
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    stat.positive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-xs mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base font-bold">
              Agendamentos por dia (semana)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={WEEKLY_DATA} barSize={28}>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
                />
                <Bar dataKey="agendamentos" fill="oklch(0.62 0.15 50)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base font-bold">
              Receita mensal (R$)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={MONTHLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
                  formatter={(v: number) => [formatCurrency(v), "Receita"]}
                />
                <Line
                  type="monotone"
                  dataKey="receita"
                  stroke="oklch(0.62 0.15 50)"
                  strokeWidth={2.5}
                  dot={{ fill: "oklch(0.62 0.15 50)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Próximos Agendamentos */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="font-display text-base font-bold">
              Próximos Agendamentos
            </CardTitle>
            <Link href="/admin/agendamentos">
              <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary">
                Ver todos <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {apt.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {apt.serviceName} — {apt.barberName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        {formatDateShort(apt.date)}
                      </p>
                      <p className="text-xs text-muted-foreground">{apt.time}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusClass(apt.status)}`}>
                      {getStatusLabel(apt.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base font-bold">
              Resumo Rápido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-primary" />
                Avaliação média
              </div>
              <span className="font-bold text-foreground">{DASHBOARD_STATS.avgRating}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4 text-primary" />
                Agendamentos na semana
              </div>
              <span className="font-bold text-foreground">{DASHBOARD_STATS.totalAppointmentsWeek}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                Taxa de ocupação
              </div>
              <span className="font-bold text-foreground">{DASHBOARD_STATS.occupancyRate}%</span>
            </div>

            {/* Occupancy Bar */}
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Ocupação hoje</span>
                <span>{DASHBOARD_STATS.occupancyRate}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${DASHBOARD_STATS.occupancyRate}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Ações rápidas</p>
              <div className="space-y-2">
                <Link href="/admin/agendamentos">
                  <Button variant="outline" size="sm" className="w-full text-xs justify-start gap-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    Ver agendamentos
                  </Button>
                </Link>
                <Link href="/agendar">
                  <Button size="sm" className="w-full text-xs justify-start gap-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    Novo agendamento
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
