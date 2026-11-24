import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { copy } from '../data/copy'
import { projects } from '../data/projects'
import { useLang } from '../i18n'

export default function Projects() {
  const { t } = useLang()
  const listRef = useRef(null)

  const handleRowEnter = (e) => {
    const link = e.currentTarget
    const src = link.querySelector('.p-thumb img')?.src
    const preview = document.querySelector('.project-preview')
    if (!preview || !src) return
    preview.style.backgroundImage = `url(${src})`
    preview.classList.add('is-visible')
    updatePreviewPosition(e, preview)
  }

  const handleRowMove = (e) => {
    const preview = document.querySelector('.project-preview')
    if (!preview || !preview.classList.contains('is-visible')) return
    updatePreviewPosition(e, preview)
  }

  const handleRowLeave = () => {
    const preview = document.querySelector('.project-preview')
    if (preview) preview.classList.remove('is-visible')
  }

  const updatePreviewPosition = (e, preview) => {
    const listRect = listRef.current?.getBoundingClientRect()
    if (!listRect) return
    const PREVIEW_W = 320
    const PREVIEW_H = 210

    // 以鼠标位置为预览图中心
    const centerX = e.clientX - listRect.left
    const centerY = e.clientY - listRect.top

    let previewLeft = centerX - PREVIEW_W / 2
    let previewTop = centerY - PREVIEW_H / 2

    // 边界约束：不超出 list 容器
    previewLeft = Math.max(0, Math.min(previewLeft, listRect.width - PREVIEW_W))
    previewTop = Math.max(0, Math.min(previewTop, listRect.height - PREVIEW_H))

    preview.style.left = `${previewLeft}px`
    preview.style.top = `${previewTop}px`
  }

  return (
    <section className="section" id="projects">
      <div className="sec-head" data-reveal>
        <h2 className="sec-title">{t(copy.projects.title)}</h2>
        <span className="sec-label">
          {projects.length} {t(copy.projects.count)}
        </span>
      </div>

      <div className="project-list" ref={listRef}>
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="project-row"
            data-reveal
            style={{ transitionDelay: `${i * 40}ms` }}
            onMouseEnter={handleRowEnter}
            onMouseMove={handleRowMove}
            onMouseLeave={handleRowLeave}
          >
            <span className="p-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="p-title">{project.title}</span>
            <span className="p-cat">{t(project.category)}</span>
            <span className="p-year">{project.year}</span>
            <span className={`p-thumb${project.cover ? ' has-cover' : ''}`} aria-hidden="true">
              {project.cover ? (
                <img src={project.cover} alt="" loading="lazy" />
              ) : (
                'IMG'
              )}
            </span>
          </Link>
        ))}
        <div className="project-preview" aria-hidden="true" />
      </div>
    </section>
  )
}
