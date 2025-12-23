import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { Mail, User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
          <p className="mt-1 text-sm text-gray-600">Informações da sua conta.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <User className="h-4 w-4 text-indigo-600" />
                Nome
              </div>
              <p className="mt-2 text-sm text-gray-600">{user?.name ?? "-"}</p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Mail className="h-4 w-4 text-indigo-600" />
                Email
              </div>
              <p className="mt-2 text-sm text-gray-600">{user?.email ?? "-"}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
