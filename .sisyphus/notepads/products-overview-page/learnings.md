
## learnings.md

### Path Conventions for Nested Pages
- Pages in en/ use ../assets/ for asset paths (1 level up)
- Pages in en/products/ use ../../assets/ for asset paths (2 levels up)
- Nav links use absolute paths (/en/, /en/products/) so they work from any depth
- Footer links also use absolute paths

### Design System
- --primary: #1a3a5c (deep blue)
- --accent: #c4922e (metallic gold)
- --secondary: #5F656F
- --light: #F5F5F5
- --dark: #1a3a5c
- .btn-accent class for gold CTA buttons
- Navbar: 
avbar-dark with ackground-color: #1a3a5c and sticky-top
- Footer: ackground-color: #0d1f33 with copyright bar at #0a1828

### Product Cards Pattern
- Bootstrap card with .product-category-card custom class
- Gradient placeholder image (240px height) with Font Awesome icon
- Card body with h3 title, description paragraph, and .btn-accent CTA
- Hover effect: translateY(-6px) + box-shadow
- Cards in ow g-4 with col-lg-6 for 2-column layout on large screens
- Description text color: #5F656F (secondary), line-height: 1.8

### i18n Pattern
- Canonical URL: https://cinraymetal.com/en/products/
- hreflang zh-CN: https://cinraymetal.com/zh/products/
- hreflang x-default: same as English
- Navbar language switch: /zh/ with as fa-language icon

