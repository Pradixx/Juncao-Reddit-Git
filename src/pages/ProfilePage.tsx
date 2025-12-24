import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-app py-8">
        <div className="mx-auto w-full max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Informações da sua conta.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-xl border bg-card p-4">
                <div className="text-sm text-muted-foreground">Nome</div>
                <div className="text-base font-medium">{user?.name ?? "—"}</div>
              </div>

              <div className="rounded-xl border bg-card p-4">
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="text-base font-medium">{user?.email ?? "—"}</div>
              </div>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Voltar
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
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
