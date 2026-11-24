import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { photos } from '../data/media'
import Footer from '../components/Footer'
import BottomNav from '../components/BottomNav'
import '../styles/photos.css'

/* ---------- 稳定伪随机：同一 index 每次刷新结果一致，布局不跳 ---------- */
const rand = (seed) => {
  const x = Math.sin(seed * 9999.123) * 10000
  return x - Math.floor(x)
}

/* 四档尺寸，按 index 加权分配，模拟截图的大小不一 */
const pickTier = (i) => {
  const r = rand(i + 1)
  if (r < 0.14) return 'xl'
  if (r < 0.44) return 'l'
  if (r < 0.8) return 'm'
  return 's'
}

const TIER_H = { xl: 0.92, l: 0.7, m: 0.54, s: 0.38 } // 相对行高的比例

/* 所有类别轮询穿插，保证混排而不是一类聚在一起 */
function interleave(list) {
  const cats = ['landscape', 'museum', 'architecture', 'still']
  const buckets = Object.fromEntries(cats.map((c) => [c, []]))
  list.forEach((p) => {
    if (buckets[p.category]) buckets[p.category].push(p)
  })
  const out = []
  let i = 0
  let added = true
  while (added) {
    added = false
    cats.forEach((c) => {
      const b = buckets[c]
      if (i < b.length) {
        out.push(b[i])
        added = true
      }
    })
    i++
  }
  return out
}

/* 读取舞台的 CSS 变量与实际高度，计算每张图的坐标与尺寸 */
function useFieldLayout(stageRef, items) {
  const [layout, setLayout] = useState(null)

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage || !items.length) return

    const compute = () => {
      const cs = getComputedStyle(stage)
      const laneCount = Math.max(1, parseInt(cs.getPropertyValue('--lane-count'), 10) || 4)
      const scale = parseFloat(cs.getPropertyValue('--scale')) || 1
      const fieldH = stage.clientHeight
      if (!fieldH) return

      const rowH = fieldH / laneCount
      const gapX = rowH * 0.7 * scale
      const padLeft = gapX * 0.6

      const placed = []
      let x = padLeft
      items.forEach((p, i) => {
        const tier = pickTier(i)
        const h = rowH * TIER_H[tier]
        const w = h * (p.ratio || 1.5)
        const lane = i % laneCount
        const yJit = (rand(i + 7) - 0.5) * rowH * 0.18
        const rawY = lane * rowH + (rowH - h) / 2 + yJit
        const y = Math.max(0, Math.min(fieldH - h, rawY))
        const xJit = (rand(i + 31) - 0.5) * gapX * 0.6
        const left = x + xJit
        placed.push({ key: `${p.name}-${i}`, src: p.src, name: p.name, left, y, w, h })
        x += w + gapX + xJit * 0.5
      })

      setLayout({ placed, contentWidth: x + gapX, fieldH })
    }

    compute()
    let raf = 0
    const onResize = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        compute()
      })
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [stageRef, items])

  return layout
}

/* 单条 rAF 驱动整条 track 左移，只更新一个 transform */
function useMarquee(trackRef, layout, pausedRef, reduced) {
  useEffect(() => {
    const track = trackRef.current
    if (!track || !layout || reduced) return

    let raf = 0
    let last = performance.now()
    let offset = 0
    const SPEED = 24 // px/s，缓慢

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000) // 切回标签页时防止大跳
      last = now
      if (!pausedRef.current) {
        offset += SPEED * dt
        if (offset >= layout.contentWidth) offset -= layout.contentWidth
      }
      track.style.transform = `translate3d(${-offset}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [trackRef, layout, pausedRef, reduced])
}

function PhotoBtn({ p, eager, onEnter, onLeave, onClick }) {
  return (
    <button
      type="button"
      className="photo"
      style={{ left: p.left, top: p.y, width: p.w, height: p.h }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      aria-label={p.name}
    >
      <img
        src={p.src}
        alt={p.name}
        width={Math.round(p.w)}
        height={Math.round(p.h)}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </button>
  )
}

function Lightbox({ photo, onClose }) {
  return (
    <div
      className={`photos-lightbox${photo ? ' is-open' : ''}`}
      onClick={photo ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={photo ? photo.name : undefined}
    >
      {photo ? (
        <>
          <button type="button" className="photos-lightbox-close" aria-label="Close" onClick={onClose}>
            ×
          </button>
          <img src={photo.src} alt={photo.name} onClick={(e) => e.stopPropagation()} />
        </>
      ) : null}
    </div>
  )
}

export default function Photos() {
  const stageRef = useRef(null)
  const trackRef = useRef(null)
  const pausedRef = useRef(false)
  const focusRef = useRef(null)

  const [active, setActive] = useState(null)
  const [reduced, setReduced] = useState(false)

  const mixed = useMemo(() => interleave(photos), [])
  const layout = useFieldLayout(stageRef, mixed)

  useMarquee(trackRef, layout, pausedRef, reduced)

  /* 进入 /photos 时回到页面顶部：路由切换不会重置滚动，
     从首页底部点进来会停在底部，这里同步定位到顶部（无动画、先于绘制） */
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /* 系统减少动态效果 → 静止可横滑 */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  /* 页面标题 */
  useEffect(() => {
    document.title = 'Photos — Jessie Guan'
    return () => {
      document.title = 'Jessie Guan'
    }
  }, [])

  /* 灯箱打开：锁背景滚动 + Esc 关闭；关闭后焦点回到触发图 */
  useEffect(() => {
    if (!active) return
    focusRef.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      focusRef.current?.focus?.()
    }
  }, [active])

  useEffect(() => {
    pausedRef.current = !!active
  }, [active])

  const onEnter = () => {
    if (!active) pausedRef.current = true
  }
  const onLeave = () => {
    if (!active) pausedRef.current = false
  }

  const trackWidth = layout ? layout.contentWidth * (reduced ? 1 : 2) : 0
  const showItems = layout
    ? reduced
      ? layout.placed
      : layout.placed.concat(
          layout.placed.map((p) => ({ ...p, key: `${p.key}-b`, left: p.left + layout.contentWidth }))
        )
    : []

  return (
    <>
      <main className="photos-page">
        <div className={`photos-stage${reduced ? ' is-static' : ''}`} ref={stageRef}>
          {layout ? (
            <div className="photos-track" ref={trackRef} style={{ width: trackWidth }}>
              {showItems.map((p, i) => (
                <PhotoBtn
                  key={p.key}
                  p={p}
                  eager={!reduced && i < 14}
                  onEnter={onEnter}
                  onLeave={onLeave}
                  onClick={() => setActive(p)}
                />
              ))}
            </div>
          ) : null}
        </div>
        <Footer />
      </main>

      <BottomNav />
      <Lightbox photo={active} onClose={() => setActive(null)} />
    </>
  )
}
