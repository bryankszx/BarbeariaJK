/**
 * Agendar.tsx — BarberPro / Tela: agendar
 * Pasta: pages/agendar/
 * Design: Warm Minimalism / Modern Craft
 * Endpoints:
 *   GET /api/services
 *   GET /api/barbers
 *   GET /api/barbers/:id/availability?date=YYYY-MM-DD
 *   POST /api/appointments
 */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { SERVICES, BARBERS, TIME_SLOTS, formatCurrency } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  Star,
  ChevronRight,
  ChevronLeft,
  CalendarDays,
  Loader2,
} from "lucide-react";

const STEPS = ["Serviço", "Barbeiro", "Data & Hora", "Confirmação"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

export default function Agendar() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const { user } = useAuth();
  const [, navigate] = useLocation();

  const service = SERVICES.find((s) => s.id === selectedService);
  const barber = BARBERS.find((b) => b.id === selectedBarber);

  const handleConfirm = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para agendar.");
      navigate("/login");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    toast.success("Agendamento confirmado com sucesso!");
  };

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const isDateAvailable = (day: number) => {
    const date = new Date(calYear, calMonth, day);
    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return false;
    if (!barber) return true;
    return barber.availableDays.includes(date.getDay());
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <PublicNavbar />
        <div className="container py-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">
            Agendamento Confirmado!
          </h1>
          <p className="text-muted-foreground mb-2">
            Seu horário foi reservado com sucesso.
          </p>
          <div className="bg-card border border-border rounded-xl p-6 mt-6 text-left max-w-sm w-full space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Serviço</span>
              <span className="font-medium">{service?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Barbeiro</span>
              <span className="font-medium">{barber?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Data</span>
              <span className="font-medium">
                {selectedDate && new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Horário</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-border pt-3">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-primary">{formatCurrency(service?.price || 0)}</span>
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <Link href="/minha-conta">
              <Button variant="outline">Meus agendamentos</Button>
            </Link>
            <Button onClick={() => { setSuccess(false); setStep(0); setSelectedService(null); setSelectedBarber(null); setSelectedDate(null); setSelectedTime(null); }}>
              Novo agendamento
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      <div className="container py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="accent-line" />
          <h1 className="font-display text-3xl font-bold text-foreground">
            Agendar horário
          </h1>
          <p className="text-muted-foreground mt-1">
            Siga os passos abaixo para reservar seu atendimento.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center shrink-0">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    i < step
                      ? "bg-primary text-white"
                      : i === step
                      ? "bg-primary text-white ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-sm font-medium ${
                    i === step ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-px mx-3 ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0 — Serviço */}
        {step === 0 && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-5">
              Escolha o serviço
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={`text-left p-5 rounded-xl border-2 transition-all card-hover ${
                    selectedService === s.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{s.icon}</span>
                    {selectedService === s.id && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-1">{s.name}</h3>
                  <p className="text-muted-foreground text-xs mb-3 leading-relaxed">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">{formatCurrency(s.price)}</span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />{s.duration} min
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button
                disabled={!selectedService}
                onClick={() => setStep(1)}
                className="gap-2 font-semibold"
              >
                Próximo <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 1 — Barbeiro */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-5">
              Escolha o barbeiro
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {BARBERS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBarber(b.id)}
                  className={`text-left p-6 rounded-xl border-2 transition-all card-hover ${
                    selectedBarber === b.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <img
                      src={b.avatar}
                      alt={b.name}
                      className="w-14 h-14 rounded-full border-2 border-primary/20"
                    />
                    {selectedBarber === b.id && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <h3 className="font-display font-bold text-foreground">{b.name}</h3>
                  <p className="text-muted-foreground text-xs mb-2">{b.specialty}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                    <span className="text-sm font-semibold">{b.rating}</span>
                    <span className="text-muted-foreground text-xs">({b.reviewCount})</span>
                  </div>
                  <p className="text-muted-foreground text-xs mt-2 leading-relaxed">{b.bio}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(0)} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Voltar
              </Button>
              <Button disabled={!selectedBarber} onClick={() => setStep(2)} className="gap-2 font-semibold">
                Próximo <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 — Data & Hora */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-5">
              Escolha data e horário
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => {
                      if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
                      else setCalMonth(calMonth - 1);
                    }}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <h3 className="font-display font-semibold text-foreground">
                    {MONTH_NAMES[calMonth]} {calYear}
                  </h3>
                  <button
                    onClick={() => {
                      if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
                      else setCalMonth(calMonth + 1);
                    }}
                    className="p-1.5 rounded-md hover:bg-muted transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {["D","S","T","Q","Q","S","S"].map((d, i) => (
                    <div key={i} className="text-xs font-semibold text-muted-foreground py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const available = isDateAvailable(day);
                    const selected = selectedDate === dateStr;
                    return (
                      <button
                        key={day}
                        disabled={!available}
                        onClick={() => { setSelectedDate(dateStr); setSelectedTime(null); }}
                        className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                          selected
                            ? "bg-primary text-white"
                            : available
                            ? "hover:bg-primary/10 text-foreground"
                            : "text-muted-foreground/40 cursor-not-allowed"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground text-sm">
                    {selectedDate
                      ? new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR", {
                          weekday: "long", day: "2-digit", month: "long",
                        })
                      : "Selecione uma data"}
                  </h3>
                </div>
                {selectedDate ? (
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((time) => {
                      const occupied = ["10:00", "14:00", "16:30"].includes(time);
                      return (
                        <button
                          key={time}
                          disabled={occupied}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                            selectedTime === time
                              ? "bg-primary text-white border-primary"
                              : occupied
                              ? "bg-muted text-muted-foreground/50 border-border cursor-not-allowed line-through"
                              : "border-border hover:border-primary hover:text-primary"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 bg-muted/40 rounded-xl">
                    <p className="text-muted-foreground text-sm">
                      Selecione uma data para ver os horários
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Voltar
              </Button>
              <Button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                className="gap-2 font-semibold"
              >
                Próximo <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 — Confirmação */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-5">
              Confirmar agendamento
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-foreground border-b border-border pb-3">
                  Resumo do pedido
                </h3>
                {[
                  { label: "Serviço", value: service?.name },
                  { label: "Duração", value: `${service?.duration} minutos` },
                  { label: "Barbeiro", value: barber?.name },
                  {
                    label: "Data",
                    value: selectedDate && new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR", {
                      weekday: "long", day: "2-digit", month: "long", year: "numeric",
                    }),
                  },
                  { label: "Horário", value: selectedTime },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm border-t border-border pt-4">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-primary text-lg">
                    {formatCurrency(service?.price || 0)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {!user && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-amber-800 text-sm font-medium mb-2">
                      Você precisa estar logado para confirmar.
                    </p>
                    <Link href="/login">
                      <Button size="sm" variant="outline" className="border-amber-300 text-amber-800">
                        Fazer login
                      </Button>
                    </Link>
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Observações (opcional)
                  </label>
                  <Textarea
                    placeholder="Alguma preferência ou informação adicional..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Voltar
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading || !user}
                className="gap-2 font-semibold"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <CheckCircle2 className="w-4 h-4" />
                Confirmar Agendamento
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
