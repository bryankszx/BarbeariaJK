/**
 * Barbeiros.tsx — BarberPro / Tela: barbeiros
 * Pasta: pages/barbeiros/
 * Design: Warm Minimalism / Modern Craft
 * Endpoint: GET /api/barbers
 */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { BARBERS } from "@/lib/mockData";
import { Star, CalendarCheck } from "lucide-react";

const SERVICE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663591063520/5zXAcuRoJodhucR5XoFoQf/barber-service-5YYTaxXaExeyRkWtJz3MnY.webp";

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function Barbeiros() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* Page Header */}
      <section className="relative bg-[#3D2B1F] py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={SERVICE_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container text-center">
          <div className="w-8 h-px bg-primary mx-auto mb-4" />
          <h1 className="font-display text-4xl font-bold text-white mb-3">
            Nossa Equipe
          </h1>
          <p className="text-white/70 max-w-md mx-auto">
            Profissionais experientes e apaixonados pela arte da barbearia.
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {BARBERS.map((barber) => (
            <Card key={barber.id} className="card-hover border-border overflow-hidden">
              <CardContent className="p-0">
                {/* Avatar Header */}
                <div className="bg-gradient-to-br from-[#3D2B1F] to-[#5a3e2b] p-8 text-center">
                  <img
                    src={barber.avatar}
                    alt={barber.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white/20 mb-4"
                  />
                  <h3 className="font-display text-xl font-bold text-white">
                    {barber.name}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">{barber.specialty}</p>
                </div>

                {/* Details */}
                <div className="p-6 space-y-5">
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(barber.rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-sm font-semibold text-foreground">
                      {barber.rating}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      ({barber.reviewCount} avaliações)
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground text-sm leading-relaxed text-center">
                    {barber.bio}
                  </p>

                  {/* Available Days */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 text-center">
                      Dias disponíveis
                    </p>
                    <div className="flex justify-center gap-1.5">
                      {DAY_NAMES.map((day, i) => (
                        <div
                          key={day}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
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

                  <Link href="/agendar" className="block">
                    <Button className="w-full gap-2 font-semibold">
                      <CalendarCheck className="w-4 h-4" />
                      Agendar com {barber.name.split(" ")[0]}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
