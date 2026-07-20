import { NextResponse } from "next/server";
import { authenticateRep, signRepSession } from "@/lib/rep-auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const session = authenticateRep(String(email), String(password));
    if (!session) {
      return NextResponse.json({ error: "Invalid login." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("le_rep_session", signRepSession(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}
