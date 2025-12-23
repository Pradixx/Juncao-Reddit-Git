import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { useIdeas } from "../contexts/IdeasContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const { getUserIdeas } = useIdeas();
  const navigate = useNavigate();

  const myIdeas = getUserIdeas();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>Informações do usuário autenticado.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="grid gap-1">
                <div className="text-xs text-muted-foreground">Nome</div>
                <div className="text-sm font-medium">{user?.name ?? "—"}</div>
              </div>

              <div className="grid gap-1">
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="text-sm font-medium">{user?.email ?? "—"}</div>
              </div>

              <div className="grid gap-1">
                <div className="text-xs text-muted-foreground">Total de ideias</div>
                <div className="text-sm font-medium">{myIdeas.length}</div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => navigate("/ideas")}>Minhas ideias</Button>
                <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
