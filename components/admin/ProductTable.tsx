"use client"; // Wajib di baris pertama

import { useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

export default function ProductTable({ products }: { products: any[] }) {
  const router = useRouter();

  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = confirm(
      `Apakah Anda yakin ingin menghapus "${name}"?`,
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (res.ok) {
          router.refresh(); // Mengambil data terbaru dari server
          alert("Produk berhasil dihapus");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 text-sm font-semibold text-slate-600">No</th>
            <th className="p-4 text-sm font-semibold text-slate-600">
              Nama Produk
            </th>
            <th className="p-4 text-sm font-semibold text-slate-600">Harga</th>
            <th className="p-4 text-sm font-semibold text-slate-600">Stok</th>
            <th className="p-4 text-sm font-semibold text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product, index) => (
            <tr key={product.id} className="hover:bg-slate-50 transition">
              <td className="p-4 text-slate-800 font-medium">{index + 1}</td>
              <td className="p-4">
                <p className="font-medium text-slate-800">{product.name}</p>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {product.description}
                </p>
              </td>
              <td className="p-4 text-slate-700 font-mono text-sm">
                {new Intl.NumberFormat("id-ID").format(product.price)}
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${product.stock < 5 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                >
                  {product.stock} pcs
                </span>
              </td>
              <td className="p-4 flex gap-2">
                <Link href={`/products/edit/${product.id}`}>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    <Pencil className="cursor-pointer" size={18} />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash className="cursor-pointer" size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
