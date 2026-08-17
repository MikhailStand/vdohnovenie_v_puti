import { redirect } from "next/navigation";
import { getCurrentAdmin } from "../../../lib/auth";
import LoginForm from "./LoginForm";
import "../admin.css";

export const dynamic = "force-dynamic";
export default async function LoginPage() {
  if (await getCurrentAdmin()) redirect("/admin");
  return <main className="admin-shell admin-login"><LoginForm /></main>;
}
