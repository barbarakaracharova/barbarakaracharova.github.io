import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  FileText,
  Instagram,
  MessageCircle,
  Shield,
  Sparkles,
} from "lucide-react";
import "./styles.css";

const links = {
  booking: "https://forms.gle/uEQjb3G1icpALYnp9",
  telegram: "https://t.me/barbarakaracharovaa",
  instagram: "https://www.instagram.com/barbarakaracharova.a/",
  docs: "https://drive.google.com/drive/folders/1oplxtSNpSCYeQsyoCgzILNulmMn6hGnl?usp=sharing",
  privacy: "privacy.html",
  offer: "offer.html",
};

const requests = [
  {
    title: "Эмоциональная нестабильность",
    text: "Когда реакции становятся слишком сильными, быстро появляется стыд, вина, злость или страх отвержения, а потом сложно вернуться в устойчивое состояние.",
  },
  {
    title: "БАР, ПРЛ, ПТСР",
    text: "Опыт жизни с диагнозом, ремиссия, страх срыва, отношения с лечением, навыки самоподдержки и попытка построить жизнь не вокруг кризиса.",
  },
  {
    title: "Тревога и депрессивные состояния",
    text: "Навязчивые мысли, напряжение, апатия, ощущение бессилия, потеря контакта с желаниями и с собственной жизнью.",
  },
  {
    title: "Стыд, вина и внутренняя критика",
    text: "Ощущение, что с вами что-то фундаментально не так, постоянная попытка себя чинить, заслуживать право быть собой.",
  },
  {
    title: "Отношения и привязанность",
    text: "Страх близости и отвержения, зависимость от реакции другого человека, сложные расставания, созависимость и потеря контакта с собой.",
  },
  {
    title: "Границы и злость",
    text: "Когда злость кажется опасной для отношений, а границы путаются с агрессией, конфликтом или чувством вины.",
  },
  {
    title: "Одиночество и идентичность",
    text: "Пустота, вопрос «кто я вообще», нехватка живого контакта, сложность собирать себя вне ролей, диагноза или чужих ожиданий.",
  },
  {
    title: "Самоповреждение в анамнезе",
    text: "Бережная работа с опытом сильного напряжения, стыда после реакций и поиском более безопасных способов справляться.",
  },
];

const posts = [
  {
    title: "Не романтизировать расстройства",
    href: "https://t.me/barbarakaracharovaa/2114",
    text: "О том, почему за эстетикой боли часто теряется реальность БАР, ПРЛ, депрессии, лечения и ежедневного восстановления.",
  },
  {
    title: "Почему ремиссия может пугать",
    href: "https://t.me/barbarakaracharovaa/2117",
    text: "Про потерю привычной версии себя, знакомость срыва и необходимость строить идентичность не вокруг боли.",
  },
  {
    title: "Созависимость, стыд и потеря себя",
    href: "https://t.me/barbarakaracharovaa/2118",
    text: "Разбор книги и механизмов жизни через другого человека: подстройка, спасательство, эмоциональное сканирование.",
  },
  {
    title: "Не все нужно чинить",
    href: "https://t.me/barbarakaracharovaa/2135",
    text: "О терапии не как о бесконечном ремонте себя, а как о способе понимать, принимать и учитывать разные части опыта.",
  },
  {
    title: "Злость после дисфункционального опыта",
    href: "https://t.me/barbarakaracharovaa/2136",
    text: "Про злость, месть, границы, бессилие и боль у людей, выросших в семьях с насилием, унижением или пренебрежением.",
  },
  {
    title: "Внимание и близость — не одно и то же",
    href: "https://t.me/barbarakaracharovaa/2133",
    text: "О взрослом одиночестве, дружбе, блоге, границах и устойчивости, которая строится через разные связи.",
  },
];

const limits = [
  {
    title: "Я не работаю единоразово",
    text: "Одна встреча может помочь познакомиться и обозначить запрос, но глубокая психологическая работа требует регулярности и времени.",
  },
  {
    title: "Я не психиатр",
    text: "Я не ставлю медицинские диагнозы и не назначаю медикаменты. При необходимости могу рекомендовать обратиться к врачу-психиатру.",
  },
  {
    title: "Я не работаю краткосрочно",
    text: "Если запрос связан с устойчивыми паттернами, травматичным опытом, БАР, ПРЛ, ПТСР или отношениями, мы планируем не быстрый совет, а процесс.",
  },
];

const education = [
  "В процессе получения бакалавра по «Психологии»",
  "Профессиональная переподготовка по клинической психологии",
  "Когнитивно-поведенческая терапия",
  "Когнитивно-поведенческие методы работы с зависимостями",
  "Психология созависимости",
  "Актуальные вопросы психиатрии и психотерапии",
  "Суицидология",
  "Член Ассоциации АКПП",
];

const faq = [
  {
    question: "Какой подход используется в работе?",
    answer:
      "Я работаю в когнитивно-поведенческом подходе и использую методы ДБТ и ACT. Эти инструменты помогают работать с эмоциями, внутренними конфликтами, ценностями, острыми состояниями и хроническим стрессом.",
  },
  {
    question: "Можно ли прийти, если я раньше не был у психолога?",
    answer:
      "Да. Первая встреча нужна, чтобы спокойно познакомиться, обозначить запрос и понять, какой формат работы будет бережным и полезным именно для вас.",
  },
  {
    question: "Сколько стоит консультация?",
    answer: "Стоимость онлайн-сессии — 4000 ₽. Запись проходит через форму.",
  },
];

const steps = [
  ["Запись", "Вы оставляете заявку через форму, выбираете удобный способ связи и время."],
  ["Первая встреча", "Мы знакомимся, обсуждаем запрос и смотрим, насколько вам подходит мой формат работы."],
  ["Регулярная работа", "Исследуем переживания, реакции, отношения, повторяющиеся сценарии и способы выдерживать напряжение."],
  ["Опора", "Постепенно появляется больше ясности, навыков, контакта с собой и устойчивости в повседневной жизни."],
];

const reveal = {
  hidden: { opacity: 0, y: 22, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-90px" }}
      variants={reveal}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="reading-progress" style={{ scaleX }} />;
}

function ParallaxImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-10, 16]);
  return (
    <motion.img
      style={{ y }}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="В начало">
        ВЛ
      </a>
      <nav aria-label="Основная навигация">
        <a href="#requests">Запросы</a>
        <a href="#posts">Посты</a>
        <a href="#format">Формат</a>
        <a href="#price">Стоимость</a>
        <a href="#contacts">Контакты</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero section">
      <FadeIn className="hero-copy">
        <span className="eyebrow">Клинический психолог с личной историей</span>
        <h1>
          Варвара
          <br />
          Лузан
        </h1>
        <p className="lead">
          Пространство для разговора о том, что обычно сложно объяснить без стыда,
          самозащиты и попытки срочно стать «нормальным».
        </p>
        <p>
          Работаю в КПТ-подходе с использованием ДБТ и ACT. Много пишу о БАР, ПРЛ,
          ПТСР, отношениях, стыде, границах и восстановлении.
        </p>
        <div className="hero-meta">
          <span>онлайн</span>
          <span>4000 ₽</span>
          <span>регулярная работа</span>
        </div>
        <div className="actions">
          <a className="button primary" href={links.booking} target="_blank" rel="noreferrer">
            Записаться <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="button secondary" href={links.telegram} target="_blank" rel="noreferrer">
            Telegram <MessageCircle size={18} aria-hidden="true" />
          </a>
        </div>
      </FadeIn>
      <FadeIn className="hero-visual">
        <img
          src="/images/hero.webp"
          alt="Варвара Лузан"
          className="hero-image"
          loading="eager"
          decoding="async"
        />
        <div className="hero-caption">
          <span>перевожу ощущения, которым человек никогда не мог найти слова</span>
        </div>
      </FadeIn>
    </section>
  );
}

function Requests() {
  return (
    <section id="requests" className="section requests-section">
      <FadeIn className="section-heading split-heading">
        <span className="eyebrow">С какими запросами можно прийти</span>
        <h2>Когда внутри слишком много, а слов пока недостаточно</h2>
      </FadeIn>
      <div className="request-list">
        {requests.map((item, index) => (
          <FadeIn className="request-row" key={item.title}>
            <span className="row-number">[{String(index + 1).padStart(2, "0")}]</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="section approach">
      <FadeIn className="quote-block">
        <Shield size={24} aria-hidden="true" />
        <h2>
          Почему
          <br />
          ко мне
          <br />
          приходят
        </h2>
        <p>
          «Какие‑то части себя нужно понимать, какие‑то — принимать, какие‑то —
          учиться учитывать, а какие‑то вообще оказываются не поломкой, а обычным
          человеческим опытом».
        </p>
        <a href="https://t.me/barbarakaracharovaa/2135" target="_blank" rel="noreferrer">
          Читать пост в Telegram
        </a>
      </FadeIn>
      <div className="approach-side">
        <ParallaxImage
          src="/images/portrait.webp"
          alt="Портрет Варвары Лузан"
          className="soft-photo"
        />
      </div>
    </section>
  );
}

function Posts() {
  return (
    <section id="posts" className="section posts-section">
      <FadeIn className="section-heading split-heading">
        <span className="eyebrow">Важные посты</span>
        <h2>Тексты, по которым можно почувствовать мой язык и темы</h2>
      </FadeIn>
      <div className="posts-grid">
        {posts.map((post, index) => (
          <FadeIn className="post-card" key={post.href}>
            <span className="row-number">[{String(index + 1).padStart(2, "0")}]</span>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <a href={post.href} target="_blank" rel="noreferrer">
              Читать <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function FormatBoundaries() {
  return (
    <section id="format" className="section format-section">
      <FadeIn className="format-intro">
        <span className="eyebrow">Важно про формат</span>
        <h2>Я работаю не в логике быстрых советов</h2>
      </FadeIn>
      <div className="limits-grid">
        {limits.map((item, index) => (
          <FadeIn className="limit-card" key={item.title}>
            <span className="row-number">[{String(index + 1).padStart(2, "0")}]</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process-section">
      <FadeIn className="section-heading narrow">
        <span className="eyebrow">Как проходят консультации</span>
        <h2>
          Без спешки.
          <br />
          С ясной рамкой.
          <br />В контакте.
        </h2>
      </FadeIn>
      <div className="steps">
        {steps.map(([title, text], index) => (
          <FadeIn className="step" key={title}>
            <span className="step-number">{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section education">
      <FadeIn className="section-heading">
        <span className="eyebrow">Образование и документы</span>
        <h2>Обучение и профессиональная подготовка</h2>
      </FadeIn>
      <div className="education-layout">
        <div className="education-list">
          {education.map((item) => (
            <FadeIn className="education-card" key={item}>
              <BookOpen size={20} aria-hidden="true" />
              <span>{item}</span>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="document-card">
          <img src="/docs/akpp.jpg" alt="Документ о членстве в АКПП" loading="lazy" />
          <a href={links.docs} target="_blank" rel="noreferrer">
            Открыть документы <FileText size={18} aria-hidden="true" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function Price() {
  return (
    <section id="price" className="section price-section">
      <FadeIn className="price-card">
        <div>
          <span className="eyebrow">Стоимость</span>
          <h2>Онлайн-сессия</h2>
          <p>Запись через форму. Стоимость одной консультации.</p>
        </div>
        <div className="price-value">4000 ₽</div>
        <a className="button primary" href={links.booking} target="_blank" rel="noreferrer">
          Записаться <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </FadeIn>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq">
      <FadeIn className="section-heading narrow">
        <span className="eyebrow">FAQ</span>
        <h2>Перед первой встречей</h2>
      </FadeIn>
      <div className="faq-list">
        {faq.map((item, index) => (
          <FadeIn className="faq-item" key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(open === index ? -1 : index)}
              aria-expanded={open === index}
            >
              <span>{item.question}</span>
              <ChevronDown className={open === index ? "rotated" : ""} size={20} />
            </button>
            {open === index && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {item.answer}
              </motion.p>
            )}
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="section contacts">
      <FadeIn className="contact-copy">
        <Sparkles size={24} aria-hidden="true" />
        <h2>Контакты</h2>
        <p>
          Самый прямой путь — форма записи. Для живого контекста и публикаций можно
          перейти в Telegram или Instagram.
        </p>
        <div className="contact-links">
          <a href={links.booking} target="_blank" rel="noreferrer">
            Записаться <ArrowUpRight size={18} />
          </a>
          <a href={links.telegram} target="_blank" rel="noreferrer">
            Telegram <MessageCircle size={18} />
          </a>
          <a href={links.instagram} target="_blank" rel="noreferrer">
            Instagram <Instagram size={18} />
          </a>
        </div>
      </FadeIn>
      <ParallaxImage src="/images/contact.webp" alt="Варвара Лузан" className="contact-photo" />
    </section>
  );
}

function JsonLd() {
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Person", "Psychologist"],
          name: "Варвара Лузан",
          alternateName: "barbari",
          jobTitle: "Клинический психолог",
          image: "/images/og.jpg",
          url: links.instagram,
          sameAs: [links.instagram, links.telegram],
          knowsAbout: ["КПТ", "ДБТ", "ACT", "ПРЛ", "БАР", "ПТСР", "созависимость"],
          memberOf: "Ассоциация КПТ терапевтов",
        },
        {
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
      ],
    }),
    [],
  );
  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}

function Footer() {
  return (
    <footer>
      <div className="source-notes">
        <span className="legal-links">
          <a href={links.privacy}>Политика конфиденциальности</a>
          <a href={links.offer}>Оферта</a>
        </span>
      </div>
      <span>© {new Date().getFullYear()} Варвара Лузан</span>
    </footer>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <>
      <JsonLd />
      <Progress />
      <Header />
      <main>
        <Hero />
        <Requests />
        <Approach />
        <Posts />
        <FormatBoundaries />
        <Process />
        <Education />
        <Price />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
