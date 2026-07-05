"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { SkillBadge } from "./SkillBadge";
import { useTheme } from "next-themes";

export function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const isFeatured = Boolean(project.featured);
  const { resolvedTheme } = useTheme();
  const numOpacity = resolvedTheme === "dark" ? 0.08 : 0.05;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative overflow-hidden rounded-sm border border-border bg-surface p-6 ${
        isFeatured ? "lg:p-8" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent2/10" />
      </div>

      <div
        className={`relative z-10 ${
          isFeatured ? "grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch" : ""
        }`}
      >
        <div className="relative">
          <div
            className="pointer-events-none select-none absolute right-0 top-0 font-display font-extrabold tracking-[-0.06em]"
            style={{
              fontSize: "clamp(64px, 8vw, 96px)",
              lineHeight: 1,
              opacity: numOpacity,
              color: "var(--text)",
              zIndex: 0,
            }}
          >
            {project.number}
          </div>
          <div className="relative z-10">
            {(project.domain || project.year || project.status) && (
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                {project.domain ? <span>{project.domain}</span> : null}
                {project.year ? (
                  <>
                    <span aria-hidden className="text-muted/40">
                      /
                    </span>
                    <span>{project.year}</span>
                  </>
                ) : null}
                {project.status ? (
                  <span className="inline-flex items-center gap-1.5 text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    {project.status}
                  </span>
                ) : null}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <SkillBadge key={t}>{t}</SkillBadge>
              ))}
            </div>

            <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.04em] text-text">
              {project.title}
            </h3>

            <p className="mt-3 max-w-prose text-[14px] leading-7 text-muted">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {project.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xs border border-border bg-bg/30 px-3 py-2 font-mono text-[12px] uppercase tracking-[0.22em] text-text/90 transition-colors hover:border-accent/60 hover:text-accent"
                  aria-label={`${l.label} — ${project.title}`}
                >
                  {l.label}
                  <span aria-hidden>↗</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {isFeatured ? (
          <div className="relative overflow-hidden rounded-sm border border-border bg-bg/30 p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-accent2/10" />
            <svg
              className="relative z-10 h-full w-full"
              viewBox="0 0 520 320"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                  <stop
                    offset="0"
                    style={{ stopColor: "var(--accent)", stopOpacity: 0.9 }}
                  />
                  <stop
                    offset="1"
                    style={{ stopColor: "var(--accent2)", stopOpacity: 0.6 }}
                  />
                </linearGradient>
              </defs>
              <rect
                x="18"
                y="18"
                width="484"
                height="284"
                rx="6"
                fill="none"
                stroke="url(#g)"
                strokeOpacity="0.35"
              />
              <g
                fill="none"
                stroke="var(--accent)"
                strokeOpacity="0.22"
              >
                <path d="M60 92H220" />
                <path d="M60 132H310" />
                <path d="M60 172H270" />
                <path d="M60 212H340" />
              </g>
              <g
                fill="none"
                stroke="var(--accent2)"
                strokeOpacity="0.22"
              >
                <path d="M280 92H460" />
                <path d="M340 132H460" />
                <path d="M300 172H460" />
                <path d="M360 212H460" />
              </g>
              <g>
                <circle cx="84" cy="52" r="7" fill="var(--accent)" opacity="0.7" />
                <circle cx="110" cy="52" r="7" fill="var(--accent2)" opacity="0.55" />
                <circle cx="136" cy="52" r="7" fill="var(--text)" opacity="0.22" />
              </g>
              <text
                x="64"
                y="266"
                fill="var(--text)"
                opacity="0.25"
                fontFamily="ui-monospace, SFMono-Regular"
                fontSize="12"
              >
                {"{ ship: true, ghost: 'stable' }"}
              </text>
            </svg>
          </div>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-sm ring-0 transition-all duration-300 group-hover:ring-1 group-hover:ring-accent/40" />
    </motion.article>
  );
}

