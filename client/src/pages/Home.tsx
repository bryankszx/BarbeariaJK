/**
 * Home.tsx — BarberJK
 * Landing Page principal do sistema
 * Design: Warm Minimalism / Modern Craft
 * Sections: Hero, Serviços, Barbeiros, Como Funciona, CTA
 */

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { SERVICES, BARBERS, formatCurrency } from "@/lib/mockData";
import {
  CalendarCheck,
  Clock,
  Star,
  ArrowRight,
  Scissors,
  Shield,
  Smartphone,
} from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663591063520/5zXAcuRoJodhucR5XoFoQf/hero-barber-Y7ktYgENFMBDu9HczT6Dp4.webp";
const TOOLS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663591063520/5zXAcuRoJodhucR5XoFoQf/barber-tools-jLvQVMMhSvJGPx4xMRLDu2.webp";
const SERVICE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663591063520/5zXAcuRoJodhucR5XoFoQf/barber-service-5YYTaxXaExeyRkWtJz3MnY.webp";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Barbearia JK"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D2B1F]/85 via-[#3D2B1F]/60 to-transparent" />
        </div>
        <div className="relative container py-28 lg:py-40">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-px bg-primary" />
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                Barbearia 
              </span>
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Agende seu horário com{" "}
              <span className="text-primary">facilidade</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Escolha o serviço, o barbeiro e o horário ideal para você. Sem
              espera, sem complicação — tudo em poucos cliques.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/agendar">
                <Button size="lg" className="font-semibold gap-2">
                  <CalendarCheck className="w-5 h-5" />
                  Agendar Agora
                </Button>
              </Link>
              <Link href="/servicos">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  Ver Serviços
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[
                { value: "500+", label: "Clientes ativos" },
                { value: "4.9★", label: "Avaliação média" },
                { value: "3", label: "Barbeiros experts" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-white font-display text-2xl font-bold">
                    {stat.value}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Como Funciona ── */}
      <section className="py-20 bg-muted/40">
        <div className="container">
          <div className="text-center mb-14">
            <div className="accent-line mx-auto w-fit" />
            <h2 className="font-display text-3xl font-bold text-foreground">
              Como funciona
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              Agendar na BarberiaJK é simples e rápido. Siga os três passos abaixo.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                step: "01",
                title: "Escolha o serviço",
                desc: "Navegue pelo nosso catálogo de serviços e escolha o que melhor atende você.",
              },
              {
                icon: CalendarCheck,
                step: "02",
                title: "Selecione data e horário",
                desc: "Veja a disponibilidade em tempo real e escolha o horário mais conveniente.",
              },
              {
                icon: Shield,
                step: "03",
                title: "Confirmação instantânea",
                desc: "Receba a confirmação do seu agendamento e apareça na hora marcada.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-card rounded-xl p-8 border border-border card-hover"
              >
                <span className="absolute top-6 right-6 font-display text-5xl font-bold text-muted/40">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Serviços ── */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="accent-line" />
              <h2 className="font-display text-3xl font-bold text-foreground">
                Nossos serviços
              </h2>
              <p className="text-muted-foreground mt-2">
                Qualidade e precisão em cada atendimento.
              </p>
            </div>
            <Link href="/servicos">
              <Button variant="ghost" className="gap-1 text-primary font-medium">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 6).map((service) => (
              <Card key={service.id} className="card-hover border-border overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                      {service.icon}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full capitalize">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-1">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary font-bold text-lg">
                        {formatCurrency(service.price)}
                      </p>
                      <p className="text-muted-foreground text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.duration} min
                      </p>
                    </div>
                    <Link href="/agendar">
                      <Button size="sm" variant="outline" className="font-medium">
                        Agendar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Barbeiros ── */}
      <section className="py-20 bg-muted/40">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="accent-line" />
              <h2 className="font-display text-3xl font-bold text-foreground">
                Nossa equipe
              </h2>
              <p className="text-muted-foreground mt-2">
                Profissionais experientes e apaixonados pelo que fazem.
              </p>
            </div>
            <Link href="/barbeiros">
              <Button variant="ghost" className="gap-1 text-primary font-medium">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BARBERS.map((barber) => (
              <Card key={barber.id} className="card-hover border-border overflow-hidden">
                <CardContent className="p-6 text-center">
                  <img
                    src={barber.avatar}
                    alt={barber.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-primary/20"
                  />
                  <h3 className="font-display font-bold text-foreground text-lg">
                    {barber.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {barber.specialty}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold text-sm">{barber.rating}</span>
                    <span className="text-muted-foreground text-xs">
                      ({barber.reviewCount} avaliações)
                    </span>
                  </div>
                  <Link href="/agendar">
                    <Button size="sm" className="w-full font-medium">
                      Agendar com {barber.name.split(" ")[0]}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Split Section ── */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={TOOLS_IMG}
                alt="Ferramentas de barbearia"
                className="rounded-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-white rounded-xl p-4 shadow-lg">
                <p className="font-display text-3xl font-bold">10+</p>
                <p className="text-xs text-white/80">Anos de experiência</p>
              </div>
            </div>
            <div>
              <div className="accent-line" />
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Tradição e modernidade em cada corte
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Na BarberPro, combinamos as técnicas tradicionais da barbearia clássica
                com as tendências contemporâneas. Cada detalhe é pensado para oferecer
                a melhor experiência ao cliente.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Produtos premium de higiene e cuidado",
                  "Ambiente climatizado e confortável",
                  "Agendamento online 24 horas",
                  "Profissionais certificados",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <Scissors className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/agendar">
                <Button className="font-semibold gap-2">
                  <CalendarCheck className="w-4 h-4" />
                  Reservar meu horário
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-[#3D2B1F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={SERVICE_IMG}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Pronto para um novo visual?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
            Agende agora e garanta seu horário com os melhores barbeiros da cidade.
          </p>
          <Link href="/agendar">
            <Button size="lg" className="font-semibold gap-2">
              <CalendarCheck className="w-5 h-5" />
              Agendar Agora — É Grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-card border-t border-border py-10">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                  <Scissors className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-display font-bold text-lg">
                  Barber<span className="text-primary">Pro</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A barbearia premium que você merece, com agendamento fácil e rápido.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Serviços</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Corte Clássico</li>
                <li>Corte + Barba</li>
                <li>Barba Completa</li>
                <li>Pacote Premium</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-primary">Início</Link></li>
                <li><Link href="/servicos" className="text-muted-foreground hover:text-primary">Serviços</Link></li>
                <li><Link href="/barbeiros" className="text-muted-foreground hover:text-primary">Barbeiros</Link></li>
                <li><Link href="/agendar" className="text-muted-foreground hover:text-primary">Agendar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Rua das Flores, 123</li>
                <li>São Paulo — SP</li>
                <li>(11) 99999-0001</li>
                <li>contato@barberpro.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} BarberPro. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
