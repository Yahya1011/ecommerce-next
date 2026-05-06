import pool from "@/lib/db";

async function getUsers() {
  const [rows] = await pool.query(
    "SELECT id, name, email, role, created_at FROM users ORDER BY id DESC",
  );
  return rows as any[];
}

export default async function UserManagement() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
            <tr>
              <th className="p-4 font-semibold">Nama</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-800">{user.name}</td>
                <td className="p-4 text-slate-600">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === "admin" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-red-600 hover:underline text-sm font-medium">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
