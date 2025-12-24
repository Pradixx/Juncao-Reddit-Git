import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshMe: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:8081/api";

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => safeJsonParse<User>(localStorage.getItem("user")));
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const fetchMe = async (jwt: string): Promise<User | null> => {
    try {
      const res = await fetch(`${API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!res.ok) return null;
      const me = await res.json();
      return { id: me.id, name: me.name, email: me.email };
    } catch {
      return null;
    }
  };

  const refreshMe = async () => {
    const jwt = localStorage.getItem("token");
    if (!jwt) return false;

    const me = await fetchMe(jwt);
    if (!me) {
      logout();
      return false;
    }

    setUser(me);
    setToken(jwt);
    localStorage.setItem("user", JSON.stringify(me));
    return true;
  };

useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken && !user) {
    refreshMe();
  }
}, [user]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;

      const data = await res.json();
      if (!data?.token) return false;

      localStorage.setItem("token", data.token);
      setToken(data.token);

      const me = await fetchMe(data.token);
      if (!me) {
        logout();
        return false;
      }

      setUser(me);
      localStorage.setItem("user", JSON.stringify(me));
      return true;
    } catch {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) return false;

      const data = await res.json();
      if (!data?.token) return false;

      localStorage.setItem("token", data.token);
      setToken(data.token);

      const me = await fetchMe(data.token);
      if (!me) {
        logout();
        return false;
      }

      setUser(me);
      localStorage.setItem("user", JSON.stringify(me));
      return true;
    } catch {
      return false;
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      login,
      register,
      logout,
      isAuthenticated: !!user && !!token,
      refreshMe,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
