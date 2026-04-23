# BarberPro — Documentação dos Endpoints da API REST

> **Versão:** 1.0.0 | **Base URL:** `https://api.barberpro.com/api/v1`
>
> Todos os endpoints protegidos exigem o header `Authorization: Bearer <token>` obtido via `/auth/login`.
> As respostas seguem o padrão JSON com os campos `success`, `data` e `message`.

---

## Sumário

1. [Autenticação](#1-autenticação)
2. [Usuários](#2-usuários)
3. [Serviços](#3-serviços)
4. [Barbeiros](#4-barbeiros)
5. [Agendamentos](#5-agendamentos)
6. [Painel Administrativo](#6-painel-administrativo)
7. [Configurações](#7-configurações)
8. [Notificações](#8-notificações)

---

## 1. Autenticação

### `POST /auth/login`

Autentica um usuário (cliente, barbeiro ou admin) e retorna o token JWT.

**Request Body:**
```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "2",
      "name": "João Silva",
      "email": "joao@email.com",
      "role": "client",
      "phone": "(11) 98765-4321"
    }
  }
}
```

**Response `401 Unauthorized`:**
```json
{
  "success": false,
  "message": "E-mail ou senha inválidos."
}
```

---

### `POST /auth/register`

Cria uma nova conta de cliente.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 98765-4321",
  "password": "123456"
}
```

**Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "10",
      "name": "João Silva",
      "email": "joao@email.com",
      "role": "client"
    }
  }
}
```

---

### `POST /auth/logout`

Invalida o token JWT do usuário autenticado.

**Headers:** `Authorization: Bearer <token>`

**Response `200 OK`:**
```json
{ "success": true, "message": "Sessão encerrada com sucesso." }
```

---

### `POST /auth/forgot-password`

Envia e-mail de recuperação de senha.

**Request Body:**
```json
{ "email": "joao@email.com" }
```

---

### `POST /auth/reset-password`

Redefine a senha com o token recebido por e-mail.

**Request Body:**
```json
{
  "token": "reset_token_aqui",
  "newPassword": "novaSenha123"
}
```

---

## 2. Usuários

### `GET /users/:id`

Retorna os dados de um usuário específico.

**Headers:** `Authorization: Bearer <token>`

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": "2",
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 98765-4321",
    "role": "client",
    "createdAt": "2026-01-15T10:00:00Z"
  }
}
```

---

### `PUT /users/:id`

Atualiza os dados do usuário autenticado.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "João Silva Atualizado",
  "phone": "(11) 99999-1234"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": { "id": "2", "name": "João Silva Atualizado", "phone": "(11) 99999-1234" }
}
```

---

### `PUT /users/:id/password`

Altera a senha do usuário autenticado.

**Request Body:**
```json
{
  "currentPassword": "123456",
  "newPassword": "novaSenha789"
}
```

---

## 3. Serviços

### `GET /services`

Lista todos os serviços disponíveis. Endpoint público.

**Query Parameters:**

| Parâmetro  | Tipo   | Descrição                              |
|------------|--------|----------------------------------------|
| `category` | string | Filtrar por categoria (corte, barba…)  |
| `active`   | bool   | Filtrar apenas serviços ativos         |

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "s1",
      "name": "Corte Clássico",
      "description": "Corte tradicional com tesoura e máquina.",
      "duration": 30,
      "price": 45.00,
      "category": "corte",
      "icon": "✂️",
      "active": true
    }
  ]
}
```

---

### `GET /services/:id`

Retorna os detalhes de um serviço específico.

---

### `POST /services`

Cria um novo serviço. **Requer role: admin.**

**Request Body:**
```json
{
  "name": "Corte Infantil",
  "description": "Corte especial para crianças até 10 anos.",
  "duration": 25,
  "price": 35.00,
  "category": "corte",
  "icon": "✂️"
}
```

---

### `PUT /services/:id`

Atualiza um serviço existente. **Requer role: admin.**

---

### `DELETE /services/:id`

Remove (desativa) um serviço. **Requer role: admin.**

---

## 4. Barbeiros

### `GET /barbers`

Lista todos os barbeiros. Endpoint público.

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "b1",
      "name": "Rafael Costa",
      "specialty": "Degradê & Cortes Modernos",
      "rating": 4.9,
      "reviewCount": 312,
      "avatar": "https://...",
      "availableDays": [1, 2, 3, 4, 5, 6],
      "bio": "10 anos de experiência..."
    }
  ]
}
```

---

### `GET /barbers/:id`

Retorna os detalhes de um barbeiro específico.

---

### `GET /barbers/:id/availability`

Retorna os horários disponíveis de um barbeiro em uma data específica.

**Query Parameters:**

| Parâmetro | Tipo   | Obrigatório | Descrição                    |
|-----------|--------|-------------|------------------------------|
| `date`    | string | Sim         | Data no formato `YYYY-MM-DD` |

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "barberId": "b1",
    "date": "2026-05-10",
    "availableSlots": ["08:00", "08:30", "09:00", "10:30", "11:00"],
    "occupiedSlots": ["09:30", "10:00"]
  }
}
```

---

### `POST /barbers`

Cadastra um novo barbeiro. **Requer role: admin.**

**Request Body:**
```json
{
  "name": "Novo Barbeiro",
  "specialty": "Cortes Clássicos",
  "bio": "Descrição do barbeiro.",
  "availableDays": [1, 2, 3, 4, 5],
  "email": "barbeiro@barberpro.com",
  "phone": "(11) 99999-0002"
}
```

---

### `PUT /barbers/:id`

Atualiza os dados de um barbeiro. **Requer role: admin.**

---

### `DELETE /barbers/:id`

Remove um barbeiro do sistema. **Requer role: admin.**

---

## 5. Agendamentos

### `GET /appointments`

Lista os agendamentos do usuário autenticado.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

| Parâmetro  | Tipo   | Descrição                                        |
|------------|--------|--------------------------------------------------|
| `status`   | string | Filtrar por status (confirmed, pending, etc.)    |
| `from`     | string | Data inicial `YYYY-MM-DD`                        |
| `to`       | string | Data final `YYYY-MM-DD`                          |
| `page`     | int    | Página (paginação)                               |
| `limit`    | int    | Itens por página (padrão: 10)                    |

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": "a1",
        "clientId": "2",
        "clientName": "João Silva",
        "barberId": "b1",
        "barberName": "Rafael Costa",
        "serviceId": "s2",
        "serviceName": "Corte + Barba",
        "servicePrice": 75.00,
        "date": "2026-04-24",
        "time": "10:00",
        "status": "confirmed",
        "notes": "",
        "createdAt": "2026-04-20T14:30:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "totalPages": 1
  }
}
```

---

### `GET /appointments/:id`

Retorna os detalhes de um agendamento específico.

**Headers:** `Authorization: Bearer <token>`

---

### `POST /appointments`

Cria um novo agendamento.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "serviceId": "s2",
  "barberId": "b1",
  "date": "2026-04-24",
  "time": "10:00",
  "notes": "Preferência por degradê baixo."
}
```

**Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "id": "a10",
    "status": "confirmed",
    "date": "2026-04-24",
    "time": "10:00",
    "serviceName": "Corte + Barba",
    "barberName": "Rafael Costa",
    "servicePrice": 75.00
  },
  "message": "Agendamento confirmado com sucesso!"
}
```

**Response `409 Conflict`:**
```json
{
  "success": false,
  "message": "Horário indisponível. Por favor, escolha outro horário."
}
```

---

### `PATCH /appointments/:id/cancel`

Cancela um agendamento.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{ "reason": "Compromisso imprevisto." }
```

---

### `PATCH /appointments/:id/status`

Atualiza o status de um agendamento. **Requer role: admin ou barber.**

**Request Body:**
```json
{ "status": "completed" }
```

**Status permitidos:** `pending` | `confirmed` | `completed` | `cancelled`

---

### `DELETE /appointments/:id`

Remove permanentemente um agendamento. **Requer role: admin.**

---

## 6. Painel Administrativo

### `GET /admin/stats`

Retorna as métricas gerais do dashboard. **Requer role: admin.**

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "totalAppointmentsToday": 8,
    "totalAppointmentsWeek": 42,
    "totalRevenueMonth": 3840.00,
    "newClientsMonth": 14,
    "occupancyRate": 78,
    "avgRating": 4.8
  }
}
```

---

### `GET /admin/appointments`

Lista todos os agendamentos com filtros avançados. **Requer role: admin.**

**Query Parameters:**

| Parâmetro   | Tipo   | Descrição                             |
|-------------|--------|---------------------------------------|
| `status`    | string | Filtrar por status                    |
| `barberId`  | string | Filtrar por barbeiro                  |
| `clientId`  | string | Filtrar por cliente                   |
| `date`      | string | Filtrar por data `YYYY-MM-DD`         |
| `from`      | string | Data inicial do período               |
| `to`        | string | Data final do período                 |
| `search`    | string | Busca textual (nome, serviço)         |
| `page`      | int    | Página                                |
| `limit`     | int    | Itens por página                      |

---

### `GET /admin/clients`

Lista todos os clientes cadastrados. **Requer role: admin.**

**Query Parameters:**

| Parâmetro | Tipo   | Descrição                    |
|-----------|--------|------------------------------|
| `search`  | string | Busca por nome, e-mail, tel. |
| `page`    | int    | Página                       |
| `limit`   | int    | Itens por página             |

---

### `GET /admin/clients/:id`

Retorna o perfil completo de um cliente com histórico. **Requer role: admin.**

---

### `DELETE /admin/clients/:id`

Remove um cliente do sistema. **Requer role: admin.**

---

### `GET /admin/reports/revenue`

Relatório de receita por período. **Requer role: admin.**

**Query Parameters:**

| Parâmetro | Tipo   | Descrição                          |
|-----------|--------|------------------------------------|
| `period`  | string | `week`, `month`, `year`            |
| `year`    | int    | Ano de referência (ex: 2026)       |
| `month`   | int    | Mês de referência (1–12)           |

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "totalRevenue": 3840.00,
    "breakdown": [
      { "date": "2026-04-01", "revenue": 320.00, "appointments": 6 },
      { "date": "2026-04-02", "revenue": 440.00, "appointments": 8 }
    ]
  }
}
```

---

### `GET /admin/reports/services`

Relatório de serviços mais realizados. **Requer role: admin.**

---

### `GET /admin/reports/barbers`

Relatório de desempenho por barbeiro. **Requer role: admin.**

---

## 7. Configurações

### `GET /admin/settings`

Retorna as configurações gerais da barbearia. **Requer role: admin.**

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "barbershopName": "BarberPro",
    "phone": "(11) 99999-0001",
    "email": "contato@barberpro.com",
    "address": "Rua das Flores, 123 — São Paulo, SP",
    "slotDuration": 30,
    "workingHours": [
      { "day": 1, "open": true, "start": "08:00", "end": "19:00" },
      { "day": 6, "open": true, "start": "08:00", "end": "17:00" },
      { "day": 0, "open": false }
    ]
  }
}
```

---

### `PUT /admin/settings`

Atualiza as configurações gerais. **Requer role: admin.**

---

### `PUT /admin/settings/hours`

Atualiza os horários de funcionamento. **Requer role: admin.**

**Request Body:**
```json
{
  "workingHours": [
    { "day": 1, "open": true, "start": "08:00", "end": "19:00" },
    { "day": 0, "open": false }
  ]
}
```

---

### `PUT /admin/settings/notifications`

Atualiza as configurações de notificação. **Requer role: admin.**

**Request Body:**
```json
{
  "emailConfirmation": true,
  "emailReminder": true,
  "smsReminder": false,
  "whatsappReminder": true,
  "reminderHoursBefore": 24
}
```

---

## 8. Notificações

### `GET /notifications`

Lista as notificações do usuário autenticado.

**Headers:** `Authorization: Bearer <token>`

---

### `PATCH /notifications/:id/read`

Marca uma notificação como lida.

---

### `PATCH /notifications/read-all`

Marca todas as notificações como lidas.

---

## Códigos de Status HTTP

| Código | Significado                                      |
|--------|--------------------------------------------------|
| `200`  | OK — Requisição bem-sucedida                     |
| `201`  | Created — Recurso criado com sucesso             |
| `400`  | Bad Request — Dados inválidos ou ausentes        |
| `401`  | Unauthorized — Token ausente ou inválido         |
| `403`  | Forbidden — Sem permissão para o recurso         |
| `404`  | Not Found — Recurso não encontrado               |
| `409`  | Conflict — Conflito de dados (ex: horário cheio) |
| `422`  | Unprocessable Entity — Validação falhou          |
| `500`  | Internal Server Error — Erro interno do servidor |

---

## Autenticação e Roles

O sistema utiliza **JWT (JSON Web Token)** para autenticação. Cada token contém o `userId`, `role` e `exp` (expiração).

| Role      | Permissões                                                          |
|-----------|---------------------------------------------------------------------|
| `client`  | Criar/cancelar próprios agendamentos, editar perfil                 |
| `barber`  | Visualizar agenda própria, atualizar status de agendamentos         |
| `admin`   | Acesso total: CRUD de serviços, barbeiros, clientes e configurações |

---

*Documentação gerada para BarberPro v1.0.0 — Sistema de Agendamento Online para Barbearia*
