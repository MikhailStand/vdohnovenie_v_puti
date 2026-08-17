import { NextResponse } from "next/server";
import { z } from "zod";
import { assertSameOrigin, authenticate, createSession, requestIdentity } from "../../../../lib/auth";

const schema = z.object({ username: z.string().trim().min(1).max(80), password: z.string().min(1).max(200) });
export async function POST(request: Request) {
  try {
    await assertSameOrigin();
    const input = schema.parse(await request.json());
    const admin = await authenticate(input.username, input.password, await requestIdentity());
    if (!admin) return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
    await createSession(admin.id);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Не удалось выполнить вход" }, { status: 400 }); }
}
