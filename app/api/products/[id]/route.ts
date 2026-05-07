import { NextResponse } from "next/server";
import db from "@/lib/db"; // Sesuaikan dengan path database kamu

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Gunakan Promise untuk Next.js 15
) {
  try {
    // 1. Ambil ID dari params (tambahkan await jika di Next.js 15)
    const { id } = await params;

    // 2. Ambil data dari body
    const body = await request.json();
    const { name, price, stock, description } = body;

    // 3. Validasi sederhana (opsional tapi disarankan)
    if (!name || !price) {
      return NextResponse.json(
        { error: "Nama dan Harga wajib diisi" },
        { status: 400 },
      );
    }

    // 4. Eksekusi Query
    const [result]: any = await db.query(
      "UPDATE products SET name = ?, price = ?, stock = ?, description = ? WHERE id = ?",
      [name, price, stock, description, id],
    );

    // 5. Cek apakah ada baris yang berubah
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Produk tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Produk berhasil diperbarui" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui produk di database" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Gunakan Promise untuk params
) {
  try {
    // 1. Await params untuk mendapatkan ID (Penting di Next.js 15)
    const { id } = await params;

    // 2. Eksekusi query delete
    const [result]: any = await db.query("DELETE FROM products WHERE id = ?", [
      id,
    ]);

    // 3. Cek apakah ada data yang benar-benar terhapus
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Produk tidak ditemukan atau sudah terhapus" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus produk dari database" },
      { status: 500 },
    );
  }
}
