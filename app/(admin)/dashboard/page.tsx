import pool from "@/lib/db";

async function getStats() {
  const [products]: any = await pool.query(
    "SELECT COUNT(*) as total, SUM(stock) as totalStock FROM products",
  );
  return products[0];
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Total Produk</p>
          <h3 className="text-3xl font-bold text-slate-900">{stats.total}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">
            Total Stok Barang
          </p>
          <h3 className="text-3xl font-bold text-blue-600">
            {stats.totalStock || 0}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500 font-medium">Status Sistem</p>
          <h3 className="text-3xl font-bold text-green-500">Active</h3>
        </div>
      </div>
    </div>
  );
}
