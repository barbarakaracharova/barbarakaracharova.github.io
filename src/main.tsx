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
  Sparkles,
} from "lucide-react";
import "./styles.css";

const links = {
  booking: "https://forms.gle/uEQjb3G1icpALYnp9",
  telegram: "https://t.me/barbarakaracharovaa",
  instagram: "https://www.instagram.com/se_live_psychology",
  docs: "https://drive.google.com/drive/folders/1oplxtSNpSCYeQsyoCgzILNulmMn6hGnl?usp=sharing",
  privacy: "privacy.html",
  offer: "offer.html",
};

const requests = [
  {
    title: "БАР, ПРЛ, ПТСР",
    text: "Когда диагноз становится не ярлыком, а частью опыта, с которым хочется научиться жить устойчивее.",
  },
  {
    title: "Эмоциональные качели",
    text: "Перепады состояний, импульсивность, пустота, стыд после реакций и ощущение, что внутри слишком много.",
  },
  {
    title: "Отношения и привязанность",
    text: "Страх быть брошенной, эмоциональная зависимость, болезненные расставания и поиск себя вне чужой реакции.",
  },
  {
    title: "Тревога и депрессивные состояния",
    text: "Навязчивые мысли, апатия, напряжение, хронический стресс и потеря контакта с желаниями.",
  },
  {
    title: "Стыд и внутренняя критика",
    text: "Когда кажется, что с вами что-то фундаментально не так, и приходится постоянно заслуживать право быть собой.",
  },
  {
    title: "Кризисы и самоподдержка",
    text: "Навыки ДБТ, которые помогают переживать острые состояния, выдерживать жизнь и возвращаться к опоре.",
  },
];

const notes = [
  "клинический психолог в обучении",
  "КПТ + ДБТ + ACT",
  "член Ассоциации АКПП",
  "долгосрочная онлайн-терапия",
];

const principles = [
  ["Безоценочность", "Можно говорить о сложном без страха, что вас будут чинить, стыдить или торопить."],
  ["Честность", "Я не обещаю быстрых чудес, но помогаю искать устойчивые шаги и понятную рамку."],
  ["Уважение", "У каждой истории есть контекст. Мне важно услышать его, а не подогнать человека под шаблон."],
];

const posts = [
  {
    title: "Не романтизировать расстройства",
    href: "https://t.me/barbarakaracharovaa/2114",
    text: "О том, почему за эстетикой боли часто теряется реальность БАР, ПРЛ, депрессии, лечения и восстановления.",
  },
  {
    title: "Почему ремиссия может пугать",
    href: "https://t.me/barbarakaracharovaa/2117",
    text: "Про потерю привычной версии себя и необходимость строить идентичность не вокруг боли.",
  },
  {
    title: "Не все нужно чинить",
    href: "https://t.me/barbarakaracharovaa/2135",
    text: "О терапии как способе понимать, принимать и учитывать разные части опыта.",
  },
];

const limits = [
  {
    title: "Я не психиатр",
    text: "Я не назначаю и не отменяю медикаменты, не подбираю лечение и не ставлю медицинские диагнозы.",
  },
  {
    title: "Я не разбираю клинические случаи в личных сообщениях",
    text: "Для этого есть терапевтический процесс с рамкой, регулярностью и ответственностью.",
  },
  {
    title: "Я работаю долгосрочно",
    text: "Если запрос связан с устойчивыми паттернами, отношениями, травмой или диагнозами, мы не ищем один быстрый совет.",
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

const reveal = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
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
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
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

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="В начало">
        ВЛ
      </a>
      <nav aria-label="Основная навигация">
        <a href="#requests">Запросы</a>
        <a href="#about">Обо мне</a>
        <a href="#format">Формат</a>
        <a href="#posts">Тексты</a>
        <a href="#contacts">Контакты</a>
      </nav>
      <a className="header-cta" href={links.booking} target="_blank" rel="noreferrer">
        Записаться <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-topline">
        <span>Варвара Лузан</span>
        <a href={links.telegram} target="_blank" rel="noreferrer">
          TG: @barbarakaracharovaa
        </a>
      </div>
      <div className="hero-layout">
        <FadeIn className="hero-copy">
          <span className="cloud" aria-hidden="true" />
          <p className="kicker">познакомимся?</p>
          <h1>
            Варя
            <br />
            клинический
            <br />
            психолог
          </h1>
          <p className="lead">
            Пространство, где можно говорить о БАР, ПРЛ, ПТСР, стыде,
            привязанности и эмоциональных качелях без попытки срочно стать
            «нормальной».
          </p>
          <div className="actions">
            <a className="button primary" href={links.booking} target="_blank" rel="noreferrer">
              Записаться <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href={links.telegram} target="_blank" rel="noreferrer">
              Telegram <MessageCircle size={18} aria-hidden="true" />
            </a>
          </div>
        </FadeIn>
        <FadeIn className="hero-collage">
          <img src="/images/varia-hero-cinematic.jpg" alt="Варвара Лузан" className="hero-photo" />
          <div className="paper-note">
            <span>привет. меня зовут Варя</span>
            <p>Я знакома с диагнозами не только как специалист и верю, что изменения возможны.</p>
          </div>
          <div className="scribble" aria-hidden="true" />
        </FadeIn>
      </div>
      <p className="footnote">
        * специалист с подготовкой в психопатологии, который помогает разбираться
        не только с диагнозами, но и со сложными эмоциональными состояниями.
      </p>
    </section>
  );
}

function Requests() {
  return (
    <section id="requests" className="section requests-section">
      <FadeIn className="section-heading">
        <span className="eyebrow">С чем можно прийти</span>
        <h2>когда внутри много, а слов пока недостаточно</h2>
      </FadeIn>
      <div className="request-grid">
        {requests.map((item, index) => (
          <FadeIn className="request-card" key={item.title}>
            <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <FadeIn className="about-photo-wrap">
        <img src="/images/varia-street.jpg" alt="Варвара Лузан на улице" className="about-photo" />
      </FadeIn>
      <FadeIn className="about-copy">
        <span className="eyebrow">обо мне</span>
        <h2>я — Варя</h2>
        <p>
          Клинический психолог в обучении, мама двоих детей, человек с непростым
          прошлым и длительным опытом личной терапии.
        </p>
        <p>
          Сейчас я в ремиссии БАР, а критерии ПРЛ скомпенсированы. Возможно,
          поэтому я слишком хорошо знаю, насколько безнадежными могут казаться
          эти состояния — и насколько на самом деле возможны изменения.
        </p>
        <div className="note-list">
          {notes.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function Principles() {
  return (
    <section className="section principles-section">
      <FadeIn className="section-heading narrow">
        <span className="eyebrow">на чем держится работа</span>
        <h2>без осуждения, но с ясной рамкой</h2>
      </FadeIn>
      <div className="principles-grid">
        {principles.map(([title, text]) => (
          <FadeIn className="principle-card" key={title}>
            <Sparkles size={20} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
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
        <span className="eyebrow">формат</span>
        <h2>долгосрочная онлайн-терапия в КПТ-подходе</h2>
        <p>
          В работе я использую методы ДБТ и ACT: они помогают глубже работать с
          эмоциями, внутренними конфликтами, ценностями и острыми состояниями.
        </p>
      </FadeIn>
      <div className="limits-grid">
        {limits.map((item, index) => (
          <FadeIn className="limit-card" key={item.title}>
            <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Posts() {
  return (
    <section id="posts" className="section posts-section">
      <FadeIn className="section-heading">
        <span className="eyebrow">полезное</span>
        <h2>тексты, по которым можно почувствовать мой язык</h2>
      </FadeIn>
      <div className="posts-grid">
        {posts.map((post, index) => (
          <FadeIn className="post-card" key={post.href}>
            <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
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

function Education() {
  return (
    <section className="section education">
      <FadeIn className="section-heading narrow">
        <span className="eyebrow">образование и документы</span>
        <h2>обучение и профессиональная подготовка</h2>
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
          <span className="eyebrow">стоимость</span>
          <h2>онлайн-сессия</h2>
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
        <h2>перед первой встречей</h2>
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
        <span className="eyebrow">контакты</span>
        <h2>познакомимся?</h2>
        <p>
          Самый прямой путь — форма записи. Для живого контекста и публикаций можно
          перейти в Telegram или Instagram*.
        </p>
        <div className="contact-links">
          <a href={links.booking} target="_blank" rel="noreferrer">
            Записаться <ArrowUpRight size={18} />
          </a>
          <a href={links.telegram} target="_blank" rel="noreferrer">
            Telegram <MessageCircle size={18} />
          </a>
          <a href={links.instagram} target="_blank" rel="noreferrer">
            Instagram* <Instagram size={18} />
          </a>
        </div>
      </FadeIn>
      <FadeIn className="contact-portrait">
        <img src="/images/varia-close.jpg" alt="Портрет Варвары Лузан" />
      </FadeIn>
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
          alternateName: "Варя",
          jobTitle: "Клинический психолог",
          image: "/images/varia-hero-cinematic.jpg",
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
        <p>
          Услуги носят консультативный характер, не являются медицинской деятельностью
          и не заменяют обращения к врачу.
        </p>
        <p>Сайт предназначен для лиц старше 18 лет (18+).</p>
        <p>
          * Instagram принадлежит компании Meta Platforms Inc., деятельность которой
          признана экстремистской и запрещена в РФ.
        </p>
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
        <About />
        <Principles />
        <FormatBoundaries />
        <Posts />
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
