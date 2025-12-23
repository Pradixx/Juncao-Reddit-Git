import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors",
      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur", className)}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground font-bold">
            I
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">IdeasHub</div>
            <div className="text-xs text-muted-foreground">Organize ideias com estilo</div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <NavLink to="/ideas" className={navClass}>
                Ideias
              </NavLink>
              <NavLink to="/profile" className={navClass}>
                Perfil
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className={navClass}>
                Início
              </NavLink>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navClass}>
                Registro
              </NavLink>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <div className="hidden md:block text-right mr-2">
                <div className="text-sm font-medium leading-4">{user?.name ?? "Usuário"}</div>
                <div className="text-xs text-muted-foreground">{user?.email ?? ""}</div>
              </div>

              <Button
                variant="outline"
                onClick={() => navigate("/create-idea")}
                className="hidden sm:inline-flex"
              >
                Nova ideia
              </Button>

              <Button
                variant="destructive"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Entrar
              </Button>
              <Button onClick={() => navigate("/register")}>Criar conta</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
