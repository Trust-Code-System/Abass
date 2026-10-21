# Research and checks

Read `REPORT.md` for evidence and limitations. JSON files record actual observations; PNG files show running applications.

With all three servers running, optional browser checks can be repeated:

```sh
cd research/qa-tools
npm ci
npx playwright install chromium
cd ..
node verify-portfolio.cjs
node audit-accessibility.cjs
node inspect-references.cjs
node check-reference-interactions.cjs
```

On Windows use `npm.cmd` and `npx.cmd` in PowerShell. The installed Playwright browser is used there; the cloud uses its existing Chromium binary.

`dennis-local-media.patch` replaces missing Cloudinary dependencies with files in `reference-media/`. The two abstract MP4 clips were generated with FFmpeg for this lab. The supplied OmniUI specification is retained as design guidance, not a claim that its complete reusable skill infrastructure is installed.
