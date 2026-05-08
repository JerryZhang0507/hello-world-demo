# Findings

## Task: task-19-schema — Schema.org Validation

### What was checked
- All 34 HTML pages (17 EN + 17 ZH)
- Extracted JSON-LD from 26 pages (13 EN + 13 ZH)
- Validated JSON syntax for all 26 blocks
- Checked Organization, WebSite, Product, BreadcrumbList, CollectionPage schemas

### Key Finding: i18n URL Bug in ZH BreadcrumbList
ALL 10 ZH product detail pages + 1 ZH category page have BreadcrumbList
item URLs pointing to /en/ instead of /zh/. The only ZH page with correct
/zh/ URLs is zh/blog/index.html (used as reference).

This bug was found by comparing the "item" field URLs across all ZH product
pages and confirming they used https://cinraymetal.com/en/... instead of
https://cinraymetal.com/zh/...

### Verification method
- PowerShell: Select-String with regex to extract JSON-LD blocks
- ConvertFrom-Json to validate JSON syntax (all 26 passed)
- Regex to match "item": "https://cinraymetal.com/(en|zh)/" to detect URL bug
