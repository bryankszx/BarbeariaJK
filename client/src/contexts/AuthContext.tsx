/**
 * AuthContext — BarberPro
 * Gerencia estado de autenticação do usuário (cliente e admin)
 * Design: Warm Minimalism / Modern Craft
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "client" | "admin" | "barber";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    name: "Carlos Mendes",
    email: "admin@barberpro.com",
    password: "admin123",
    role: "admin",
    phone: "(11) 99999-0001",
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao@email.com",
    password: "123456",
    role: "client",
    phone: "(11) 98765-4321",
  },
  {
    id: "3",
    name: "Rafael Costa",
    email: "rafael@barberpro.com",
    password: "barber123",
    role: "barber",
    phone: "(11) 97654-3210",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("barberpro_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("barberpro_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) throw new Error("E-mail ou senha inválidos.");
    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem("barberpro_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("barberpro_user");
  };

  const register = async (data: RegisterData) => {
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = {
      id: String(Date.now()),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: "client",
    };
    setUser(newUser);
    localStorage.setItem("barberpro_user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
