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
    <div className="page flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto h-10 w-10 grid place-items-center rounded-2xl bg-blue-600 text-white font-bold">💡</div>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Criar conta</h1>
        <p className="mt-2 text-slate-600">Comece a organizar suas ideias agora</p>

        <div className="mt-8 card-soft p-6 text-left">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-900">Nome de usuário</label>
              <div className="mt-2">
                <input
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:ring-4 focus:ring-blue-100"
                  placeholder="seu_nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Necessário ter caractere maiúscula, minúscula, número e caractere especial.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-900">Confirmar senha</label>
              <div className="mt-2">
                <input
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 outline-none focus:ring-4 focus:ring-blue-100"
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
              className="h-11 w-full rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-blue-600"
            >
              {submitting ? "Criando..." : "Criar conta"}
            </button>

            <p className="text-center text-sm text-slate-600">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-blue-700 hover:underline font-medium">
                Faça login aqui
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
