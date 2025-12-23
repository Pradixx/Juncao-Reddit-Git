import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useIdeas } from '../contexts/IdeasContext';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { getUserIdeas } = useIdeas();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto p-8 mt-10 bg-white rounded-2xl border shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={40} className="text-blue-600"/>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-400">Total de Ideias Criadas</p>
          <p className="text-3xl font-bold">{getUserIdeas().length}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
