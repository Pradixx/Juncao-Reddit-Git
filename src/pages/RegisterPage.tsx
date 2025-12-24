import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return (
      name.trim().length >= 3 &&
      email.trim().length > 0 &&
      password.length >= 8 &&
      password === confirm &&
      !submitting
    );
  }, [name, email, password, confirm, submitting]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("As senhas não conferem.");
      return;
    }

    setSubmitting(true);
    try {
      const ok = await register(name.trim(), email.trim(), password);
      if (!ok) {
        setError("Não foi possível criar a conta. Verifique os dados e tente novamente.");
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

        <h1 className="mt-4 text-3xl font-bold text-strong">Criar conta</h1>
        <p className="mt-2 text-muted">Comece a organizar suas ideias agora</p>

        <div className="mt-8 feature-card p-6 text-left">
          {error && (
            <div className="alert-danger mb-4 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-strong">Nome de usuário</label>
              <div className="mt-2">
                <input
                  className="ui-input ui-border ui-surface h-11 w-full rounded-lg px-3 text-sm ui-focus-ring"
                  placeholder="seu_nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                />
              </div>
              <p className="mt-2 text-xs text-muted">
                Necessário ter caractere maiúscula, minúscula, número e caractere especial.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-strong">Confirmar senha</label>
              <div className="mt-2">
                <input
                  className="ui-input ui-border ui-surface h-11 w-full rounded-lg px-3 text-sm ui-focus-ring"
                  placeholder="********"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-primary h-11 w-full rounded-lg font-medium disabled:opacity-60"
            >
              {submitting ? "Criando..." : "Criar conta"}
            </button>

            <p className="text-center text-sm text-muted">
              Já tem uma conta?{" "}
              <Link to="/login" className="link-primary font-medium">
                Faça login aqui
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
