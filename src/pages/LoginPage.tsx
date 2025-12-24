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
    <div className="page flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto h-10 w-10 grid place-items-center rounded-2xl bg-blue-600 text-white font-bold">💡</div>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Bem-vindo de volta</h1>
        <p className="mt-2 text-slate-600">Faça login para continuar</p>

        <div className="mt-8 card-soft p-6 text-left">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-900">Email</label>
              <div className="mt-2">
                <input
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="seu@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900">Senha</label>
              <div className="mt-2">
                <input
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="********"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">Mínimo de 8 caracteres.</p>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="h-11 w-full rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-blue-600"
            >
              {submitting ? "Entrando..." : "Entrar"}
            </button>

            <p className="text-center text-sm text-slate-600">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-blue-700 hover:underline font-medium">
                Registre-se aqui
              </Link>
            </p>
          </form>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 text-sm text-slate-600 hover:text-slate-900"
        >
          ← Voltar para página inicial
        </button>
      </div>
    </div>
  );
}
