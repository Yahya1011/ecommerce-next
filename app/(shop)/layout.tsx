import React from "react";
import Link from "next/link";
import CartBadge from "@/components/CartBadge"; // Impor badge

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black group-hover:bg-slate-900 transition-colors">
              E
            </div>
            <h1 className="text-xl font-extrabold tracking-tighter text-slate-900">
              E-COMMERCE <span className="text-blue-600">PRO</span>
            </h1>
          </Link>

          {/* Navigasi */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors py-2"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors py-2"
            >
              Katalog
            </Link>

            {/* Link Keranjang dengan Badge Otomatis */}
            <Link
              href="/cart"
              className="relative text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full transition-all flex items-center gap-2 group"
            >
              <span>🛒</span>
              Keranjang
              {/* Panggil komponen badge di sini */}
              <CartBadge />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-6 py-10">{children}</main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold text-slate-900">
              E-Commerce System
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              High-end IT Solution & Infrastructure Procurement.
            </p>
          </div>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Enterprise Store.
          </p>
        </div>
      </footer>
    </div>
  );
}
