"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { projects, socials } from "@/lib/data";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Projects" | "Connect" | "General";
  keywords?: string;
  run: () => void;
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openExternal(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

/**
 * ⌘K / Ctrl+K command palette — the primary keyboard interface for the site.
 * Also opens on a custom `open-command-palette` window event (fired by the navbar button).
 */
export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const { setTheme, resolvedTheme } = useTheme();
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const commands = React.useMemo<Command[]>(() => {
    const nav: Command[] = [
      { id: "nav-top", label: "Go to Top", hint: "home", group: "Navigate", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
      { id: "nav-about", label: "About", hint: "#about", group: "Navigate", run: () => scrollToId("about") },
      { id: "nav-skills", label: "Skills & Stack", hint: "#skills", group: "Navigate", run: () => scrollToId("skills") },
      { id: "nav-experience", label: "Experience", hint: "#experience", group: "Navigate", run: () => scrollToId("experience") },
      { id: "nav-projects", label: "Projects", hint: "#projects", group: "Navigate", run: () => scrollToId("projects") },
      { id: "nav-writing", label: "Writing", hint: "#writing", group: "Navigate", run: () => scrollToId("writing") },
      { id: "nav-contact", label: "Contact", hint: "#contact", group: "Navigate", run: () => scrollToId("contact") },
    ];

    const proj: Command[] = projects.map((p) => {
      const live = p.links.find((l) => l.label === "Live Demo");
      const title = p.title.split("—")[0].trim();
      return {
        id: `proj-${p.number}`,
        label: `Open ${title}`,
        hint: p.domain ?? "project",
        group: "Projects" as const,
        keywords: `${p.title} ${p.tags.join(" ")} ${p.domain ?? ""}`,
        run: () => openExternal(live?.href ?? p.links[0]?.href ?? "#"),
      };
    });

    const connect: Command[] = [
      ...socials.map((s) => ({
        id: `social-${s.id}`,
        label: `Open ${s.label}`,
        hint: s.short,
        group: "Connect" as const,
        run: () => openExternal(s.href),
      })),
      {
        id: "email",
        label: "Copy Email",
        hint: "clipboard",
        group: "Connect",
        keywords: "mail contact reach",
        run: () => {
          void navigator.clipboard?.writeText("abassibrahim591@gmail.com");
        },
      },
      { id: "cv", label: "Download CV", hint: "pdf", group: "Connect", run: () => openExternal("/Abass_Ibrahim_CV.pdf") },
    ];

    const general: Command[] = [
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        hint: "theme",
        group: "General",
        keywords: "dark light toggle appearance",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
    ];

    return [...nav, ...proj, ...connect, ...general];
  }, [resolvedTheme, setTheme]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const close = React.useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  // Global open triggers: ⌘K / Ctrl+K + custom event.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onEvent);
    };
  }, []);

  // Keep the active row visible + clamp when the filtered list changes.
  React.useEffect(() => {
    setActive((a) => Math.min(a, Math.max(filtered.length - 1, 0)));
  }, [filtered.length]);

  React.useEffect(() => {
    if (!open) return;
    const row = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    row?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[active];
      if (cmd) {
        cmd.run();
        close();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  let runningIndex = -1;
  const groups: Command["group"][] = ["Navigate", "Projects", "Connect", "General"];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <button
            type="button"
            aria-label="Close command palette"
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.21, 0.9, 0.22, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-sm border border-border bg-surface shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <span aria-hidden className="font-mono text-[13px] text-accent">
                &gt;_
              </span>
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 font-mono text-[14px] text-text placeholder:text-muted/70 outline-none"
                aria-label="Command search"
              />
              <kbd className="hidden rounded-xs border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:block">
                Esc
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center font-mono text-[13px] text-muted">
                  No matches for &ldquo;{query}&rdquo;
                </div>
              ) : (
                groups.map((group) => {
                  const items = filtered.filter((c) => c.group === group);
                  if (items.length === 0) return null;
                  return (
                    <div key={group} className="mb-1">
                      <div className="px-4 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
                        {group}
                      </div>
                      {items.map((c) => {
                        runningIndex += 1;
                        const idx = runningIndex;
                        const isActive = idx === active;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            data-index={idx}
                            onMouseEnter={() => setActive(idx)}
                            onClick={() => {
                              c.run();
                              close();
                            }}
                            className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors ${
                              isActive ? "bg-accent/10" : "bg-transparent"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                aria-hidden
                                className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-accent" : "bg-muted/40"}`}
                              />
                              <span
                                className={`font-mono text-[13px] ${isActive ? "text-text" : "text-text/80"}`}
                              >
                                {c.label}
                              </span>
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                              {c.hint}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </span>
              <span>abass · command palette</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
