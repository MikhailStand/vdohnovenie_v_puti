import { NextResponse } from "next/server";
import { assertSameOrigin, requireAdmin } from "../../../../lib/auth";
import { uploadImage } from "../../../../lib/storage";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try { await assertSameOrigin(); await requireAdmin(); const form = await request.formData(); const file = form.get("file"); if (!(file instanceof File)) throw new Error("NO_FILE"); return NextResponse.json({ url: await uploadImage(file) }); }
  catch (error) { const message = error instanceof Error && error.message === "IMAGE_TOO_LARGE" ? "Файл больше 8 МБ" : "Не удалось загрузить изображение"; return NextResponse.json({ error: message }, { status: 400 }); }
}
