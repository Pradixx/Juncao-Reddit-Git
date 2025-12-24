import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.trim().length >= 8 && !submitting;
  }, [email, password, submitting]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const ok = await login(email.trim(), password);
      if (!ok) {
        setError("Email ou senha inválidos.");
        return;
      }
      navigate("/dashboard");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen app-page hero-bg flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md text-center">
        <div className="brand-badge mx-auto h-10 w-10 grid place-items-center rounded-2xl font-bold">
          💡
        </div>

        <h1 className="mt-4 text-3xl font-bold text-strong">Bem-vindo de volta</h1>
        <p className="mt-2 text-muted">Faça login para continuar</p>

        <div className="mt-8 feature-card p-6 text-left">
          {error && (
            <div className="alert-danger mb-4 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-strong">Email</label>
              <div className="mt-2">
                <input
                  className="ui-input ui-border ui-surface h-11 w-full rounded-lg px-3 text-sm ui-focus-ring"
                  placeholder="seu@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-strong">Senha</label>
              <div className="mt-2">
                <input
                  className="ui-input ui-border ui-surface h-11 w-full rounded-lg px-3 text-sm ui-focus-ring"
                  placeholder="********"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <p className="mt-2 text-xs text-muted">Mínimo de 8 caracteres.</p>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-primary h-11 w-full rounded-lg font-medium disabled:opacity-60"
            >
              {submitting ? "Entrando..." : "Entrar"}
            </button>

            <p className="text-center text-sm text-muted">
              Não tem uma conta?{" "}
              <Link to="/register" className="link-primary font-medium">
                Registre-se aqui
              </Link>
            </p>
          </form>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 text-sm text-muted hover:text-strong"
        >
          ← Voltar para página inicial
        </button>
      </div>
    </div>
  );
}
