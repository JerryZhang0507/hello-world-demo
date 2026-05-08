# Cinray Metal 企业官网

## TL;DR

> **Quick Summary**: 从零搭建 Cinray Metal 不锈钢外贸企业官网（中英双语），基于 Industro 模板，GitHub Pages 部署，完整 SEO 优化（Schema.org + sitemap + hreflang）。

> **Deliverables**: 中英双语 20+ HTML 页面 | SEO 基础设施 | Formspree 表单 | Playwright 自动化测试 | 更新 AGENTS.md

> **Estimated Effort**: Large | **Parallel Execution**: YES — 5 waves | **Critical Path**: 模板获取 → 页面框架 → 内容填充 → 翻译 → SEO验证

---

## Context

### Original Request
新入行不锈钢外贸销售，公司 Cinray Metal，主营扁钢和钢丝绳，需搭建 SEO 友好的企业官网。当前托管在 GitHub Pages（cinraymetal.com），后续可能迁云。可接受现成模板。

### Interview Summary
| 决策项 | 选择 |
|--------|------|
| 模板 | Industro（Bootstrap 5, 9+ 页, 开源） |
| 语言方案 | 分目录 i18n（en/ + zh/），hreflang 双向 |
| 根URL | 自动跳转英文 `/en/` |
| 页面 | 首页 / 产品列表 / 产品详情(2品类×5规格) / 关于 / 联系 / 博客 |
| 内容 | 用户提供中文产品目录，AI 翻译英文 |
| 联系 | Formspree 表单 + 邮箱 + 电话 + WhatsApp |
| 素材 | 占位图先行，真实图片后补 |
| 测试 | Playwright 浏览器自动化 |

### Research
- SEO: Schema.org @graph（Organization+Product+BreadcrumbList）+ robots.txt + sitemap.xml + .nojekyll 是关键
- GitHub Pages: 速度是 SEO 优势；表单需 Formspree；.nojekyll 必须存在
- Industro: Bootstrap 5 不依赖 jQuery，需验证许可 + 移除可能残留的 jQuery

### Metis Review
- ✅ 根URL行为、内容作者、产品规格来源 → 已确认
- ⚠️ 模板许可证 → Task 2 验证
- ⚠️ jQuery 残留 → Task 2 + Task 5 检查移除

---

## Work Objectives

### Core Objective
搭建 Cinray Metal 不锈钢外贸企业官网，实现中英双语、SEO 友好、GitHub Pages 部署、支持后续产品扩展。

### Concrete Deliverables
- 重写 AGENTS.md
- 根跳转 index.html + .nojekyll + robots.txt + sitemap.xml
- assets/（CSS/JS/图片）
- en/ + zh/ 各：首页、关于、联系、产品列表、10 产品详情、博客框架
- 每页 Schema.org 结构化数据
- Formspree 表单集成
- Playwright 测试验证

### Definition of Done
- [ ] `curl -I https://cinraymetal.com` → 200, 根跳转 → /en/
- [ ] Google Rich Results Test 通过（Org + Product + Breadcrumb）
- [ ] Lighthouse: Perf ≥85, SEO ≥95, A11y ≥85
- [x] Playwright 全场景通过，0 failures
- [ ] 零内部死链

### Must Have
- 中英双语完整网站（所有页面中英对应）
- Schema.org 三类型结构化数据（@graph 合并）
- 每页唯一 `<title>` + `<meta description>`
- Formspree 联系表单可用
- CSS/JS 本地托管
- UTF-8 `<meta charset="UTF-8">`

### Must NOT Have (Guardrails)
- ❌ jQuery | package.json | node_modules | 构建配置
- ❌ TypeScript | SASS | PostCSS | CDN 热链
- ❌ 删除 CNAME | 博客 CMS/评论 | 云迁移配置
- ❌ Lorem Ipsum | 每页 >1 个 JSON-LD block

---

## Verification Strategy

- **Infrastructure exists**: NO
- **Automated tests**: Playwright browser automation (`/playwright` skill)
- **Agent-Executed QA**: ALL tasks verified via Playwright or curl

---

## Execution Strategy

### Waves
```
Wave 1 (6 tasks, ALL PARALLEL): 基础设施
Wave 2 (5 tasks, MAX PARALLEL): EN 核心页面
Wave 3 (3 tasks, MAX PARALLEL): EN 产品详情 + 博客
Wave 4 (4 tasks, MAX PARALLEL): ZH 中文版 + hreflang
Wave 5 (4 tasks, MAX PARALLEL): SEO验证 + 测试

Critical Path: T2 → T5 → T7 → T8 → T12/13 → T15/16 → T18 → T19/20 → FINAL
Max Concurrent: 6 (Wave 1)
```

### Agent Dispatch
- **Wave 1**: 6 × `quick`
- **Wave 2**: 5 × `visual-engineering`
- **Wave 3**: 3 × `visual-engineering`
- **Wave 4**: 3 × `visual-engineering` + 1 × `quick`
- **Wave 5**: 2 × `quick` + 2 × `unspecified-high`
- **FINAL**: oracle + unspecified-high + unspecified-high(+playwright) + deep

---

## TODOs

> Implementation + Test = ONE Task. Every task MUST have QA Scenarios.

- [x] 1. **重写 AGENTS.md** (Wave 1, `quick`)

  **What**: 移除"单文件/无框架"约束，更新为多页面企业站。保留 CNAME 保护、Git 规则、中文回答。新增目录结构、Industro/Bootstrap 5 规则、i18n 规则、SEO 清单。

  **Must NOT**: 删除 CNAME 保护规则 / 写长篇教程

  **Parallel**: YES (Wave 1) | **Blocks**: None | **Blocked By**: None

  **QA**: `grep "CNAME" AGENTS.md`, `grep "Industro" AGENTS.md`, 确认不含"单文件站点"
  **Evidence**: `.sisyphus/evidence/task-1-agents.txt`
  **Commit**: `docs: rewrite AGENTS.md for enterprise multi-page site`

- [x] 2. **获取并验证 Industro 模板** (Wave 1, `quick`)

  **What**: 下载 Industro ZIP，检查 LICENSE（确认开源商用），检查 Bootstrap 5 版本，搜索 jQuery 引用。提取模板文件到 `assets/`。

  **Must NOT**: 覆盖 CNAME / 引入 jQuery

  **Parallel**: YES (Wave 1) | **Blocks**: T5, T7 | **Blocked By**: None

  **QA**: 确认 `assets/css/bootstrap.min.css` v5.x 存在；`grep -r "jquery" assets/` 无结果（或有已记录）；LICENSE 含 MIT/Apache
  **Evidence**: `.sisyphus/evidence/task-2-template.txt`
  **Commit**: `assets: add Industro template core resources`

- [x] 3. **创建目录结构 + .nojekyll + 根跳转页** (Wave 1, `quick`)

  **What**: 创建 `en/`, `zh/`, `en/products/flat-steel-bars/`, `en/products/steel-wire-ropes/`, `zh/products/...`, `en/blog/`, `zh/blog/`, `assets/css/`, `assets/js/`, `assets/images/products/`, `assets/images/about/`。创建空 `.nojekyll`。根 `index.html` 写 `<meta http-equiv="refresh" content="0;url=/en/">`。

  **Must NOT**: 触碰 CNAME / 创建 package.json

  **Parallel**: YES (Wave 1) | **Blocks**: T7 | **Blocked By**: None

  **QA**: `Test-Path` 验证所有目录 + `.nojekyll`；`cat index.html` 确认 meta refresh 到 `/en/`
  **Evidence**: `.sisyphus/evidence/task-3-structure.txt`
  **Commit**: `structure: create site directory tree, .nojekyll, root redirect`

- [x] 4. **配置 SEO 基础设施（robots.txt + sitemap.xml）** (Wave 1, `quick`)

  **What**: `robots.txt`: `Allow: /` + `Sitemap: https://cinraymetal.com/sitemap.xml`。`sitemap.xml` 列出所有页面 URL 含 `<lastmod>`。`en/sitemap.xml` 英文子站地图。XML 格式有效。

  **Must NOT**: 未来日期作 lastmod

  **Parallel**: YES (Wave 1) | **Blocks**: T19 | **Blocked By**: T3

  **QA**: robots.txt 含 Allow + Sitemap；sitemap.xml 为有效 XML；URL 使用 cinraymetal.com
  **Evidence**: `.sisyphus/evidence/task-4-seo.txt`
  **Commit**: `seo: add robots.txt and sitemap.xml`

- [x] 5. **提取并适配模板核心资源（CSS/JS）** (Wave 1, `quick`)

  **What**: 从 Industro 提取精简 CSS/JS 到 `assets/`。品牌色：深蓝 `#1a3a5c` + 金属金 `#c4922e`。移除 portfolio/team/pricing 等未用样式。确保无 jQuery。CSS/JS 路径相对引用。

  **Must NOT**: 保留无关样式 / 保留 jQuery

  **Parallel**: YES (Wave 1) | **Blocks**: T7-T14 | **Blocked By**: T2

  **QA**: `assets/css/bootstrap.min.css` + `assets/js/bootstrap.bundle.min.js` 存在；`grep "jquery" assets/` 无结果
  **Evidence**: `.sisyphus/evidence/task-5-assets.txt`
  **Commit**: `assets: adapt Industro CSS/JS with Cinray Metal branding`

- [x] 6. **注册 Formspree 并获取表单端点** (Wave 1, `quick`)

  **What**: formspree.io 注册免费账户，创建表单 "cinray-contact"。获取端点 URL。curl 测试端点。

  **Must NOT**: 提交 API key 到仓库

  **Parallel**: YES (Wave 1) | **Blocks**: T10 | **Blocked By**: None

  **QA**: curl POST 端点 → 200/302
  **Evidence**: `.sisyphus/evidence/task-6-formspree.txt`
  **Commit**: NO（端点写入 T10 HTML）

- [x] 7. **创建共享导航/页脚组件（EN）** (Wave 2, `visual-engineering`)

  **What**: EN 导航：Home | Products | About | Contact | Blog + 语言切换 `<a href="/zh/">中文</a>`。品牌名 "Cinray Metal"（文字 logo）。页脚：公司信息 + 快速链接 + WhatsApp 链接 + 版权。Bootstrap 5 navbar，响应式 hamburger。

  **Must NOT**: 图片 logo / 过度设计页脚

  **Parallel**: NO（所有页面依赖） | **Blocks**: T8-T14 | **Blocked By**: T2, T5

  **QA (Playwright)**: 1280×720 导航水平排列，"中文" href="/zh/"；375×812 hamburger 可见（`.navbar-toggler`）；footer 含 "Cinray Metal"
  **Evidence**: `.sisyphus/evidence/task-7-nav.png`
  **Commit**: NO（随 T8 页面一起提交）

- [x] 8. **EN 首页 + Organization Schema** (Wave 2, `visual-engineering`)

  **What**: Hero: "Premium Stainless Steel Raw Materials"。产品入口：扁钢 + 钢丝绳（各带 View Products 链接）。公司简述 + 3 卖点 + CTA。JSON-LD @graph: Organization + WebSite。`<title>`: "Cinray Metal | Stainless Steel Flat Bars & Wire Ropes Supplier"。`<meta description>` 含关键词。

  **Must NOT**: Lorem Ipsum / 模板原版文字

  **Parallel**: YES (与 T9-T11) | **Blocks**: T15 | **Blocked By**: T7

  **QA (Playwright)**: 标题含 "Cinray Metal"；h1 含 "Stainless Steel"；nav 链接齐全；`<script type="application/ld+json">` 含 Organization；0 console errors；375×812 无横向溢出
  **Evidence**: `.sisyphus/evidence/task-8-home-en.png` + `mobile.png`
  **Commit**: NO（Wave 2 批量提交）

- [x] 9. **EN 关于我们页** (Wave 2, `visual-engineering`)

  **What**: 公司介绍（不锈钢原材料供应商定位、出口经验、工厂规模）。核心优势（3-4 点，图标+描述）。可选：占位工厂图片。`<title>`: "About Cinray Metal | Stainless Steel Supplier"。

  **Must NOT**: 过度公司介绍 / 虚假数据

  **Parallel**: YES (与 T8, T10-T11) | **Blocks**: T15 | **Blocked By**: T7

  **QA (Playwright)**: 页面加载无 console 错误；含 "About" 标题；含 "Stainless" 关键词
  **Evidence**: `.sisyphus/evidence/task-9-about-en.png`
  **Commit**: NO

- [x] 10. **EN 联系我们页 + Formspree 表单** (Wave 2, `visual-engineering`)

  **What**: 联系表单：name + email + phone + message → Formspree action。HTML5 验证（required + email type）。联系信息区：邮箱、电话、WhatsApp（`https://wa.me/` 占位号）、微信（占位显示）。可选：Google Maps 位置（占位）。`<title>`: "Contact Cinray Metal | Inquiry & Quote"。

  **Must NOT**: 暴露真实号码前确认 / 复杂验证

  **Parallel**: YES (与 T8-T9, T11) | **Blocks**: T15 | **Blocked By**: T6-T7

  **QA (Playwright)**: 空表单提交触发 HTML5 验证；填写有效数据提交 → 成功提示；WhatsApp 链接 `wa.me/` 格式
  **Evidence**: `.sisyphus/evidence/task-10-contact-en.png`
  **Commit**: NO

- [x] 11. **EN 产品列表页** (Wave 2, `visual-engineering`)

  **What**: 两个产品分类卡片：Flat Steel Bars + Steel Wire Ropes，各带简介图片（占位）+ "View Details" 链接到 `/en/products/flat-steel-bars/` 和 `/en/products/steel-wire-ropes/`。`<title>`: "Products | Stainless Steel Flat Bars & Wire Ropes"。

  **Must NOT**: 放实际规格（留给详情页）

  **Parallel**: YES (与 T8-T10) | **Blocks**: T15 | **Blocked By**: T7

  **QA (Playwright)**: 两个分类卡片可见；链接指向正确子目录；无 console 错误
  **Evidence**: `.sisyphus/evidence/task-11-products-en.png`
  **Commit**: NO（Wave 2 批量提交: T7-T11 + T8 的 nav/footer）

- [x] 12. **EN 扁钢分类页 + 5 详情页** (Wave 3, `visual-engineering`)

  **What**: `en/products/flat-steel-bars/index.html` 分类概览页（扁钢简介、应用领域、子规格链接列表）。5 个详情页（每页一个具体规格模板）：含规格参数表（Grade / Thickness / Width / Length / Surface Finish / Standard）、占位产品图片、Product + BreadcrumbList @graph Schema。详情页命名示例：`hot-rolled-304.html`, `cold-drawn-304.html` 等。每个详情页 `<title>`: "[Grade] [Type] Flat Steel Bar | Cinray Metal"。

  **Must NOT**: 硬编码虚假规格数据（标记为占位） / 省略 Schema

  **Parallel**: YES (与 T13-T14) | **Blocks**: T16 | **Blocked By**: T7

  **QA (Playwright)**: 分类页含 5 个详情页链接且都可点击；每个详情页含规格表 `<table>`；每个详情页含 Product JSON-LD；BreadcrumbList 可见且正确
  **Evidence**: `.sisyphus/evidence/task-12-flat-steel.png` (per page)
  **Commit**: NO（Wave 3 批量提交）

- [x] 13. **EN 钢丝绳分类页 + 5 详情页** (Wave 3, `visual-engineering`)

  **What**: 同 T12 结构，但用于 Steel Wire Ropes。分类页含钢丝绳简介和应用。5 个详情页：含规格参数（Construction / Diameter / Grade / Core Type / Breaking Load / Standard）。Product + BreadcrumbList Schema。命名：`galvanized-6x19.html`, `stainless-304-7x7.html` 等。

  **Must NOT**: 同 T12

  **Parallel**: YES (与 T12, T14) | **Blocks**: T16 | **Blocked By**: T7

  **QA (Playwright)**: 同 T12 验证模式
  **Evidence**: `.sisyphus/evidence/task-13-wire-rope.png` (per page)
  **Commit**: NO

- [x] 14. **EN 博客框架页** (Wave 3, `visual-engineering`)

  **What**: `en/blog/index.html`：博客列表页，含标题 "Blog" + "Industry Insights" 副标题。3 篇占位文章卡片（标题 + 日期 + 摘要 + "Read More" 链接）。`<title>`: "Blog | Stainless Steel Industry Insights | Cinray Metal"。

  **Must NOT**: CMS / 评论 / RSS / 标签

  **Parallel**: YES (与 T12-T13) | **Blocks**: T17 | **Blocked By**: T7

  **QA (Playwright)**: 3 篇占位文章可见；每篇有链接；无 console 错误
  **Evidence**: `.sisyphus/evidence/task-14-blog-en.png`
  **Commit**: NO（Wave 3 批量: T12-T14）

- [x] 15. **ZH 共享组件 + 核心页面（首页/关于/联系）** (Wave 4, `visual-engineering`)

  **What**: 基于 T7-T11 的 EN 版本创建中文版。导航：首页 | 产品 | 关于 | 联系 | 博客 + `<a href="/en/">English</a>`。中文首页（Organization Schema 同 EN）、中文关于页、中文联系页（Formspree 端点同 EN）。所有 `<html lang="zh-CN">`。每页 `<title>` 含中文关键词。

  **Must NOT**: 直接机翻（人工适配中文表达） / 改变布局

  **Parallel**: YES (与 T16-T17) | **Blocks**: T18 | **Blocked By**: T8-T11

  **QA (Playwright)**: `<html lang="zh-CN">`；导航含中文链接且英文切换 href="/en/"；每页含中文内容；中文联系表单同 Formspree 端点
  **Evidence**: `.sisyphus/evidence/task-15-home-zh.png`
  **Commit**: NO

- [x] 16. **ZH 产品列表 + 10 详情页** (Wave 4, `visual-engineering`)

  **What**: 基于 T11-T13 EN 版本创建中文版。产品列表 + 扁钢 5 详情 + 钢丝绳 5 详情。所有规格数据翻译为中文表达。每个详情页含 Product + BreadcrumbList Schema（与 EN 相同 @id 引用 Organization）。英文技术术语保留（如 "304 Stainless Steel"），中文补充说明。

  **Must NOT**: 纯机翻技术术语 / 遗漏 Schema

  **Parallel**: YES (与 T15, T17) | **Blocks**: T18 | **Blocked By**: T12-T13

  **QA (Playwright)**: 每页 `<html lang="zh-CN">`；规格表含中英文对照；Product JSON-LD 存在；所有 ZH 页面 hreflang 指向 EN 对应页
  **Evidence**: `.sisyphus/evidence/task-16-products-zh.png`
  **Commit**: NO

- [x] 17. **ZH 博客框架页** (Wave 4, `visual-engineering`)

  **What**: 基于 T14 EN 版创建 `zh/blog/index.html`。中文博客列表，3 篇占位文章。`<title>` 含中文关键词。

  **Parallel**: YES (与 T15-T16) | **Blocks**: T18 | **Blocked By**: T14

  **QA (Playwright)**: 中文文章标题和摘要；`<html lang="zh-CN">`
  **Evidence**: `.sisyphus/evidence/task-17-blog-zh.png`
  **Commit**: NO

- [x] 18. **全局 hreflang 双向链接** (Wave 4, `quick`)

  **What**: 遍历所有 EN 和 ZH 页面，确保每对对应页面互相链接：
  - EN 页 `<link rel="alternate" hreflang="zh-CN" href="https://cinraymetal.com/zh/...">`
  - ZH 页 `<link rel="alternate" hreflang="en" href="https://cinraymetal.com/en/...">`
  - 每页 `<link rel="alternate" hreflang="x-default" href="https://cinraymetal.com/en/...">`

  **Must NOT**: 遗漏任何页面 / hreflang URL 拼错

  **Parallel**: NO（依赖 T15-T17 完成） | **Blocks**: T19 | **Blocked By**: T15-T17

  **QA (curl)**: 每个 EN 页面 grep 确认有 `hreflang="zh-CN"`；每个 ZH 页面确认有 `hreflang="en"`
  **Evidence**: `.sisyphus/evidence/task-18-hreflang.txt`
  **Commit**: YES (with T15-T17 batch): `feat: add zh-CN pages with hreflang cross-links`

- [x] 19. **Schema.org 验证** (Wave 5, `quick`)

  **What**: 对首页、所有产品详情页的 JSON-LD 用 Google Rich Results Test 验证。Organization schema 通过（logo 占位尺寸 ≥112×112）。Product schema 通过。BreadcrumbList schema 通过。

  **Must NOT**: 跳过任何产品页

  **Parallel**: YES (与 T20-T22) | **Blocks**: FINAL | **Blocked By**: T18

  **QA (curl + Google RT Test)**: Organization valid / Product valid / BreadcrumbList valid（至少 3 页抽样）
  **Evidence**: `.sisyphus/evidence/task-19-schema.txt`
  **Commit**: NO

- [x] 20. **Playwright 全站测试 + Lighthouse** (Wave 5, `unspecified-high` + `playwright`)

  **What**: 编写 Playwright 脚本覆盖：首页加载（EN+ZH）、语言切换、产品列表→详情导航、联系表单验证、移动端响应式、所有页面 console error 检测。运行 Lighthouse CLI：Performance ≥85 / SEO ≥95 / Accessibility ≥85 / Best Practices ≥85。

  **Must NOT**: 只测桌面端 / 忽略 console errors

  **Parallel**: YES (与 T19, T21-T22) | **Blocks**: FINAL | **Blocked By**: T18

  **QA (Playwright)**: 所有 scenario 通过，0 failures；Lighthouse 各项达标
  **Evidence**: `.sisyphus/evidence/task-20-lighthouse.json` + 截图
  **Commit**: NO

- [x] 21. **死链检测 + sitemap 校验** (Wave 5, `unspecified-high`)

  **What**: 用 Playwright 爬虫或 wget spider 遍历所有内部链接，确认无 404。sitemap.xml 中所有 URL 可访问。robots.txt 允许爬取。所有 `<a href>` 无 `#` 占位链接残留。

  **Must NOT**: 忽略外部链接（但只验证内部）

  **Parallel**: YES (与 T19-T20, T22) | **Blocks**: FINAL | **Blocked By**: T18

  **QA (bash + curl)**: 爬虫报告 0 死链；所有 sitemap URL → 200
  **Evidence**: `.sisyphus/evidence/task-21-deadlinks.txt`
  **Commit**: NO

- [x] 22. **最终部署验证 + CNAME 确认** (Wave 5, `quick`)

  **What**: 确认 CNAME 文件存在且内容为 `cinraymetal.com`。确认 `.nojekyll` 存在。检查 `assets/` 无临时文件。确认无 `package.json`/`node_modules`。模拟 GitHub Pages 文件结构检查：根 index.html、所有 en/ 和 zh/ 文件完整。

  **Must NOT**: 执行 git push（用户手动操作）

  **Parallel**: YES (与 T19-T21) | **Blocks**: FINAL | **Blocked By**: T18

  **QA (bash)**: `Test-Path CNAME` → true；`Test-Path .nojekyll` → true；`Test-Path package.json` → false
  **Evidence**: `.sisyphus/evidence/task-22-deploy-check.txt`
  **Commit**: NO

---

## Final Verification Wave

> After ALL implementation tasks. 4 review agents in PARALLEL. ALL must APPROVE. Present results → get explicit user "okay".

- [x] F1. **Plan Compliance Audit** (`oracle`)
  Verify: Must Have all present, Must NOT Have all absent, evidence files exist, deliverables match plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT`

- [x] F2. **Code Quality Review** (`unspecified-high`)
  Verify: W3C HTML validation (sample), no jQuery, no CDN hotlinks, UTF-8 charset on all pages, no console.log in production JS, no `#` hrefs, Bootstrap 5 classes correct.
  Output: `HTML Valid [PASS/FAIL] | jQuery [CLEAN/DETECTED] | Links [CLEAN/N issues] | VERDICT`

- [x] F3. **Real Manual QA** (`unspecified-high` + `playwright`)
  Execute ALL QA scenarios from ALL tasks. Test cross-task integration (nav works across all pages, language switch bidirectional, form submits to Formspree, product links all resolve). Test edge: JS disabled fallback, empty search, rapid clicks.
  Output: `Scenarios [N/N pass] | Integration [N/N] | VERDICT`

- [x] F4. **Scope Fidelity Check** (`deep`)
  For each task: verify what was built matches "What to do". Verify nothing beyond scope (no CMS, no extra pages, no cloud configs). Check "Must NOT do" compliance.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN] | VERDICT`

---

## Commit Strategy

- **Wave 1**: 5 commits (T1, T2, T3, T4, T5) — 每个独立提交
- **Wave 2**: 1 commit — `feat: add EN core pages (home, about, contact, products list)`
- **Wave 3**: 1 commit — `feat: add EN product detail pages (flat bars, wire ropes) and blog`
- **Wave 4**: 1 commit — `feat: add zh-CN translations with hreflang cross-links`
- **Wave 5**: 验证后按需修复提交
- **Deploy**: 用户确认后 `git push origin main`

---

## Success Criteria

### Verification Commands
```bash
# 根跳转
curl -I https://cinraymetal.com  # → HTTP 302 or 200 with redirect
# 英文首页
curl -I https://cinraymetal.com/en/  # → HTTP 200
# 中文首页
curl -I https://cinraymetal.com/zh/  # → HTTP 200
# robots.txt
curl https://cinraymetal.com/robots.txt  # → Allow: / + Sitemap:
# sitemap
curl https://cinraymetal.com/sitemap.xml  # → valid XML
```

### Final Checklist
- [x] All Must Have present
- [x] All Must NOT Have absent
- [x] Playwright: 0 failures
- [ ] Lighthouse: Perf ≥85, SEO ≥95, A11y ≥85
- [x] Schema.org: 3 types validated
- [x] CNAME preserved
- [x] Ready for `git push`
