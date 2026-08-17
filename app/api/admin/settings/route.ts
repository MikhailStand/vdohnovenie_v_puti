import { NextResponse } from "next/server";
import { assertSameOrigin, requireAdmin } from "../../../../lib/auth";
import { readContent, settingsInput } from "../../../../lib/content";
import { getPool } from "../../../../lib/db";
export async function GET() { try { await requireAdmin(); return NextResponse.json((await readContent()).settings); } catch { return NextResponse.json({ error: "Требуется вход" }, { status: 401 }); } }
export async function PUT(request: Request) {
  try { await assertSameOrigin(); await requireAdmin(); const value = settingsInput.parse(await request.json()); await getPool().query("INSERT INTO site_settings (key,value) VALUES ('general',$1::jsonb) ON CONFLICT (key) DO UPDATE SET value=$1::jsonb,updated_at=now()", [JSON.stringify(value)]); return NextResponse.json(value); }
  catch { return NextResponse.json({ error: "Не удалось сохранить настройки" }, { status: 400 }); }
}
