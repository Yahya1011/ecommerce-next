"use client";
import { useCartStore } from "@/lib/store";

export default function AddToCartBtn({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Mencegah navigasi jika tombol berada di dalam Link
    addToCart(product);
    // Opsional: Anda bisa mengganti alert dengan toast sederhana
    // console.log("Berhasil ditambah ke keranjang");
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
    >
      Tambah Ke Keranjang
    </button>
  );
}
