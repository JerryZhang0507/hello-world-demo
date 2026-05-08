# Problems

## Unresolved: ZH BreadcrumbList URLs pointing to /en/
11 ZH pages have BreadcrumbList structured data with incorrect
language URLs. This is a bug that needs fixing but is outside
the scope of this validation task.

## Technical Debt: Missing JSON-LD on 8 pages
en/about.html, en/contact.html, en/products/index.html,
en/products/steel-wire-ropes/index.html,
zh/about.html, zh/contact.html, zh/products/index.html,
zh/products/steel-wire-ropes/index.html
These pages lack any JSON-LD structured data. About/Contact
pages should have Organization schema. Product listing pages
should have ItemList or CollectionPage schema.
