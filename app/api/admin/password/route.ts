import { NextResponse } from "next/server";
import { z } from "zod";
import { assertSameOrigin, changePassword, requireAdmin } from "../../../../lib/auth";
const schema = z.object({ current: z.string().min(1), next: z.string().min(10).max(200), confirm: z.string() }).refine((v) => v.next === v.confirm);
export async function POST(request: Request) {
  try {
    await assertSameOrigin(); const admin = await requireAdmin(); const input = schema.parse(await request.json());
    if (!await changePassword(admin.id, input.current, input.next)) return NextResponse.json({ error: "Старый пароль указан неверно" }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Проверьте пароль: минимум 10 символов, новые пароли должны совпадать" }, { status: 400 }); }
}
