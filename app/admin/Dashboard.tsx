"use client";
/* eslint-disable @next/next/no-img-element */
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { editableSections, type ContentItem, type ContentSection, defaultSettings } from "../../lib/default-content";

type Props = { initialItems: ContentItem[]; initialSettings: typeof defaultSettings; username: string };
const empty = (section: ContentSection, position: number): ContentItem => ({ id: "", section, title: "", description: "", imageUrl: "", duration: "", groupSize: "", price: "", label: "", position, isVisible: true });

export default function Dashboard({ initialItems, initialSettings, username }: Props) {
  const router = useRouter(); const [items, setItems] = useState(initialItems); const [section, setSection] = useState<ContentSection>("directions");
  const [editing, setEditing] = useState<ContentItem | null>(null); const [settings, setSettings] = useState(initialSettings); const [message, setMessage] = useState("");
  const visible = useMemo(() => items.filter((item) => item.section === section).sort((a,b) => a.position-b.position), [items, section]);
  async function saveItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!editing) return; setMessage("Сохраняем…");
    const url = editing.id ? `/api/admin/content/${editing.id}` : "/api/admin/content"; const method = editing.id ? "PUT" : "POST";
    const response = await fetch(url, { method, headers: { "content-type": "application/json" }, body: JSON.stringify(editing) }); const result = await response.json();
    if (!response.ok) return setMessage(result.error); setItems((old) => editing.id ? old.map((x) => x.id === result.id ? result : x) : [...old, result]); setEditing(null); setMessage("Сохранено");
  }
  async function remove(item: ContentItem) { if (!confirm(`Удалить «${item.title}»?`)) return; const response = await fetch(`/api/admin/content/${item.id}`, { method: "DELETE" }); if (response.ok) setItems((old) => old.filter((x) => x.id !== item.id)); }
  async function upload(file?: File) { if (!file || !editing) return; setMessage("Загружаем фотографию…"); const form = new FormData(); form.append("file", file); const response = await fetch("/api/admin/upload", { method: "POST", body: form }); const result = await response.json(); if (response.ok) { setEditing({ ...editing, imageUrl: result.url }); setMessage("Фотография загружена"); } else setMessage(result.error); }
  async function saveSettings(event: FormEvent) { event.preventDefault(); const response = await fetch("/api/admin/settings", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(settings) }); setMessage(response.ok ? "Основные тексты сохранены" : "Не удалось сохранить"); }
  async function password(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const response = await fetch("/api/admin/password", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ current: form.get("current"), next: form.get("next"), confirm: form.get("confirm") }) }); const result = await response.json(); if (response.ok) { alert("Пароль изменён. Войдите заново."); router.push("/admin/login"); router.refresh(); } else setMessage(result.error); }
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); router.push("/admin/login"); router.refresh(); }
  const update = (key: keyof ContentItem, value: string | number | boolean) => editing && setEditing({ ...editing, [key]: value });
  return <main className="admin-shell"><header className="admin-header"><div><small>Панель управления</small><h1>Вдохновение в пути</h1></div><div><span>{username}</span><a href="/" target="_blank">Открыть сайт</a><button className="ghost" onClick={logout}>Выйти</button></div></header>
    {message && <div className="admin-message">{message}<button type="button" aria-label="Закрыть сообщение" onClick={() => setMessage("")}>×</button></div>}
    <section className="admin-panel"><h2>Карточки и цены</h2><p>Добавляйте содержание — внешний вид карточек останется одинаковым.</p><div className="admin-tabs">{editableSections.map((x) => <button className={section===x.id?"active":""} onClick={() => {setSection(x.id);setEditing(null)}} key={x.id}>{x.label}</button>)}</div>
      <div className="admin-list">{visible.map((item) => <article key={item.id}><div>{item.imageUrl && <img src={item.imageUrl} alt="" />}<strong>{item.title || item.label}</strong><span>{item.price || item.duration}</span></div><div><button onClick={() => setEditing(item)}>Изменить</button><button className="danger" onClick={() => remove(item)}>Удалить</button></div></article>)}</div>
      <button className="primary" onClick={() => setEditing(empty(section, visible.length + 1))}>Добавить</button>
    </section>
    {editing && <section className="admin-panel editor"><div className="editor-title"><h2>{editing.id ? "Редактирование" : "Новая карточка"}</h2><button className="ghost" onClick={() => setEditing(null)}>Закрыть</button></div><form onSubmit={saveItem}>
      <div className="form-grid"><label>Название<input value={editing.title} onChange={(e)=>update("title",e.target.value)} /></label><label>Подпись<input value={editing.label} onChange={(e)=>update("label",e.target.value)} /></label><label className="wide">Описание<textarea value={editing.description} onChange={(e)=>update("description",e.target.value)} /></label><label>Продолжительность<input value={editing.duration} onChange={(e)=>update("duration",e.target.value)} /></label><label>Размер группы<input value={editing.groupSize} onChange={(e)=>update("groupSize",e.target.value)} /></label><label>Цена<input value={editing.price} onChange={(e)=>update("price",e.target.value)} /></label><label>Порядок<input type="number" value={editing.position} onChange={(e)=>update("position",Number(e.target.value))} /></label></div>
      {(section==="directions"||section==="massages") && <div className="image-field">{editing.imageUrl && <img src={editing.imageUrl} alt="Предпросмотр" />}<label>Фотография<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e)=>upload(e.target.files?.[0])} /></label></div>}
      <label className="checkbox"><input type="checkbox" checked={editing.isVisible} onChange={(e)=>update("isVisible",e.target.checked)} /> Показывать на сайте</label><button className="primary">Сохранить карточку</button>
    </form></section>}
    <section className="admin-panel"><h2>Основные тексты и контакты</h2><form onSubmit={saveSettings}><div className="form-grid">{Object.entries(settings).map(([key,value]) => <label className={key.endsWith("Text")?"wide":""} key={key}>{({phone:"Телефон",phoneHref:"Телефон для ссылки",address:"Адрес",city:"Город",hours:"Время работы",heroTitle:"Заголовок",heroAccent:"Акцент заголовка",heroText:"Текст первого экрана",aboutTitle:"Заголовок о студии",aboutText:"Текст о студии"} as Record<string,string>)[key]}{key.endsWith("Text")?<textarea value={value} onChange={(e)=>setSettings({...settings,[key]:e.target.value})}/>:<input value={value} onChange={(e)=>setSettings({...settings,[key]:e.target.value})}/>}</label>)}</div><button className="primary">Сохранить тексты</button></form></section>
    <section className="admin-panel"><h2>Смена пароля</h2><form onSubmit={password} className="password-form"><label>Старый пароль<input type="password" name="current" required /></label><label>Новый пароль<input type="password" name="next" minLength={10} required /></label><label>Повторите новый пароль<input type="password" name="confirm" minLength={10} required /></label><button className="primary">Изменить пароль</button></form></section>
  </main>;
}
