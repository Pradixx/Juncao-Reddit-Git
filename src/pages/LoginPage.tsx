import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const ok = await login(email, password);
    setLoading(false);

    if (ok) navigate("/dashboard");
    else setError("Credenciais inválidas ou usuário não encontrado.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto flex max-w-6xl px-4 py-10">
        <div className="mx-auto w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Entrar</CardTitle>
              <CardDescription>Use seu email e senha para acessar.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@dominio.com"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Senha</label>
                  <input
                    className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button className="w-full" disabled={loading} type="submit">
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
                <Link className="font-medium text-foreground underline" to="/register">
                  Criar agora
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
