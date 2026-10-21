# Abass Ibrahim

Personal portfolio for Abass Ibrahim, a full-stack product engineer and delivery lead at [TrustCode Systems](https://trustcodesystem.tech/).

[View the live portfolio](https://abassibrahim.xyz)

The published application is in `portfolio-lab/my-portfolio`. Vercel project `abass` must use that Root Directory, the Next.js framework preset, and the `main` production branch. The repository root contains the previous island portfolio. Merging changes to the lab does not replace the root application.

The new app uses `https://abassibrahim.xyz` for canonical metadata and enables search indexing and its sitemap only when `VERCEL_ENV=production`; local and preview builds remain excluded.

## What is included

- Selected product and engineering work
- Technical skills and delivery experience
- Responsive project pages and contact paths
- Downloadable public resume
- Light and dark themes
- Motion and interaction design

## Technology

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide and Simple Icons

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run build
```

Portfolio content is maintained in `lib/data.ts`, while images and the public resume live in `public/`.

## Deployment

The application is designed for deployment on Vercel or any platform that supports Next.js.
