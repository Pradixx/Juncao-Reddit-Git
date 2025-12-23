import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useIdeas } from "../contexts/IdeasContext";
import { ArrowRight, Plus } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { ideas } = useIdeas();
  const navigate = useNavigate();

  const myRecent = useMemo(() => {
    const uid = user?.id;
    const list = uid ? ideas.filter((i) => i.authorId === uid) : ideas;
    return [...list].slice(0, 4);
  }, [ideas, user?.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo, {user?.name ?? "usuário"} 👋</h1>
            <p className="mt-1 text-sm text-gray-600">Aqui está um resumo rápido das suas ideias.</p>
          </div>

          <button
            onClick={() => navigate("/create-idea")}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Nova ideia
          </button>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recentes</h2>
            <button
              onClick={() => navigate("/ideas")}
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {myRecent.length === 0 ? (
            <div className="mt-4 rounded-2xl border bg-white p-6 text-sm text-gray-600">
              Nenhuma ideia ainda. Crie sua primeira agora 👇
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {myRecent.map((idea) => (
                <button
                  key={idea.id}
                  onClick={() => navigate(`/view-idea/${idea.id}`)}
                  className="rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:shadow-md"
                >
                  <p className="line-clamp-1 font-semibold text-gray-900">{idea.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">{idea.description}</p>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
