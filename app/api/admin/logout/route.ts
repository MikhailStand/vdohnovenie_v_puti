import { NextResponse } from "next/server";
import { assertSameOrigin, signOut } from "../../../../lib/auth";
export async function POST() {
  try { await assertSameOrigin(); await signOut(); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Ошибка выхода" }, { status: 400 }); }
}
