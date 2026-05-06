import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminPage =
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/products") ||
      req.nextUrl.pathname.startsWith("/users");

    // Jika mencoba akses admin tapi role bukan admin, tendang ke home
    if (isAdminPage && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Harus login dulu
    },
  },
);

// Tentukan rute mana saja yang harus diproteksi
export const config = {
  matcher: ["/dashboard/:path*", "/products/:path*", "/users/:path*"],
};
