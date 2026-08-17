export type ContentSection =
  | "directions"
  | "massages"
  | "class_prices"
  | "massage_prices"
  | "memberships";

export type ContentItem = {
  id: string;
  section: ContentSection;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  groupSize: string;
  price: string;
  label: string;
  position: number;
  isVisible: boolean;
};

export const editableSections: Array<{ id: ContentSection; label: string }> = [
  { id: "directions", label: "Направления" },
  { id: "massages", label: "Виды массажа" },
  { id: "class_prices", label: "Цены занятий" },
  { id: "massage_prices", label: "Цены массажа" },
  { id: "memberships", label: "Абонементы" },
];

const make = (
  section: ContentSection,
  position: number,
  title: string,
  description: string,
  extra: Partial<ContentItem> = {},
): ContentItem => ({
  id: `${section}-${position}`,
  section,
  title,
  description,
  imageUrl: "",
  duration: "",
  groupSize: "",
  price: "",
  label: "",
  position,
  isVisible: true,
  ...extra,
});

export const defaultContent: ContentItem[] = [
  make("directions", 1, "Хатха-йога", "Спокойная, внимательная практика: укрепляем тело, раскрываем дыхание и возвращаем внутреннюю опору.", { duration: "60 минут", groupSize: "Группа до 8 человек", imageUrl: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1100&q=85" }),
  make("directions", 2, "Йогатерапия", "Практика для женского здоровья по методу Birthlight Well Woman Yoga — мягко и с вниманием к состоянию.", { duration: "60 минут", groupSize: "Группа до 8 человек", imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=85" }),
  make("directions", 3, "Аэройога", "Практика в мини-группе: гамак, баланс, координация и бережное вытяжение позвоночника.", { duration: "60 минут", groupSize: "Мини-группа до 4 человек", imageUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1100&q=85" }),
  make("directions", 4, "Здоровая спина", "Программа для укрепления мышц спины, оздоровления позвоночника и улучшения осанки.", { duration: "60 минут", groupSize: "Группа до 8 человек", imageUrl: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?auto=format&fit=crop&w=1100&q=85" }),
  make("directions", 5, "Пилатес", "Плавная часовая тренировка для развития гибкости, подвижности и укрепления мышц корпуса.", { duration: "60 минут", groupSize: "Группа до 8 человек", imageUrl: "https://images.pexels.com/photos/8614454/pexels-photo-8614454.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("directions", 6, "Аэростретчинг", "Мягкая растяжка в гамаках с динамическими, статическими и перевёрнутыми положениями.", { duration: "60 минут", groupSize: "Мини-группа до 4 человек", imageUrl: "https://images.pexels.com/photos/4999398/pexels-photo-4999398.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("directions", 7, "Кундалини-йога", "Йога осознания, объединяющая движение, дыхание, внимание и медитативную практику.", { duration: "60 минут", groupSize: "Группа до 8 человек", imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1100&q=85" }),
  make("directions", 8, "Фитнес + растяжка", "Динамическая тренировка в мини-группе: укрепление мышц всего тела и работа над гибкостью.", { duration: "60 минут", groupSize: "Мини-группа до 5 человек", imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1100&q=85" }),
  make("directions", 9, "Стретчинг", "Мягкая работа над гибкостью и подвижностью суставов без резких движений и перегрузки.", { duration: "60 минут", groupSize: "Группа до 8 человек", imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1100&q=85" }),
  make("directions", 10, "Гвоздестояние", "Практика концентрации и знакомства с доской Садху под внимательным сопровождением преподавателя.", { duration: "60 минут", groupSize: "Группа до 8 человек", imageUrl: "https://images.pexels.com/photos/7484935/pexels-photo-7484935.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("directions", 11, "Слушая тело", "Танцевальная практика, в которой движение помогает лучше почувствовать тело и свободнее выражать себя.", { duration: "60 минут", groupSize: "Группа до 8 человек", imageUrl: "https://images.pexels.com/photos/36189008/pexels-photo-36189008.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("directions", 12, "Растяжка в гамаках", "Гамак помогает безопасно развивать гибкость и снять напряжение со спины.", { duration: "60 минут", groupSize: "Мини-группа до 4 человек", imageUrl: "https://images.pexels.com/photos/6582856/pexels-photo-6582856.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("massages", 1, "Воротниковая зона", "Мягкая работа с шеей и плечами, помогающая снять накопившееся напряжение.", { duration: "30 минут", imageUrl: "https://images.pexels.com/photos/14187889/pexels-photo-14187889.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("massages", 2, "Массаж спины", "Проработка мышц спины для расслабления, восстановления и ощущения лёгкости.", { duration: "30 минут", imageUrl: "https://images.pexels.com/photos/4599403/pexels-photo-4599403.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("massages", 3, "Общий спортивный", "Интенсивная работа с мышцами всего тела после нагрузок и активных тренировок.", { duration: "60 минут", imageUrl: "https://images.pexels.com/photos/6628647/pexels-photo-6628647.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("massages", 4, "Тайский массаж", "Сочетание мягких надавливаний и растяжения для подвижности и глубокого расслабления.", { duration: "90 минут", imageUrl: "https://images.pexels.com/photos/3865491/pexels-photo-3865491.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("massages", 5, "Relax-массаж", "Спокойный сеанс для снятия усталости, переключения внимания и отдыха.", { duration: "60 минут", imageUrl: "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("massages", 6, "Массаж стоп", "Деликатная проработка стоп для расслабления и уменьшения ощущения тяжести.", { duration: "30 минут", imageUrl: "https://images.pexels.com/photos/19695942/pexels-photo-19695942.jpeg?auto=compress&cs=tinysrgb&w=1100" }),
  make("class_prices", 1, "Разовое посещение", "Любое групповое занятие.", { label: "Групповое занятие", price: "550 ₽" }),
  make("class_prices", 2, "Индивидуальное занятие", "Точная стоимость зависит от направления.", { label: "Персонально", price: "до 1 100 ₽" }),
  make("massage_prices", 1, "30 минут", "Для воротниковой зоны, спины или стоп.", { label: "Короткий сеанс", price: "от 1 200 ₽" }),
  make("massage_prices", 2, "60 минут", "Общий спортивный, relax-массаж и другие программы.", { label: "Основной формат", price: "от 2 000 ₽" }),
  make("massage_prices", 3, "90 минут", "Продолжительный сеанс, включая тайский массаж.", { label: "Глубокое расслабление", price: "от 2 800 ₽" }),
  make("memberships", 1, "8 занятий", "900 ₽ за одно посещение", { label: "Лёгкий старт", price: "7 200 ₽" }),
  make("memberships", 2, "12 занятий", "825 ₽ за одно посещение", { label: "В ритме", price: "9 900 ₽" }),
  make("memberships", 3, "16 занятий", "775 ₽ за одно посещение", { label: "Регулярная практика", price: "12 400 ₽" }),
];

export const defaultSettings = {
  phone: "+7 930 909-88-82",
  phoneHref: "+79309098882",
  address: "Дворцовый проезд, 8/14",
  city: "Королёв",
  hours: "Ежедневно · 07:00—22:00",
  heroTitle: "Йога и движение",
  heroAccent: "для вашего тела",
  heroText: "Выберите подходящее занятие, узнайте стоимость и запишитесь в студию в Королёве.",
  aboutTitle: "Студия для начинающих и опытных учеников",
  aboutText: "В «Вдохновении в пути» можно заниматься йогой, пилатесом, фитнесом и растяжкой, попробовать практики в гамаках или записаться на массаж.",
};
