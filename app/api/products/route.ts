import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, price, stock } = body;

  try {
    const [result] = await db.query(
      "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
      [name, price, stock],
    );
    return NextResponse.json({
      message: "Produk berhasil ditambahkan",
      id: (result as any).insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menambah produk" },
      { status: 500 },
    );
  }
}
