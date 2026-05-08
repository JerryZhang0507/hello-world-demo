# AGENTS.md

## 项目概述
Cinray Metal 不锈钢外贸企业官网，GitHub Pages 托管，部署分支：`main`。
自定义域名：`cinraymetal.com`（通过 `CNAME` 文件配置）。

## 架构
多页面企业站，基于 Industro 模板（Bootstrap 5）。中英双语分目录 i18n。
- `en/` — 英文站点（默认语言，根 `/` 跳转到 `/en/`）
- `zh/` — 中文站点
- `assets/` — CSS、JS、图片等静态资源（本地托管，禁止 CDN 热链）
- 无构建、无 npm 依赖，纯静态 HTML 直接部署

## 可用命令
无。没有构建步骤、开发服务器、测试套件。编辑 HTML 推送到 `main` 即部署。
可用 `/playwright` 技能进行浏览器自动化测试。

## 核心文件
- `index.html` — 根跳转页（meta refresh → `/en/`）
- `CNAME` — 自定义域名（禁止删除）
- `.nojekyll` — 禁用 Jekyll 处理（必须存在，否则 GitHub Pages 忽略下划线目录）
- `robots.txt` + `sitemap.xml` — SEO 基础设施
- `en/*.html` + `zh/*.html` — 核心页面（首页/关于/联系/产品列表）
- `en/products/**/` + `zh/products/**/` — 产品分类与详情页
- `en/blog/` + `zh/blog/` — 博客框架
- `assets/css/` — Bootstrap 5 + 品牌自定义样式
- `assets/js/` — Bootstrap 5 bundle JS
- `assets/images/` — 产品图、公司图

## 规则

### 代码风格
- 使用 Bootstrap 5 组件与工具类，禁止引入 jQuery（Bootstrap 5 原生 JS 已全覆盖）
- 品牌色：深蓝 `#1a3a5c` + 金属金 `#c4922e`
- 所有页面 `<meta charset="UTF-8">`，CSS/JS 本地路径引用
- 导航/页脚风格在所有页面保持一致（Bootstrap 5 navbar + footer）

### i18n 规则
- `en/` 目录：`<html lang="en">`；`zh/` 目录：`<html lang="zh-CN">`
- 每对对应页面必须互设 hreflang 双向链接（EN ↔ ZH）+ x-default
- 技术术语保留英文原文，中文补充说明

### SEO 清单
- 每页唯一 `<title>` + `<meta name="description">`，含业务关键词
- Schema.org 结构化数据（JSON-LD @graph 单 block）：Organization + Product + BreadcrumbList
- `sitemap.xml` 覆盖所有页面 URL；`robots.txt` 指向 sitemap 并 Allow 全站
- `.nojekyll` 必须存在于仓库根目录
- 所有 `<a href>` 不得残留 `#` 占位链接

### 文件操作
- 不要创建 `package.json`、`node_modules`、构建配置文件
- 不要删除 `CNAME` 文件
- 修改前先阅读现有文件，理解其意图

### HTML 结构
- 每页为完整 HTML5 文档（`<!DOCTYPE html>` + `<html lang="...">` + `<head>` + `<body>`）
- 使用语义化标签（`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`）

### Git 操作
- 默认不提交，除非用户明确要求
- 推送前确认变更内容

### 回答语言
- 使用中文回复

## 常见陷阱
- 不要引入 jQuery（Bootstrap 5 已内置所有交互）
- 不要使用 CDN 外链 CSS/JS（全部本地托管于 `assets/`）
- 不要在仓库提交 Formspree API key 或其他密钥
- 预览方式：直接在浏览器中打开 HTML 文件，或使用 `/playwright` 验证
