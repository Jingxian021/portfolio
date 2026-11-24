import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

/* ---------- 右侧 section 导航 rail ---------- */
export function CaseRail({ sections }) {
  const [active, setActive] = useState(sections[0]?.id || '')

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      let current = sections[0]?.id || ''
      sections.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      })
      setActive(current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sections])

  const jumpTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav className="case-rail" aria-label="Case study sections">
      {sections.map(({ id, label }) => (
        <button key={id} type="button" className={active === id ? 'is-active' : ''} onClick={() => jumpTo(id)}>
          <span className="case-rail-label">{label}</span>
          <i />
        </button>
      ))}
    </nav>
  )
}

/* ---------- 顶部阅读进度条 ---------- */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('load', update)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('load', update)
    }
  }, [])

  return (
    <div className="case-progress" aria-hidden="true">
      <i style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}

/* ---------- 顶部 header ---------- */
export function CaseTop({ title }) {
  return (
    <header className="case-top">
      <Link to="/" className="case-brand">Jessie Guan</Link>
      <span className="case-top-title">{title}</span>
      <Link to="/" className="case-back">Back to home</Link>
    </header>
  )
}

/* ---------- 标题 + meta + 首屏图（全项目统一，参考 Delivery） ---------- */
export function CaseHero({ study, id }) {
  const tags = study.tags || study.tag || []
  const hero = typeof study.hero === 'string' ? { src: study.hero } : study.hero
  const meta = study.meta || [
    { label: 'Year', value: study.year },
    { label: 'Category', value: study.category },
    { label: 'Tags', value: tags.join(' · ') }
  ].filter((item) => item.value)

  return (
    <>
      <header className="case-hero-head" id={id}>
        <h1 className="case-hero-title">{study.title}</h1>
        {tags.length ? <p className="case-hero-tags">{tags.join(' · ')}</p> : null}
        {meta.length ? (
          <dl className="case-hero-meta">
            {meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>

      <figure className="case-hero-figure">
        <img src={hero.src} alt={hero.alt || study.title} width={hero.w} height={hero.h} />
      </figure>
    </>
  )
}

/* ---------- 底部项目列表 ---------- */
export function ProjectIndex({ current }) {
  return (
    <section className="case-index">
      <div className="case-index-head">
        <h2>All projects</h2>
        <span>{String(projects.length).padStart(2, '0')}</span>
      </div>
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          to={`/projects/${project.slug}`}
          className={`case-row${project.slug === current ? ' is-current' : ''}`}
        >
          <span className="case-row-index">{String(i + 1).padStart(2, '0')}</span>
          <span className="case-row-title">{project.title}</span>
          <span className="case-row-cat">{project.category.en}</span>
          <span className="case-row-year">{project.year}</span>
          <span className="case-row-cover" aria-hidden="true">
            {project.cover ? <img src={project.cover} alt="" loading="lazy" /> : null}
          </span>
          <span className="case-row-arrow" aria-hidden="true">↗</span>
        </Link>
      ))}
    </section>
  )
}

/* ---------- 未完成案例占位 ---------- */
export function Pending({ project }) {
  return (
    <section className="case-head case-pending">
      <Link to="/" className="case-tag">Back</Link>
      <h1 className="case-title">{project ? project.title : 'Case study'}</h1>
      <p className="case-lede">
        The full case study is being written. Structure, flow and outcome will be published here.
      </p>
      {project && (
        <dl className="case-meta">
          <div><dt>Year</dt><dd>{project.year}</dd></div>
          <div><dt>Category</dt><dd>{project.category.en}</dd></div>
          <div><dt>Tags</dt><dd>{project.tag ? project.tag.join(' · ') : project.category.en}</dd></div>
        </dl>
      )}
    </section>
  )
}
