/**
 * Clientes.tsx — BarberPro / Tela: admin/clientes
 * Pasta: pages/admin/
 * Design: Warm Minimalism / Modern Craft
 * Endpoints:
 *   GET /api/admin/clients?search=&page=&limit=
 *   GET /api/admin/clients/:id
 *   DELETE /api/admin/clients/:id
 */

import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Users, Phone, Mail, CalendarDays, Trash2 } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalAppointments: number;
  lastVisit: string;
  totalSpent: number;
}

const MOCK_CLIENTS: Client[] = [
  { id: "1", name: "João Silva", email: "joao@email.com", phone: "(11) 98765-4321", totalAppointments: 8, lastVisit: "2026-04-15", totalSpent: 520 },
  { id: "2", name: "Pedro Alves", email: "pedro@email.com", phone: "(11) 97654-3210", totalAppointments: 5, lastVisit: "2026-04-18", totalSpent: 310 },
  { id: "3", name: "André Santos", email: "andre@email.com", phone: "(11) 96543-2109", totalAppointments: 12, lastVisit: "2026-04-20", totalSpent: 890 },
  { id: "4", name: "Bruno Lima", email: "bruno@email.com", phone: "(11) 95432-1098", totalAppointments: 3, lastVisit: "2026-04-10", totalSpent: 165 },
  { id: "5", name: "Carlos Rocha", email: "carlos@email.com", phone: "(11) 94321-0987", totalAppointments: 20, lastVisit: "2026-04-22", totalSpent: 1450 },
  { id: "6", name: "Diego Matos", email: "diego@email.com", phone: "(11) 93210-9876", totalAppointments: 7, lastVisit: "2026-04-12", totalSpent: 420 },
];

export default function Clientes() {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const handleDelete = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    toast.success("Cliente removido.");
  };

  return (
    <AdminLayout
      title="Clientes"
      subtitle={`${clients.length} clientes cadastrados`}
    >
      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, e-mail ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total de Clientes", value: clients.length, icon: Users },
          { label: "Ativos este mês", value: 14, icon: CalendarDays },
          { label: "Receita total", value: `R$ ${clients.reduce((s, c) => s + c.totalSpent, 0).toLocaleString("pt-BR")}`, icon: CalendarDays },
        ].map((stat) => (
          <Card key={stat.label} className="border-border">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Cliente", "Contato", "Visitas", "Última Visita", "Total Gasto", "Ações"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => (
                  <tr key={client.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                          {client.name[0]}
                        </div>
                        <span className="font-medium text-foreground">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-0.5">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="w-3 h-3" />{client.email}
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />{client.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-foreground">{client.totalAppointments}x</td>
                    <td className="px-5 py-4 text-muted-foreground text-xs">
                      {new Date(client.lastVisit).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-5 py-4 font-semibold text-primary">
                      R$ {client.totalSpent.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-5 py-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(client.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
