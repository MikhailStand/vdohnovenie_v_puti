import { NextResponse } from "next/server";
import { readContent } from "../../../lib/content";

export const dynamic = "force-dynamic";
export async function GET() {
  try { return NextResponse.json(await readContent()); }
  catch { return NextResponse.json({ error: "CONTENT_UNAVAILABLE" }, { status: 503 }); }
}
