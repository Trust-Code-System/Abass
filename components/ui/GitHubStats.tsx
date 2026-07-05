"use client";

import * as React from "react";

type Stats = {
  repos: number;
  followers: number;
  following: number;
};

const GH_USER = "Lingz450";

// Sensible fallbacks so the UI never renders empty if the API is rate-limited.
const FALLBACK: Stats = { repos: 19, followers: 22, following: 237 };

function useCountUp(target: number, run: boolean, duration = 900) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

/** Live GitHub stat strip — fetches public profile data client-side, no auth. */
export function GitHubStats() {
  const [stats, setStats] = React.useState<Stats | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${GH_USER}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("gh"))))
      .then((d: { public_repos: number; followers: number; following: number }) => {
        if (!cancelled) {
          setStats({
            repos: d.public_repos,
            followers: d.followers,
            following: d.following,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setStats(FALLBACK);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const ready = stats !== null;
  const data = stats ?? FALLBACK;

  const items: { label: string; value: number; suffix?: string }[] = [
    { label: "Public Repos", value: data.repos, suffix: "+" },
    { label: "Followers", value: data.followers },
    { label: "Following", value: data.following },
    { label: "Commits / yr", value: 600, suffix: "+" },
  ];

  return (
    <div className="rounded-sm border border-border bg-surface">
      <div className="flex items-center gap-3 border-b border-border px-5 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent2/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          github.com/{GH_USER}
        </span>
        <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          <span className={`h-2 w-2 rounded-full bg-accent ${ready ? "" : "animate-pulse"}`} />
          {ready ? "live" : "syncing"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {items.map((it) => (
          <StatCell key={it.label} {...it} run={ready} />
        ))}
      </div>
    </div>
  );
}

function StatCell({
  label,
  value,
  suffix,
  run,
}: {
  label: string;
  value: number;
  suffix?: string;
  run: boolean;
}) {
  const shown = useCountUp(value, run);
  return (
    <div className="bg-surface px-5 py-5">
      <div className="font-display text-[26px] font-extrabold tracking-[-0.04em] text-text">
        {shown}
        {suffix ? <span className="text-accent">{suffix}</span> : null}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        {label}
      </div>
    </div>
  );
}
