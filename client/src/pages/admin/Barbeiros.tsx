/**
 * Barbeiros.tsx — BarberPro / Tela: admin/barbeiros
 * Pasta: pages/admin/
 * Design: Warm Minimalism / Modern Craft
 * Endpoints:
 *   GET /api/barbers
 *   POST /api/barbers
 *   PUT /api/barbers/:id
 *   DELETE /api/barbers/:id
 *   GET /api/barbers/:id/schedule
 */

import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BARBERS, Barber } from "@/lib/mockData";
import { toast } from "sonner";
import { Star, Pencil, Trash2, Plus, CalendarDays } from "lucide-react";

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function AdminBarbeiros() {
  const [barbers, setBarbers] = useState<Barber[]>(BARBERS);

  const handleDelete = (id: string) => {
    setBarbers((prev) => prev.filter((b) => b.id !== id));
    toast.success("Barbeiro removido.");
  };

  return (
    <AdminLayout title="Barbeiros" subtitle="Gerencie a equipe da barbearia">
      <div className="flex justify-end mb-6">
        <Button
          className="gap-2 font-semibold"
          onClick={() => toast.info("Funcionalidade em desenvolvimento.")}
        >
          <Plus className="w-4 h-4" />
          Novo Barbeiro
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {barbers.map((barber) => (
          <Card key={barber.id} className="border-border card-hover overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-to-br from-[#3D2B1F] to-[#5a3e2b] p-6 text-center relative">
                <div className="absolute top-3 right-3 flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => toast.info("Edição em desenvolvimento.")}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-white/60 hover:text-red-300 hover:bg-red-500/10"
                    onClick={() => handleDelete(barber.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <img
                  src={barber.avatar}
                  alt={barber.name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-white/20 mb-3"
                />
                <h3 className="font-display text-lg font-bold text-white">{barber.name}</h3>
                <p className="text-white/70 text-xs mt-1">{barber.specialty}</p>
              </div>

              {/* Stats */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold text-sm">{barber.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {barber.reviewCount} avaliações
                  </span>
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed">{barber.bio}</p>

                {/* Available Days */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    Dias de trabalho
                  </p>
                  <div className="flex gap-1">
                    {DAY_NAMES.map((day, i) => (
                      <div
                        key={day}
                        className={`flex-1 py-1 rounded text-center text-xs font-medium ${
                          barber.availableDays.includes(i)
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground/40"
                        }`}
                      >
                        {day[0]}
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 text-xs"
                  onClick={() => toast.info("Agenda em desenvolvimento.")}
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  Ver agenda
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
