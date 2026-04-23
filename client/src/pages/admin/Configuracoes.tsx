/**
 * Configuracoes.tsx — BarberPro / Tela: admin/configuracoes
 * Pasta: pages/admin/
 * Design: Warm Minimalism / Modern Craft
 * Endpoints:
 *   GET /api/admin/settings
 *   PUT /api/admin/settings
 *   PUT /api/admin/settings/hours
 *   PUT /api/admin/settings/notifications
 */

import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, Clock, Bell, Store } from "lucide-react";

const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

export default function Configuracoes() {
  const [barbershopName, setBarbershopName] = useState("BarberPro");
  const [phone, setPhone] = useState("(11) 99999-0001");
  const [address, setAddress] = useState("Rua das Flores, 123 — São Paulo, SP");
  const [email, setEmail] = useState("contato@barberpro.com");
  const [slotDuration, setSlotDuration] = useState(30);

  const [hours, setHours] = useState(
    DAYS.map((day, i) => ({
      day,
      open: i < 6,
      start: "08:00",
      end: "19:00",
    }))
  );

  const [notifications, setNotifications] = useState({
    emailConfirmation: true,
    emailReminder: true,
    smsReminder: false,
    whatsappReminder: true,
  });

  const handleHourChange = (idx: number, field: string, value: string | boolean) => {
    setHours((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, [field]: value } : h))
    );
  };

  return (
    <AdminLayout title="Configurações" subtitle="Gerencie as configurações da barbearia">
      <Tabs defaultValue="geral">
        <TabsList className="mb-6">
          <TabsTrigger value="geral" className="gap-2">
            <Store className="w-3.5 h-3.5" /> Geral
          </TabsTrigger>
          <TabsTrigger value="horarios" className="gap-2">
            <Clock className="w-3.5 h-3.5" /> Horários
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-2">
            <Bell className="w-3.5 h-3.5" /> Notificações
          </TabsTrigger>
        </TabsList>

        {/* Geral */}
        <TabsContent value="geral">
          <Card className="border-border max-w-xl">
            <CardHeader>
              <CardTitle className="font-display text-base">Dados da Barbearia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Nome da Barbearia</Label>
                <Input value={barbershopName} onChange={(e) => setBarbershopName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Telefone / WhatsApp</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>E-mail de contato</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Endereço</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Duração padrão do slot (minutos)</Label>
                <Input
                  type="number"
                  min={15}
                  step={15}
                  value={slotDuration}
                  onChange={(e) => setSlotDuration(Number(e.target.value))}
                  className="max-w-32"
                />
              </div>
              <Button
                className="gap-2 font-semibold"
                onClick={() => toast.success("Configurações salvas!")}
              >
                <Save className="w-4 h-4" />
                Salvar alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Horários */}
        <TabsContent value="horarios">
          <Card className="border-border max-w-xl">
            <CardHeader>
              <CardTitle className="font-display text-base">Horário de Funcionamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hours.map((h, i) => (
                <div key={h.day} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2 w-28">
                    <Switch
                      checked={h.open}
                      onCheckedChange={(v) => handleHourChange(i, "open", v)}
                    />
                    <span className={`text-sm font-medium ${h.open ? "text-foreground" : "text-muted-foreground"}`}>
                      {h.day}
                    </span>
                  </div>
                  {h.open ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="time"
                        value={h.start}
                        onChange={(e) => handleHourChange(i, "start", e.target.value)}
                        className="w-28 text-sm"
                      />
                      <span className="text-muted-foreground text-sm">até</span>
                      <Input
                        type="time"
                        value={h.end}
                        onChange={(e) => handleHourChange(i, "end", e.target.value)}
                        className="w-28 text-sm"
                      />
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Fechado</span>
                  )}
                </div>
              ))}
              <Button
                className="gap-2 font-semibold mt-2"
                onClick={() => toast.success("Horários salvos!")}
              >
                <Save className="w-4 h-4" />
                Salvar horários
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notificacoes">
          <Card className="border-border max-w-xl">
            <CardHeader>
              <CardTitle className="font-display text-base">Configurações de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { key: "emailConfirmation", label: "E-mail de confirmação", desc: "Enviar e-mail ao confirmar agendamento" },
                { key: "emailReminder", label: "Lembrete por e-mail", desc: "Enviar lembrete 24h antes do horário" },
                { key: "smsReminder", label: "Lembrete por SMS", desc: "Enviar SMS 2h antes do horário" },
                { key: "whatsappReminder", label: "Lembrete por WhatsApp", desc: "Enviar mensagem WhatsApp 1h antes" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(v) =>
                      setNotifications((prev) => ({ ...prev, [item.key]: v }))
                    }
                  />
                </div>
              ))}
              <Button
                className="gap-2 font-semibold"
                onClick={() => toast.success("Notificações configuradas!")}
              >
                <Save className="w-4 h-4" />
                Salvar configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
