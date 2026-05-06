import pool from "@/lib/db";
import ProductTable from "@/components/admin/ProductTable"; // Impor komponen tadi
import Link from "next/link";

async function getProducts() {
  const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC");
  return rows as any[];
}

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Produk</h1>
        <Link href="/products/tambah">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-md cursor-pointer">
            + Tambah Produk
          </button>
        </Link>
      </div>

      {/* Panggil Komponen Client di sini */}
      <ProductTable products={products} />
    </div>
  );
}
