// src/components/Header.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lightbulb, LogOut, Plus, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            <Lightbulb className="h-5 w-5 text-indigo-600" />
            <span>IdeasHub</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              to="/ideas"
              className={[
                "rounded-md px-3 py-2 text-sm font-medium transition",
                isActive("/ideas") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              ].join(" ")}
            >
              Ideias
            </Link>

            <Link
              to="/create-idea"
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Nova
            </Link>

            <Link
              to="/profile"
              className={[
                "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition",
                isActive("/profile") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              ].join(" ")}
            >
              <User className="h-4 w-4" />
              <span className="max-w-[140px] truncate">{user?.name ?? "Perfil"}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
