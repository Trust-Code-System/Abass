import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { experience } from "@/lib/data";
import type { ExperienceItem } from "@/lib/types";

const kindLabel: Record<ExperienceItem["kind"], string> = {
  work: "Employment",
  build: "Product",
  community: "Community",
};

export function Experience() {
  return (
    <section id="experience" className="section-y border-t border-border/60">
      <div className="container-x">
        <RevealOnScroll>
          <div className="accent-line label">Experience</div>
          <h2 className="mt-6 font-display text-4xl font-extrabold tracking-[-0.06em] text-text sm:text-5xl">
            Where I&rsquo;ve{" "}
            <span className="font-serifItalic italic text-text/90">put in the work.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-8 text-muted">
            Two concurrent IT roles keeping oil &amp; gas systems alive by day, seven shipped
            products by night, and a 500+ member community I built from zero.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-0">
          {experience.map((item, i) => (
            <RevealOnScroll key={`${item.org}-${item.role}`} delay={i * 0.05}>
              <article className="group relative grid gap-4 border-t border-border py-8 md:grid-cols-[220px_1fr] md:gap-10">
                <span
                  aria-hidden
                  className="absolute left-0 top-[-1px] h-px w-0 bg-accent transition-all duration-500 group-hover:w-full"
                />
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    {item.period}
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    {item.location}
                  </div>
                  <div className="mt-3 inline-flex rounded-xs border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {kindLabel[item.kind]}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-text">
                    {item.role}
                    <span className="text-muted"> · </span>
                    <span className="text-accent">{item.org}</span>
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {item.points.map((p, idx) => (
                      <li key={idx} className="flex gap-3 text-[14px] leading-7 text-muted">
                        <span aria-hidden className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent/70" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
