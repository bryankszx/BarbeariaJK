# BarberPro — Sistema de Agendamento Online para Barbearia

> Sistema completo de agendamento online para barbearia, com área do cliente, painel administrativo e documentação de API REST.

---

## Visão Geral

O **BarberPro** é um sistema web de agendamento online desenvolvido em React + TypeScript, com design **Warm Minimalism / Modern Craft** — paleta de tons quentes (creme, marrom, âmbar), tipografia expressiva (Lora + Nunito Sans) e micro-interações elegantes.

---

## Estrutura de Pastas

Cada tela possui sua própria pasta com os arquivos organizados por responsabilidade:

```
barbearia-agendamento/
├── client/
│   ├── index.html                    # HTML principal (entry point)
│   └── src/
│       ├── App.tsx                   # Roteamento principal
│       ├── index.css                 # CSS global + tokens de design
│       ├── main.tsx                  # Entry point React
│       │
│       ├── pages/
│       │   ├── Home.tsx              # Landing Page
│       │   │
│       │   ├── login/
│       │   │   └── Login.tsx         # Tela de Login
│       │   │
│       │   ├── cadastro/
│       │   │   └── Cadastro.tsx      # Tela de Cadastro
│       │   │
│       │   ├── servicos/
│       │   │   └── Servicos.tsx      # Catálogo de Serviços
│       │   │
│       │   ├── barbeiros/
│       │   │   └── Barbeiros.tsx     # Equipe de Barbeiros
│       │   │
│       │   ├── agendar/
│       │   │   └── Agendar.tsx       # Fluxo de Agendamento (4 etapas)
│       │   │
│       │   ├── minha-conta/
│       │   │   └── MinhaConta.tsx    # Área do Cliente
│       │   │
│       │   └── admin/
│       │       ├── Dashboard.tsx     # Dashboard Administrativo
│       │       ├── Agendamentos.tsx  # Gerenciamento de Agendamentos
│       │       ├── Clientes.tsx      # Gerenciamento de Clientes
│       │       ├── Servicos.tsx      # CRUD de Serviços
│       │       ├── Barbeiros.tsx     # Gerenciamento de Barbeiros
│       │       ├── Relatorios.tsx    # Relatórios e Métricas
│       │       └── Configuracoes.tsx # Configurações do Sistema
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── PublicNavbar.tsx  # Navbar pública
│       │   │   ├── AdminSidebar.tsx  # Sidebar do painel admin
│       │   │   └── AdminLayout.tsx   # Layout wrapper do admin
│       │   └── ui/                   # Componentes shadcn/ui
│       │
│       ├── contexts/
│       │   ├── AuthContext.tsx       # Contexto de autenticação
│       │   └── ThemeContext.tsx      # Contexto de tema
│       │
│       └── lib/
│           ├── mockData.ts           # Dados mock + utilitários
│           └── utils.ts              # Funções utilitárias
│
├── API_ENDPOINTS.md                  # Documentação completa da API REST
├── README.md                         # Este arquivo
└── package.json
```

---

## Telas do Sistema

### Área Pública (Cliente)

| Tela           | Rota            | Pasta                   | Descrição                                      |
|----------------|-----------------|-------------------------|------------------------------------------------|
| Landing Page   | `/`             | `pages/`                | Hero, serviços, barbeiros, CTA                 |
| Login          | `/login`        | `pages/login/`          | Autenticação com e-mail e senha                |
| Cadastro       | `/cadastro`     | `pages/cadastro/`       | Criação de conta de cliente                    |
| Serviços       | `/servicos`     | `pages/servicos/`       | Catálogo com filtro por categoria              |
| Barbeiros      | `/barbeiros`    | `pages/barbeiros/`      | Perfil e disponibilidade dos barbeiros         |
| Agendamento    | `/agendar`      | `pages/agendar/`        | Fluxo em 4 etapas: serviço → barbeiro → data → confirmação |
| Minha Conta    | `/minha-conta`  | `pages/minha-conta/`    | Agendamentos, histórico e perfil do cliente    |

### Painel Administrativo

| Tela              | Rota                       | Pasta            | Descrição                           |
|-------------------|----------------------------|------------------|-------------------------------------|
| Dashboard         | `/admin`                   | `pages/admin/`   | Métricas, gráficos e próximos agend.|
| Agendamentos      | `/admin/agendamentos`      | `pages/admin/`   | Tabela com filtros e ações          |
| Clientes          | `/admin/clientes`          | `pages/admin/`   | Lista de clientes e histórico       |
| Serviços          | `/admin/servicos`          | `pages/admin/`   | CRUD completo de serviços           |
| Barbeiros         | `/admin/barbeiros`         | `pages/admin/`   | Gerenciamento da equipe             |
| Relatórios        | `/admin/relatorios`        | `pages/admin/`   | Gráficos de receita e desempenho    |
| Configurações     | `/admin/configuracoes`     | `pages/admin/`   | Dados, horários e notificações      |

---

## Credenciais de Demonstração

| Perfil  | E-mail                   | Senha      | Acesso                    |
|---------|--------------------------|------------|---------------------------|
| Admin   | admin@barberpro.com      | admin123   | Painel completo `/admin`  |
| Cliente | joao@email.com           | 123456     | Área do cliente           |
| Barbeiro| rafael@barberpro.com     | barber123  | Painel do barbeiro        |

---

## Stack Tecnológica

| Tecnologia       | Uso                                      |
|------------------|------------------------------------------|
| React 19         | Framework de UI                          |
| TypeScript       | Tipagem estática                         |
| Tailwind CSS 4   | Estilização utilitária                   |
| shadcn/ui        | Componentes de interface                 |
| Wouter           | Roteamento SPA                           |
| React Hook Form  | Gerenciamento de formulários             |
| Recharts         | Gráficos e visualizações                 |
| Sonner           | Notificações toast                       |
| Framer Motion    | Animações                                |
| Vite             | Build tool e dev server                  |

---

## Como Executar

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build
```

---

## API REST

A documentação completa dos endpoints está em [`API_ENDPOINTS.md`](./API_ENDPOINTS.md).

**Endpoints principais:**

```
POST   /api/v1/auth/login
POST   /api/v1/auth/register
GET    /api/v1/services
GET    /api/v1/barbers
GET    /api/v1/barbers/:id/availability?date=YYYY-MM-DD
POST   /api/v1/appointments
GET    /api/v1/appointments
PATCH  /api/v1/appointments/:id/cancel
GET    /api/v1/admin/stats
GET    /api/v1/admin/appointments
GET    /api/v1/admin/reports/revenue
PUT    /api/v1/admin/settings
```

---

## Design System

O projeto segue a filosofia **Warm Minimalism / Modern Craft**:

- **Paleta:** Creme `#FAFAF7`, Marrom `#3D2B1F`, Âmbar `#E07B39`, Cinza Quente `#8A7E74`
- **Tipografia:** Lora (títulos serifados) + Nunito Sans (interface)
- **Componentes:** Cards com sombra suave, linha de acento âmbar, sidebar escura
- **Animações:** Transições de 150–300ms com `ease-out`

---

*BarbeariaJKv1.0.0 — Sistema de Agendamento Online para Barbearia*
