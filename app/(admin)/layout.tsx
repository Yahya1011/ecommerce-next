"use client";
import { signOut } from "next-auth/react";
import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Kurung kurawal buka harus di sini

  // Fungsi ini harus berada di dalam komponen
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar - Pastikan text-white agar tulisan terlihat */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white shadow-xl">
        <div className="p-6 text-xl font-bold border-b border-slate-800 tracking-tight">
          Admin <span className="text-blue-400">Panel</span>
        </div>

        <nav className="p-4 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors group"
          >
            <span className="text-slate-400 group-hover:text-white">🏠</span>
            <span className="font-medium">Dashboard Overview</span>
          </Link>

          <Link
            href="/products"
            className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors group"
          >
            <span className="text-slate-400 group-hover:text-white">📦</span>
            <span className="font-medium">Manajemen Produk</span>
          </Link>

          <div className="pt-10">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
            >
              <span>⬅</span>
              <span className="text-sm">Lihat Website Toko</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content - Berikan margin-left 64 (w-64) agar tidak tertutup sidebar */}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="sticky top-0 z-10 h-16 bg-white/80 backdrop-blur-md border-b flex items-center justify-between px-8 shadow-sm">
          <h2 className="font-semibold text-slate-700">Administrator System</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">v1.0.4</span>
            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-red-100 transition cursor-pointer"
            >
              Keluar
            </button>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
