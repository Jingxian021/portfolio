import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { POSTER_PAGES } from '../data/posterPages'
import '../styles/poster-page.css'

function PosterIntro({ intro }) {
  return (
    <header className="poster-intro">
      {intro.kicker ? <p className="poster-kicker">{intro.kicker}</p> : null}
      <h1>{intro.title}</h1>
      <div className="poster-description">
        {intro.paragraphs.map((paragraph) => {
          const item = typeof paragraph === 'string' ? { text: paragraph } : paragraph
          const isChinese = /[\u3400-\u9fff]/.test(item.text)
          const className = [
            isChinese ? 'is-chinese' : '',
            item.desktopOnly ? 'is-desktop-only' : ''
          ].filter(Boolean).join(' ')

          return <p className={className} key={item.text}>{item.text}</p>
        })}
      </div>
    </header>
  )
}

function PosterGrid({ block, title, blockIndex }) {
  return (
    <section
      className={`poster-grid poster-grid--${block.columns} poster-block`}
      aria-label={`${title} poster group ${blockIndex + 1}`}
    >
      {block.images.map((src, index) => (
        <figure className="poster-item" key={src}>
          <img
            src={src}
            alt={`${title} poster ${blockIndex + 1}.${index + 1}`}
            width={block.width ?? 1190}
            height={block.height ?? 1684}
            loading="lazy"
            decoding="async"
          />
          {block.captions[index] ? <figcaption>{block.captions[index]}</figcaption> : null}
        </figure>
      ))}
    </section>
  )
}

function PosterBlock({ block, title, index }) {
  if (block.type === 'grid') {
    return <PosterGrid block={block} title={title} blockIndex={index} />
  }

  if (block.type === 'heading') {
    return (
      <div className="poster-heading poster-block">
        <h2>{block.text}</h2>
        {block.note ? <p>{block.note}</p> : null}
      </div>
    )
  }

  const variants = block.variant
    ? block.variant.split(' ').map((name) => `poster-media--${name}`).join(' ')
    : ''

  return (
    <div className={`poster-media poster-block ${variants}`}>
      <img
        src={block.src}
        alt={block.alt}
        width={block.width}
        height={block.height}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

function PosterClosing({ closing }) {
  if (!closing) return null

  return (
    <figure className={`poster-closing${closing.symbol ? ' poster-closing--symbol' : ''}`}>
      <img
        src={closing.src}
        alt={closing.alt}
        width={closing.symbol ? 279 : 1190}
        height={closing.symbol ? 289 : 1684}
        loading="lazy"
        decoding="async"
      />
      <figcaption>{closing.caption}</figcaption>
    </figure>
  )
}

export default function PosterPage() {
  const { slug } = useParams()
  const page = POSTER_PAGES[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
    const previousBackground = document.body.style.background
    document.body.style.background = '#000'
    if (page) document.title = `${page.title} — Jessie Guan`

    return () => {
      document.body.style.background = previousBackground
      document.title = 'Jessie Guan — Designer with Multi-background'
    }
  }, [page])

  if (!page) return <Navigate to="/" replace />

  return (
    <main className={`poster-page poster-${slug}`}>
      <Link to="/" state={{ scrollTo: `poster-${slug}` }} className="poster-back">
        ← Back to home
      </Link>

      {page.hero ? (
        <div className="poster-hero">
          <img
            src={page.hero.src}
            alt={page.hero.alt}
            width="1190"
            height="1684"
            fetchpriority="high"
            decoding="async"
          />
        </div>
      ) : null}

      <PosterIntro intro={page.intro} />

      {page.blocks.map((block, index) => (
        <PosterBlock
          block={block}
          index={index}
          title={page.title}
          key={block.text || block.src || `${block.type}-${index}`}
        />
      ))}

      <PosterClosing closing={page.closing} />
    </main>
  )
}
