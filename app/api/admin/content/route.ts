import { NextResponse } from "next/server";
import { assertSameOrigin, requireAdmin } from "../../../../lib/auth";
import { contentInput, createContentItem, readContent } from "../../../../lib/content";
export const dynamic = "force-dynamic";
export async function GET() {
  try { await requireAdmin(); return NextResponse.json(await readContent()); }
  catch { return NextResponse.json({ error: "Требуется вход" }, { status: 401 }); }
}
export async function POST(request: Request) {
  try { await assertSameOrigin(); await requireAdmin(); const input = contentInput.parse(await request.json()); return NextResponse.json(await createContentItem(input), { status: 201 }); }
  catch { return NextResponse.json({ error: "Проверьте заполненные поля" }, { status: 400 }); }
}
