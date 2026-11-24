import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../i18n'

const SIZE = 500
const FACTOR = 0.008
const COUNT = 2000
const BUCKETS = 10

/* ---------- Perlin noise（与 p5 的 noise() 同一套算法） ---------- */
const PERM = (() => {
  const p = Array.from({ length: 256 }, (_, i) => i)
  let seed = 20261114
  for (let i = 255; i > 0; i -= 1) {
    seed = (seed * 16807) % 2147483647
    const j = seed % (i + 1)
    const tmp = p[i]
    p[i] = p[j]
    p[j] = tmp
  }
  const out = new Uint8Array(512)
  for (let i = 0; i < 512; i += 1) out[i] = p[i & 255]
  return out
})()

const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a, b, t) => a + (b - a) * t

function grad(hash, x, y) {
  switch (hash & 3) {
    case 0:
      return x + y
    case 1:
      return -x + y
    case 2:
      return x - y
    default:
      return -x - y
  }
}

function noise2(x, y) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = fade(xf)
  const v = fade(yf)
  const X = xi & 255
  const Y = yi & 255
  const x1 = lerp(grad(PERM[PERM[X] + Y], xf, yf), grad(PERM[PERM[X + 1] + Y], xf - 1, yf), u)
  const x2 = lerp(grad(PERM[PERM[X] + Y + 1], xf, yf - 1), grad(PERM[PERM[X + 1] + Y + 1], xf - 1, yf - 1), u)
  return (lerp(x1, x2, v) + 1) / 2
}

/* HSB(130) → rgba，保持原 sketch 的色值与透明度 */
function hsla(hue130, sat130, bri130, alpha130) {
  const h = (hue130 / 130) * 360
  const s = sat130 / 130
  const v = bri130 / 130
  const a = alpha130 / 130
  const c = v * s
  const hp = (h % 360) / 60
  const x = c * (1 - Math.abs((hp % 2) - 1))
  let r = 0
  let g = 0
  let b = 0
  if (hp < 1) [r, g, b] = [c, x, 0]
  else if (hp < 2) [r, g, b] = [x, c, 0]
  else if (hp < 3) [r, g, b] = [0, c, x]
  else if (hp < 4) [r, g, b] = [0, x, c]
  else if (hp < 5) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const m = v - c
  return `rgba(${Math.round((r + m) * 255)},${Math.round((g + m) * 255)},${Math.round((b + m) * 255)},${a})`
}

function startScene(canvas) {
  const ctx = canvas.getContext('2d')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = SIZE * dpr
  canvas.height = SIZE * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, SIZE, SIZE)

  const cx = SIZE / 2
  const cy = SIZE / 2
  const radius = (SIZE * 0.8) / 2

  ctx.lineWidth = 1.5
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.stroke()

  const dots = Array.from({ length: COUNT }, () => {
    const r = Math.random() * Math.PI * 2
    const x = cx + Math.sin(r) * radius
    const y = cy + Math.cos(r) * radius
    return { x, y, px: x, py: y, dead: 0 }
  })

  // 按色相分桶，每帧只 stroke 10 条路径，避免 2000 次描边开销
  const buckets = Array.from({ length: BUCKETS }, () => [])
  buckets.forEach((_, i) => {
    buckets[i].color = hsla(100 - (20 * i) / (BUCKETS - 1), 130, 20, 5)
  })

  let raf = 0
  const tick = () => {
    for (let i = 0; i < buckets.length; i += 1) buckets[i].length = 0

    for (let i = 0; i < dots.length; i += 1) {
      const d = dots[i]
      const n = noise2(d.x * FACTOR, d.y * FACTOR)
      const angle = n * Math.PI * 2 + d.dead * Math.PI

      d.px = d.x
      d.py = d.y
      d.x += Math.cos(angle) * 2
      d.y += Math.sin(angle) * 2

      const dist = Math.hypot(d.x - cx, d.y - cy)
      if (dist > radius + 2) d.dead += 1

      if (dist > radius) continue
      if (Math.hypot(d.px - cx, d.py - cy) > radius) continue

      const bucket = buckets[Math.min(BUCKETS - 1, Math.round(n * (BUCKETS - 1)))]
      bucket.push(d.px, d.py, d.x, d.y)
    }

    ctx.lineWidth = 0.4
    buckets.forEach((segments) => {
      if (!segments.length) return
      ctx.strokeStyle = segments.color
      ctx.beginPath()
      for (let i = 0; i < segments.length; i += 4) {
        ctx.moveTo(segments[i], segments[i + 1])
        ctx.lineTo(segments[i + 2], segments[i + 3])
      }
      ctx.stroke()
    })

    raf = requestAnimationFrame(tick)
  }

  tick()

  return () => cancelAnimationFrame(raf)
}

export default function PageLoader() {
  const { pathname } = useLocation()
  const { t } = useLang()
  const canvasRef = useRef(null)
  const lastPath = useRef(pathname)
  const [on, setOn] = useState(false)

  useLayoutEffect(() => {
    if (lastPath.current === pathname) return
    lastPath.current = pathname
    setOn(true)
    const timer = setTimeout(() => setOn(false), 700)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (!on) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    return startScene(canvasRef.current)
  }, [on])

  return (
    <div className={on ? 'loader is-on' : 'loader'} role="status" aria-live="polite">
      <canvas ref={canvasRef} className="loader-canvas" />
      <p className="loader-text">{t({ en: 'Loading', zh: '加载中' })}</p>
    </div>
  )
}
