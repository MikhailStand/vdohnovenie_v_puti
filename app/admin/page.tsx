import { redirect } from "next/navigation";
import { getCurrentAdmin } from "../../lib/auth";
import { readContent } from "../../lib/content";
import Dashboard from "./Dashboard";
import "./admin.css";

export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const admin = await getCurrentAdmin(); if (!admin) redirect("/admin/login");
  const data = await readContent();
  return <Dashboard initialItems={data.items} initialSettings={data.settings} username={String(admin.username)} />;
}
