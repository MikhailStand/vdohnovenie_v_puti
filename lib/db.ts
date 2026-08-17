import "server-only";
import { Pool, type PoolClient } from "pg";
import { defaultContent, defaultSettings, type ContentItem } from "./default-content";

declare global {
  var studioPool: Pool | undefined;
  var studioSchemaReady: Promise<void> | undefined;
}

export function getPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  if (!globalThis.studioPool) {
    globalThis.studioPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
      max: 8,
    });
  }
  return globalThis.studioPool;
}

export async function ensureDatabase() {
  if (!globalThis.studioSchemaReady) globalThis.studioSchemaReady = initializeDatabase();
  return globalThis.studioSchemaReady;
}

async function initializeDatabase() {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id text PRIMARY KEY,
        username text UNIQUE NOT NULL,
        password_hash text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        token_hash text PRIMARY KEY,
        admin_id text NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
        expires_at timestamptz NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS login_attempts (
        identity text PRIMARY KEY,
        attempts integer NOT NULL DEFAULT 0,
        blocked_until timestamptz,
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_items (
        id text PRIMARY KEY,
        section text NOT NULL,
        title text NOT NULL DEFAULT '',
        description text NOT NULL DEFAULT '',
        image_url text NOT NULL DEFAULT '',
        duration text NOT NULL DEFAULT '',
        group_size text NOT NULL DEFAULT '',
        price text NOT NULL DEFAULT '',
        label text NOT NULL DEFAULT '',
        position integer NOT NULL DEFAULT 0,
        is_visible boolean NOT NULL DEFAULT true,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        key text PRIMARY KEY,
        value jsonb NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    const count = Number((await client.query("SELECT count(*) AS count FROM content_items")).rows[0].count);
    if (count === 0) await seedContent(client);
    await client.query(
      `INSERT INTO site_settings (key, value) VALUES ('general', $1::jsonb)
       ON CONFLICT (key) DO NOTHING`,
      [JSON.stringify(defaultSettings)],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    globalThis.studioSchemaReady = undefined;
    throw error;
  } finally {
    client.release();
  }
}

async function seedContent(client: PoolClient) {
  for (const item of defaultContent) {
    await client.query(
      `INSERT INTO content_items
       (id, section, title, description, image_url, duration, group_size, price, label, position, is_visible)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (id) DO NOTHING`,
      [item.id, item.section, item.title, item.description, item.imageUrl, item.duration, item.groupSize, item.price, item.label, item.position, item.isVisible],
    );
  }
}

export function mapContentRow(row: Record<string, unknown>): ContentItem {
  return {
    id: String(row.id),
    section: row.section as ContentItem["section"],
    title: String(row.title ?? ""),
    description: String(row.description ?? ""),
    imageUrl: String(row.image_url ?? ""),
    duration: String(row.duration ?? ""),
    groupSize: String(row.group_size ?? ""),
    price: String(row.price ?? ""),
    label: String(row.label ?? ""),
    position: Number(row.position ?? 0),
    isVisible: Boolean(row.is_visible),
  };
}
