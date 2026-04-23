/**
 * Agendamentos.tsx — BarberPro / Tela: admin/agendamentos
 * Pasta: pages/admin/
 * Design: Warm Minimalism / Modern Craft
 * Endpoints:
 *   GET /api/admin/appointments?status=&date=&barberId=
 *   PATCH /api/appointments/:id/status
 *   DELETE /api/appointments/:id
 */

import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MOCK_APPOINTMENTS,
  formatCurrency,
  formatDateShort,
  getStatusLabel,
  getStatusClass,
  Appointment,
} from "@/lib/mockData";
import { toast } from "sonner";
import { Search, Filter, CheckCircle2, XCircle, Eye } from "lucide-react";

export default function Agendamentos() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  const filtered = appointments.filter((a) => {
    const matchSearch =
      a.clientName.toLowerCase().includes(search.toLowerCase()) ||
      a.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      a.barberName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    toast.success(`Status atualizado para "${getStatusLabel(status)}".`);
  };

  return (
    <AdminLayout
      title="Agendamentos"
      subtitle="Gerencie todos os agendamentos da barbearia"
    >
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente, serviço ou barbeiro..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="confirmed">Confirmado</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="completed">Concluído</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Badges */}
      <div className="flex flex-wrap gap-3 mb-5">
        {[
          { label: "Total", count: appointments.length, color: "bg-muted text-muted-foreground" },
          { label: "Confirmados", count: appointments.filter((a) => a.status === "confirmed").length, color: "badge-confirmed" },
          { label: "Pendentes", count: appointments.filter((a) => a.status === "pending").length, color: "badge-pending" },
          { label: "Cancelados", count: appointments.filter((a) => a.status === "cancelled").length, color: "badge-cancelled" },
        ].map((item) => (
          <span key={item.label} className={`text-xs font-medium px-3 py-1.5 rounded-full ${item.color}`}>
            {item.label}: {item.count}
          </span>
        ))}
      </div>

      {/* Table */}
      <Card className="border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Cliente
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Serviço
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Barbeiro
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Data / Hora
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Valor
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-muted-foreground">
                      Nenhum agendamento encontrado.
                    </td>
                  </tr>
                ) : (
                  filtered.map((apt) => (
                    <tr
                      key={apt.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-foreground">{apt.clientName}</p>
                        <p className="text-xs text-muted-foreground">{apt.clientPhone}</p>
                      </td>
                      <td className="px-5 py-4 text-foreground">{apt.serviceName}</td>
                      <td className="px-5 py-4 text-foreground">{apt.barberName}</td>
                      <td className="px-5 py-4">
                        <p className="text-foreground">{formatDateShort(apt.date)}</p>
                        <p className="text-xs text-muted-foreground">{apt.time}</p>
                      </td>
                      <td className="px-5 py-4 font-semibold text-primary">
                        {formatCurrency(apt.servicePrice)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusClass(apt.status)}`}>
                          {getStatusLabel(apt.status)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {apt.status === "pending" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleStatusChange(apt.id, "confirmed")}
                              title="Confirmar"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                          )}
                          {(apt.status === "confirmed" || apt.status === "pending") && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleStatusChange(apt.id, "cancelled")}
                              title="Cancelar"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          )}
                          {apt.status === "confirmed" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-primary hover:bg-primary/10"
                              onClick={() => handleStatusChange(apt.id, "completed")}
                              title="Marcar como concluído"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
