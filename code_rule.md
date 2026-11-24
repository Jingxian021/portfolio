# Case Study 代码结构规则

适用于 `src/components/` 下所有案例页组件（`*CaseStudy.jsx`）。
目标：六个案例页的「文件骨架、命名、段落顺序」完全一致，打开任意一个文件都能在同一位置找到同一类代码。

---

## 1. 文件与样式

| 项 | 规则 |
|---|---|
| 组件文件 | `src/components/<Project>CaseStudy.jsx`，一个文件 = 一个完整案例页，自包含 |
| 默认导出 | `export default function <Project>CaseStudy()` |
| 样式文件 | `src/styles/case-study-<project>.css`，在本组件文件末尾 `import` |
| CSS 根选择器 | `.case.<project>`，与页面根节点 `className="case <project>"` 一一对应 |
| 共享骨架 | 只在 `CaseStudy.jsx` 放跨案例组件（`ReadingProgress` / `CaseTop` / `CaseRail` / `CaseHero` / `ProjectIndex` / `Pending`） |
| 数据文件 | `src/data/<project>CaseStudy.js`，只导出数据，不写 JSX |

---

## 2. 文件内部固定顺序（7 段）

每段之间空一行，并用分隔注释标出（第 1 段 imports 位于文件开头，不写分隔注释）：

```jsx
/* ---------- 1. imports ---------- */
/* ---------- 2. 页面目录 ---------- */
/* ---------- 3. 视觉原子 ---------- */
/* ---------- 4. 页面头部 ---------- */
/* ---------- 5. 页面区块 ---------- */
/* ---------- 6. 内容主体 ---------- */
/* ---------- 7. 主入口 ---------- */
```

各段职责：

1. **imports**：顺序固定为 `react` → 本项目组件（`Footer`、`CaseStudy`）→ `data` → `css`；不保留未使用的 import。
2. **页面目录**：`const RAILS_<PROJECT> = [{ id, label }]`，顺序与页面滚动顺序一致。
3. **视觉原子**：本项目复用的小组件，统一命名为 `Pill`（小标签）与 `Rich`（富文本），可另加 `Figure` / `SectionHead`。
4. **页面头部**：统一调用共享 `CaseHero`（`CaseStudy.jsx`），不再自建 `<Project>Head`；数据只提供 `title` / `tags`(或 `tag`) / `meta` / `hero`。
5. **页面区块**：按页面从上到下的顺序排列，命名 `<SectionName>`，建议加序号注释 `/* 5.1 Background */`；若区块共用同一外层容器（如 `ne-main`），允许在 `<Project>Body` 内联编写，用 `{/* 5.x 名称 */}` 编号。
6. **内容主体**：`function <Project>Body({ study })`，只负责按顺序拼装第 4、5 段的组件。
7. **主入口**：页面壳，只做滚动复位、`document.title`、固定 6 件套布局。

---

## 3. 命名规则

| 类型 | 规则 | 示例 |
|---|---|---|
| 页面组件 | `<Project>CaseStudy` | `DeliveryCaseStudy` |
| 内容主体 | `<Project>Body` | `HiveeBody` |
| 页面头部 | 统一使用共享组件，不自建 | `CaseHero` |
| 区块组件 | 文件内唯一的语义名，建议带项目前缀 | `NutriPersona`、`SonimodHero`、`Background` |
| 目录常量 | `RAILS_<PROJECT>` | `RAILS_DELIVERY` |
| 小标签原子 | `Pill` | `Pill` |
| 富文本原子 | `Rich` | `Rich` |
| 锚点 id | 项目前缀 + 语义 | `ne-about`、`hv-whys`、`sn-profile` |
| CSS 类 | 项目前缀 + 语义 | `dlv-card`、`nutri-sec` |

- 组件用 `function` 声明，不用箭头函数。
- 区块组件统一接收 `data` prop（头部组件例外，接收 `study`）。
- 只有 `<Project>Body` 与主入口接触整份数据，区块组件不直接 import 数据文件。

---

## 4. 主入口模板

固定写法，顺序不可调整：

```jsx
/* ---------- 7. 主入口 ---------- */
export default function DeliveryCaseStudy() {
  const slug = 'robot-delivery'
  const project = getProject(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) document.title = `${project.title} — Jessie Guan`
    return () => {
      document.title = 'Jessie Guan'
    }
  }, [project])

  return (
    <div className="case delivery">
      <ReadingProgress />
      <CaseTop title={project ? project.title : 'Case study'} />

      <DeliveryBody />

      <CaseRail sections={RAILS_DELIVERY} />

      <ProjectIndex current={slug} />
      <Footer />
    </div>
  )
}
```

约束：

- 主入口**不写业务内容**，所有区块通过 `<Project>Body` 引入。
- `slug` 必须与 `src/data/projects.js` 中的 slug 完全一致。
- 根节点 class 固定为 `case <project>`。

---

## 5. 视觉原子规则

- `Pill`：封装本项目的小标签样式，渲染元素类型（`p` / `span` / `div`）由本项目 CSS 决定，**不要为了统一而改变元素类型**。
- `Rich`：富文本渲染。两种数据形态允许并存，但组件名必须都叫 `Rich`：
  - `Rich({ text })`：解析 `**粗体**` / `_斜体_` / `\n`
  - `Rich({ parts })`：渲染 `[['文字', 'b'], ['文字']]` 元组
- 只在确实有需求时添加原子，不要为了一次性使用造抽象。

---

## 6. JSX 约束

- 列表必须有稳定 `key`（优先用内容或 id，不用数组下标）。
- 图片必须带 `alt`；能用 `width` / `height` 就带上，非首屏图加 `loading="lazy"`。
- 注释统一用 `{/* ---------- 名称 ---------- */}`，不写大段说明性注释。
- 缩进 2 空格，不使用分号，字符串统一单引号（与现有代码一致）。

---

## 7. 新增案例页检查清单

- [ ] 文件名 `<Project>CaseStudy.jsx`，样式 `<project>` 前缀
- [ ] 7 段结构齐全且顺序正确
- [ ] 目录常量命名为 `RAILS_<PROJECT>`
- [ ] 主入口为 `<Project>CaseStudy`，包含固定 6 件套
- [ ] 业务内容不在主入口内
- [ ] 所有锚点 id 与 `RAILS_<PROJECT>` 一一对应
- [ ] 根节点 class 为 `case <project>`
- [ ] `slug` 与 `projects.js` 一致
- [ ] `npm run build` 通过
