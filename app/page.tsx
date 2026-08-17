"use client";

import { useEffect, useState } from "react";
import { defaultContent, defaultSettings, type ContentItem } from "../lib/default-content";

/*
const directions = [
  {
    number: "01",
    title: "Хатха-йога",
    text: "Спокойная, внимательная практика: укрепляем тело, раскрываем дыхание и возвращаем внутреннюю опору.",
    duration: "60 минут",
    group: "Группа до 8 человек",
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "02",
    title: "Йогатерапия",
    text: "Практика для женского здоровья по методу Birthlight Well Woman Yoga — мягко и с вниманием к состоянию.",
    duration: "60 минут",
    group: "Группа до 8 человек",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "03",
    title: "Аэройога",
    text: "Практика в мини-группе до четырёх человек: гамак, баланс, координация и бережное вытяжение позвоночника.",
    duration: "60 минут",
    group: "Мини-группа до 4 человек",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "04",
    title: "Здоровая спина",
    text: "Программа для укрепления мышц спины, оздоровления позвоночника и улучшения осанки.",
    duration: "60 минут",
    group: "Группа до 8 человек",
    image: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "05",
    title: "Пилатес",
    text: "Плавная часовая тренировка для развития гибкости, подвижности и укрепления мышц корпуса.",
    duration: "60 минут",
    group: "Группа до 8 человек",
    image: "https://images.pexels.com/photos/8614454/pexels-photo-8614454.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "06",
    title: "Аэростретчинг",
    text: "Мягкая растяжка в гамаках с динамическими, статическими и перевёрнутыми положениями.",
    duration: "60 минут",
    group: "Мини-группа до 4 человек",
    image: "https://images.pexels.com/photos/4999398/pexels-photo-4999398.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "07",
    title: "Кундалини-йога",
    text: "Йога осознания, объединяющая движение, дыхание, внимание и медитативную практику.",
    duration: "60 минут",
    group: "Группа до 8 человек",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "08",
    title: "Фитнес + растяжка",
    text: "Динамическая тренировка в мини-группе: укрепление мышц всего тела и работа над гибкостью.",
    duration: "60 минут",
    group: "Мини-группа до 5 человек",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "09",
    title: "Стретчинг",
    text: "Мягкая работа над гибкостью и подвижностью суставов без резких движений и перегрузки.",
    duration: "60 минут",
    group: "Группа до 8 человек",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "10",
    title: "Гвоздестояние",
    text: "Практика концентрации и знакомства с доской Садху под внимательным сопровождением преподавателя.",
    duration: "60 минут",
    group: "Группа до 8 человек",
    image: "https://images.pexels.com/photos/7484935/pexels-photo-7484935.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "11",
    title: "Слушая тело",
    text: "Танцевальная практика, в которой движение помогает лучше почувствовать тело и свободнее выражать себя.",
    duration: "60 минут",
    group: "Группа до 8 человек",
    image: "https://images.pexels.com/photos/36189008/pexels-photo-36189008.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "12",
    title: "Растяжка в гамаках",
    text: "Занятие для начинающих: гамак помогает безопасно развивать гибкость и снять напряжение со спины.",
    duration: "60 минут",
    group: "Мини-группа до 4 человек",
    image: "https://images.pexels.com/photos/6582856/pexels-photo-6582856.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
];

const massages = [
  {
    number: "01",
    title: "Воротниковая зона",
    text: "Мягкая работа с шеей и плечами, помогающая снять накопившееся напряжение.",
    duration: "30 минут",
    image: "https://images.pexels.com/photos/14187889/pexels-photo-14187889.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "02",
    title: "Массаж спины",
    text: "Проработка мышц спины для расслабления, восстановления и ощущения лёгкости.",
    duration: "30 минут",
    image: "https://images.pexels.com/photos/4599403/pexels-photo-4599403.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "03",
    title: "Общий спортивный",
    text: "Интенсивная работа с мышцами всего тела после нагрузок и активных тренировок.",
    duration: "60 минут",
    image: "https://images.pexels.com/photos/6628647/pexels-photo-6628647.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "04",
    title: "Тайский массаж",
    text: "Сочетание мягких надавливаний и растяжения для подвижности и глубокого расслабления.",
    duration: "90 минут",
    image: "https://images.pexels.com/photos/3865491/pexels-photo-3865491.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "05",
    title: "Relax-массаж",
    text: "Спокойный сеанс для снятия усталости, переключения внимания и отдыха.",
    duration: "60 минут",
    image: "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "06",
    title: "Массаж стоп",
    text: "Деликатная проработка стоп для расслабления и уменьшения ощущения тяжести.",
    duration: "30 минут",
    image: "https://images.pexels.com/photos/19695942/pexels-photo-19695942.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
];
*/

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [content, setContent] = useState<ContentItem[]>(defaultContent);
  const [settings, setSettings] = useState(defaultSettings);
  useEffect(() => {
    fetch("/api/content").then((response) => response.ok ? response.json() : null).then((data) => {
      if (data?.items?.length) setContent(data.items.filter((item: ContentItem) => item.isVisible));
      if (data?.settings) setSettings((current) => ({ ...current, ...data.settings }));
    }).catch(() => undefined);
  }, []);
  const directions = content.filter((item) => item.section === "directions").map((item) => ({ ...item, text: item.description, group: item.groupSize, image: item.imageUrl }));
  const massages = content.filter((item) => item.section === "massages").map((item) => ({ ...item, text: item.description, image: item.imageUrl }));
  const classPrices = content.filter((item) => item.section === "class_prices");
  const massagePrices = content.filter((item) => item.section === "massage_prices");
  const memberships = content.filter((item) => item.section === "memberships");
  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Вдохновение в пути — наверх">
          <span className="brand-mark">В</span>
          <span>вдохновение<br />в пути</span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#directions">Занятия</a>
          <a href="#massages">Массаж</a>
          <a href="#offers">Абонементы</a>
          <a href="#booking">Записаться</a>
        </nav>
        <div className="nav-actions">
          <a className="nav-button" href="tel:+79309098882">Позвонить <span className="link-arrow" aria-hidden="true">→</span></a>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="quick-menu"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`quick-menu ${menuOpen ? "is-open" : ""}`} id="quick-menu" aria-hidden={!menuOpen}>
        <div className="quick-menu-links">
          <a href="#directions" onClick={closeMenu}>Занятия</a>
          <a href="#formats" onClick={closeMenu}>Форматы групп</a>
          <a href="#prices" onClick={closeMenu}>Цены занятий</a>
          <a href="#massages" onClick={closeMenu}>Виды массажа</a>
          <a href="#massage-prices" onClick={closeMenu}>Цены массажа</a>
          <a href="#offers" onClick={closeMenu}>Абонементы</a>
          <a href="#about" onClick={closeMenu}>О студии</a>
        </div>
        <a className="quick-menu-cta" href="#booking" onClick={closeMenu}>Записаться / связаться <span className="link-arrow" aria-hidden="true">→</span></a>
      </div>

      <section className="hero" id="top">
        <div className="hero-photo" role="img" aria-label="Спокойная практика йоги в светлом зале" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Студия йоги в Королёве</p>
          <h1>{settings.heroTitle}<br /><em>{settings.heroAccent}</em></h1>
          <div className="hero-bottom">
            <p>{settings.heroText}</p>
            <nav className="hero-quick-links" aria-label="Быстрые переходы по сайту">
              <a href="#directions">Занятия</a>
              <a href="#massages">Массаж</a>
              <a href="#offers">Абонементы</a>
              <a href="#booking">Записаться</a>
            </nav>
          </div>
        </div>
        <div className="hero-info"><span>{settings.address}</span><span>{settings.hours}</span></div>
      </section>

      <section className="directions section" id="directions">
        <div className="section-heading">
          <h2>Какие занятия<br /><em>есть в студии</em></h2>
          <p>Листайте карточки, сравнивайте направления и выбирайте подходящую нагрузку.</p>
        </div>
        <div className="rail-controls">
          <span>Листайте карточки в сторону, чтобы увидеть все направления</span>
        </div>
        <div className="direction-grid">
          {directions.map((item) => (
            <article className="direction-card" key={item.title}>
              <div className="card-photo" style={{ backgroundImage: `url(${item.image})` }} />
              <div className="card-body">
                <div className="card-meta">
                  <span className="pill">{item.duration}</span>
                  <span className="pill">{item.group}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="formats section" id="formats">
        <div className="format-heading"><div><h2>Как можно заниматься</h2><p>Выберите не только направление, но и удобный способ занятий.</p></div></div>
        <div className="format-grid">
          <article><span>До 8 человек</span><h3>В группе</h3><p>Регулярные занятия вместе с другими участниками по общему расписанию студии.</p></article>
          <article><span>До 5 человек</span><h3>В мини-группе</h3><p>Больше внимания преподавателя: занятия в гамаках — до четырёх человек, фитнес — до пяти.</p></article>
          <article><h3>Персонально</h3><p>Индивидуальная практика с преподавателем, выстроенная под ваши задачи и подготовку.</p></article>
        </div>
      </section>

      <section className="prices section" id="prices">
        <div className="price-heading">
          <div><h2>Сколько стоят<br /><em>занятия</em></h2></div>
        </div>
        <div className="price-strip">
          {classPrices.map((item, index) => <article className={index === 0 ? "price-main" : ""} key={item.id}><div><span className="price-kicker">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p></div><strong>{item.price}</strong></article>)}
          <article className="price-help"><span className="price-kicker">Помощь с выбором</span><h3>Уточнить направление</h3><p>Администратор подскажет подходящий формат и наличие места.</p><a className="price-phone-link" href="tel:+79309098882">Позвонить администратору <span className="link-arrow" aria-hidden="true">→</span></a></article>
        </div>
      </section>

      <section className="massages section" id="massages">
        <div className="section-heading">
          <h2>Виды массажа<br /><em>в студии</em></h2>
          <p>Выберите подходящий формат восстановления и уточните удобное время у администратора.</p>
        </div>
        <div className="rail-controls">
          <span>Листайте карточки в сторону, чтобы увидеть все виды массажа</span>
        </div>
        <div className="direction-grid">
          {massages.map((item) => (
            <article className="direction-card" key={item.title}>
              <div className="card-photo" style={{ backgroundImage: `url(${item.image})` }} />
              <div className="card-body">
                <div className="card-meta"><span className="pill">{item.duration}</span></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="prices massage-prices section" id="massage-prices">
        <div className="price-heading">
          <div><h2>Стоимость<br /><em>массажа</em></h2></div>
        </div>
        <div className="price-strip massage-price-strip">
          {massagePrices.map((item, index) => <article className={index === 1 ? "price-main" : ""} key={item.id}><div><span className="price-kicker">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p></div><strong>{item.price}</strong></article>)}
        </div>

        <div className="membership-head" id="offers"><div><span>Специальные предложения</span><h3>Абонементы на месяц</h3></div></div>
        <div className="membership-grid">
          {memberships.map((item, index) => <article className={index === 1 ? "popular" : ""} key={item.id}><span>{item.label}</span><h3>{item.title}</h3><strong>{item.price}</strong><p>{item.description}</p></article>)}
        </div>
        <div className="gift-banner"><div><span>Подарок с заботой</span><h3>Подарочный сертификат</h3><p>На занятие, абонемент или массаж — сумма и оформление по согласованию со студией.</p></div><a href="tel:+79309098882">Уточнить <span className="link-arrow" aria-hidden="true">→</span></a></div>
      </section>

      <section className="studio-story" id="about">
        <div className="story-photo" role="img" aria-label="Светлое спокойное пространство для занятий йогой" />
        <div className="story-copy">
          <h2>{settings.aboutTitle}</h2>
          <p className="story-lead">{settings.aboutText}</p>
          <p>Если вы не знаете, что выбрать, администратор поможет подобрать занятие по цели, уровню подготовки и удобному формату.</p>
        </div>
      </section>

      <section className="pause-section">
        <div className="pause-copy"><p className="eyebrow"><span /> Время для себя</p><h2>Иногда нужно<br />просто <em>остановиться</em></h2></div>
        <blockquote>«После практики мир остаётся прежним. Но вы смотрите на него уже иначе»</blockquote>
      </section>

      <section className="booking section" id="booking">
        <div className="booking-copy">
          <h2>Ваш путь может<br />начаться <em>сегодня</em></h2>
          <p>Позвоните администратору — вам помогут выбрать подходящую практику, уточнят расписание и наличие места.</p>
        </div>
        <div className="booking-phone-card">
          <span>Администратор студии</span>
          <a href={`tel:${settings.phoneHref}`}>{settings.phone}</a>
          <p>{settings.hours}</p>
          <a className="call-button" href={`tel:${settings.phoneHref}`}>Позвонить администратору <span className="link-arrow" aria-hidden="true">→</span></a>
        </div>
      </section>

      <footer id="contacts">
        <div className="footer-top">
          <a className="brand footer-brand" href="#top"><span className="brand-mark">В</span><span>вдохновение<br />в пути</span></a>
          <h2>До встречи<br />на <em>коврике</em></h2>
          <div className="footer-contacts">
            <p>Королёв<br />Дворцовый проезд, 8/14</p>
            <a href="tel:+79309098882">+7 930 909-88-82</a>
            <a target="_blank" rel="noreferrer" href="https://yandex.ru/maps/org/vdokhnoveniye_v_puti/13801819850?si=h9gh1zbyxezk9ynxwa45vchxzm">Открыть на карте <span className="link-arrow" aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Вдохновение в пути</span><span>Демонстрационная версия сайта</span><a href="#top">Наверх ↑</a></div>
      </footer>
    </main>
  );
}
