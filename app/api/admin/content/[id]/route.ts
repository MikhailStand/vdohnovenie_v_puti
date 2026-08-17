import { NextResponse } from "next/server";
import { assertSameOrigin, requireAdmin } from "../../../../../lib/auth";
import { contentInput, updateContentItem } from "../../../../../lib/content";
import { getPool } from "../../../../../lib/db";
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await assertSameOrigin(); await requireAdmin(); const { id } = await params; const item = await updateContentItem(id, contentInput.parse(await request.json())); return item ? NextResponse.json(item) : NextResponse.json({ error: "Не найдено" }, { status: 404 }); }
  catch { return NextResponse.json({ error: "Не удалось сохранить" }, { status: 400 }); }
}
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await assertSameOrigin(); await requireAdmin(); const { id } = await params; await getPool().query("DELETE FROM content_items WHERE id=$1", [id]); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Не удалось удалить" }, { status: 400 }); }
}
