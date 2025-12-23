import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AlertTriangle } from 'lucide-react';

interface ErrorPageProps { type?: '404' | '403' }

export default function ErrorPage({ type = '404' }: ErrorPageProps) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <AlertTriangle size={64} className="text-yellow-500 mb-4"/>
        <h1 className="text-4xl font-bold">{type === '403' ? '403 - Sem Permissão' : '404 - Não Encontrada'}</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Voltar ao Início
        </button>
      </main>
      <Footer />
    </div>
  );
}
