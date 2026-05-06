import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Cari user dulu
        const [rows]: any = await pool.query(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email],
        );
        const user = rows[0];

        // 2. Jika user TIDAK ada, langsung return null (mencegah error 'undefined')
        if (!user) {
          console.log("User tidak ditemukan");
          return null;
        }

        // 3. Jika user ADA, baru bandingkan password
        const inputPassword = credentials.password.trim();
        const dbPassword = user.password.trim();

        const isMatch = await bcrypt.compare(inputPassword, dbPassword);
        console.log("Hasil Verifikasi:", isMatch);

        if (isMatch) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    // Memasukkan role ke dalam token JWT
    async jwt({ token, user }: any) {
      if (user) token.role = user.role;
      return token;
    },
    // Memasukkan role ke dalam session agar bisa diakses di frontend
    async session({ session, token }: any) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Arahkan ke halaman login custom kita
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
