"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { GhostLogo } from "@/components/ui/GhostLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#writing", label: "Writing" },
];

function openPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  const ease: [number, number, number, number] = [0.21, 0.9, 0.22, 1];

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 50);
  });

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b border-border/90 backdrop-blur-md transition-colors ${
          scrolled ? "bg-bg/90" : "bg-bg/85"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <GhostLogo size="md" />

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(l.href);
                }}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-text"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openPalette}
              className="hidden items-center gap-2 rounded-xs border border-border bg-surface/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-accent/60 hover:text-accent md:inline-flex"
              aria-label="Open command palette"
            >
              <span aria-hidden>⌕</span>
              Search
              <kbd className="rounded-xs border border-border px-1.5 py-0.5 text-[10px] text-text/90">
                ⌘K
              </kbd>
            </button>
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#contact");
              }}
              className="hidden rounded-xs bg-accent px-4 py-2 font-mono text-[12px] uppercase tracking-[0.22em] text-bg transition-transform hover:-translate-y-1 md:inline-flex"
              aria-label="Hire Me"
            >
              Hire Me
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xs border border-border bg-surface text-text md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((s) => !s)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span
                  className={`h-px w-5 bg-text transition-transform ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-5 bg-text transition-opacity ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-px w-5 bg-text transition-transform ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease }}
            className="border-b border-border bg-bg/95 backdrop-blur-md md:hidden"
          >
            <div className="container-x py-5">
              <div className="flex flex-col gap-4">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      scrollToHash(l.href);
                    }}
                    className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted hover:text-text"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    scrollToHash("#contact");
                  }}
                  className="mt-1 inline-flex w-fit rounded-xs bg-accent px-4 py-2 font-mono text-[12px] uppercase tracking-[0.22em] text-bg"
                >
                  Hire Me
                </a>
                <div className="mt-4 flex">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

