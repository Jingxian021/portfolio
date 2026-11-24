import { useEffect, useRef } from 'react'

/* 液体遮罩：16 个 metaball 叠成标量场，在 1.0 处切开；
   坐标先用噪声揉一遍让边缘游走；拖尾同时发涟漪，用解析斜率折射下层，
   只有遮罩里面才换成「纸面」那层内容。 */

const CFG = {
  size: 170,        // blob 半径基准 px
  hold: 0.62,       // 光标正下方那个 blob 的比例
  every: 10,        // 每移动多少 px 落一个拖尾
  swell: 0.22,      // 拖尾胀起时间 s
  sink: 1.5,        // 拖尾消失时间 s
  edge: 0.05,       // 边缘硬度：大 = 柔
  ringSpeed: 300,
  ringWave: 105,
  ringWidth: 75,
  ringFade: 1.15,
  ringRise: 0.1,
  bend: 96,         // 涟漪折射强度 px
  wobble: 42,       // 边缘游走幅度 px
  wobbleSize: 105,
  wobbleSpeed: 0.5,
  wake: 0.3,
  sleep: 0.55
}

const INK = '#141413'
const BASE_BG = '#ffffff'
const SHEET_BG = '#ecece8'
const FONT = '"Urbanist", Helvetica Neue, Arial, sans-serif'

const VERT = `
attribute vec2 aPos;
attribute vec2 aUv;
varying vec2 vUv;
void main() {
  vUv = aUv;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
#define DROPS 16
uniform sampler2D uBase;
uniform sampler2D uSheet;
uniform vec2  uSize;
uniform vec4  uDrops[DROPS];
uniform float uNow;
uniform float uHover;
uniform float uEdge;
uniform float uWobble;
uniform float uWobbleSize;
uniform float uWobbleSpeed;
uniform float uBend;
uniform float uSwell;
uniform float uSink;
uniform float uRingSpeed;
uniform float uRingWave;
uniform float uRingWidth;
uniform float uRingFade;
uniform float uRise;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  vec2 dom = vUv;
  vec2 px = dom * uSize;

  if (uHover <= 0.001) {
    gl_FragColor = vec4(texture2D(uBase, dom).rgb, 1.0);
    return;
  }

  vec2 n = px / uWobbleSize;
  vec2 drift = vec2(
    noise(n + vec2(uNow * uWobbleSpeed, uNow * uWobbleSpeed * 0.7)),
    noise(n + vec2(4.7, 8.3) - vec2(uNow * uWobbleSpeed * 0.8, uNow * uWobbleSpeed * 0.5))
  ) - 0.5;
  drift += (vec2(
    noise(n * 2.4 - vec2(uNow * uWobbleSpeed * 1.3, 0.0)),
    noise(n * 2.4 + vec2(9.1, 2.2) + vec2(0.0, uNow * uWobbleSpeed * 1.1))
  ) - 0.5) * 0.5;

  vec2 at = px + drift * uWobble;
  float field = 0.0;
  vec2 slope = vec2(0.0);

  for (int i = 0; i < DROPS; i++) {
    vec4 drop = uDrops[i];
    float age = uNow - drop.z;
    if (drop.w <= 0.0 || age < 0.0) continue;
    vec2 away = at - drop.xy;
    float d = length(away);

    if (i == 0) {
      field += (drop.w * drop.w) / max(dot(away, away), 1.0);
    } else if (age < uSink) {
      float swell = min(1.0, age / uSwell);
      float sink = 1.0 - age / uSink;
      float r = drop.w * swell * sink * sink;
      field += (r * r) / max(dot(away, away), 1.0);
    }

    if (i > 0 && d > 0.001 && age < 4.0) {
      float off = d - age * uRingSpeed;
      float bell = exp(-(off * off) / (uRingWidth * uRingWidth));
      float life = (1.0 - exp(-age / uRise)) * exp(-age * uRingFade);
      float turns = 6.2831853 / uRingWave;
      float dh = (turns * cos(off * turns)
        - sin(off * turns) * 2.0 * off / (uRingWidth * uRingWidth)) * bell;
      slope += (away / d) * dh * life * uBend;
    }
  }

  float inside = smoothstep(1.0 - uEdge, 1.0 + uEdge, field) * uHover;
  vec2 warped = clamp(dom + slope * uHover / uSize, 0.0, 1.0);
  // 只折射 base（mask 底层大字），sheet（hover 浮出的姓名+简介）保持不动
  vec3 base = texture2D(uBase, warped).rgb;
  vec3 sheet = texture2D(uSheet, dom).rgb;
  gl_FragColor = vec4(mix(base, sheet, inside), 1.0);
}
`

/* 按宽度折行；中文没有空格也能按字切开 */
function wrapText(ctx, text, maxWidth) {
  const words = String(text || '').split(' ')
  const lines = []
  let line = ''

  const chunkWord = (word) => {
    let chunk = ''
    for (const ch of word) {
      if (chunk && ctx.measureText(chunk + ch).width > maxWidth) {
        lines.push(chunk)
        chunk = ch
      } else {
        chunk += ch
      }
    }
    line = chunk
  }

  words.forEach((word) => {
    const candidate = line ? line + ' ' + word : word
    if (ctx.measureText(candidate).width <= maxWidth) {
      line = candidate
      return
    }
    if (line) {
      lines.push(line)
      line = ''
    }
    if (ctx.measureText(word).width <= maxWidth) line = word
    else chunkWord(word)
  })

  if (line) lines.push(line)
  return lines
}

export default function FluidMask({ name, text, lines, className = '' }) {
  const canvasRef = useRef(null)
  const repaintRef = useRef(null)
  const contentRef = useRef({ name, text, lines })
  contentRef.current = { name, text, lines }

  useEffect(() => {
    const canvas = canvasRef.current
    const heroEl = canvas && canvas.parentElement
    if (!canvas || !heroEl) return undefined

    let gl = null
    try {
      gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        powerPreference: 'high-performance'
      })
    } catch (err) {
      gl = null
    }
    if (!gl) return undefined // 没有 WebGL：首屏退化成白底 + DOM 文字

    const makeShader = (type, src) => {
      const sh = gl.createShader(type)
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh)
        return null
      }
      return sh
    }

    const vs = makeShader(gl.VERTEX_SHADER, VERT)
    const fs = makeShader(gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs)
      if (fs) gl.deleteShader(fs)
      return undefined
    }

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      return undefined
    }
    gl.useProgram(program)

    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 1, 1, 0]),
      gl.STATIC_DRAW
    )

    const aPos = gl.getAttribLocation(program, 'aPos')
    const aUv = gl.getAttribLocation(program, 'aUv')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0)
    gl.enableVertexAttribArray(aUv)
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8)

    const U = {}
      ;[
        'uBase', 'uSheet', 'uSize', 'uDrops', 'uNow', 'uHover',
        'uEdge', 'uWobble', 'uWobbleSize', 'uWobbleSpeed', 'uBend', 'uSwell', 'uSink',
        'uRingSpeed', 'uRingWave', 'uRingWidth', 'uRingFade', 'uRise'
      ].forEach((n) => {
        U[n] = gl.getUniformLocation(program, n)
      })

    gl.uniform1i(U.uBase, 0)
    gl.uniform1i(U.uSheet, 1)
    gl.uniform1f(U.uEdge, CFG.edge)
    gl.uniform1f(U.uSwell, CFG.swell)
    gl.uniform1f(U.uSink, CFG.sink)
    gl.uniform1f(U.uRise, CFG.ringRise)

    /* ── 贴图 ─────────────────────────────────────────────────────────── */
    const makeTexture = (unit) => {
      const t = gl.createTexture()
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, t)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      return t
    }

    const baseTex = makeTexture(0)
    const sheetTex = makeTexture(1)
    const sheet = document.createElement('canvas')

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)

    const upload = (tex, src, unit) => {
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src)
    }

    /* 底层 = 纸色 + hero 大字。大字画在 base 上才能被涟漪折射；
       遮罩里透出的是姓名 + 一句自我介绍（sheet 层，不参与扭曲）。 */
    const drawBase = (ctx, W, H) => {
      ctx.fillStyle = BASE_BG
      ctx.fillRect(0, 0, W, H)

      const content = contentRef.current
      const heroLines = Array.isArray(content.lines) ? content.lines : []
      if (!heroLines.length) return

      ctx.fillStyle = INK
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'

      // 对齐 .hero-title：72px / 700 / uppercase / 左 8.4% / 顶部 padding-top
      const fs = Math.max(40, Math.min(72, W * 0.07))
      const lh = fs * 1.04
      const x = W * 0.084
      const padTop = Math.max(90, Math.min(136, H * 0.133))
      ctx.font = `700 ${fs}px ${FONT}`
      let y = padTop + fs / 2
      heroLines.forEach((line) => {
        ctx.fillText(String(line).toUpperCase(), x, y)
        y += lh
      })
    }

    const drawSheet = (ctx, W, H) => {
      ctx.fillStyle = SHEET_BG
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = INK
      ctx.textBaseline = 'middle'

      // 遮罩里：姓名大字 + 简介小字（小字只在 hover 时可见）
      const content = contentRef.current
      const nameFs = Math.max(34, Math.min(W * 0.078, H * 0.125))
      const nameY = H * 0.46
      ctx.textAlign = 'center'
      ctx.font = `500 ${nameFs}px ${FONT}`
      ctx.fillText(String(content.name || '').toUpperCase(), W * 0.5, nameY)

      const bodyFs = Math.max(11, Math.min(W * 0.0155, H * 0.024))
      const lh = bodyFs * 1.55
      ctx.textAlign = 'left'
      ctx.font = `400 ${bodyFs}px ${FONT}`
      const ix = W * 0.28
      const lines = wrapText(ctx, content.text, W * 0.44)
      let y = nameY + nameFs * 0.62 + bodyFs * 1.7
      lines.forEach((line) => {
        ctx.fillText(line, ix, y)
        y += lh
      })
    }

    const paint = (target, draw, W, H, dpr) => {
      if (W < 2 || H < 2) return
      target.width = Math.round(W * dpr)
      target.height = Math.round(H * dpr)
      const ctx = target.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(ctx, W, H)
    }

    /* ── 尺寸 ─────────────────────────────────────────────────────────── */
    let W = 0
    let H = 0
    let unit = 1
    const isTouch = window.matchMedia('(hover: none)').matches

    const resize = () => {
      const r = heroEl.getBoundingClientRect()
      W = Math.max(1, Math.round(r.width))
      H = Math.max(1, Math.round(r.height))
      const dpr = Math.min(isTouch ? 1.5 : 2, window.devicePixelRatio || 1)

      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)

      unit = Math.min(1.45, Math.max(0.7, Math.min(W, H) / 860))

      gl.uniform2f(U.uSize, W, H)
      gl.uniform1f(U.uWobble, CFG.wobble * unit)
      gl.uniform1f(U.uWobbleSize, CFG.wobbleSize * unit)
      gl.uniform1f(U.uWobbleSpeed, CFG.wobbleSpeed)
      gl.uniform1f(U.uBend, CFG.bend * unit)
      gl.uniform1f(U.uRingSpeed, CFG.ringSpeed * unit)
      gl.uniform1f(U.uRingWave, CFG.ringWave * unit)
      gl.uniform1f(U.uRingWidth, CFG.ringWidth * unit)
      gl.uniform1f(U.uRingFade, CFG.ringFade)

      const tDpr = Math.min(2, dpr)
      const baseCanvas = document.createElement('canvas')
      paint(baseCanvas, drawBase, W, H, tDpr)
      upload(baseTex, baseCanvas, 0)
      paint(sheet, drawSheet, W, H, tDpr)
      upload(sheetTex, sheet, 1)
    }

    repaintRef.current = resize

    /* ── 指针 ─────────────────────────────────────────────────────────── */
    let now = Math.random() * 90
    const bootAt = now
    let hover = 0
    let hoverTarget = 0
    let here = null
    let glide = null
    let last = null
    let drops = []
    let auto = true
    const dropData = new Float32Array(16 * 4)

    const feed = (x, y) => {
      if (!here) {
        here = { x, y }
        glide = { x, y }
        last = { x, y }
        return
      }
      here.x = x
      here.y = y
      if (Math.hypot(x - last.x, y - last.y) >= CFG.every * unit) {
        drops.push({ x, y, at: now, r: CFG.size * unit })
        if (drops.length > 15) drops.shift()
        last.x = x
        last.y = y
      }
    }

    const onEnter = () => {
      auto = false
      hoverTarget = 1
    }

    const onMove = (event) => {
      auto = false
      hoverTarget = 1
      const r = canvas.getBoundingClientRect()
      feed(event.clientX - r.left, event.clientY - r.top)
    }

    const onLeave = () => {
      here = null
      glide = null
      last = null
      hoverTarget = 0
    }

    const onUp = () => {
      if (isTouch) onLeave()
    }

    heroEl.addEventListener('pointerenter', onEnter)
    heroEl.addEventListener('pointermove', onMove)
    heroEl.addEventListener('pointerleave', onLeave)
    heroEl.addEventListener('pointercancel', onLeave)
    heroEl.addEventListener('pointerup', onUp)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) auto = false

    /* 滚出首屏就停掉循环，省电 */
    let heroVisible = true
    let io = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          heroVisible = entries[0].isIntersecting
        },
        { threshold: 0 }
      )
      io.observe(heroEl)
    }

    /* ── 主循环 ───────────────────────────────────────────────────────── */
    let raf = 0
    let prev = performance.now()

    const frame = (tms) => {
      raf = requestAnimationFrame(frame)
      if (document.hidden) {
        prev = tms
        return
      }

      const dt = Math.min(0.05, Math.max(0.001, (tms - prev) / 1000))
      prev = tms
      if (!heroVisible) return

      now += dt

      if (auto) {
        const R = Math.min(W, H) * 0.3
        feed(
          W * 0.52 + Math.cos(now * 0.55) * R * 1.3,
          H * 0.46 + Math.sin(now * 0.82) * R * 0.58
        )
        if (now - bootAt > 1.2) hoverTarget = 1
      }

      const tau = Math.max(0.001, (hoverTarget > hover ? CFG.wake : CFG.sleep) / 3)
      hover += (hoverTarget - hover) * (1 - Math.exp(-dt / tau))

      if (here && glide) {
        const k = 1 - Math.exp(-11.2 * dt)
        glide.x += (here.x - glide.x) * k
        glide.y += (here.y - glide.y) * k
      }

      while (drops.length && now - drops[0].at > 4.2) drops.shift()

      if (glide) {
        dropData[0] = glide.x
        dropData[1] = glide.y
        dropData[2] = now
        dropData[3] = CFG.size * CFG.hold * unit
      } else {
        dropData[0] = 0
        dropData[1] = 0
        dropData[2] = -99
        dropData[3] = 0
      }

      for (let i = 0; i < 15; i++) {
        const o = (i + 1) * 4
        const d = drops[i]
        if (!d) {
          dropData[o] = 0
          dropData[o + 1] = 0
          dropData[o + 2] = -99
          dropData[o + 3] = 0
        } else {
          dropData[o] = d.x
          dropData[o + 1] = d.y
          dropData[o + 2] = d.at
          dropData[o + 3] = d.r
        }
      }

      gl.uniform4fv(U.uDrops, dropData)
      gl.uniform1f(U.uNow, now)
      gl.uniform1f(U.uHover, hover)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, baseTex)
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, sheetTex)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    /* resize 防抖：重画纸面别每帧都跑 */
    let rzTimer = 0
    const onResize = () => {
      clearTimeout(rzTimer)
      rzTimer = setTimeout(resize, 140)
    }
    const onOrientation = () => {
      clearTimeout(rzTimer)
      rzTimer = setTimeout(resize, 220)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onOrientation)

    resize()
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(rzTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onOrientation)
      heroEl.removeEventListener('pointerenter', onEnter)
      heroEl.removeEventListener('pointermove', onMove)
      heroEl.removeEventListener('pointerleave', onLeave)
      heroEl.removeEventListener('pointercancel', onLeave)
      heroEl.removeEventListener('pointerup', onUp)
      if (io) io.disconnect()
      repaintRef.current = null

      gl.deleteTexture(baseTex)
      gl.deleteTexture(sheetTex)
      gl.deleteBuffer(quad)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  useEffect(() => {
    if (repaintRef.current) repaintRef.current()
  }, [name, text, lines])

  return <canvas ref={canvasRef} className={`hero-canvas ${className}`.trim()} aria-hidden="true" />
}
