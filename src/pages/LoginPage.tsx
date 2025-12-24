import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const ok = await login(email.trim(), password);
      if (!ok) {
        setError("Login inválido. Verifique email/senha.");
        return;
      }
      navigate("/dashboard");
    } catch {
      setError("Erro inesperado ao logar.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-app py-10">
        <div className="mx-auto w-full max-w-md">
          {error && (
            <div className="mb-4">
              <Alert>
                <AlertTitle>Não foi possível entrar</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Entrar</CardTitle>
              <CardDescription>Use seu email e senha para acessar.</CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Senha</label>
                  <Input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres.</p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
                  <Button type="button" variant="outline" onClick={() => navigate("/register")} disabled={submitting}>
                    Criar conta
                  </Button>
                  <Button type="submit" disabled={!canSubmit}>
                    {submitting ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <button className="underline underline-offset-4" onClick={() => navigate("/register")}>
              Registre-se
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
