import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SkillBadge } from "@/components/ui/SkillBadge";

const tags = [
  "IT Support (Oil & Gas)",
  "Full‑Stack Dev",
  "Web3",
  "Bot Creator",
  "Technical Writer",
  "University of Ilorin",
];

const infoCards = [
  { icon: "🎓", label: "Education", value: "University of Ilorin, Nigeria" },
  { icon: "📍", label: "Location", value: "Lagos State, Nigeria" },
  { icon: "🧭", label: "Primary Role", value: "IT Support Specialist (Oil & Gas)" },
  { icon: "🌐", label: "Availability", value: "Open to remote roles globally" },
  { icon: "✉️", label: "Email", value: "abassibrahim591@gmail.com", href: "mailto:abassibrahim591@gmail.com" },
  { icon: "↗", label: "GitHub", value: "github.com/Lingz450", href: "https://github.com/Lingz450" },
];

export function About() {
  return (
    <section id="about" className="section-y relative">
      <div className="container-x">
        <RevealOnScroll className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="accent-line label">About Me</div>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-[-0.06em] text-text sm:text-5xl">
              The mind{" "}
              <span className="font-serifItalic italic text-text/90">
                behind the code.
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-[15px] leading-8 text-muted">
              <p>
                I&apos;m Abass Ibrahim, a self-taught full-stack developer based in Lagos, Nigeria.
                My work lives at the intersection of clean interface design, dependable engineering,
                and calm problem-solving under real-world constraints — the kind of UI that earns
                trust in the first few seconds and holds up in production.
              </p>
              <p>
                By day I&apos;m an IT Support Specialist across two Oil &amp; Gas companies, so
                I&apos;m wired for uptime, clarity, and systems thinking. That shapes how I write
                software: consistent patterns, strong defaults, readable flows, and the discipline
                to ship features without breaking what already works.
              </p>
              <p>
                Over the last few years I&apos;ve shipped{" "}
                <span className="text-text">seven production web apps</span> across fintech,
                e-commerce, edtech, HR, and marketplaces, contributed{" "}
                <span className="text-text">600+ commits</span> to my own projects in the last year
                alone, and grew a 500+ member trading community from zero. I lean frontend, stay
                comfortable across the stack, and write about the craft on Hashnode and Medium.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((t) => (
                <SkillBadge key={t}>{t}</SkillBadge>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {infoCards.map((c) => {
              const Card = (
                <div className="group flex items-center justify-between gap-5 rounded-sm border border-border bg-surface px-5 py-4 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xs border border-border bg-bg/40 text-[16px]">
                      <span aria-hidden className="text-accent">
                        {c.icon}
                      </span>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                        {c.label}
                      </div>
                      <div className="mt-1 font-display text-[16px] font-bold tracking-[-0.03em] text-text">
                        {c.value}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[12px] text-muted transition-colors group-hover:text-accent">
                    ↗
                  </span>
                </div>
              );

              return c.href ? (
                <Link
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={c.label}
                >
                  {Card}
                </Link>
              ) : (
                <div key={c.label}>{Card}</div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
