import { NextResponse } from "next/server";
import db from "@/lib/db";

// UPDATE PRODUK
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const { name, price, stock, description } = await request.json();

    await db.query(
      "UPDATE products SET name = ?, price = ?, stock = ?, description = ? WHERE id = ?",
      [name, price, stock, description, id],
    );

    return NextResponse.json({ message: "Produk berhasil diperbarui" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal memperbarui produk" },
      { status: 500 },
    );
  }
}

// HAPUS PRODUK
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus produk" },
      { status: 500 },
    );
  }
}
