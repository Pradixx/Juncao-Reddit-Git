import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:8081/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function fetchCurrentUser(token: string) {
    const res = await fetch(`${API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Não autenticado");
    const data = await res.json();
    return data as User;
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchCurrentUser(token)
      .then(setUser)
      .catch(() => logout());
  }, []);

  async function login(email: string, password: string) {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      const { token } = await res.json();
      localStorage.setItem("token", token);

      const me = await fetchCurrentUser(token);
      setUser(me);
      localStorage.setItem("user", JSON.stringify(me));

      return true;
    } catch {
      return false;
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) return false;

      const { token } = await res.json();
      localStorage.setItem("token", token);

      const me = await fetchCurrentUser(token);
      setUser(me);
      localStorage.setItem("user", JSON.stringify(me));

      return true;
    } catch {
      return false;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
