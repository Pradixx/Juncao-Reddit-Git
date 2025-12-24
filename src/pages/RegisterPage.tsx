import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

function isStrongPassword(pw: string) {
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(pw);
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const nameOk = name.trim().length >= 3;
  const passOk = password.length >= 8 && isStrongPassword(password);

  const canSubmit = useMemo(() => {
    return nameOk && email.trim().length > 0 && passOk && !submitting;
  }, [nameOk, email, passOk, submitting]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const ok = await register(name.trim(), email.trim(), password);
      if (!ok) {
        setError("Não foi possível registrar. Verifique os dados e tente novamente.");
        return;
      }
      navigate("/dashboard");
    } catch {
      setError("Erro inesperado ao registrar.");
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
                <AlertTitle>Registro falhou</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Criar conta</CardTitle>
              <CardDescription>Preencha os dados para começar.</CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome</label>
                  <Input
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {!nameOk && <p className="text-xs text-muted-foreground">Mínimo 3 caracteres.</p>}
                </div>

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
                    placeholder="Crie uma senha forte"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Deve conter: maiúscula, minúscula, número e caractere especial (@#$%^&+=).
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
                  <Button type="button" variant="outline" onClick={() => navigate("/login")} disabled={submitting}>
                    Já tenho conta
                  </Button>
                  <Button type="submit" disabled={!canSubmit}>
                    {submitting ? "Criando..." : "Criar conta"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <button className="underline underline-offset-4" onClick={() => navigate("/login")}>
              Entrar
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
