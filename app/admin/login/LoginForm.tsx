"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter(); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(""); const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ username: data.get("username"), password: data.get("password") }) });
    const result = await response.json(); setLoading(false); if (!response.ok) return setError(result.error); router.push("/admin"); router.refresh();
  }
  return <form className="admin-login-card" onSubmit={submit}>
    <Link href="/" className="admin-brand">Вдохновение в пути</Link><h1>Управление сайтом</h1><p>Войдите, чтобы менять содержание сайта.</p>
    <label>Логин<input name="username" autoComplete="username" required /></label>
    <label>Пароль<input name="password" type="password" autoComplete="current-password" required /></label>
    {error && <div className="admin-error">{error}</div>}<button disabled={loading}>{loading ? "Входим…" : "Войти"}</button>
  </form>;
}
