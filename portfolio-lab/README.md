# Abass portfolio lab

An editable Abass Ibrahim portfolio based on Rishi Lahoti's MIT-licensed Next.js implementation. The full-height portrait, oversized moving name, smooth scrolling, circuit, stacked work cards, magnetic controls, expanded navigation, résumé viewer, and contact composition remain the core experience. A dark palette, Abass content, and permitted replacement media personalize it.

Start with [WINDOWS.md](WINDOWS.md) to download, extract, and run it on your laptop. Cloud processes do not make localhost available on your computer. This project has not been deployed.

## Folders

- `my-portfolio/`: your independent editable application, including source, assets, lockfile, and license notices.
- `references/dennis-recreation/`: the cloned recreation with local media replacements, prepared by `scripts/setup-references.mjs`.
- `references/rishi-portfolio/`: the original working Rishi reference.
- `research/`: supplied OmniUI guidance, inspection evidence, local media, reference patch, and verification reports.
- `.agents/skills/`: the installed Emil design, animation, and mobile skills.

The portable ZIP contains your application, evidence, skills, local replacement media, and reference setup scripts. It omits third-party reference checkouts, `node_modules`, build caches, and Git metadata. The setup script fetches both references at the exact inspected revisions and reapplies the documented media patch.

## Run your portfolio only

Install Node.js 24 LTS. In a terminal:

```sh
cd my-portfolio
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Wait for Ready, then open `http://localhost:3000` on the same computer. Stop the server with Ctrl+C.

For all three experiences, from the lab root:

```sh
node scripts/install-lab.mjs
node scripts/start-lab.mjs
```

The start helper opens three PowerShell windows on Windows. On Linux it prints the three commands to run in separate terminals. It does not kill existing servers or replace user files. Internet access to GitHub and npm is needed during setup. Rishi's unchanged reference also fetches Lexend through Google Fonts; your customized version bundles the licensed font and has no Google Fonts dependency.

## Edit

- Identity, projects, contact, links, and practice areas: `my-portfolio/src/app/data.js`.
- Theme tokens, focus styles, scrollbar: `my-portfolio/src/app/globals.css`.
- Layout, imagery, marquee: `src/components/Landing/`.
- About and circuit: `src/components/Description/`, `src/components/Circuit/`.
- Stacked project cards: `src/components/Projects/`.
- Navigation, contact, résumé modal: their corresponding component folders.
- Portrait, résumé, project art: `my-portfolio/public/`.

Styles use the original SCSS module architecture. The application remains JavaScript, Next.js 14, and React 18. GSAP handles decorative parallax and magnetic interactions; Framer Motion handles transitions and scroll-linked cards; Lenis handles smooth wheel scrolling. A native modal dialog provides accessible modal behavior without another component library. Motion respects user preferences, and the moving name has a pause button.

See `my-portfolio/CONTENT_REVIEW.md` for unverified current content and `my-portfolio/THIRD_PARTY_NOTICES.md` for licensing. Keep the MIT and font notices when sharing the customized code. The Dennis recreation has no explicit license file, so its code is not incorporated into your application.

## Checks

```sh
cd my-portfolio
npm run lint
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

Stop the development server before building or starting production on the same port. Research browser checks are kept outside the application; see `research/REPORT.md` for actual results and limits. Windows execution and real-phone behavior were not tested on the cloud Linux machine.

## Continue with Codex

Open `portfolio-lab` as the project folder. Ask Codex to read `AGENTS.md`, use the supplied OmniUI specification, and apply the installed Emil skills. Make changes in `my-portfolio`, and keep the reference originals separate. The full reusable OmniUI catalog system was not installed or built; its supplied design guidance was applied directly to this task.
