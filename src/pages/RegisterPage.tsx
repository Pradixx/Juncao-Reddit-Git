import { FormEvent, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";

function passwordMeetsRules(pw: string) {
  // backend: precisa maiúscula, minúscula, número e especial @#$%^&+=
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[@#$%^&+=]/.test(pw);
  const hasLen = pw.length >= 8;
  return { hasUpper, hasLower, hasNumber, hasSpecial, hasLen };
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const rules = useMemo(() => passwordMeetsRules(password), [password]);
  const allOk = rules.hasUpper && rules.hasLower && rules.hasNumber && rules.hasSpecial && rules.hasLen;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!allOk) {
      setError("Senha não atende as regras do backend.");
      return;
    }

    setLoading(true);
    const ok = await register(name, email, password);
    setLoading(false);

    if (ok) navigate("/dashboard");
    else setError("Erro ao registrar. Verifique os dados e tente novamente.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto flex max-w-6xl px-4 py-10">
        <div className="mx-auto w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Criar conta</CardTitle>
              <CardDescription>O backend exige senha forte (maiúscula/minúscula/número/especial).</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Nome</label>
                  <input
                    className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    required
                  />
                </div>

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
                    placeholder="Crie uma senha forte"
                    required
                  />

                  <div className="mt-2 grid gap-1 text-xs text-muted-foreground">
                    <div className={rules.hasLen ? "text-foreground" : ""}>• mínimo 8 caracteres</div>
                    <div className={rules.hasUpper ? "text-foreground" : ""}>• 1 letra maiúscula</div>
                    <div className={rules.hasLower ? "text-foreground" : ""}>• 1 letra minúscula</div>
                    <div className={rules.hasNumber ? "text-foreground" : ""}>• 1 número</div>
                    <div className={rules.hasSpecial ? "text-foreground" : ""}>• 1 especial (@#$%^&+=)</div>
                  </div>
                </div>

                <Button className="w-full" disabled={loading} type="submit">
                  {loading ? "Criando..." : "Criar conta"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Já tem conta?{" "}
                <Link className="font-medium text-foreground underline" to="/login">
                  Entrar
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
