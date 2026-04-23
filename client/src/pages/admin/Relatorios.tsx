/**
 * Relatorios.tsx — BarberPro / Tela: admin/relatorios
 * Pasta: pages/admin/
 * Design: Warm Minimalism / Modern Craft
 * Endpoints:
 *   GET /api/admin/reports/revenue?period=month&year=2026
 *   GET /api/admin/reports/services?period=month
 *   GET /api/admin/reports/barbers?period=month
 */

import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/mockData";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid,
} from "recharts";

const REVENUE_DATA = [
  { month: "Nov/25", receita: 2900 },
  { month: "Dez/25", receita: 3400 },
  { month: "Jan/26", receita: 3200 },
  { month: "Fev/26", receita: 3800 },
  { month: "Mar/26", receita: 3500 },
  { month: "Abr/26", receita: 3840 },
];

const SERVICES_DATA = [
  { name: "Corte + Barba", value: 38 },
  { name: "Corte Clássico", value: 28 },
  { name: "Barba Completa", value: 16 },
  { name: "Corte Degradê", value: 12 },
  { name: "Outros", value: 6 },
];

const BARBERS_DATA = [
  { name: "Rafael", agendamentos: 42, receita: 1820 },
  { name: "Lucas", agendamentos: 35, receita: 1540 },
  { name: "Marcos", agendamentos: 28, receita: 1260 },
];

const PIE_COLORS = [
  "oklch(0.62 0.15 50)",
  "oklch(0.72 0.12 55)",
  "oklch(0.45 0.10 45)",
  "oklch(0.82 0.08 60)",
  "oklch(0.55 0.02 65)",
];

export default function Relatorios() {
  const totalRevenue = REVENUE_DATA.reduce((s, d) => s + d.receita, 0);
  const avgMonthly = totalRevenue / REVENUE_DATA.length;

  return (
    <AdminLayout title="Relatórios" subtitle="Análise de desempenho e receita">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Receita Total (6 meses)", value: formatCurrency(totalRevenue) },
          { label: "Média Mensal", value: formatCurrency(avgMonthly) },
          { label: "Melhor Mês", value: "Abr/26" },
          { label: "Crescimento", value: "+18%" },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-border">
            <CardContent className="p-5">
              <p className="text-muted-foreground text-xs mb-1">{kpi.label}</p>
              <p className="font-display text-xl font-bold text-foreground">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base font-bold">
              Receita Mensal (R$)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
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
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base font-bold">
              Serviços Mais Populares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={SERVICES_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {SERVICES_DATA.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
                  formatter={(v: number) => [`${v}%`, "Participação"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Barbers Performance */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base font-bold">
            Desempenho por Barbeiro (mês atual)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={BARBERS_DATA} barSize={32}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
                <Bar dataKey="agendamentos" name="Agendamentos" fill="oklch(0.62 0.15 50)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="space-y-4">
              {BARBERS_DATA.map((b, i) => (
                <div key={b.name} className="flex items-center gap-4">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: PIE_COLORS[i] }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-foreground">{b.name}</span>
                      <span className="text-muted-foreground">{b.agendamentos} atend.</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(b.agendamentos / 42) * 100}%`,
                          backgroundColor: PIE_COLORS[i],
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatCurrency(b.receita)} em receita
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
