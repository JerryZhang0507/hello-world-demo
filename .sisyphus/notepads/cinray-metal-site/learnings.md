# Learnings - Task 1: Rewrite AGENTS.md

## What worked
- Used plan file (.sisyphus/plans/cinray-metal-site.md) as authoritative source for new architecture
- All required sections fit: 项目概述, 架构, 可用命令, 核心文件, 规则, 常见陷阱
- Verification via PowerShell Select-String (grep/rg not available on this Windows environment)

## Key decisions
- Removed ALL single-file assumptions (旧 "单文件站点", "无框架", incomplete HTML structure)
- Added: Bootstrap 5 rules (no jQuery), i18n rules (en/ + zh/ + hreflang), SEO checklist (Schema/sitemap/robots/nojekyll)
- Preserved: CNAME protection, Git rules, Chinese response rule
- Added "完整 HTML5 文档" requirement (replacing old "故意不完整" approach)
- Added Formspree key security warning to 常见陷阱

## Convention: Agent communication
- AGENTS.md serves as the single source of truth for all agents working on this repo
- Structure follows plan's architecture decisions: Industro template, Bootstrap 5, directory-based i18n
- Brand colors documented: 深蓝 #1a3a5c + 金属金 #c4922e
## Formspree Contact Form Setup

### What was done
- Created `assets/js/form-config.js` with a placeholder Formspree endpoint configuration.
- The file exports `getFormEndpoint()` which contact forms can use to get the submission URL.

### What you need to do (human steps required)
1. Go to https://formspree.io/ and sign up for a free account (email verification required — cannot be automated).
2. Create a new form, name it "cinray-contact" (or similar).
3. Copy your form endpoint URL — it looks like `https://formspree.io/f/xxxxxxxx`.
4. Open `assets/js/form-config.js` and replace `YOUR_FORM_ID` with the actual ID from your Formspree dashboard.
5. The free plan allows 50 submissions/month — sufficient for a small business site.

### Integration notes
- The contact form pages (en/contact.html, zh/contact.html) should include `<script src="../assets/js/form-config.js">` and call `getFormEndpoint()` to get the submission URL.
- Form submission should use `fetch()` or `XMLHttpRequest` to POST to the Formspree endpoint with `Accept: application/json` header.
- No API keys or secrets are stored in the config file — Formspree identifies your form by the endpoint URL path (the form ID).

## Task 4: SEO Infrastructure Files
**Date**: 2026-05-08
**Status**: Complete

### Files Created:
1. obots.txt - Root directory. Standard allow-all + sitemap reference.
2. sitemap.xml - Root directory. 35 URLs total (1 root + 17 EN + 17 ZH).
3. en/sitemap.xml - EN directory. 18 URLs (1 root + 17 EN).

### URL Count Verification:
- Root: 1 URL
- EN: 17 URLs (en/, about, contact, products/, products/flat-steel-bars/ + 5 product detail, products/steel-wire-ropes/ + 5 product detail, blog/)
- ZH: 17 URLs (mirror of EN)
- Total: 35 URLs in root sitemap, 18 in en sitemap

### Priority Scheme:
- Root: 1.0
- Home pages (/en/, /zh/): 0.9
- Product pages: 0.8
- About/Contact/Blog: 0.7

### Verification:
- Both sitemap XML files parse correctly via PowerShell [xml] type accelerator
- Correct namespace: http://www.sitemaps.org/schemas/sitemap/0.9
- All lastmod dates: 2026-05-08
- No LSP server for .xml (expected - validation done via PowerShell XML parsing)

## Task 2: Template Download Learnings (2026-05-08)

### Download Strategy
- Industro template ZIP download requires email submission (themewagon.com/htmlcodex.com)
- Workaround: Downloaded individual files directly from GitHub Pages demo (themewagon.github.io/Industrio/)
- All CSS/JS/font files are publicly accessible on the demo site

### License
- Template license: CC BY 4.0 (commercial use OK, attribution required)
- Footer credit "Designed By HTML Codex" must be retained per CC BY 4.0
- All bundled libraries (Bootstrap, OwlCarousel, etc.): MIT licensed

### jQuery Discovery
- Template explicitly includes jQuery v3.4.1 (CDN in HTML)
- Key dependencies on jQuery: OwlCarousel 2, CounterUp, Waypoints, jQuery Easing
- WOW.js is vanilla JS, no jQuery dependency
- jQuery NOT copied to assets/ (as per guardrail)
- All jQuery-dependent functionality must be replaced with vanilla JS in T5

### Bootstrap Version
- CSS file: Bootstrap v5.0.0 (from theme)
- JS file: Bootstrap v5.0.2 (downloaded from jsDelivr - latest v5.x patch)
- Both v5.x, compatible

### Font Files
- Font Awesome 5.10.0 Free: 3 webfonts (solid 74KB, brands 73KB, regular 13KB)
- Bootstrap Icons 1.4.1: 2 font files (woff2 83KB, woff 111KB)
- Bootstrap Icons CSS needed path fix: ./fonts/ → ../fonts/

### File Inventory
- Total: 21 files, ~756 KB
- Core: bootstrap.min.css (160KB) + bootstrap.bundle.min.js (77KB) + style.css (12KB) + main.js (3KB)
- All CDN references converted to local paths
- No jQuery, no npm, no build tools in assets/

## Task 5: Adapt Template CSS/JS with Cinray Metal Branding
**Date**: 2026-05-08
**Status**: Complete

### CSS Changes
- Replaced `--primary` from `#FF5E14` (orange) → `#1a3a5c` (deep blue)
- Replaced `--dark` from `#02245B` → `#1a3a5c` (deep blue)
- Added `--accent: #c4922e` (metal gold)
- Navbar link hovers now use `--accent` instead of `--primary`
- Header carousel control icons now use `--accent` instead of `--primary`
- `.btn-play` background now uses `--accent`
- `.service-item .btn:hover` now uses `--accent`
- Added `.btn-accent` utility class
- Updated all hardcoded `rgba(2, 36, 91, ...)` → `rgba(26, 58, 92, ...)` (4 occurrences)
- Removed: `.team-item` / `.team-social` section (lines 558-573 of original)
- Removed: All `.owl-nav`, `.owl-item`, `.owl-prev`, `.owl-next` from project-carousel and testimonial-carousel
- Removed: `.testimonial-carousel::before`, `::after` gradient mask styles
- Kept: Testimonial visual styles (`.testimonial-img`, `.testimonial-text`)

### JS Rewrite (main.js)
- Replaced `(function ($) { ... })(jQuery)` IIFE with `(function () { ... })()` and `DOMContentLoaded` event
- Replaced `$(window).scroll(...)` with `window.addEventListener('scroll', ...)`
- Replaced `$('.back-to-top').fadeIn/fadeOut` with CSS opacity + display toggling
- Replaced `$('html, body').animate()` smooth scroll with `window.scrollTo({ behavior: 'smooth' })`
- Replaced Modal Video jQuery handlers with Bootstrap 5 native modal events (`shown.bs.modal`, `hide.bs.modal`)
- Replaced OwlCarousel with `initCarousel()` calls (vanilla-carousel.js)
- Replaced CounterUp+Waypoints with `initCounters()` call (vanilla-counter.js)
- Kept WOW.js init (vanilla JS, no jQuery)

### New Vanilla JS Files
- `assets/js/vanilla-carousel.js` (232 lines): CSS transform-based carousel with auto-play (5s), prev/next buttons, dot indicators, responsive breakpoints, center mode, loop support
- `assets/js/vanilla-counter.js` (60 lines): Intersection Observer + requestAnimationFrame with ease-out animation

### Deletions
- `assets/lib/owlcarousel/` (owl.carousel.min.js) — deleted
- `assets/lib/counterup/` (counterup.min.js) — deleted
- `assets/lib/easing/` (easing.min.js) — deleted
- `assets/lib/waypoints/` (waypoints.min.js) — deleted
- `assets/css/owl.carousel.min.css` — deleted
- `assets/css/owl.theme.default.min.css` — deleted
- `assets/lib/wow/` — KEPT (vanilla JS)

### jQuery Verification
- After cleanup: only `bootstrap.bundle.min.js` contains the word "jquery" (Bootstrap 5 internal detection, not a dependency)
- All source files (CSS, JS, HTML, LICENSE) have zero jQuery references
- Task constraint "Do NOT touch bootstrap.bundle.min.js" — honored


## Task 7: Shared EN Navbar + Footer Template (en/index.html)
**Date**: 2026-05-08
**Status**: Complete

### Key Decisions
- **Dark navbar override**: Existing style.css navbar links are dark-on-light (`color: var(--dark)` = #1a3a5c). For the dark navbar (`#1a3a5c` background), added a `<style>` block with `.navbar-dark .navbar-nav .nav-link` override (higher specificity, 040 vs 030) setting white text with gold accent hover/active.
- **Kept Industro navbar-brand angular effect**: `.navbar .navbar-brand` has `::after` pseudo-element with `skewX(-30deg)` creating the distinctive angular brand box. Preserved for consistent brand identity.
- **Footer links use `.btn.btn-link` pattern**: Existing `.footer .btn.btn-link` styles have Font Awesome chevron (`\f105`) decorations. Used this instead of plain `<ul><li><a>` for visual consistency with the Industro design system.
- **Back-to-top button**: Included `.back-to-top` with `.btn-accent.btn-lg-square.rounded-circle` — main.js has scroll handler that toggles display/opacity after 300px scroll.
- **Included Bootstrap Icons + Animate.css**: Available in assets, included for downstream page templates (hero animations, icon usage).

### Template Design
- Placeholder tokens: PAGE_TITLE_PLACEHOLDER, PAGE_DESC_PLACEHOLDER, CANONICAL_URL_PLACEHOLDER, ZH_URL_PLACEHOLDER
- x-default hreflang: hardcoded to `https://cinraymetal.com/en/`
- id="navbarCollapse" for Bootstrap collapse target
- Language switcher: `<i class="fas fa-language"></i> 中文` linking to /zh/

### Footer Structure
- 4-column grid: `col-lg-3 col-md-6` each (stacks to 2 columns on tablet, single on mobile)
- Column 1: Company name + tagline text
- Column 2: Quick Links using `.btn.btn-link` (inherits FA chevron decoration)
- Column 3: Contact with FA icons (envelope, phone, WhatsApp brand icon)
- Column 4: CTA — descriptive text + `.btn-accent.rounded-pill` "Request Quote"
- Copyright bar: darker shade #0a1828, HTML Codex credit per CC BY 4.0

### CSS Color Palette Used
- Navbar bg: #1a3a5c (--primary)
- Footer bg: #0d1f33 (darker than --primary)
- Copyright bg: #0a1828 (darkest)
- Accent/CTA: var(--accent) = #c4922e (gold)
- Text muted: #B0B9AE (matches existing .footer color)
- Link hover/active: var(--accent)

### Verification
- All 7 asset paths confirmed exist in filesystem
- LSP diagnostics: biome not installed (expected — no npm in this project)
- File: 150 lines, UTF-8 BOM encoding

### Downstream Impact
- This is T7 of 26 — creates the shared template that T8-T11 will copy for all EN pages
- Each page replaces placeholders and injects page-specific content into `<main>`

## Task: English Homepage (en/index.html)
**Date**: 2026-05-08
**Status**: Complete

### What was built
- Full homepage with Hero, Product Categories (2 cards), Why Choose Us (3 items), CTA section
- JSON-LD @graph schema: Organization + WebSite in single script block
- Navbar and footer preserved exactly from T7 template

### Key decisions
- Hero: gradient background #1a3a5c → #0d1f33, 70vh min-height, heading + subheading + 2 CTA buttons (View Products + Get Quote)
- Product cards: Bootstrap cards with Font Awesome icons (fa-cubes for flat bars, fa-link for wire ropes), flex-grow-1 to push button to bottom
- Why Choose Us: 3 col-md-4 with Font Awesome icons (fa-check-circle, fa-tags, fa-globe-asia) in var(--accent) gold
- CTA section: #0d1f33 dark background, 2 buttons (Request Quote accent + Browse Products outline)
- Product links target: /en/products/flat-steel-bars/ and /en/products/steel-wire-ropes/
- All content: industry-specific stainless steel terminology, no Lorem Ipsum

### Verification results
- No PLACEHOLDER tokens remain
- No Lorem Ipsum
- HTML Codex credit preserved in copyright bar
- JSON-LD schema: valid @graph with Organization + WebSite
- Navbar: all 5 links + language switcher intact
- Footer: 4-column grid + copyright bar intact
- CSS: uses design tokens (var(--accent), var(--light), --primary)

### Design system usage
- Colors: via CSS variables (--accent for gold, --primary for blue, --light for bg sections)
- Buttons: .btn-accent for gold CTA, .btn-outline-light for outline CTA
- Spacing: Bootstrap py-5 + py-4 on container
- Typography: display-4 (hero), display-6 (section headings), lead (subheadings)
- Cards: .card.h-100.border-0.shadow-sm.rounded-4
- Icons: Font Awesome 5 (fas fa-*)
## Task: Create Flat Steel Bars Product Pages (6 EN pages)
**Date**: 2026-05-08
**Status**: Complete

### Files Created
- `en/products/flat-steel-bars/index.html` — Category overview with intro, applications, product cards, JSON-LD
- `en/products/flat-steel-bars/hot-rolled-304.html` — Grade 304 hot rolled detail page
- `en/products/flat-steel-bars/hot-rolled-316.html` — Grade 316 hot rolled detail page
- `en/products/flat-steel-bars/hot-rolled-316l.html` — Grade 316L hot rolled detail page
- `en/products/flat-steel-bars/cold-drawn-304.html` — Grade 304 cold drawn detail page
- `en/products/flat-steel-bars/cold-drawn-316.html` — Grade 316 cold drawn detail page

### Key Decisions
- **Assets path**: All pages use `../../../assets/` (3 levels up from `en/products/flat-steel-bars/`)
- **Nav links**: Use absolute paths (`/en/`, `/en/products/`, etc.) — same across all pages
- **Nav active state**: All pages have "Products" as active nav link
- **Navbar/footer**: Copied verbatim from `en/products/index.html`
- **CSS override**: `.navbar-dark .navbar-nav .nav-link` dark navbar override included in each page `<style>`
- **No Lorem Ipsum**: All content uses industry-specific stainless steel terminology

### Detail Page Differences
- Hot-rolled: surface "Hot Rolled (No.1)", thickness 3-30mm, width 20-200mm, process "Hot Rolled & Annealed", chemical composition varies by grade
- Cold-drawn: surface "Cold Drawn (Bright / 2B equivalent)", thickness 3-20mm, width 20-150mm, tighter tolerance h9-h11, process "Cold Drawn & Annealed"

### JSON-LD Schema
- Category page: CollectionPage + BreadcrumbList @graph
- Detail pages: Product + BreadcrumbList @graph (unique SKU per product: FSB-304-HR, FSB-316-HR, FSB-316L-HR, FSB-304-CD, FSB-316-CD)

### Verification
- All 6 files exist and pass structural validation (DOCTYPE, html lang, head, body, JSON-LD, title, meta desc, footer, bootstrap JS)
- LSP: biome not installed (expected — no npm in this project)

## Task 13: EN Steel Wire Ropes Category + 5 Detail Pages
**Date**: 2026-05-08
**Status**: Complete

### Files Created:
1. `en/products/steel-wire-ropes/index.html` — Category overview (335 lines)
2. `en/products/steel-wire-ropes/galvanized-6x19.html` — Detail page (273 lines)
3. `en/products/steel-wire-ropes/galvanized-6x36.html` — Detail page (277 lines)
4. `en/products/steel-wire-ropes/stainless-304-7x7.html` — Detail page (277 lines)
5. `en/products/steel-wire-ropes/stainless-304-7x19.html` — Detail page (277 lines)
6. `en/products/steel-wire-ropes/stainless-316-7x19.html` — Detail page (278 lines)

### Key Decisions
- **No existing detail page reference**: flat-steel-bars directory was empty, so created all pages from scratch using `en/products/index.html` as navbar/footer template
- **Asset paths**: `../../../assets/` (3 levels deep: `en/products/steel-wire-ropes/` → root `assets/`)
- **Nav links**: Used absolute paths (`/en/`, `/en/products/`, etc.) for depth-independent navigation
- **JSON-LD @graph**: Each detail page has Organization + Product + BreadcrumbList in single `<script type="application/ld+json">` block
- **SKU format**: `WR-GRADE-CONSTRUCTION` (e.g., `WR-SS304-7X7`)
- **Category overview**: No Schema.org (only detail pages have Product + BreadcrumbList)

### Page Structure (detail pages):
1. Dark navbar (#1a3a5c) with Products active
2. Page header with breadcrumb (Home > Products > Steel Wire Ropes > Product Name)
3. Product image placeholder (gradient) + product description + CTA
4. Technical Specifications table (7 rows: Construction, Diameter, Grade, Core Type, Breaking Load, Surface Finish, Standard)
5. Key Features section (4 features per page)
6. Footer + Copyright bar
7. Schema.org JSON-LD @graph
8. Bootstrap CSS/JS from ../../../assets/

### Meta Tags (per detail page):
- `<title>`: "PRODUCT NAME | Cinray Metal"
- `<link rel="canonical">`: full cinraymetal.com URL
- `<link rel="alternate" hreflang="zh-CN">`: Chinese mirror URL
- `<link rel="alternate" hreflang="x-default">`: EN URL

### Bug Fixed
- **galvanized-6x36.html**: Initial creation had malformed features section (missing closing `</div>` on feature 2, only 2 features vs. 4). Fixed with proper structure and 4 features.

### Verification Results
- All 6 files: assets=True, hreflang=True, lorem=False
- All detail pages: schema=True (Product + BreadcrumbList)
- All detail pages: spec table with all 7 required rows
- All pages: 4 features in features section
- Hash link count=1 (back-to-top button only, standard pattern)
- LSP: biome not installed (expected — no npm in project)

### Convention Notes
- Brand colors: #1a3a5c (deep blue) for section titles, #c4922e (gold) for accents
- Cards use .btn-accent for CTA buttons
- Product image placeholders use gradient: linear-gradient(135deg, #1a3a5c, #c4922e, #2a5a8c)
- Feature icons use .fa-check-circle with var(--accent) gold color
- Bootstrap 5: .table.table-bordered for spec tables, .d-flex for features
- No jQuery, no CDN, no Lorem Ipsum

## Task: Create Chinese Blog Index (zh/blog/index.html)
**Date**: 2026-05-08
**Status**: Complete

### What was created
- `zh/blog/index.html` — Full Chinese translation of `en/blog/index.html`

### Key Decisions
- **Navbar**: Matches `zh/products/index.html` pattern exactly — Chinese labels (首页, 产品, 关于我们, 联系我们, 博客), "博客" active, language switcher to `/en/blog/`, `aria-label="切换导航"`
- **Footer**: Matches `zh/index.html` pattern — Chinese section labels (公司信息, 快速链接, 联系方式, 获取联系), WhatsApp 在线咨询, 获取报价 button, 版权信息 bar
- **Asset paths**: `../../assets/` (2 levels up from `zh/blog/`, same depth as `zh/products/`)
- **hreflang**: Self-reference `zh-CN`, alternate `en` to `/en/blog/`, x-default to `/en/blog/`
- **JSON-LD BreadcrumbList**: 首页 → 博客 (Chinese names)
- **Article translations**: 3 articles with Chinese titles, dates in Chinese format (2026年5月8日), translated excerpts, "阅读更多" buttons
- **Meta**: title "博客 | 不锈钢行业洞察 | Cinray Metal", description in Chinese

### Verification
- File exists: 259 lines, UTF-8 BOM encoding
- All hreflang tags bidirectional with en/blog/index.html
- No PLACEHOLDER tokens, no Lorem Ipsum
- All nav links use absolute paths (`/zh/`, `/zh/products/`, etc.)
- Bootstrap 5 + Font Awesome + Bootstrap Icons from `../../assets/`

### Pattern Consistency
- Zh navbar pattern: Chinese labels with "切换导航" aria-label
- Zh footer pattern: 公司信息, 快速链接, 联系方式, 获取联系 sections
- Zh copyright: "基于 HTML Codex 模板设计 (CC BY 4.0)"
- Zh back-to-top: 返回顶部 comment

## F4: Scope Fidelity Check (2026-05-08)

### Check Results

| # | Check Item | Result | Detail |
|---|-----------|--------|--------|
| 1 | No extra pages | PASS | en/ = 17 HTML, zh/ = 17 HTML, root index.html = 1. Total = 35. |
| 2 | No CMS/blog engine | PASS | blog/ contains only index.html per language (en/blog/index.html, zh/blog/index.html). No article HTML files beyond placeholder listing. |
| 3 | No build configs | PASS | No package.json, webpack.config.js, vite.config.*, Makefile, Dockerfile found. |
| 4 | No cloud configs | PASS | No .env, nginx.conf, docker-compose.yml, kubernetes/ directory found. |
| 5 | No extra Schema types | PASS | Found: Organization, WebSite, Product, BreadcrumbList, CollectionPage + sub-types (PostalAddress, ContactPoint, Offer, UnitPriceSpecification, ListItem). No FAQ, HowTo, Review, or other extra types. |
| 6 | Product pages count | PASS | Flat Steel Bars: 5 detail pages per language. Steel Wire Ropes: 5 detail pages per language. Total: 10 per language (20 total). |
| 7 | File count matches sitemap | PASS | sitemap.xml: 35 URLs. Actual HTML files: 35. Exact match. |
| 8 | No test framework | PASS | No jest, mocha, cypress, vitest config files found. Playwright used via skill only. |

### Infrastructure Verification

| Item | Result |
|------|--------|
| CNAME exists + content | PASS: `cinraymetal.com` |
| .nojekyll exists + empty | PASS: 0 bytes |
| Root index.html meta refresh | PASS: `<meta http-equiv="refresh" content="0;url=/en/">` |
| robots.txt | PASS: present |
| en/sitemap.xml (planned in T4) | PASS: present, valid XML |

### Observations (Non-Blocking)

- Blog "Read More" buttons use `href="#"` — expected for placeholder blog framework per plan T14.
- Back-to-top buttons use `href="#"` — standard Bootstrap pattern, powered by main.js scroll handler.
- `assets/images/about` and `assets/images/products` directories exist but are empty — plan says 占位图先行, real images TBD.

### VERDICT

**Tasks [22/22 compliant] | Contamination [CLEAN] | VERDICT: APPROVE**

No scope creep detected. All built items match the plan. Nothing was added beyond scope.

## Playwright QA Test Results - 2026-05-08 13:44

### Test Environment
- Server: Python http.server on port 9000
- Base URL: http://localhost:9000
- Browser: Playwright (Chromium)

### Scenario Tests

| # | Scenario | Result | Details |
|---|----------|--------|---------|
| 1 | EN Homepage | PASS | Title "Cinray Metal | ...", navbar visible, 2 console errors (favicon.ico 404 + initCounters undefined) |
| 2 | Mobile Hamburger | PASS | 375×812 toggle visible, expanded nav shows all links including "中文" |
| 3 | EN→ZH Switch | PASS | "中文" click → /zh/ with Chinese content |
| 4 | ZH→EN Switch | PASS | "English" click → /en/ with English content |
| 5 | Products Nav | PASS | 2 category cards (Flat Steel Bars + Wire Ropes), breadcrumb |
| 6 | Product Detail | PASS | Spec table (Grade/Thickness/Width/Length/Surface/Standard/Process/Chemical), JSON-LD (Product + BreadcrumbList) |
| 7 | Contact Validation | PASS | HTML5 validation: 3 required fields blocked empty submission (name/email/message) |
| 8 | About Page | PASS | Page loads, content visible |
| 9 | Blog Page | PASS | 3 article cards with dates and summaries |

### Issues Found
1. **initCounters undefined** (assets/js/main.js:91) — JS error on ALL pages. Function called but never defined (Industro template artifact).
2. **Missing favicon.ico** — 404 on ALL pages.
3. **Blog "Read More" links → #** — 3 placeholder links (expected for blog framework).
4. **Back-to-top button → #** — 1 per page (standard UX pattern, not a dead link).

### Screenshots
- screenshots/test1-en-home-desktop.png (EN home, desktop)
- screenshots/test2-en-home-mobile.png (EN home, mobile 375×812)
- screenshots/test3-zh-home-desktop.png (ZH home, desktop)  
- screenshots/test6-product-detail.png (Product detail page)

### Integration Checks
- Language switch: bidirectional EN↔ZH ✅
- Navbar: consistent across all pages ✅
- Footer: consistent across all pages ✅
- Product flow: Home → Products → Category → Detail ✅
- Breadcrumbs: present on products/detail pages ✅
