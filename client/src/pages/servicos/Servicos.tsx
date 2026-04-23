/**
 * Servicos.tsx — BarberPro / Tela: servicos
 * Pasta: pages/servicos/
 * Design: Warm Minimalism / Modern Craft
 * Endpoint: GET /api/services
 */

import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { SERVICES, formatCurrency } from "@/lib/mockData";
import { Clock, ArrowRight } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "corte", label: "Cortes" },
  { id: "barba", label: "Barba" },
  { id: "combo", label: "Combos" },
  { id: "tratamento", label: "Tratamentos" },
];

const TOOLS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663591063520/5zXAcuRoJodhucR5XoFoQf/barber-tools-jLvQVMMhSvJGPx4xMRLDu2.webp";

export default function Servicos() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Page Header */}
      <section className="relative bg-[#3D2B1F] py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={TOOLS_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container text-center">
          <div className="w-8 h-px bg-primary mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold text-white mb-3">
            Nossos Serviços
          </h1>
          <p className="text-white/70 max-w-md mx-auto">
            Qualidade e precisão em cada atendimento. Escolha o serviço ideal para você.
          </p>
        </div>
      </section>

      <div className="container py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <Card key={service.id} className="card-hover border-border overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                    {service.icon}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full capitalize">
                    {service.category}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-primary font-bold text-xl">
                      {formatCurrency(service.price)}
                    </p>
                    <p className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {service.duration} minutos
                    </p>
                  </div>
                  <Link href="/agendar">
                    <Button size="sm" className="gap-1 font-medium">
                      Agendar <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-muted/40 rounded-2xl py-12 px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">
            Não encontrou o que procura?
          </h2>
          <p className="text-muted-foreground mb-6">
            Entre em contato conosco e veja como podemos te ajudar.
          </p>
          <Link href="/agendar">
            <Button size="lg" className="font-semibold">
              Agendar Agora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
