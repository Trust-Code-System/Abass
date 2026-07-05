"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Terminal } from "@/components/ui/Terminal";

const roles = [
  "IT Support Specialist (Oil & Gas)",
  "Full\u2011Stack Developer",
  "Web3 Builder",
  "Technical Writer",
];

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const ease: [number, number, number, number] = [0.21, 0.9, 0.22, 1];
  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <section className="relative overflow-hidden pt-16">
      <div className="noise-overlay" />
      <div className="bg-dot-grid absolute inset-0 opacity-80" aria-hidden />

      <motion.div
        className="pointer-events-none absolute -right-24 top-10 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--orb-color), transparent 55%), radial-gradient(circle at 70% 70%, color-mix(in srgb, var(--accent2) 18%, transparent), transparent 55%)",
          filter: "blur(10px)",
        }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="container-x relative z-10 grid min-h-[100dvh] items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-3 rounded-xs border border-border bg-surface/60 px-4 py-2"
          >
            <motion.span
              className="h-2.5 w-2.5 rounded-full bg-accent"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-text/90">
              Available for Work
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-[clamp(48px,6vw,88px)] font-extrabold leading-[0.92] tracking-[-0.06em]"
          >
            <AnimatedText text="Abass" as="span" mode="chars" />
            <br />
            <AnimatedText text="Ibrahim" as="span" mode="chars" delay={0.08} />
          </motion.h1>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {roles.map((r) => (
              <span
                key={r}
                className="relative font-mono text-[12px] uppercase tracking-[0.18em] text-muted"
              >
                <span className="relative z-10">{r}</span>
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-accent/25"
                  aria-hidden
                />
              </span>
            ))}
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-[15px] leading-8 text-muted">
            I&apos;m Abass Ibrahim. I build sharp, reliable web experiences and support real-world
            systems where uptime, clarity, and calm execution matter. Dark UI, clean code, and
            shipped outcomes.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#projects");
              }}
              className="inline-flex items-center justify-center rounded-xs bg-accent px-5 py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-bg transition-transform hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#contact");
              }}
              className="inline-flex items-center justify-center rounded-xs border border-border bg-transparent px-5 py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-text transition-transform hover:-translate-y-1 hover:border-accent/60 hover:text-accent"
            >
              Get in Touch
            </a>
            <a
              href="/Abass_Ibrahim_CV.pdf"
              download
              className="inline-flex items-center justify-center rounded-xs border border-border bg-transparent px-5 py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-text transition-transform hover:-translate-y-1 hover:border-accent/60 hover:text-accent"
            >
              Download CV
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="https://github.com/Lingz450"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted hover:text-accent"
              aria-label="Visit GitHub profile"
            >
              GitHub &#8599;
            </Link>
            <Link
              href="https://www.linkedin.com/in/abass-ibrahim-devv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted hover:text-accent"
              aria-label="Visit LinkedIn profile"
            >
              LinkedIn &#8599;
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              className="inline-flex items-center gap-2 rounded-xs border border-border bg-surface/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-accent/60 hover:text-accent"
              aria-label="Open command palette"
            >
              Press
              <kbd className="rounded-xs border border-border px-1.5 py-0.5 text-[10px] text-text">
                ⌘K
              </kbd>
              to explore
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="relative"
        >
          <Terminal />

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { k: "3+", v: "Years" },
              { k: "7", v: "Live Apps" },
              { k: "500+", v: "Community" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-xs border border-border bg-surface px-4 py-3 text-center"
              >
                <div className="font-display text-[22px] font-extrabold tracking-[-0.04em] text-text">
                  {s.k}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
