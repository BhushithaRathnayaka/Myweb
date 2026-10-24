"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

/* ----------------------------- CONTENT / CONFIG ---------------------------- */

const HERO_IMAGE = "/Myweb/me.jpg";
const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80";
const PROCESS_IMAGE =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80";

const TAGLINE = "Modern, fast, and responsive websites for your business";
const EMAIL = "bhushithaarunod@gmail.com";
const PHONE_DISPLAY = "0764228985";
const WHATSAPP = "https://wa.me/94764228985";

const NAV = ["Home", "About", "Services", "Projects", "Contact"];

const SOCIALS = [
  { name: "Facebook", href: "https://www.facebook.com/BhushithaArunod.1" },
  { name: "Instagram", href: "https://www.instagram.com/_bhushitha_arunod_" },
  { name: "TikTok", href: "https://www.tiktok.com/@bhu_shi_tha" },
  { name: "GitHub", href: "https://bhushitharathnayaka.github.io" },
];

const STATS = [
  { value: "10+", label: "Projects" },
  { value: "100%", label: "Satisfaction" },
  { value: "24h", label: "Reply time" },
];

const SERVICES = [
  {
    icon: "globe",
    title: "Business Websites",
    text: "A fast, polished website that presents your business clearly, builds trust, and turns visitors into customers. Built to look sharp on every phone and screen.",
    points: ["Custom responsive design", "Speed & SEO-ready", "Contact forms & WhatsApp links"],
  },
  {
    icon: "refresh",
    title: "Website Redesign",
    text: "Have an old, slow, or outdated site? I rebuild it with a modern look, cleaner structure, and better performance, keeping what already works for your brand.",
    points: ["Fresh modern interface", "Mobile-first rebuild", "Faster load times"],
  },
];

const PROJECTS = [
  { icon: "utensils", title: "Restaurant Website", text: "Menu showcase, reservations and a warm, appetising look.", tags: ["Menu", "Booking", "Gallery"] },
  { icon: "dumbbell", title: "Gym Website", text: "Class schedules, trainer profiles and membership plans.", tags: ["Plans", "Schedule", "Trainers"] },
  { icon: "scissors", title: "Salon Website", text: "Service list, price guide and easy appointment requests.", tags: ["Services", "Pricing", "Booking"] },
  { icon: "home", title: "Real Estate Website", text: "Property listings, clean filters and enquiry forms.", tags: ["Listings", "Filters", "Enquiry"] },
];

const STEPS = [
  { icon: "chat", title: "Discuss", text: "We talk through your business, goals and what your customers need." },
  { icon: "pen", title: "Design", text: "I shape a clean, on-brand layout and share it with you for feedback." },
  { icon: "code", title: "Build", text: "I develop a fast, responsive site with modern tools and clean code." },
  { icon: "rocket", title: "Deliver", text: "We test everything, launch the site, and I stay available for support." },
];

const TECH = [
  { name: "Next.js", glyph: "N" },
  { name: "React", glyph: "R" },
  { name: "Tailwind CSS", glyph: "T" },
  { name: "TypeScript", glyph: "TS" },
  { name: "JavaScript", glyph: "JS" },
  { name: "Framer Motion", glyph: "F" },
  { name: "HTML5", glyph: "H" },
  { name: "CSS3", glyph: "C" },
  { name: "Figma", glyph: "Fg" },
  { name: "Git & GitHub", glyph: "G" },
];

/* --------------------------------- ICONS ---------------------------------- */

const ICONS: Record<string, string> = {
  globe: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20",
  refresh: "M23 4v6h-6M1 20v-6h6M3.5 9a9 9 0 0114.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0020.5 15",
  mail: "M3 5h18v14H3zM3 5l9 8 9-8",
  phone: "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z",
  chat: "M21 11.5a8.4 8.4 0 01-12.3 7.4L3 21l2.1-5.6A8.4 8.4 0 1121 11.5z",
  pin: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zM12 7a3 3 0 100 6 3 3 0 000-6z",
  utensils: "M4 3v7a2 2 0 002 2h1v9M7 3v7M18 3c-2 2-3 5-3 8h3v10",
  dumbbell: "M6 6v12M18 6v12M3 9v6M21 9v6M6 12h12",
  scissors: "M6 3a3 3 0 100 6 3 3 0 000-6zM6 15a3 3 0 100 6 3 3 0 000-6zM20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12",
  home: "M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  pen: "M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  rocket: "M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2M12 15l-3-3a22 22 0 012-4 12 12 0 019-5c0 3-1 7-5 11a22 22 0 01-3 2zM9 12H4s.6-3 2-4c1.6-1 5 0 5 0M12 15v5s3-.6 4-2c1-1.6 0-5 0-5",
  check: "M20 6L9 17l-5-5",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "M18 6L6 18M6 6l12 12",
};

function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

/* ------------------------------ SHARED PIECES ------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Heading({ title, sub }: { title: string; sub: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-brand" />
      <p className="mt-5 text-muted">{sub}</p>
    </Reveal>
  );
}

function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative px-5 py-24 sm:px-8 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Typing({ text }: { text: string }) {
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && n < text.length) t = setTimeout(() => setN(n + 1), 75);
    else if (!deleting) t = setTimeout(() => setDeleting(true), 3000);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 35);
    else t = setTimeout(() => setDeleting(false), 700);
    return () => clearTimeout(t);
  }, [n, deleting, text]);

  return (
    <span>
      {text.slice(0, n)}
      <span className="caret" />
    </span>
  );
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="dot-grid absolute inset-0" />
      <motion.div
        className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-[120px]"
        animate={{ x: [0, 120, 0], y: [0, 80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[130px]"
        animate={{ x: [0, -100, 0], y: [0, -90, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-brand/15 blur-[120px]"
        animate={{ x: [0, 90, 0], y: [0, -70, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="noise absolute inset-0" />
    </div>
  );
}

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(200,16,46,0.8)] transition-all duration-500 hover:shadow-[0_0_45px_-4px_rgba(200,16,46,0.95)] hover:-translate-y-0.5";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-all duration-500 hover:border-brand hover:bg-brand/10 hover:-translate-y-0.5";

/* --------------------------------- NAVBAR --------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled || open ? "border-b border-white/10 bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="font-heading text-xl font-bold tracking-tight">
          Bhushitha<span className="text-brand">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="group relative text-sm text-muted transition-colors duration-500 hover:text-ink">
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={`${btnPrimary} hidden !px-5 !py-2.5 md:inline-flex`}>
          Hire Me
        </a>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-6">
              {NAV.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-muted hover:bg-white/5 hover:text-ink">
                    {l}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#contact" onClick={() => setOpen(false)} className={`${btnPrimary} w-full`}>
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------------------------------- HERO ---------------------------------- */

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_10px_#C8102E]" />
            Available for new projects
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
            className="text-5xl font-bold leading-[1.05] sm:text-6xl xl:text-7xl"
          >
            Bhushitha <br />
            Arunod <span className="text-brand">Rathnayaka</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.8, ease: EASE }}
            className="mt-5 text-xl font-medium text-ink/90 sm:text-2xl"
          >
            Web Developer &amp; Designer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="mt-5 min-h-[4.5rem] max-w-xl text-lg text-muted sm:min-h-[3.5rem]"
          >
            <Typing text={TAGLINE} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.3, ease: EASE }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <a href="#projects" className={btnPrimary}>
              View Work <Icon name="arrow" className="h-4 w-4" />
            </a>
            <a href="#contact" className={btnGhost}>Hire Me</a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.7, ease: EASE }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <motion.div
            className="absolute -inset-6 rounded-[2.5rem] bg-brand/40 blur-3xl"
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] border border-brand/50" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-surface p-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMAGE} alt="Bhushitha Arunod Rathnayaka" className="aspect-[4/5] w-full rounded-[1.5rem] object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------- ABOUT --------------------------------- */

function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-brand/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ABOUT_IMAGE} alt="Dark workspace with code on screen" className="aspect-[5/4] w-full rounded-2xl object-cover opacity-90" />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">About me</h2>
            <div className="mt-5 h-1 w-16 rounded-full bg-brand" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 leading-relaxed text-muted">
              I&apos;m Bhushitha, a web developer and designer who loves turning ideas into clean, fast and good-looking websites. I care about the details: smooth layouts, readable typography and pages that load quickly on any phone.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              I help local businesses get a professional online presence, from a brand-new site to a full redesign of an outdated one, built with modern tools like Next.js and Tailwind CSS.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-ink">
              <Icon name="pin" className="h-4 w-4 text-brand" />
              Monaragala, Uva Province, Sri Lanka
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.2 + i * 0.12}>
                <div className="rounded-2xl border border-white/10 bg-surface/80 p-4 text-center backdrop-blur">
                  <div className="font-heading text-2xl font-bold text-brand sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs text-muted">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------------- SERVICES -------------------------------- */

function Services() {
  return (
    <Section id="services">
      <Heading title="Services" sub="Everything you need to look professional online, done properly." />
      <div className="grid gap-6 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.15}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="group h-full rounded-3xl border border-white/10 bg-surface/80 p-8 backdrop-blur transition-[border-color,box-shadow] duration-700 hover:border-brand/60 hover:shadow-[0_0_60px_-15px_rgba(200,16,46,0.6)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-brand transition-colors duration-700 group-hover:bg-brand group-hover:text-white">
                <Icon name={s.icon} className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              <ul className="mt-6 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-ink/90">
                    <Icon name="check" className="h-4 w-4 text-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------- PROJECTS -------------------------------- */

function Projects() {
  return (
    <Section id="projects">
      <Heading title="Projects" sub="Concept designs that show how I would build a website for your type of business." />
      <div className="grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.15}>
            <motion.article
              whileHover={{ scale: 1.03, boxShadow: "0 0 70px -10px rgba(200,16,46,0.55)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-surface transition-colors duration-700 hover:border-brand/60"
            >
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-brand/30 via-surface to-bg">
                <div className="dot-grid absolute inset-0 opacity-70" />
                <motion.div
                  className="relative text-ink/90 transition-colors duration-700 group-hover:text-white"
                  whileHover={{ rotate: 4 }}
                  transition={{ duration: 0.8 }}
                >
                  <Icon name={p.icon} className="h-16 w-16" />
                </motion.div>
                <span className="absolute left-4 top-4 rounded-full border border-brand/50 bg-brand/15 px-3 py-1 text-xs font-medium text-brand backdrop-blur">
                  Concept Project
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------- PROCESS & TECH STACK ------------------------- */

function Process() {
  return (
    <Section id="process">
      <Heading title="How I work" sub="A simple, clear process from first message to launch day." />
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="space-y-5">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div className="flex gap-5 rounded-2xl border border-white/10 bg-surface/80 p-5 backdrop-blur transition-colors duration-700 hover:border-brand/50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <Icon name={s.icon} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    <span className="mr-2 text-brand">{i + 1}.</span>
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-brand/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PROCESS_IMAGE} alt="Code editor in a dark theme" className="aspect-[5/4] w-full rounded-2xl object-cover opacity-90" />
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-20">
        <h3 className="mb-6 text-center text-xl font-semibold">Tech stack</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {TECH.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-surface/80 py-2 pl-2 pr-5 text-sm transition-colors duration-500 hover:border-brand/60"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 font-heading text-xs font-bold text-brand">
                {t.glyph}
              </span>
              {t.name}
            </motion.div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* --------------------------------- CONTACT --------------------------------- */

function Contact() {
  const [sent, setSent] = useState(false);

  const details = [
    { icon: "mail", label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: "phone", label: "Phone", value: PHONE_DISPLAY, href: "tel:+94764228985" },
    { icon: "chat", label: "WhatsApp", value: PHONE_DISPLAY, href: WHATSAPP },
    { icon: "pin", label: "Location", value: "Monaragala, Uva Province, Sri Lanka", href: undefined },
  ];

  const field =
    "w-full rounded-xl border border-white/10 bg-bg/70 px-4 py-3.5 text-sm text-ink placeholder:text-muted/70 outline-none transition-colors duration-500 focus:border-brand";

  return (
    <Section id="contact">
      <Heading title="Let's work together" sub="Tell me about your business and what you need. I reply within 24 hours." />
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4 rounded-3xl border border-white/10 bg-surface/80 p-6 backdrop-blur sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={field} type="text" name="name" placeholder="Your name" required aria-label="Your name" />
              <input className={field} type="email" name="email" placeholder="Your email" required aria-label="Your email" />
            </div>
            <input className={field} type="text" name="subject" placeholder="What do you need? (e.g. Business website)" aria-label="Subject" />
            <textarea className={`${field} resize-none`} name="message" rows={5} placeholder="Tell me about your project" required aria-label="Message" />
            <button type="submit" className={`${btnPrimary} w-full`}>
              {sent ? "Message ready, thank you!" : "Send Message"}
              {!sent && <Icon name="arrow" className="h-4 w-4" />}
            </button>
            <AnimatePresence>
              {sent && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center text-sm text-muted">
                  This form is a preview. Please email or WhatsApp me for now.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="space-y-4">
            {details.map((d) => {
              const inner = (
                <>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                    <Icon name={d.icon} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted">{d.label}</div>
                    <div className="break-words text-sm font-medium">{d.value}</div>
                  </div>
                </>
              );
              const cls = "flex items-center gap-4 rounded-2xl border border-white/10 bg-surface/80 p-4 backdrop-blur transition-colors duration-500";
              return d.href ? (
                <a key={d.label} href={d.href} target={d.label === "WhatsApp" ? "_blank" : undefined} rel="noreferrer" className={`${cls} hover:border-brand/60`}>
                  {inner}
                </a>
              ) : (
                <div key={d.label} className={cls}>{inner}</div>
              );
            })}

            <div className="flex flex-wrap gap-3 pt-2">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-surface/80 px-5 py-2.5 text-sm text-muted transition-all duration-500 hover:border-brand hover:bg-brand/10 hover:text-ink">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* --------------------------------- FOOTER ---------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Bhushitha Arunod. All rights reserved.</p>
        <p>
          Built with <span className="text-ink">Next.js</span>
        </p>
      </div>
    </footer>
  );
}

/* ---------------------------------- PAGE ---------------------------------- */

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
