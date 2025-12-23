import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
        <h1 className="text-5xl font-bold mb-6 text-center">Transforme suas ideias em realidade</h1>
        <p className="text-xl text-gray-600 max-w-2xl text-center mb-8">
          Digitalize seus insights, colabore com segurança e gerencie seu fluxo criativo em um só lugar.
        </p>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-3 border rounded hover:bg-gray-100">Login</Link>
          <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Começar</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
