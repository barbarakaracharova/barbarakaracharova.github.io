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
  quotePost: "https://t.me/barbarakaracharovaa/2135",
};

const topics = [
  "Тревожные состояния",
  "Депрессивные состояния",
  "Отношения и привязанность",
  "Стыд и вина",
  "Личные границы",
  "Эмоциональная нестабильность",
  "Созависимость",
  "Идентичность",
  "ПТСР",
  "Самоповреждение в анамнезе",
  "БАР и ПРЛ",
  "Одиночество",
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
    question: "С какими темами можно обращаться?",
    answer:
      "Можно приходить с тревожными и депрессивными состояниями, темами отношений, идентичности, стыда, злости, границ, созависимости, БАР, ПРЛ, ПТСР и эмоциональной нестабильности.",
  },
  {
    question: "Сколько стоит консультация?",
    answer: "Стоимость онлайн-сессии — 4000 ₽. Запись проходит через форму.",
  },
];

const steps = [
  ["Запись", "Вы оставляете заявку через форму, выбираете удобный способ связи и время."],
  ["Первая встреча", "Спокойно знакомитесь, формулируете запрос и смотрите, насколько вам подходит контакт."],
  ["Регулярная работа", "Исследуете переживания, реакции, отношения и способы справляться с напряжением."],
  ["Изменения", "Постепенно появляется больше ясности, устойчивости и контакта с собой."],
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
  const y = useTransform(scrollYProgress, [0, 1], [-12, 16]);
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
        <a href="#work">Темы</a>
        <a href="#approach">Подход</a>
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
        <h1>Варвара Лузан</h1>
        <p className="lead">
          «Изучаю психику изнутри». Работаю в КПТ-подходе с использованием ДБТ и ACT.
        </p>
        <p>
          Пространство, где можно говорить о тяжелом опыте без необходимости казаться
          нормальным и без страха осуждения.
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
      <FadeIn className="hero-image-wrap">
        <img
          src="/images/hero.webp"
          alt="Варвара Лузан"
          className="hero-image"
          loading="eager"
          decoding="async"
        />
      </FadeIn>
    </section>
  );
}

function Topics() {
  return (
    <section id="work" className="section">
      <FadeIn className="section-heading">
        <span className="eyebrow">С чем можно прийти</span>
        <h2>Темы, о которых здесь можно говорить честно</h2>
      </FadeIn>
      <div className="topic-grid">
        {topics.map((topic) => (
          <FadeIn key={topic} className="topic-card">
            <span>{topic}</span>
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
        <h2>Почему ко мне приходят</h2>
        <p>
          «Какие-то части себя нужно понимать, какие-то — принимать, какие-то —
          учиться учитывать, а какие-то вообще оказываются не поломкой, а обычным
          человеческим опытом».
        </p>
        <a href={links.quotePost} target="_blank" rel="noreferrer">
          Читать пост в Telegram
        </a>
      </FadeIn>
      <div className="approach-side">
        <ParallaxImage
          src="/images/portrait.webp"
          alt="Портрет Варвары Лузан"
          className="soft-photo"
        />
        <FadeIn className="text-panel">
          <p>
            В работе я использую КПТ, ДБТ и ACT. Эти подходы помогают глубже
            исследовать эмоции, внутренние конфликты и ценности, а также находить
            способы справляться с острыми состояниями и хроническим стрессом.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section">
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
      <ParallaxImage src="/images/warm.webp" alt="Варвара Лузан" className="contact-photo" />
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
        <Topics />
        <Approach />
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
