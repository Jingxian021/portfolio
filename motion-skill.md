# Motion Skill — Grids 03 (obys.agency)

> 拆解对象：<https://grids03.obys.agency/>
> 来源：站点生产构建产物（`index.html` + `assets/index-*.css` + `assets/index-*.js`）逆向阅读，不是猜测。
> 用途：作为「高保真复刻 / 类似气质站点」的动效规范与配方库。

---

## 0. 技术档案

| 项 | 值 |
|---|---|
| 构建 | Vite，原生 ES module，无框架（手写 DOM 装配） |
| 动画内核 | **GSAP 3**（`gsap.timeline` / `fromTo` / `set` / `ticker` / `utils.clamp` / `parseEase`） |
| 滚动 | **ScrollTrigger**（大量 `scrub`）+ **Lenis 1.3.26**（`lerp: 0.1`, `smoothWheel: true`, `autoRaf: false`，由 GSAP ticker 驱动） |
| WebGL | OGL 风格（`Renderer` / `Scene` / `Camera` / `Plane` / `Program`），**自写 GLSL**，仅用于图片 hover 波纹 |
| 字体测量 | 大量用 `canvas.measureText().fontBoundingBox*` 做像素级基线对齐 |
| 布局单位 | `--s: calc(100vw / 1440)`，**所有坐标都是 1440 设计稿坐标 × scale** |

关键初始化（全局只做一次）：

```js
const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true, autoRaf: false });
lenis.on('scroll', (e) => { state.y = e.scroll; gsap.ticker.add(t => lenis.raf(t * 1000)); });
gsap.ticker.lagSmoothing(0);              // 关掉补帧，保证 scrub 与滚动严格同步
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);                    // 在读脚本前就执行，避免刷新回到中途
```

---

## 1. 全局运动语言（先记这一节）

### 1.1 缓动库（全站只用了 6 条）

| 语义 | 缓动 | 出现场景 |
|---|---|---|
| 标准入场 | `power3.out` | 遮罩揭示、逐行上升、网格列展开 |
| 快速收尾 | `power2.out` | 线条 scaleX、色带、宽度收缩 |
| 大位移/变形 | `power3.inOut` | 预加载器收束、视频覆盖层、文字宽度伸展 |
| 同类中段过渡 | `power2.inOut` | 颜色插值、状态切换 |
| 离场/坠落 | `power2.in` / `power1.in` | 提示字下落、高度增长、重力段 |
| 长揭示 | `expo.out` | 图片 clip-path 开窗（2.2s） |

没有 `back` / `elastic` / `bounce`——所有"弹性"都由**物理公式现场计算**（见 §3.7）或 **Lenis 的 lerp** 产生。

### 1.2 时长刻度

```
0.30  hover 淡出
0.35  about 行高亮过渡
0.42  提示字下落
0.50  rule-sweep 下划线 / 悬停延迟
0.55  线条 scaleX / "About" 词展开
0.62  提示字回升
0.70  about 逐行上升 / 视频覆盖层
0.80  intro 行上升 / 提示淡入
0.86  标题字母上升
1.10  预加载器模块落下
1.20  预加载器收束
2.20  图片开窗（expo.out）
```

### 1.3 三条不可动摇的规则

**规则 A：一切揭示 = 遮罩 + 位移 100%。**
容器 `overflow:hidden`，内层 `i` 初始 `translateY(100%)`（或 GSAP `yPercent:100`），目标 `0`。全站 80% 的"文字出现"都是这一招。

```css
.mask-line { display:block; overflow:hidden; }
.mask-line i { display:block; transform: translateY(100%); }
```

**规则 B：不以 ScrollTrigger 的 `pin` 做钉住，用 class 切 `position`。**
Story / Interlude 把舞台钉在视口里，靠三个类：

```css
.stage            { position: relative; }
.stage.is-held    { position: fixed; top:0; left:0; z-index:1; }
.stage.is-done    { position: absolute; bottom:0; left:0; }
```

`onToggle / onRefresh / onUpdate` 里统一判断 `scroll >= start && scroll < end`，并额外监听 `ScrollTrigger.addEventListener('scrollEnd', ...)` 兜底。这样避免 pin-spacer 带来的布局抖动。

**规则 C：所有"位置"都是设计稿坐标的函数。**
`const s = e => Math.round(e * scale)`，`scale = viewportWidth / 1440`。`resize` 时 100ms 防抖 + `ResizeObserver`，全部重排后再 `ScrollTrigger.refresh()`。

---

## 2. 场景 1 — 预加载器（模块化 GRIDS 字）

站点没有 logo 图片：`GRIDS` 被拆成 **23 个矩形模块**（硬编码在设计稿 1296×273 里，如 `{letter:'G', x:0, y:43, w:273, h:49}`）。预加载器就是让这些方块**表演"字如何变成网格"**。

三个阶段（一条 GSAP timeline，`onUpdate` 每帧重算模块布局）：

| 阶段 | 动作 | 参数 |
|---|---|---|
| 1. 落下 | -                        | `start: 0.35s`，`duration: 1.1`，`power2.out` |
| 2. 游走 | 中心点 `(x, y, spread)` 从 `.5/.5/0` → 三个角点 | 每段 `0.7s`，前半 `power2.out` 后半 `power1.in`，段间隔 `0.84s`；中点回弹系数 `0.28` |
| 3. 收束 | 回到 `.5/.5/0`，`ground` 上移，模块归位 | `duration: 1.2`，`power3.inOut` |

角点序列：`(0.02, 0.02, 1) → (0.98, 0.02, 1) → (0.02, 0.98, 1)`，`spread: 1` 让模块围绕中心**拉伸/压缩**——字在呼吸。

**版式核心：`layout(box, focus, tension)`**
把 5 个字母的水平区间按"离焦点的距离"加权分配宽度；焦点近的字母变宽、远的变窄，总宽归一到 `box.w`。这个纯函数同时服务于：预加载器、结尾全屏化、移动端 stub、以及顶部 band 的变形。**一处实现，四处复用**——这是复刻时最值得抄的结构。

收束后 `ground`（`#dedfd9` 灰纸）保留为**顶部横带**：`height = vw * 121 / 1440`，并随滚动继续变形（见 §4.3）。

---

## 3. 场景 2 — Intro 入场

预加载器结束 → 启动一条 `paused: true` 的 intro timeline，起点 = `preloader.at + 0.125s`。

| 元素 | 变换 | 时长 / 缓动 / 间隔 |
|---|---|---|
| 大标题 `GRIDS` / `S03` 每个字母 | `yPercent: 90 → 0` | `.86` / `power3.out` / stagger `.05` |
| 横向细线（约 79 条） | `scaleX: 0 → 1`（origin left） | `.55` / `power2.out` |
| 目录条目（18 条 × 3 段：序号 / 两行标题 / 时长） | `yPercent: 100 → 0` | `.8` / `power3.out` / 段间隔 `.04` |
| 顶栏 series 行 + about 两行 | `yPercent: 100 → 0` | `.8` / `power3.out` / 行间隔 `.04` |
| `Scroll to Explore` 提示 | `opacity: 0 → 0.3` | `.8` / `power3.out` |

**入场完成后的常驻循环**（`repeat: -1`）：

```
letters yPercent 0 → 100   (.42, power2.in,  stagger .028)
set       yPercent -100
letters yPercent -100 → 0  (.62, power3.out, stagger .028)
repeatDelay 3.4s
```

→ 逐字母"掉下去再从上面掉进来"，纯 `yPercent`，不做 3D。每 3.4 秒呼吸一次。

**随滚动的退场**：`opacity 1 → 0`，`scrollTrigger: { trigger: body, start: 'top top', end: '+=' + 0.15 * vh, scrub: true }`。

---

## 4. 场景 3 — 标题变角标（全站最漂亮的一段）

`GRIDS` 和 `S03` 一开始是 90px 的巨型标题，随滚动**滑进左上 / 右上角，变成导航 logo**，同时它背后的灰色 band 从"字的比例"长成"竖条网格"。

```
trigger: document.body
start: 0
end: () => 第 17 条目录条目的 top（≈ 1024 设计单位）
scrub: 0.6
```

进度 → 变化的映射（`Zp`）：

| 目标 | 属性 | 映射 |
|---|---|---|
| band | `width` | `vw → 90px`，`power2.out` |
| band | `height` | `vw * 121/1440 → vh`，`power2.in` |
| `GRIDS` 词 | `x` | `→ 90 + 18 - 词.left`（吸到左边缘） |
| `S03` 词 | `x` | `→ vw - 18 - 词.right`（吸到右边缘） |
| 两词 | `y` | `progress 0 → .5` 线性下移到基线；`.5 → 1` 回弹 |
| 全体模块 | 位置 | 每帧走 §2 的 `layout()`，从"横排字"过渡成"竖排网格" |
| 附加 | 抖动 | `y += velocity * 0.09 * (1 - clamp(progress/.5))` → 快速滚动时字有惯性拖尾 |

---

## 5. 场景 4 — 图片网格块（grid-block，共 3 块）

版式完全硬编码在设计稿 1440 上：四列 `110 / 440 / 770 / 1100`（列宽 330），右侧对齐线 `430 / 760 / 1090 / 1420`，条目高 `20px`、文字上偏 `28px`。

**单个图片的三层动效：**

1. **开窗（一次性）**
   ```js
   gsap.to({ at: 22 }, {
     at: 0, duration: 2.2, ease: 'expo.out',
     scrollTrigger: { trigger: frame, start: 'top 97%', once: true },
     onUpdate: () => frame.style.clipPath = `inset(${at}% ${at}% ${at}% ${at}%)`
   });
   ```
   从四周内缩 22% 开成一个窗，2.2 秒 `expo.out` —— 慢、贵、有分量。

2. **帧内视差（scrub）**
   图片高度比 frame 多出 `14%`（上下各 7%），滚动时 `y: +7% → -7%`，`ease: 'none'`，`scrub: 0.6`，区间 `top bottom → bottom top`。
   带裁切（`crop`）的图不居中，按裁切余量单独算 `up / down`，保证永远不露底。

3. **WebGL 波纹（见 §3.10）** 与 `clipPath` **同一个 `open` 进度**，开窗也是 shader 的入场。

**进度条类元素（bar）** 用绝对定位 + 设计稿坐标画，不做动画——只在区块内作为"网格骨架"，让动的东西显得是"在格子里动"。

---

## 6. 场景 5 — 参考线

8 条竖线（`1px`, `#e1e1e1`），`position: fixed`，默认 `visibility: hidden`。

```js
onToggle/onUpdate/onRefresh: scroll >= start → classList.toggle('is-on', ...)
gsap.to(lines, { opacity: 0, ease:'none',
  scrollTrigger: { trigger: until, start:'bottom bottom', end:'bottom top', scrub: true } });
```

出现区间 = **Story 钉住开始 → 第二块网格结束**，收尾淡出。作用是"把观众的意识从自由版式切到网格模式"。

---

## 7. 场景 6 — Story：四列网格演示

区块高 `5.35 × vh`，舞台高 `vh`，钉住后分两段讲"网格怎么搭"。

**阶段一 `opening`（`top 80% → top top`, scrub）**
- 4 列从**中心聚合位置**（`together`）滑到最终列位，列高 `20px → vh`
- 数字、角标、caption 从 `yPercent ±100` 升入
- `gutter`（3 条）与 `margin`（2 条）色带从底部升起

**阶段二 `telling`（`top top → += 7.95 * vh`, scrub 0.6）**

| 元素 | 映射 |
|---|---|
| 列填色 | `clipPath: inset(0 0 0 X%)`，`window [0, .12]`，stagger `0`；`grow [.06, 1]`，`growStagger .07`，`power2.inOut` |
| 列色 | `ink → ground` 插值，区间 `[.2, .55]`，`power1.inOut` |
| 步骤文字 | `opacity`，区间 `[.43, .7]`，`power3.out` |
| 步骤高亮 | `opacity = 0.3 + 0.7 * (1 - abs(i - current))`，同时 `x += 10 * i` |
| 圆点 | `y = step * pitch`，`pitch = 12 * 1.2 * scale`；每帧 lerp，`.7s power2.inOut` |
| 列数字 | `yPercent` 上升 / 离开，`power2.in / power3.out` |
| 列宽 | telling 期间重排：`left / right / together / togetherEnd` 四套坐标横切 |

这里的关键设计：**同一组元素在同一个 scrub 里换了两套坐标体系**（"分离的四列" ↔ "合并的整版"），靠 `clamp(0,1,(p - a)/(b - a))` 分段驱动，不用 timeline 分段。

---

## 8. 场景 7 — Interlude：文字物理场

`GRIDS` → `ARE` → `JUST / TOOLS` → `POWERFUL`，全部逐字母，**全程无补间，只有 `progress → 公式`**。

高度 `≈ 8.95 × vh`，分两段：

- `catching`（`top 100% → top pin`，scrub）：白色方块从底部升起，`655px` 宽时是一条"墙"，同时从 `1px` 线长成满屏竖线。
- `holding`（`top pin → += 7.95 * vh`，scrub）：整场演出。

**字母的三种运动模型：**

```js
// 1. 拼词出屏：从下方 mask 里升起（线性分配，ease: none）
const span = 1 - 0.16 * (n - 1);
letters.forEach((el, i) => el.style.transform =
  `translateY(${(1 - clamp01((p - i * 0.16) / span)) * box}px)`);

// 2. 抛掷：初速 + 重力，二次方程
const o = vx * (1 - Math.pow(1 - Math.min(1, a), 1.6));
const s = vy * a + 1440 * a * a * 0.5;      // G = 1440 px/s²

// 3. 撞墙回弹（ARE）：位移到墙边后横向反弹 + 上抛
const dx = (Bg - span * strike) + 640 * i;
const dy = -1350 * i;
const rot = spin * Math.pow(i, 1);
```

每个字母一片飞行参数（`{vx, vy, spin, at}`），例如 `ARE`：`(-760, 200, -95)`、`(-900, -1250, -58)`、`(-80, 240, 36)`、`(930, -1200, 72)`、`(810, 160, 120)`。
地面反弹用一个正弦弧：`y = floor * sin(t * π)` 并二分/倒数搜索接触点 → 决定 `touchTwo`。

**方块（block）** 是这一段的"主角道具"：宽高、位置、`translate`、`rotate` 全部由进度算出——它被挤压、下落、弹跳、抬起、推走，同时把右侧网格里的字（`JUST / TOOLS`）挤出去。

这一段是**最难抄也最值得学**的部分：它证明"高级感"不等于花哨缓动，而是**用一个连续的物理量驱动一个真实物体的所有维度**。

---

## 9. 场景 8 — About：逐行上升 + 行高亮

- 区块高 `vh + 110`
- **arriving**：`trigger: copy, start: 'top 92%'` → 逐行 `yPercent 100 → 0`，`.7s power3.out`，stagger `.035`
- **标题并入**：把 `About ` 词插入 `GRIDS` 标题前，`width: 0 → 实测宽`，`.55s power2.inOut`，然后字母接力上升
- **leaving**：`start: 'top 85%'`，同一条 timeline `.reverse()`
- **riding**：区块结束时 `y = min(0, start - scroll())` —— 标题被"顶"走，负向跟手

**行高亮（`data-lit`）**：`mouseenter` 写 `stage.dataset.lit = n`，
```css
.about__stage[data-lit] .about__row { opacity: .3; transition: opacity .35s; }
.about__stage[data-lit="03"] .about__row[data-n="03"] { opacity: 1; }
.about__stage[data-lit="03"] .about__row[data-n="03"] u { animation: rule-sweep .5s; }
```
选中的行同时触发下划线扫过——**hover 状态 = CSS 状态机 + 一个 keyframes**，没有 JS 补间。

---

## 10. 场景 9 — Finale：字块化成整屏网格

区块高 `2 × vh`，`trigger: top top → += vh`，`scrub`。

| 属性 | 变化 |
|---|---|
| band 宽 | `vw → 90px`（`power2.out`） |
| band 高 | `vw*121/1440 → vh`（`power2.in`） |
| 23 个模块 | 每帧 `layout()` 投影 → 字逐渐变成**一列全高网格** |
| `GRIDS` / `S03` | 继续吸到左右边缘 |

与 §4 是**同一套函数、相反的方向**：开头"网格长成字"，结尾"字散成网格"。整站的叙事闭环。

---

## 11. 场景 10 — WebGL 图片波纹（唯一的 3D）

每个 `[data-media]` 一张 plane + 自写 shader。非贴图特效，而是**"在图上开一个能看见背后网格的窗口"**：

```glsl
// 片元核心：手的位置叠加成场 → 单阈值切开 → 露出背后 sheet（网格纸）
float field = Σ (r*r) / max(dot(away,away), 1.0);      // 16 个 drop，最多
float inside = smoothstep(1 - uEdge, 1 + uEdge, field) * uHover;
vec3 photograph = texture2D(uTexture, intoPicture(px + slope * uHover)).rgb;
gl_FragColor = vec4(mix(photograph, sheet, inside), 1.0);
```

参数（`ju`）：

```js
cell: 20, line: 1,          // 窗口内 20px 网格 + 1px 线
size: 96, hold: .62,        // drop 半径 / 停留
every: 10, glide: .17,      // 每移动 10px 采一个 drop；跟随 lerp
swell: .22, sink: 1.5,      // 新 blob 长大 / 尾部消散
edge: .035,                 // 切口薄度（要像"切"不像"渐隐"）
ringSpeed: 300, ringWave: 105, ringWidth: 75, ringFade: 1.15, ringRise: .1,
bend: 26,                   // 波纹把照片推开的强度
wobble: 44, wobbleSize: 105, wobbleSpeed: .5,
wake: .3, sleep: .55        // hover 进 .3s power2.out / 出 .55s power2.inOut
```

要点：
- 波纹**只作用于照片**，窗口内看到的是干净网格 → 水不会把"直线"也弄弯，这是它看起来"贵"的原因。
- 每帧用 `this.now += 1/60` 自己计时，不依赖真实时间 → 掉帧也不会崩，但节奏稳定。
- plane 位置跟随 Lenis 的 `state.y`，`visible = |centerOffset| < halfHeight + 100`，出屏就跳过 update。

---

## 12. 场景 11 — 视频 Trailer + 自定义光标

- `[data-trailer]` 元素 `cursor: none`
- 覆盖层（`backdrop-filter: blur(24px)`, `rgba(0,0,0,.9)`）从 `yPercent: -100` 落到 `0`，`.7s power3.inOut`；关闭反向
- 光标是一个 `<span>`，`x/y` 跟 `clientX + 14, clientY + 10`（**偏移**，不遮挡焦点）
- 光标文本状态机：`(Play)` / `(Pause)` / `(Close)`，白/黑两色随背景
- `Escape` 关闭；点视频本体 → 播放/暂停；点背景 → 关闭

---

## 13. 场景 12 — Hover 微交互（全站统一）

**`rule-sweep` 下划线** —— 唯一一个 keyframes 动画，全站复用：

```css
@keyframes rule-sweep {
  0%     { transform-origin: 100%; transform: scaleX(1); }
  49.9%  { transform-origin: 100%; transform: scaleX(0); }
  50%    { transform-origin: 0;    transform: scaleX(0); }
  100%   { transform-origin: 0;    transform: scaleX(1); }
}
.link u { position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: currentColor;
          transform-origin: 100%; }
.link:hover u { animation: rule-sweep .5s; }
.link:hover   { opacity: .3; transition: opacity .3s; }
```

行为：旧线从右向左**收回**，再从左侧**重新画出**——0.5s 完成一次"重画"，文字同时降到 30% 不透明度。
正文链接额外延迟 `.3s`（先消失再画线），导航链接不延迟。

---

## 14. 场景 13 — 移动端 Stub（"桌面限定"页）

条件：`(hover: none) and (pointer: coarse)` **或** `innerWidth < 1200`。

- 隐藏 `.page / .preloader / .stage / .grid-lines`，`overflow: hidden`
- 同样 23 个模块重排成 `GRIDS`，在 **4 个角点**之间循环：`(.02,.02) → (.98,.02) → (.98,.98) → (.02,.98)`
- 每段 `0.7s`，`ease: 'none'` —— **匀速**，所以看起来像一台"慢慢变形的机器"
- 但**每帧用 ticker 重算 `layout()`**（`j_ = 1.6`, `M_ = 1.4` 拉伸参数）→ 匀速位移 + 非线性重排 = 永不完全重复的呼吸感
- 文案 `mix-blend-mode: difference` 压在方块上

这个"匀速 + 每帧重排"的组合，是低预算做出高级感的最短路径。

---

## 15. 复刻清单（按优先级）

1. **搭单位系统**：`--s = vw/1440`，所有坐标写设计稿值 × `s`；resize 100ms 防抖 + `ResizeObserver` → 全部重排 → `ScrollTrigger.refresh()`。
2. **接 Lenis + GSAP ticker + `lagSmoothing(0)`**，`history.scrollRestoration = 'manual'`。
3. **写 `layout(box, focus, tension)`**（§2 的距离加权版式函数）——整个站点的视觉主轴都靠它。
4. **遮罩揭示组件**：`overflow:hidden` + `yPercent 100→0`，`power3.out`，stagger `.04 ~ .05`。
5. **钉住用 `is-held / is-done` class**，不用 ScrollTrigger `pin`。
6. **图片：`clipPath inset` 从 22% → 0，2.2s `expo.out`，`once: true`**，再叠一层 ±7% 帧内视差（`scrub .6`）。
7. **每段 scrub 都用 `[a, b]` 区间函数**而不是 timeline 分段：
   ```js
   const seg = (p, [a, b]) => gsap.utils.clamp(0, 1, (p - a) / (b - a));
   const val = (from, to, p) => from + (to - from) * gsap.parseEase('power3.out')(seg(p, [a, b]));
   ```
8. **hover 只做两件事**：`rule-sweep` 下划线 + `opacity .3`。
9. **进阶特效再上 WebGL**：单阈值切割 + 背后网格纸 + 只弯照片不弯规则线。

---

## 16. 踩坑记录（源码里能看到的教训）

| 坑 | 他们的解法 |
|---|---|
| 刷新后从中途开始，闪一下旧位置 | 在 `<head>` 最前面同步执行 `scrollRestoration = 'manual'` + `scrollTo(0,0)` |
| CSS 未加载时"裸字闪现" | `.intro, .preloader { visibility: hidden }` 内联在 `<head>`；`.is-up` 才显示 |
| 掉帧导致 scrub 与滚动脱节 | `gsap.ticker.lagSmoothing(0)` + Lenis 的 `raf` 挂在同一个 ticker |
| `position: fixed` 钉住后 `scroll` 事件不同步 | `ScrollTrigger.addEventListener('scrollEnd', () => onToggle(trigger))` 兜底 |
| 图片视差露底 | 图片高度 = frame + 14%，且带 `crop` 时按裁切余量单独算上下限 |
| 字体基线不齐 | 全部用 `canvas.measureText` 的 `fontBoundingBoxAscent/Descent` 反算偏移，不靠 `line-height` |
| 伪 3D 毁了排版规则 | 波纹只作用于照片；窗口内的网格纸不参与形变 |

---

## 17. 一句话总结这套动效的"气质"

> **不炫技、只变形**。全站没有一个 `bounce`、没有 3D 翻转、没有随机粒子；
> 只有「遮罩上移」「线条生长」「坐标重排」「重力下落」四类动作，用 6 条缓动和一套 1440 网格，从加载到结尾讲同一件事：**网格如何长成字，字如何散回网格**。
