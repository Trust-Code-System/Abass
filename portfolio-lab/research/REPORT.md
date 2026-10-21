# Portfolio lab implementation and verification

Prepared on 21 October 2026 in cloud Linux with Node.js 24.19.0 and Chromium. No publication or deployment occurred. The existing Abass repository remains unchanged.

## Repositories

| Reference | Revision | Permission and use |
| --- | --- | --- |
| `AliBagheri2079/dennis-snellenberg-portfolio` | `6ece2301f32d955f98657f34c3b41e4660c3435c` | No explicit license file. Visual reference only. Six files changed to replace unavailable Cloudinary media; original layout and interaction systems retained. |
| `rishilahoti/portfolio_new` | `85b778cefd3cf76d5c9fc4bc46c8d86adde38b87` | MIT, original notice retained. Foundation for the customized app; reference source preserved. |
| `emilkowalski/skills` | Source checkout under `research/emil-skills-source` in the cloud | MIT. Three project-local skills installed through the documented CLI. |

The cloud proxy denied requests to the two live reference sites with HTTP 403. Their current production appearances were not inspected. Local rendered repositories and the included Dennis screenshot supplied visual evidence. Reference checkouts are fetched by the portable setup script rather than redistributed in the ZIP.

## Skills applied

The full 3,589-line supplied OmniUI Forge specification was read and saved in `omni-ui-forge-supplied-specification.md`. Its relevant design and engineering requirements were applied directly: inspect first, preserve composition, define consistent tokens, use semantic themed controls, check licenses, select libraries sparingly, clean up motion, honor reduced motion and input capabilities, inspect rendered output, and avoid invented content. The full catalog/indexing skill system was not installed or represented as available.

Installed, read, and applied:

- `../.agents/skills/emil-design-eng/SKILL.md`.
- `../.agents/skills/animate/SKILL.md` and relevant `RECIPES.md` guidance.
- `../.agents/skills/mobile-native/SKILL.md`.

Concrete results include capability-gated magnetic effects, deliberate easing and durations, SVG control icons, native-dialog focus handling, reduced-motion CSS, a hydration-safe media-preference hook, and mobile viewport/focus/press corrections. Their MIT notice is preserved.

## Customized implementation

The separate `my-portfolio` retains Next.js 14, React 18, JavaScript, SCSS modules, GSAP, Framer Motion, and Lenis. One exact-pinned OFL font package, Lexend 5.3.0, was added. Unused duplicate scrolling, toast, and analytics packages were removed.

Sections: full-height portrait, oversized moving name with pause control, about statement, editable circuit/practice interaction, four stacked project cards, expanded navigation, résumé viewer/download, and contact/footer. Your portrait and résumé replace reference identities. Four original project-cover artworks replace other people's screenshots. All personal data is editable in `src/app/data.js`; review items are in `CONTENT_REVIEW.md`.

| Before | After | Why |
| --- | --- | --- |
| Reference identities and career history | Abass content and editable practice areas | Personalize without invented history |
| Clickable divs and anchors without hrefs | Semantic controls and native modal dialogs | Browser and keyboard behavior |
| Magnetic effects on every device | Scoped cleanup and capability queries | Touch and reduced-motion behavior |
| Desktop-sized mobile cards | Responsive cards with visible project imagery | Preserve content across screen sizes |
| Media preference differed during hydration | Stable server/client snapshot plus CSS fallback | Fix hydration without suppressing errors |
| Font-dependent arrows and duplicate favicon | SVG arrows and one icon route | Reliable loading and rendering |

## Executed checks

- All three applications installed from their lockfiles. Dennis used pnpm 8.15.9 and its original version-6 lockfile, with Husky disabled during setup.
- Customized `npm run lint`: passed without warnings/errors.
- Customized `npm run build`: passed, including lint/framework checks. No separate application TypeScript suite exists; the selected codebase is JavaScript.
- Production server: started successfully on cloud port 3000.
- `verify-portfolio.cjs`: **20 checks passed**. These cover identity/four projects, marquee pause, desktop anchors, circuit controls, résumé modal and download, modal keyboard containment/Escape/focus return, project traversal, contact links, overflow/assets at 320/390/768/1024/1440px, mobile navigation, reduced motion, skip link, PDF bytes, source images, favicon, social image, and no browser console/runtime or HTTP asset errors. Navigation-cancelled requests are recorded separately from failures.
- Axe scans: six page/modal states at desktop/mobile sizes, **zero violations** against the selected WCAG A/AA and 2.1 AA rules. Incomplete/manual items include image contrast and some semantics. This is not a complete accessibility certification.
- Both reference homepages: HTTP 200, no observed runtime page errors, desktop/mobile screenshots captured. Full-page scrolling, project hover preview, media loading, and Rishi résumé interaction were inspected.
- Dennis local preview: all replacement images loaded; all four video players reached readyState 4 without media errors. `/fabric` detail route returns 404 in the source reference. Other route observations are recorded in `reference-interactions.json` without treating HTTP status alone as proof of complete page behavior.
- Original Rishi mobile layout measured 430px content width at 390px. The customized version passes overflow checks. Some original lazy images had not finished loading at the immediate inspection sample; the record labels them unloaded, not broken. Customized source images were independently requested and verified.
- The archive passed its CRC check. After extraction into a new Linux directory, npm ci installed 397 packages, the production build passed, and the extracted app rendered with no browser errors. The extracted reference setup script also cloned both pinned revisions and applied the local-media patch successfully. This is transfer reproducibility evidence on Linux, not a Windows execution claim.
- The reference preparation script verified exact revisions and the already-applied patch without resetting or overwriting files. Portable helpers passed Node syntax checks. The complete portable install-lab helper then successfully installed all three apps from the extracted bundle on Linux. Its Windows process-launch branch was not executed here. The installer initially encountered restricted default home-directory caches in this cloud; npm and pnpm now use lab-local cache/store paths, preserving integrity verification.

## Evidence

See `portfolio-verification.json`, `accessibility-results.json`, `reference-inspection.json`, and `reference-interactions.json` for observations. Screenshots include `abass-desktop.png`, `abass-mobile.png`, `abass-tablet.png`, section captures, and both references. They came from running applications.

The adapted site preserves the portrait/marquee composition, scrolling, magnetic feedback, circuit, project stack, and contact treatment. Differences are the requested dark palette, your own media, source-backed shorter content, accessible controls, and mobile/reduced-motion fixes. Exact equivalence to unavailable production sites or missing original media is not claimed.

## Transfer and remaining limits

`portfolio-lab-windows.zip` contains the editable app, notices, skills, evidence, reference patch/local media, and setup/start scripts. It excludes dependencies, build caches, Git metadata, and third-party reference checkouts. The installer retrieves references at their pinned revisions. See `WINDOWS.md`.

Nothing was automatically transferred to your laptop. Download/extract the archive and run the Windows commands before expecting laptop localhost to work. Actual Windows execution, physical-phone behavior, screen-reader operation, external project availability, and current personal content remain unverified. Reference production builds were optional and were not run. No deployment was performed. Cloud install_script and start_skill were saved as a configuration draft for this lab, preserving the older Abass installation steps. Saving did not publish or apply a new environment snapshot.
