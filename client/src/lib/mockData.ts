/**
 * mockData.ts — BarberPro
 * Dados simulados para demonstração do sistema
 * Em produção, substituir pelas chamadas reais à API REST
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutos
  price: number;
  category: "corte" | "barba" | "combo" | "tratamento";
  icon: string;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  availableDays: number[]; // 0=dom, 1=seg...
  bio: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  date: string; // ISO date
  time: string; // HH:mm
  status: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
  createdAt: string;
}

export const SERVICES: Service[] = [
  {
    id: "s1",
    name: "Corte Clássico",
    description: "Corte tradicional com tesoura e máquina, acabamento perfeito.",
    duration: 30,
    price: 45,
    category: "corte",
    icon: "✂️",
  },
  {
    id: "s2",
    name: "Corte + Barba",
    description: "Combo completo: corte de cabelo e modelagem de barba.",
    duration: 60,
    price: 75,
    category: "combo",
    icon: "💈",
  },
  {
    id: "s3",
    name: "Barba Completa",
    description: "Modelagem, hidratação e acabamento profissional da barba.",
    duration: 30,
    price: 35,
    category: "barba",
    icon: "🪒",
  },
  {
    id: "s4",
    name: "Corte Degradê",
    description: "Degradê preciso com acabamento de navalha.",
    duration: 45,
    price: 55,
    category: "corte",
    icon: "✂️",
  },
  {
    id: "s5",
    name: "Hidratação Capilar",
    description: "Tratamento profundo para cabelos ressecados.",
    duration: 45,
    price: 60,
    category: "tratamento",
    icon: "💧",
  },
  {
    id: "s6",
    name: "Pacote Premium",
    description: "Corte + Barba + Hidratação + Sobrancelha.",
    duration: 90,
    price: 120,
    category: "combo",
    icon: "⭐",
  },
];

export const BARBERS: Barber[] = [
  {
    id: "b1",
    name: "Rafael Costa",
    specialty: "Degradê & Cortes Modernos",
    rating: 4.9,
    reviewCount: 312,
    avatar: "/images/barbers/rafael-costa.png",
    availableDays: [1, 2, 3, 4, 5, 6],
    bio: "10 anos de experiência em cortes modernos e degradê. Especialista em barba.",
  },
  {
    id: "b2",
    name: "Lucas Ferreira",
    specialty: "Cortes Clássicos & Barba",
    rating: 4.8,
    reviewCount: 248,
    avatar: "/images/barbers/lucas-ferreira.jpg",
    availableDays: [1, 2, 4, 5, 6],
    bio: "Especialista em cortes clássicos e técnicas tradicionais de barbearia.",
  },
  {
    id: "b3",
    name: "Marcos Oliveira",
    specialty: "Tratamentos & Coloração",
    rating: 4.7,
    reviewCount: 189,
    avatar: "/images/barbers/marcos-oliveira.png",
    availableDays: [2, 3, 4, 5, 6],
    bio: "Formado em cosmetologia, especialista em tratamentos capilares e coloração.",
  },
];

export const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30",
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "a1",
    clientId: "2",
    clientName: "João Silva",
    clientPhone: "(11) 98765-4321",
    barberId: "b1",
    barberName: "Rafael Costa",
    serviceId: "s2",
    serviceName: "Corte + Barba",
    servicePrice: 75,
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    time: "10:00",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "a2",
    clientId: "2",
    clientName: "João Silva",
    clientPhone: "(11) 98765-4321",
    barberId: "b2",
    barberName: "Lucas Ferreira",
    serviceId: "s1",
    serviceName: "Corte Clássico",
    servicePrice: 45,
    date: new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0],
    time: "14:30",
    status: "completed",
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: "a3",
    clientId: "3",
    clientName: "Pedro Alves",
    clientPhone: "(11) 97654-3210",
    barberId: "b1",
    barberName: "Rafael Costa",
    serviceId: "s4",
    serviceName: "Corte Degradê",
    servicePrice: 55,
    date: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
    time: "09:00",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "a4",
    clientId: "4",
    clientName: "André Santos",
    clientPhone: "(11) 96543-2109",
    barberId: "b3",
    barberName: "Marcos Oliveira",
    serviceId: "s6",
    serviceName: "Pacote Premium",
    servicePrice: 120,
    date: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
    time: "11:00",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "a5",
    clientId: "5",
    clientName: "Bruno Lima",
    clientPhone: "(11) 95432-1098",
    barberId: "b2",
    barberName: "Lucas Ferreira",
    serviceId: "s3",
    serviceName: "Barba Completa",
    servicePrice: 35,
    date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
    time: "15:00",
    status: "cancelled",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

export const DASHBOARD_STATS = {
  totalAppointmentsToday: 8,
  totalAppointmentsWeek: 42,
  totalRevenuMonth: 3840,
  newClientsMonth: 14,
  occupancyRate: 78,
  avgRating: 4.8,
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function getStatusLabel(status: Appointment["status"]): string {
  const labels = {
    confirmed: "Confirmado",
    pending: "Pendente",
    cancelled: "Cancelado",
    completed: "Concluído",
  };
  return labels[status];
}

export function getStatusClass(status: Appointment["status"]): string {
  const classes = {
    confirmed: "badge-confirmed",
    pending: "badge-pending",
    cancelled: "badge-cancelled",
    completed: "badge-confirmed",
  };
  return classes[status];
}
