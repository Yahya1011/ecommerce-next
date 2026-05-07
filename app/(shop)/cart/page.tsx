"use client";
import { useCartStore } from "@/lib/store";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, clearCart, updateQuantity } = useCartStore();

  const totalHarga = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Keranjang Investasi IT
        </h1>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            Kosongkan Keranjang
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
          <span className="text-6xl block mb-4">🛒</span>
          <p className="text-slate-500 text-lg mb-6">
            Keranjang Anda masih kosong.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-all"
          >
            Kembali ke Katalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 sm:mb-0">
                  <h3 className="font-bold text-lg text-slate-800">
                    {item.name}
                  </h3>
                  <p className="text-blue-600 font-extrabold">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  {/* Kontrol Quantity */}
                  <div className="flex items-center bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, "minus")}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-slate-50 active:scale-90 transition-all disabled:opacity-50 cursor-pointer"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-slate-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, "plus")}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-slate-50 active:scale-90 transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Total per Item */}
                  <div className="text-right min-w-[120px]">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">
                      Subtotal
                    </p>
                    <p className="font-bold text-slate-900">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>

                  {/* Tombol Hapus */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                    title="Hapus barang"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ringkasan Pembayaran */}
          <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-slate-400 font-medium">
                  Total Estimasi Investasi
                </p>
                <p className="text-3xl font-black text-blue-400">
                  Rp {totalHarga.toLocaleString("id-ID")}
                </p>
              </div>
              <button className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                Lanjutkan ke Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
