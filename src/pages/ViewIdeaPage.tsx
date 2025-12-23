import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useIdeas } from "../contexts/IdeasContext";
import { ArrowLeft, Pencil } from "lucide-react";

export default function ViewIdeaPage() {
  const { id } = useParams<{ id: string }>();
  const { getIdea } = useIdeas();
  const navigate = useNavigate();

  const idea = id ? getIdea(id) : undefined;

  if (!idea) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-4 py-10">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">Ideia não encontrada.</p>
            <button
              onClick={() => navigate("/ideas")}
              className="mt-4 inline-flex items-center gap-2 rounded-md border bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{idea.title}</h1>
              <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{idea.description}</p>
            </div>

            <button
              onClick={() => navigate(`/edit-idea/${idea.id}`)}
              className="inline-flex items-center justify-center gap-2 rounded-md border bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              <Pencil className="h-4 w-4" />
              Editar
            </button>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
        </div>
      </main>
    </div>
  );
}
