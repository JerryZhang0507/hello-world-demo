# Issues

## CRITICAL: ZH BreadcrumbList i18n URL bug
- Severity: High (SEO impact — hreflang confusion)
- Affected: 11 ZH pages
- Root cause: ZH product pages were likely created by copying EN pages
  and the BreadcrumbList "item" URLs were not updated from /en/ to /zh/
- Fix: Replace all `/en/` with `/zh/` in "item" field URLs within
  BreadcrumbList JSON-LD blocks of affected ZH files

## INCONSISTENCY: Organization schema variants
- Wire rope pages embed Organization with "contactPoint" field
- Home/blog pages embed Organization with "telephone" and "address" fields
- Flat steel pages use only @id reference (no inline Organization)
- These should be unified to a single consistent Organization schema
