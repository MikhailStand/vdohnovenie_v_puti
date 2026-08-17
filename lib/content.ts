import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { ensureDatabase, getPool, mapContentRow } from "./db";
import { editableSections, type ContentSection } from "./default-content";

const sectionIds = editableSections.map((section) => section.id) as [ContentSection, ...ContentSection[]];
export const contentInput = z.object({
  section: z.enum(sectionIds),
  title: z.string().trim().max(120).default(""),
  description: z.string().trim().max(1000).default(""),
  imageUrl: z.string().trim().max(2000).default(""),
  duration: z.string().trim().max(80).default(""),
  groupSize: z.string().trim().max(80).default(""),
  price: z.string().trim().max(80).default(""),
  label: z.string().trim().max(100).default(""),
  position: z.coerce.number().int().min(0).max(999).default(0),
  isVisible: z.boolean().default(true),
});

export const settingsInput = z.object({
  phone: z.string().trim().max(40), phoneHref: z.string().trim().max(40),
  address: z.string().trim().max(200), city: z.string().trim().max(100), hours: z.string().trim().max(100),
  heroTitle: z.string().trim().max(120), heroAccent: z.string().trim().max(120), heroText: z.string().trim().max(500),
  aboutTitle: z.string().trim().max(180), aboutText: z.string().trim().max(1000),
});

export async function readContent() {
  await ensureDatabase();
  const [items, settings] = await Promise.all([
    getPool().query("SELECT * FROM content_items ORDER BY section, position, created_at"),
    getPool().query("SELECT value FROM site_settings WHERE key='general'"),
  ]);
  return { items: items.rows.map(mapContentRow), settings: settings.rows[0]?.value ?? {} };
}

export async function createContentItem(input: z.infer<typeof contentInput>) {
  const id = randomUUID();
  const values = [id, input.section, input.title, input.description, input.imageUrl, input.duration, input.groupSize, input.price, input.label, input.position, input.isVisible];
  const result = await getPool().query(`INSERT INTO content_items
    (id,section,title,description,image_url,duration,group_size,price,label,position,is_visible)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`, values);
  return mapContentRow(result.rows[0]);
}

export async function updateContentItem(id: string, input: z.infer<typeof contentInput>) {
  const values = [input.section, input.title, input.description, input.imageUrl, input.duration, input.groupSize, input.price, input.label, input.position, input.isVisible, id];
  const result = await getPool().query(`UPDATE content_items SET section=$1,title=$2,description=$3,image_url=$4,
    duration=$5,group_size=$6,price=$7,label=$8,position=$9,is_visible=$10,updated_at=now() WHERE id=$11 RETURNING *`, values);
  return result.rows[0] ? mapContentRow(result.rows[0]) : null;
}
