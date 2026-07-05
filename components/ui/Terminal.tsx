"use client";

import * as React from "react";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; accent?: boolean };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "Abass Ibrahim — Full-Stack Developer & IT Specialist", accent: true },
  { kind: "cmd", text: "cat stack.txt" },
  { kind: "out", text: "next.js · typescript · tailwind · node · postgres · prisma" },
  { kind: "cmd", text: "ls ./shipped" },
  { kind: "out", text: "7 production apps · fintech · e-commerce · edtech · hr" },
  { kind: "cmd", text: "status --now" },
  { kind: "out", text: "● available for work · Lagos (GMT+1) · remote-ready", accent: true },
];

/**
 * Typewriter terminal that plays a short scripted session, then blinks a caret.
 * Respects prefers-reduced-motion by rendering the full transcript instantly.
 */
export function Terminal() {
  const [visible, setVisible] = React.useState<number>(0);
  const [typed, setTyped] = React.useState<string>("");
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(SCRIPT.length);
      setDone(true);
      return;
    }

    let cancelled = false;
    let idx = 0;

    const playLine = () => {
      if (cancelled || idx >= SCRIPT.length) {
        if (!cancelled) setDone(true);
        return;
      }
      const line = SCRIPT[idx];
      if (line.kind === "out") {
        setVisible(idx + 1);
        setTyped("");
        idx += 1;
        window.setTimeout(playLine, 320);
        return;
      }
      // Typewriter for command lines.
      let char = 0;
      const type = () => {
        if (cancelled) return;
        char += 1;
        setTyped(line.text.slice(0, char));
        if (char < line.text.length) {
          window.setTimeout(type, 34);
        } else {
          setVisible(idx + 1);
          setTyped("");
          idx += 1;
          window.setTimeout(playLine, 180);
        }
      };
      type();
    };

    const start = window.setTimeout(playLine, 500);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, []);

  const currentIsCmd =
    visible < SCRIPT.length && SCRIPT[visible]?.kind === "cmd" && typed.length > 0;

  return (
    <div className="overflow-hidden rounded-sm border border-border bg-[#0c0c0c] shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-3 border-b border-border/80 bg-surface/60 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.15em] text-muted">
          abass@lagos — zsh
        </span>
      </div>

      <div className="min-h-[248px] space-y-2 px-5 py-5 font-mono text-[13px] leading-6">
        {SCRIPT.slice(0, visible).map((line, i) =>
          line.kind === "cmd" ? (
            <div key={i} className="flex gap-2 text-text">
              <span className="text-accent">❯</span>
              <span>{line.text}</span>
            </div>
          ) : (
            <div
              key={i}
              className={line.accent ? "pl-4 text-accent" : "pl-4 text-muted"}
            >
              {line.text}
            </div>
          ),
        )}

        {currentIsCmd ? (
          <div className="flex gap-2 text-text">
            <span className="text-accent">❯</span>
            <span>
              {typed}
              <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-accent" />
            </span>
          </div>
        ) : null}

        {done ? (
          <div className="flex gap-2 text-text">
            <span className="text-accent">❯</span>
            <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-pulse bg-accent" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
