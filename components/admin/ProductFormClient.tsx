"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProductFormClient({
  initialData,
}: {
  initialData: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    stock: initialData?.stock || "",
    description: initialData?.description || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/products/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/products"); // Balik ke tabel
        router.refresh(); // Refresh data terbaru
      }
    } catch (error) {
      console.error("Update gagal", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-slate-100 rounded-full transition"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Edit Produk</h1>
          <p className="text-sm text-slate-500">ID Produk: #{initialData.id}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-8 space-y-5">
          {/* Nama Produk */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Nama Produk
            </label>
            <input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-50 text-slate-500 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Harga */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Harga (IDR)
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-50 text-slate-500 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
              />
            </div>
            {/* Stok */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Stok
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-50 text-slate-500 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Deskripsi
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-50 text-slate-500 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <Link
            href="/products"
            className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50 transition shadow-md"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
