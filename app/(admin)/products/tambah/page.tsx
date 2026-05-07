"use client";
import { useState } from "react";
import { Save, ArrowLeft, Loader2 } from "lucide-react"; // Tambah Loader2 untuk animasi loading
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductForm({ initialData, type = "add" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. Inisialisasi State Form
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
    stock: initialData?.stock || "",
    description: initialData?.description || "",
  });

  // 2. Fungsi untuk handle perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Fungsi untuk kirim data ke API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/products", {
        // Sesuaikan dengan path route.ts kamu
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price), // Pastikan angka
          stock: Number(formData.stock), // Pastikan angka
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Produk berhasil disimpan!");
        router.push("/products");
        router.refresh(); // Refresh data di halaman list produk
      } else {
        alert(result.error || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="p-2 hover:bg-slate-100 rounded-full transition"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">
            {type === "add" ? "Tambah Produk Baru" : "Edit Detail Produk"}
          </h1>
        </div>
      </div>

      {/* Bungkus dengan tag form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
      >
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Nama */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nama Produk
              </label>
              <input
                type="text"
                name="name" // Tambahkan atribut name
                required
                value={formData.name}
                onChange={handleChange}
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
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
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
                name="stock"
                required
                value={formData.stock}
                onChange={handleChange}
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
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none"
            ></textarea>
          </div>
        </div>

        {/* Footer Action */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-end gap-3">
          <Link href="/products">
            <button
              type="button"
              className="px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
            >
              Batal
            </button>
          </Link>
          <button
            type="submit" // Pastikan type submit
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition active:scale-95 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </div>
      </form>
    </div>
  );
}
