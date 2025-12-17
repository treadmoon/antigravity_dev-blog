# Copilot 指南 — langchain_demo01

以下说明面向在此仓库中自动或半自动修改代码的 AI 代理，聚焦能让代理快速、安全且有价值地贡献的项目特定约定与模式。

- **项目类型**: Next.js (App Router) 项目，源码位于 `src/app`，全局入口见 [src/app/layout.js](src/app/layout.js).
- **启动 / 构建 / 检查**: 使用仓库 scripts（参见 [package.json](package.json））:
  - `npm run dev` — 本地开发（包含 `--turbopack`）
  - `npm run build` — 生产构建
  - `npm run start` — 生产启动
  - `npm run lint` / `npm run lint:fix` — ESLint 检查与自动修复
- **路径别名**: 源码根目录为 `src/`，支持 `@/` 别名（见 [jsconfig.json](jsconfig.json)）。优先使用绝对导入如 `@/lib/posts`。
- **路由与组件约定**:
  - 使用 App Router（`src/app`）的目录即路由。示例：`src/app/blog/page.jsx`、动态路由 `src/app/blog/[slug]/page.jsx`。
  - 文件默认为服务端组件（Server Components）。若需在组件中使用浏览器 API、状态或钩子，必须在文件顶部添加 `"use client"` 并将影响限制在必要的子树。
- **数据获取**: 优先在服务端（直接在页面或 layout 中）获取数据并传递給子组件；若示例中存在注释（如 `getPosts` 在 [src/app/blog/page.jsx](src/app/blog/page.jsx)）说明预期使用 server-side helpers。
- **导航与预取**: 使用 `next/link` 的 `Link` 组件实现页面间导航以触发内建预取（例见 [src/app/layout.js](src/app/layout.js)）；对外部或需禁用预取的链接使用普通 `<a>`。
- **样式**: 全局样式在 [src/app/globals.css](src/app/globals.css)。组件本地样式使用 CSS Modules（例如 [src/app/page.module.css](src/app/page.module.css) 与 [src/app/blog/styles.module.css](src/app/blog/styles.module.css)）。遵循已有命名与导入方式。
- **字体与 CSS 变量**: 项目使用 `next/font/google` 在布局中注入字体并通过 CSS 变量暴露（参见 [src/app/layout.js](src/app/layout.js)）。不要移除这些变量引用，新增样式应沿用该方式。
- **静态资源**: 放在 `public/`，通过绝对路径引用（示例 `/next.svg` 在 [src/app/page.js](src/app/page.js)）。
- **配置与运维注意**: `next.config.mjs` 为空默认配置；不要随意修改构建标志（例如 `--turbopack`）或删除项目 scripts，除非通过小的、可回滚的改动并获得人工确认。
- **代码改动建议（AI 代理行为准则）**:
  - 优先进行小而明确的改动（一个 issue / PR 对应一个功能或修复）。
  - 写出或更新与改动相关的测试（仓库当前未包含测试框架，新增测试请先征询主开发者）。
  - 保持样式与导入一致性：使用 `@/` 别名、CSS Modules、`Link` 组件等现有習惯。
  - 不要引入未经批准的大体量依赖或脚手架改动（例如切换打包器、添加大体量库），先创建说明性 PR。
- **查找变更点**: 若需添加新页面或 API：
  - 页面/路由 → 放在 `src/app/<route>`，若该路由需要共用布局则添加 `layout.jsx`。
  - 公共工具 → 放在 `src/lib/`（示例代码注释中已有 `@/lib/posts` 的引用）。
- **快速定位文件**: 重点文件/目录：
  - [package.json](package.json) — 运行脚本与依赖
  - [src/app/layout.js](src/app/layout.js) — 全局布局、字体、导航示例
  - [src/app/page.js](src/app/page.js) — 首页示例、静态资源使用
  - [src/app/blog/page.jsx](src/app/blog/page.jsx) — 列表页、示例数据導入注释
  - [src/app/blog/[slug]/page.jsx](src/app/blog/[slug]/page.jsx) — 动态路由示例
  - [jsconfig.json](jsconfig.json) — 绝对导入与别名配置

如果有我未覆盖的约定或你希望 AI 遵循的额外规则，请指出需要补充或更严格控制的地方。是否现在把文件直接提交到仓库？
