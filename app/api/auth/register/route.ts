import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    // 1. Validasi input sederhana
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 },
      );
    }

    // 2. Cek apakah email sudah terdaftar
    const [existingUser]: any = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Email sudah digunakan" },
        { status: 400 },
      );
    }

    // 3. Hash password (ini yang bikin aman)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Simpan ke database
    // Default role 'user' jika tidak ditentukan
    const userRole = role || "user";

    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, userRole],
    );

    return NextResponse.json(
      { message: "Registrasi berhasil!" },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Gagal mendaftarkan user" },
      { status: 500 },
    );
  }
}
