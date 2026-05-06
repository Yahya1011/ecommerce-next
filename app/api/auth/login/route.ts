import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );
    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      // Set Cookie Sederhana (Untuk Enterprise, gunakan NextAuth.js atau Jose)
      cookies().set("user_role", user.role, { httpOnly: true });
      cookies().set("user_name", user.name, { httpOnly: true });

      return NextResponse.json({ message: "Login Berhasil", role: user.role });
    }

    return NextResponse.json(
      { error: "Email atau password salah" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
