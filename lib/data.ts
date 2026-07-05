import type {
  ExperienceItem,
  Project,
  SkillCategory,
  Social,
  WritingPlatform,
} from "./types";

export const socials: Social[] = [
  {
    id: "github",
    label: "GitHub",
    short: "GH",
    href: "https://github.com/Lingz450",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    short: "LI",
    href: "https://www.linkedin.com/in/abass-ibrahim-devv",
  },
  {
    id: "hashnode",
    label: "Hashnode",
    short: "HN",
    href: "https://hashnode.com/@ghost69",
  },
  {
    id: "medium",
    label: "Medium",
    short: "MD",
    href: "https://medium.com/@Ghost69",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    icon: "⚡",
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "HTML5", "CSS3"],
  },
  {
    id: "backend",
    icon: "🔧",
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL"],
  },
  {
    id: "databases",
    icon: "🗄️",
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Firebase", "Supabase", "Prisma"],
  },
  {
    id: "design",
    icon: "🎨",
    title: "Design",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    id: "devops",
    icon: "🛠️",
    title: "DevOps & Tools",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Netlify"],
  },
  {
    id: "web3",
    icon: "🔗",
    title: "Web3 & Other",
    skills: [
      "Web3 Dev",
      "Bot Creation",
      "IT Support",
      "Networking",
      "Microsoft Office",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "IT Officer",
    org: "Metropole Petroleum",
    period: "2024 — Present",
    location: "Lagos, Nigeria",
    kind: "work",
    points: [
      "Manage day-to-day IT operations across the company, troubleshooting hardware, network, and software issues to maintain uptime for business-critical systems.",
      "Provide technical support across departments, resolving incidents quickly and minimising operational downtime.",
      "Maintain user accounts, devices, and access controls, ensuring secure and reliable workflows.",
      "Document recurring incidents and drive improvements to internal IT processes.",
    ],
  },
  {
    role: "IT Assistant",
    org: "Bono Energy Group",
    period: "2024 — Present",
    location: "Lagos, Nigeria · Concurrent role",
    kind: "work",
    points: [
      "Support IT infrastructure, end-user devices, and software installations across the company.",
      "Assist with system maintenance, diagnostics, and resolution of technical issues raised by staff.",
    ],
  },
  {
    role: "Independent Web Developer",
    org: "Self-Taught & Freelance",
    period: "2022 — Present",
    location: "Remote · Lagos, Nigeria",
    kind: "build",
    points: [
      "Designed, built, and shipped seven production web applications spanning e-commerce, education, fintech, HR, and marketplace domains — all currently live.",
      "Lead full-stack development across React, Next.js, TypeScript, Tailwind, and Node.js, with backends on PostgreSQL, Prisma, MongoDB, Supabase, and Firebase.",
      "Implemented multi-role authentication with distinct credential types (matric-number, email/password) for production use.",
      "Built Web3 tooling and automation bots that streamline daily community workflows.",
      "Deploy and maintain production sites on Vercel and Netlify with custom domains.",
    ],
  },
  {
    role: "Founder & Crypto Trading Educator",
    org: "Independent",
    period: "2021 — Present",
    location: "Online · 500+ active members",
    kind: "community",
    points: [
      "Founded and grew a 500+ member community focused on crypto trading, Web3 fundamentals, and risk management.",
      "Designed and delivered structured trading curricula, mentorship programmes, and educational content.",
      "Translated complex Web3 concepts into beginner-friendly material — communication skills that carry directly into technical writing and product work.",
    ],
  },
];

export const projects: Project[] = [
  {
    number: "01",
    featured: true,
    domain: "Fintech / SaaS",
    year: "2025",
    status: "Live",
    title: "The Thesis Desk — Crypto Trading Command Center",
    description:
      "A full-stack trading command center built for the 500+ member crypto community I run. Features live price feeds for BTC, ETH, SOL, BNB, and XRP, P&L tracking, signal review, daily journaling with streak accountability, weekly discipline scoring, and a calculator suite. Includes role-based access with an admin panel and a focused 'Today's Trade Plan' workflow that turns the journal into sharper execution.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Real-Time Data", "SaaS"],
    links: [
      { label: "GitHub", href: "https://github.com/Idansss/Ghost-Trading-Academy" },
      { label: "Live Demo", href: "https://thethesisdesk.xyz/" },
    ],
  },
  {
    number: "02",
    domain: "Education",
    year: "2025",
    status: "Live",
    title: "The Helping Tribe Academy — School Management Platform",
    description:
      "A complete school management system for a Counselling & Positive Psychology program. Three role-based login portals (Student, Facilitator, Admin) with separate matric-number and email authentication flows, plus a public application form for prospective students. Designed for clarity and speed, with distinct UX paths per role.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Multi-Role Auth", "Full-Stack"],
    links: [
      { label: "GitHub", href: "https://github.com/Idansss/Helping-Tribe" },
      { label: "Live Demo", href: "https://helpingtribeacademy.com/" },
    ],
  },
  {
    number: "03",
    domain: "E-Commerce",
    year: "2025",
    status: "Live",
    title: "Wearables Atelier — Premium Nigerian Womenswear E-Commerce",
    description:
      "An editorial e-commerce site for a premium Nigerian womenswear brand — Iro & Buba, Aso Oke, Kaftan, Boubou, Turbans, and Jewellery. Multi-category navigation, ready-to-wear and custom-order flows, wholesale support, sale management, and a 'Now Trending' module with live product pricing. Built mobile-first with a strong magazine-style design language.",
    tags: ["Next.js", "TypeScript", "Tailwind", "E-Commerce", "Editorial UI"],
    links: [
      { label: "GitHub", href: "https://github.com/Idansss/Wearables-Atelier" },
      { label: "Live Demo", href: "https://wearables-atelier.vercel.app/" },
    ],
  },
  {
    number: "04",
    domain: "E-Commerce",
    year: "2024",
    status: "Live",
    title: "Fàdè (9thluxe) — Luxury Perfume E-Commerce",
    description:
      "A luxury perfume storefront with curated collections, drops, an editorial journal, persistent cart, wishlist, and full dark/light mode. Designed mobile-first with a slow-luxury feel — clean typography, generous whitespace, and a calm interaction model. Built end-to-end with Next.js, TypeScript, and Tailwind.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Shadcn UI", "E-Commerce"],
    links: [
      { label: "GitHub", href: "https://github.com/Idansss/9thluxe-store" },
      { label: "Live Demo", href: "https://9thluxe-store-two.vercel.app/" },
    ],
  },
  {
    number: "05",
    domain: "Marketplace",
    year: "2024",
    status: "Live",
    title: "Aureo — Trust-First Hiring Marketplace",
    description:
      "A hiring marketplace where candidates build verified profiles with trust scores and skill listings, while employers post transparent opportunities. Built around the idea that hiring should reward proof and clear communication, not noise.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Marketplace", "Auth"],
    links: [
      { label: "GitHub", href: "https://github.com/Idansss/Aureo" },
      { label: "Live Demo", href: "https://aureeo.netlify.app/" },
    ],
  },
  {
    number: "06",
    domain: "HR Tech / SaaS",
    year: "2025",
    status: "Live",
    title: "Atlas HR — Global HR, Compliance & Payroll Platform",
    description:
      "A full-stack HR SaaS for teams that hire across borders — Nigeria, India, the UK, and the US. Features an AI Compliance Sandbox that answers HR questions and builds ready workflows, an interactive cost & risk calculator per country, automated onboarding/termination flows, country-aware document generation, and a programmatic knowledge base with templates and guides.",
    tags: ["Next.js", "TypeScript", "Tailwind", "SaaS", "HR Tech", "AI"],
    links: [
      { label: "GitHub", href: "https://github.com/Idansss/Atlas-HR" },
      { label: "Live Demo", href: "https://atlas-hr-fq24.vercel.app/" },
    ],
  },
  {
    number: "07",
    domain: "Fintech",
    year: "2025",
    status: "Live",
    title: "AirtimeVault — Airtime-to-Cash Conversion Platform",
    description:
      "A Nigerian fintech platform that converts MTN, Airtel, Glo, and 9mobile airtime into wallet funds in under 30 minutes. Includes tiered conversion rates, bill payments, P2P transfers, a virtual Naira card, referral bonuses, KYC verification, and 24/7 automated fraud monitoring — all from a single secure wallet.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Fintech", "Nigeria", "Wallet"],
    links: [
      { label: "GitHub", href: "https://github.com/Idansss/AirtimeVault" },
      { label: "Live Demo", href: "https://airtime-vault-plhc.vercel.app/" },
    ],
  },
];

export const writingPlatforms: WritingPlatform[] = [
  {
    id: "hashnode",
    label: "Hashnode",
    title: "@ghost69",
    description:
      "Hands-on technical writing — frontend patterns, debugging stories, and practical notes from building and supporting systems.",
    href: "https://hashnode.com/@ghost69",
  },
  {
    id: "medium",
    label: "Medium",
    title: "@Ghost69",
    description:
      "Long-form reflections on craft: UI decisions, developer workflows, and the mindset behind shipping clean work.",
    href: "https://medium.com/@Ghost69",
  },
  {
    id: "github",
    label: "GitHub",
    title: "Lingz450",
    description:
      "Repositories, experiments, and shipped work — from full-stack apps to automation utilities.",
    href: "https://github.com/Lingz450",
  },
];

