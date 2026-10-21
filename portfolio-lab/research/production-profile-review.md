# Native profile and multilingual intro

21 October 2026. This follow-up replaces the embedded CV viewer with a native `/about` page and restores a complete multilingual greeting sequence.

## Design direction

The primary audience is prospective clients, collaborators, and employers evaluating Abass's work and capabilities. The primary action is reading the profile and moving to selected work or contact. The PDF remains a secondary download.

The composition uses the existing Lexend font, dark canvas, warm paper capability panels, lime accents, restrained rounded controls, oversized fluid headings, a portrait-led biography, and a ruled experience list. Skills and education remain selectable, accessible web text. Existing SCSS modules, native links, ordered lists, and the existing motion stack provide the behavior without another application dependency.

## Source research

The user's actual Chrome browser was used to inspect Dennis Snellenberg's home, work index, About, contact form, archive, and all eleven linked case studies: TWICE, The Damai, FABRIC, Aanstekelijk, Base Create, AVVR, GraphicHunters, Future Goals, Atypikal, One:Nil, and Andy Hardy. Work filter and view controls were inspected. No PDF links or embedded document viewers were found on the inspected pages. Contact fields were inspected without submitting a message. External archive client websites were outside this review.

The reference informs hierarchy, page rhythm, generous typography, and native content presentation. Its source code, portrait, copy, brand identity, and awards were not incorporated.

OmniUI Forge 3.0 status and healthcheck succeeded. Catalog evidence remains partially indexed, rather than fully verified. Timeline and card candidates were searched, inspected with content, and compared:

- Ant Design Timeline, revision `ba7ccbaa7b4b58ac1ff8e6fe2e78dfa10bfb5538`, `components/timeline/Timeline.tsx`, repository MIT license evidence. It depends on the Ant Design Steps/theme/context architecture and is unnecessary for a static professional-history list.
- Motion Primitives card example, revision `120f64f6ca60348e251f929e9c81f11ccbe45eda`, `components/website/card-example-landing.tsx`, repository MIT license evidence. It is a demonstration wrapper with extra utility/icon assumptions rather than a profile component.

Neither candidate was copied or installed. Original semantic markup and the existing project foundations fit this content with fewer dependencies. Original application and font notices remain in place.

## Behavior

Ten greetings advance from rendered state: English, French, Spanish, Italian, Portuguese, German, Japanese, Korean, Chinese, and Arabic. A stable completion callback starts the existing upward reveal after the last greeting. Each timer is cleaned up. Reduced-motion preferences bypass the decorative intro.

About links now reach a real shareable route. Home, work, and contact links resolve correctly from either page. The PDF iframe, fallback PDF preview, and modal provider were removed. Downloads remain in the About corner, footer, and expanded navigation.

## Evidence and limits

Local Windows production build and lint passed. The browser suite checks ten greetings and their exit, root/About content, downloads, source assets, overflow at 320/390/768/1024/1440 CSS pixels, cross-page links, practice selection, marquee pause, menu focus and Escape, reduced motion, forced colors, and skip links. Automated accessibility is checked on home, navigation, and About at desktop and mobile sizes. Detailed generated results and screenshots are delivered separately.

Automated accessibility findings are not a conformance certification. Physical phones, screen readers, and current employment or external project claims were not independently verified. The employment/education source is the existing user CV; company-role context is the user's brief. The original CV remains unchanged.
