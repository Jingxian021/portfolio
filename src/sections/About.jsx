import { useEffect, useRef } from 'react'
import { copy } from '../data/copy'
import { useLang } from '../i18n'
import cvFile from '../../assets/cv/Jessie_Guan_CV.docx?url'

const WORDS = [
  { text: 'Product', size: 2.4, italic: false },
  { text: 'Aesthetic', size: 1.8, italic: true, bold: true },
  { text: 'Minimal', size: 1.1, italic: false },
  { text: 'Robotics', size: 2.8, italic: false },
  { text: 'Design', size: 3.6, italic: false, bold: true },
  { text: 'UI/UX', size: 3.6, italic: true, bold: true },
  { text: 'Fun', size: 2.4, italic: false, light: true },
  { text: 'Freelance', size: 1.2, italic: false },
  { text: 'Elegant', size: 2.4, italic: true, bold: true },
  { text: 'Playful', size: 1.3, italic: false },
  { text: 'Foodie', size: 1.2, italic: false },
  { text: 'Visual', size: 1.5, italic: false, bold: true }
]

export default function About() {
  const { t } = useLang()
  const body = `${t(copy.about.paragraphs[0])} ${t(copy.about.paragraphs[1])}`
  const fieldRef = useRef(null)
  const elsRef = useRef([])

  useEffect(() => {
    const field = fieldRef.current
    if (!field) return
    const rect = () => field.getBoundingClientRect()

    const balls = WORDS.map((w, i) => {
      const fontSize = 4 * w.size
      const el = elsRef.current[i]
      const estW = el ? el.offsetWidth : w.text.length * fontSize * 0.55
      const estH = el ? el.offsetHeight : fontSize * 1.1
      const radius = Math.max(estW, estH) / 2
      return {
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 1.0,
        vy: 0,
        radius,
        el
      }
    })

    // 初始分布：贴地排列，每个球在地面上
    const r0 = rect()
    const groundY = r0.height - 2
    balls.forEach((b, i) => {
      b.x = ((r0.width / (balls.length + 1)) * (i + 1)) - b.radius + (Math.random() - 0.5) * 30
      b.x = Math.max(b.radius, Math.min(r0.width - b.radius, b.x))
      b.y = groundY - b.radius
      b.vx = 0
      b.vy = 0
    })

    let raf
    const GRAVITY = 0.42
    const DAMPING = 0.03
    const FRICTION = 0.995
    const MOUSE_RADIUS = 120
    const MOUSE_FORCE = 16
    // 词球之间：轻微远距吸引 + 近距硬碰撞
    const CLUSTER_RADIUS = 240
    const CLUSTER_FORCE = 0.06
    const mouse = { x: -9999, y: -9999, active: false }

    const step = () => {
      const r = rect()
      const W = r.width
      const H = r.height
      const ground = H

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i]
        b.vy += GRAVITY
        b.vx *= FRICTION
        b.vy *= FRICTION

        if (mouse.active) {
          const dx = b.x - mouse.x
          const dy = b.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < MOUSE_RADIUS && dist > 0.001) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE
            b.vx += (dx / dist) * force
            b.vy += (dy / dist) * force
          }
        }

        // 远距吸引让词球抱团
        for (let j = 0; j < balls.length; j++) {
          if (j === i) continue
          const other = balls[j]
          const dx = other.x - b.x
          const dy = other.y - b.y
          const dist = Math.hypot(dx, dy)
          const minDist = other.radius + b.radius
          if (dist > minDist && dist < CLUSTER_RADIUS) {
            const pull = (1 - dist / CLUSTER_RADIUS) * CLUSTER_FORCE
            b.vx += (dx / dist) * pull
            b.vy += (dy / dist) * pull
          }
        }

        b.x += b.vx
        b.y += b.vy

        if (b.y + b.radius > ground) {
          b.y = ground - b.radius
          b.vy = -b.vy * DAMPING
          b.vx *= 0.96
          if (Math.abs(b.vy) < 0.5) b.vy = 0
        }
        if (b.x - b.radius < 0) {
          b.x = b.radius
          b.vx = -b.vx * DAMPING
        }
        if (b.x + b.radius > W) {
          b.x = W - b.radius
          b.vx = -b.vx * DAMPING
        }
      }

      // 近距硬碰撞（保持不重叠）
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i]
          const c = balls[j]
          const dx = c.x - a.x
          const dy = c.y - a.y
          const dist = Math.hypot(dx, dy)
          const minDist = a.radius + c.radius
          if (dist < minDist && dist > 0.001) {
            const nx = dx / dist
            const ny = dy / dist
            const overlap = (minDist - dist) / 2
            a.x -= nx * overlap
            a.y -= ny * overlap
            c.x += nx * overlap
            c.y += ny * overlap
            const va = a.vx * nx + a.vy * ny
            const vc = c.vx * nx + c.vy * ny
            a.vx += (vc - va) * nx * 0.9
            a.vy += (vc - va) * ny * 0.9
            c.vx += (va - vc) * nx * 0.9
            c.vy += (va - vc) * ny * 0.9
          }
        }
      }

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i]
        if (b.el) {
          b.el.style.transform = `translate3d(${b.x - b.radius}px, ${b.y - b.radius}px, 0)`
        }
      }

      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    const onMove = (e) => {
      const r = rect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
    }
    const onTouch = (e) => {
      if (e.touches[0]) {
        const r = rect()
        mouse.x = e.touches[0].clientX - r.left
        mouse.y = e.touches[0].clientY - r.top
        mouse.active = true
      }
    }

    field.addEventListener('mousemove', onMove)
    field.addEventListener('mouseleave', onLeave)
    field.addEventListener('touchmove', onTouch, { passive: true })
    field.addEventListener('touchend', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      field.removeEventListener('mousemove', onMove)
      field.removeEventListener('mouseleave', onLeave)
      field.removeEventListener('touchmove', onTouch)
      field.removeEventListener('touchend', onLeave)
    }
  }, [])

  return (
    <section className="section" id="about">
      <div className="sec-head" data-reveal>
        <h2 className="sec-title">{t(copy.about.title)}</h2>
        <span className="sec-label">{t(copy.about.kicker)}</span>
      </div>

      <div className="about-grid">
        <p className="about-text" data-reveal>
          {body}
        </p>
        <a className="cv-bar" href={cvFile} download="Jessie_Guan_CV.docx" data-reveal>
          <span>CV_Jessie Guan</span>
          <span>Download ↓</span>
        </a>
      </div>

      <div className="word-field" ref={fieldRef}>
        {WORDS.map((w, i) => (
          <span
            key={w.text}
            className="word-ball"
            ref={(el) => {
              elsRef.current[i] = el
            }}
            style={{
              fontSize: `${20 * w.size}px`,
              fontStyle: w.italic ? 'italic' : 'normal',
              fontWeight: 400
            }}
          >
            {w.text}
          </span>
        ))}
        <span className="word-ground-hint">
          {t({ en: 'Move cursor — words bounce', zh: '移动光标，词语会弹起' })}
        </span>
      </div>
    </section>
  )
}
