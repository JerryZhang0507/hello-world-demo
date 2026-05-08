
---

## en/about.html ¡ª About Us Page
**Date**: 2026-05-08

### Patterns followed:
- Navbar and footer copied exactly from `en/index.html` (T7 template)
- "About" link set to `active` with `aria-current="page"`, "Home" link active removed
- `zh/` language link updated to `/zh/about.html` (page-specific, not root)
- Design tokens used throughout: `--primary` (#1a3a5c), `--accent` (#c4922e), `--secondary` (#5F656F), `--light` (#F5F5F5)
- Advantage cards use gold accent border-top (`3px solid #c4922e`) + white background for visual consistency
- No schema.org markup (per AGENTS.md, only pages that need it)
- All Font Awesome icons local, no CDN

### Conventions:
- Page header: dark blue (#1a3a5c) section with breadcrumb
- Body text color: #5F656F (--secondary)
- Headings color: #1a3a5c (--primary)
- Breadcrumb home link color: #c4922e (--accent)
- Image placeholder: Bootstrap utility gray (#e9ecef)

## T14: en/blog/index.html â€” English Blog Listing Page

**Date**: 2026-05-08
**File created**: `en/blog/index.html` (259 lines)

### Key Decisions:
- **Asset paths** used `../../assets/` (not `../assets/` as task implied) â€” because `en/blog/` is two levels deep from repo root, while `en/` core pages are one level deep. The task said "same as en/ level: `../assets/`" but that was a reference to the pattern used in `en/` pages; the correct equivalent for `en/blog/` is `../../assets/`.
- **Button class** changed from `btn-outline-accent` (nonexistent) to `btn btn-accent rounded-pill` â€” matches existing product card button style from `en/index.html`.
- **Meta description apostrophe** used `&rsquo;` HTML entity to avoid PowerShell encoding issues with single quotes in here-strings.
- **Chinese characters** in language switcher used HTML entities `&#20013;&#25991;` to avoid PowerShell UTF-8 corruption in here-strings.

### Conventions Followed:
- Navbar/footer copied verbatim from `en/index.html` (Blog link set as `active`, Home not active)
- JSON-LD @graph block: Organization + WebSite + BreadcrumbList
- hreflang: zh-CN (alternate), en (alternate), x-default (canonical)
- Blog header: dark blue gradient matching hero section style
- Card layout: Bootstrap 5 cards with `rounded-4`, `shadow-sm`, `border-0`

### Pitfalls Avoided:
- Did NOT create actual article pages (T14 is listing only)
- Did NOT add comment systems, RSS, tags, categories
- Did NOT use Lorem Ipsum
- Did NOT introduce CDN links or jQuery

