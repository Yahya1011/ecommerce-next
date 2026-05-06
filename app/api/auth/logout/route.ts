import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().delete("user_role");
  cookies().delete("user_name");
  return NextResponse.json({ message: "Logged out" });
}
