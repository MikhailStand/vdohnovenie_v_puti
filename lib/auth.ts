import "server-only";
import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { ensureDatabase, getPool } from "./db";

const COOKIE_NAME = "studio_admin_session";
const SESSION_DAYS = 7;

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const digest = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${digest}`;
}

function verifyPassword(password: string, stored: string) {
  const [algorithm, salt, digest] = stored.split(":");
  if (algorithm !== "scrypt" || !salt || !digest) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(digest, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export async function ensureBootstrapAdmin() {
  await ensureDatabase();
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_INITIAL_PASSWORD;
  if (!username || !password) return;
  const pool = getPool();
  const count = Number((await pool.query("SELECT count(*) AS count FROM admins")).rows[0].count);
  if (count === 0) {
    await pool.query(
      "INSERT INTO admins (id, username, password_hash) VALUES ($1, $2, $3)",
      [randomUUID(), username, hashPassword(password)],
    );
  }
}

export async function createSession(adminId: string) {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DAYS * 86400000);
  await getPool().query(
    "INSERT INTO admin_sessions (token_hash, admin_id, expires_at) VALUES ($1,$2,$3)",
    [hashToken(token), adminId, expires],
  );
  const store = await cookies();
  store.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires });
}

export async function getCurrentAdmin() {
  await ensureBootstrapAdmin();
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const result = await getPool().query(
    `SELECT admins.id, admins.username FROM admin_sessions
     JOIN admins ON admins.id = admin_sessions.admin_id
     WHERE token_hash=$1 AND expires_at > now()`,
    [hashToken(token)],
  );
  return result.rows[0] ?? null;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHORIZED");
  return admin as { id: string; username: string };
}

export async function authenticate(username: string, password: string, identity: string) {
  await ensureBootstrapAdmin();
  const pool = getPool();
  const attempt = await pool.query("SELECT attempts, blocked_until FROM login_attempts WHERE identity=$1", [identity]);
  if (attempt.rows[0]?.blocked_until && new Date(attempt.rows[0].blocked_until) > new Date()) return null;
  const result = await pool.query("SELECT id, password_hash FROM admins WHERE username=$1", [username]);
  const admin = result.rows[0];
  if (!admin || !verifyPassword(password, admin.password_hash)) {
    await pool.query(
      `INSERT INTO login_attempts (identity, attempts, blocked_until) VALUES ($1,1,NULL)
       ON CONFLICT (identity) DO UPDATE SET attempts=login_attempts.attempts+1,
       blocked_until=CASE WHEN login_attempts.attempts+1 >= 6 THEN now()+interval '15 minutes' ELSE NULL END,
       updated_at=now()`,
      [identity],
    );
    return null;
  }
  await pool.query("DELETE FROM login_attempts WHERE identity=$1", [identity]);
  return { id: admin.id as string };
}

export async function changePassword(adminId: string, current: string, next: string) {
  const result = await getPool().query("SELECT password_hash FROM admins WHERE id=$1", [adminId]);
  if (!result.rows[0] || !verifyPassword(current, result.rows[0].password_hash)) return false;
  await getPool().query("UPDATE admins SET password_hash=$1, updated_at=now() WHERE id=$2", [hashPassword(next), adminId]);
  await getPool().query("DELETE FROM admin_sessions WHERE admin_id=$1", [adminId]);
  (await cookies()).delete(COOKIE_NAME);
  return true;
}

export async function signOut() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token) await getPool().query("DELETE FROM admin_sessions WHERE token_hash=$1", [hashToken(token)]);
  store.delete(COOKIE_NAME);
}

export async function assertSameOrigin() {
  const h = await headers();
  const origin = h.get("origin");
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (origin && host && new URL(origin).host !== host) throw new Error("INVALID_ORIGIN");
}

export async function requestIdentity() {
  const h = await headers();
  return (h.get("x-forwarded-for")?.split(",")[0] ?? "unknown").trim();
}
