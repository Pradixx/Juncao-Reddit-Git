import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useIdeas } from "../contexts/IdeasContext";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";

export default function IdeasListPage() {
  const { ideas, deleteIdea } = useIdeas();
  const navigate = useNavigate();

  const [q, setQ] = useState("");

  const filtered = ideas.filter((i) => {
    const s = (i.title + " " + i.description).toLowerCase();
    return s.includes(q.toLowerCase());
  });

  const onDelete = async (id: string) => {
    await deleteIdea(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Minhas ideias</h1>
            <p className="mt-1 text-sm text-gray-600">Busque, visualize e edite rapidamente.</p>
          </div>

          <button
            onClick={() => navigate("/create-idea")}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Nova ideia
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-sm">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título ou descrição..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border bg-white p-6 text-sm text-gray-600">
            Nenhuma ideia encontrada.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((idea) => (
              <div key={idea.id} className="rounded-2xl border bg-white p-4 shadow-sm">
                <p className="line-clamp-1 font-semibold text-gray-900">{idea.title}</p>
                <p className="mt-2 line-clamp-3 text-sm text-gray-600">{idea.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate(`/view-idea/${idea.id}`)}
                    className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4" />
                    Ver
                  </button>

                  <button
                    onClick={() => navigate(`/edit-idea/${idea.id}`)}
                    className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>

                  <button
                    onClick={() => onDelete(idea.id)}
                    className="inline-flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
