"use client";
import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductForm({ initialData, type = "add" }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header dengan Glassmorphism effect */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">
            {type === "add" ? "Tambah Produk Baru" : "Edit Detail Produk"}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Nama */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nama Produk
              </label>
              <input
                type="text"
                placeholder="Contoh: Laptop Enterprise X1"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none"
              />
            </div>

            {/* Input Harga */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Harga (IDR)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-slate-400">
                  Rp
                </span>
                <input
                  type="number"
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none"
                />
              </div>
            </div>

            {/* Input Stok */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Stok Barang
              </label>
              <input
                type="number"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Deskripsi Lengkap
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none"
            ></textarea>
          </div>
        </div>

        {/* Footer Action */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-end gap-3">
          <Link href={`/products`}>
            <button className="px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition cursor-pointer">
              Batal
            </button>
          </Link>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition active:scale-95 cursor-pointer">
            <Save size={18} />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
