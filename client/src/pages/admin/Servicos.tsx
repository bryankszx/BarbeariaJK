/**
 * Servicos.tsx — BarberPro / Tela: admin/servicos
 * Pasta: pages/admin/
 * Design: Warm Minimalism / Modern Craft
 * Endpoints:
 *   GET /api/services
 *   POST /api/services
 *   PUT /api/services/:id
 *   DELETE /api/services/:id
 */

import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SERVICES, Service, formatCurrency } from "@/lib/mockData";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Clock } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

type ServiceForm = Omit<Service, "id">;

export default function AdminServicos() {
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<ServiceForm>();

  const openCreate = () => {
    setEditing(null);
    reset({ name: "", description: "", duration: 30, price: 0, category: "corte", icon: "✂️" });
    setOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    reset({ name: s.name, description: s.description, duration: s.duration, price: s.price, category: s.category, icon: s.icon });
    setOpen(true);
  };

  const onSubmit = (data: ServiceForm) => {
    if (editing) {
      setServices((prev) => prev.map((s) => s.id === editing.id ? { ...editing, ...data } : s));
      toast.success("Serviço atualizado!");
    } else {
      setServices((prev) => [...prev, { ...data, id: `s${Date.now()}` }]);
      toast.success("Serviço criado!");
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.success("Serviço removido.");
  };

  return (
    <AdminLayout title="Serviços" subtitle="Gerencie o catálogo de serviços">
      <div className="flex justify-end mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2 font-semibold">
              <Plus className="w-4 h-4" />
              Novo Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">
                {editing ? "Editar Serviço" : "Novo Serviço"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Nome</Label>
                  <Input {...register("name", { required: true })} placeholder="Nome do serviço" className={errors.name ? "border-destructive" : ""} />
                </div>
                <div className="space-y-1.5">
                  <Label>Ícone</Label>
                  <Input {...register("icon")} placeholder="✂️" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Descrição</Label>
                <Textarea {...register("description")} placeholder="Descrição do serviço" rows={2} className="resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>Preço (R$)</Label>
                  <Input type="number" step="0.01" {...register("price", { required: true, min: 0, valueAsNumber: true })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Duração (min)</Label>
                  <Input type="number" {...register("duration", { required: true, min: 5, valueAsNumber: true })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Categoria</Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corte">Corte</SelectItem>
                          <SelectItem value="barba">Barba</SelectItem>
                          <SelectItem value="combo">Combo</SelectItem>
                          <SelectItem value="tratamento">Tratamento</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" className="font-semibold">
                  {editing ? "Salvar" : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <Card key={s.id} className="border-border card-hover">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                  {s.icon}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => openEdit(s)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" onClick={() => handleDelete(s.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <h3 className="font-display font-bold text-foreground mb-1">{s.name}</h3>
              <p className="text-muted-foreground text-xs mb-3 leading-relaxed">{s.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-primary font-bold">{formatCurrency(s.price)}</span>
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />{s.duration} min
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
