import { useEffect } from 'react'
import Footer from './Footer'
import { sonimodCaseStudy } from '../data/sonimodCaseStudy'
import { getProject } from '../data/projects'
import { CaseHero, CaseRail, CaseTop, ProjectIndex, ReadingProgress } from './CaseStudy'
import '../styles/case-study-sonimod.css'

/* ---------- 2. 页面目录 ---------- */
const RAILS_SONIMOD = [
  { id: 'sn-background', label: 'Background' },
  { id: 'sn-research', label: 'Research' },
  { id: 'sn-profile', label: 'User Profile' },
  { id: 'sn-strategy', label: 'Strategy' },
  { id: 'sn-strategy1', label: 'Strategy 1' },
  { id: 'sn-strategy2', label: 'Strategy 2' },
  { id: 'sn-strategy3', label: 'Strategy 3' },
  { id: 'sn-strategy4', label: 'Strategy 4' }
]

/* ---------- 3. 视觉原子 ---------- */
function Pill({ children, className = '' }) {
  return <div className={`sn-pill ${className}`}>{children}</div>
}

function Arrow({ dir = 'down' }) {
  return (
    <span className={`sn-arrow sn-arrow--${dir}`} aria-hidden="true">
      {dir === 'down' ? '\u2193' : dir === 'right' ? '\u2192' : '\u2190'}
    </span>
  )
}

/* ---------- supports **bold** inside copy ---------- */
function Rich({ text, as: Tag = 'p', className = '' }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <Tag className={className}>
      {parts.map((part, i) =>
        part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part
      )}
    </Tag>
  )
}

function Section({ id, tone = 'cream', head, split = false, headRight = false, collapse = false, children }) {
  const headClass = [
    'sn-sec-head',
    split ? 'sn-sec-head--split' : '',
    collapse ? 'sn-sec-head--collapse' : '',
    headRight ? 'sn-sec-head--right' : ''
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={`sn-sec sn-sec--${tone}`} id={id}>
      <div className={headClass}>{head}</div>
      {children}
    </section>
  )
}

/* ---------- 5. 页面区块 ---------- */
/* 5.1 Hero */
function SonimodHero({ study }) {
  return <CaseHero study={study} id="sn-head" />
}

/* 5.2 Background + Needs */
function BackgroundSection({ data, needs }) {
  return (
    <Section
      id={data.id}
      tone="cream"
      split
      collapse
      head={
        <>
          <Pill className="sn-pill--title">{data.title}</Pill>
          <Pill className="sn-pill--arrow"><Arrow dir={data.arrow} /></Pill>
        </>
      }
    >
      <Rich className="sn-body" text={data.body} />

      <div className="sn-needs-grid">
        <div>
          <h3 className="sn-needs-label">{needs.clientsPill}</h3>
          <ul className="sn-list">
            {needs.clientsItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="sn-needs-label">{needs.customersPill}</h3>
          <ul className="sn-list">
            {needs.customersItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

/* 5.3 Research */
function ResearchSection({ data }) {
  return (
    <Section
      id={data.id}
      tone="cream"
      head={
        <>
          <Pill className="sn-pill--title">{data.title}</Pill>
          <Pill className="sn-pill--arrow"><Arrow dir={data.arrow} /></Pill>
        </>
      }
    >
      <p className="sn-eyebrow">{data.subTitle}</p>
      <Rich className="sn-body" text={data.method} />

      <p className="sn-eyebrow sn-eyebrow--result">{data.resultTitle}</p>
      <div className="sn-result">
        <span className="sn-stat">
          {data.resultStat.value}
          <span className="sn-stat-unit">%</span>
        </span>
        <p className="sn-result-text">{data.resultStat.suffix}</p>
      </div>

      <div className="sn-pain-rows">
        {data.painPoints.map((p) => (
          <div key={p} className="sn-pain-row">
            <span>{p}</span>
            <span className="sn-pain-close" aria-hidden="true">&times;</span>
          </div>
        ))}
      </div>

      <p className="sn-eyebrow">{data.analysisTitle}</p>
      <ol className="sn-analysis">
        {data.analysis.map((item, i) => (
          <li key={i}>
            <Rich as="span" text={item} />
          </li>
        ))}
      </ol>

      <figure className="sn-figure">
        <img
          src={data.severityTable.src}
          alt={data.severityTable.alt}
          width={data.severityTable.w}
          height={data.severityTable.h}
          loading="lazy"
        />
      </figure>

      <div className="sn-bottom-double">
        <div>
          <h3 className="sn-needs-label">{data.jtbdTitle}</h3>
          <Rich className="sn-body" text={data.jtbdBody} />
        </div>
        <div>
          <h3 className="sn-needs-label">{data.severityTitle}</h3>
          <Rich className="sn-body" text={data.severityBody} />
        </div>
      </div>
    </Section>
  )
}

/* 5.4 User Profile */
function UserProfileSection({ data }) {
  return (
    <Section
      id={data.id}
      tone="gray"
      split
      head={
        <>
          <Pill className="sn-pill--arrow"><Arrow dir={data.arrow} /></Pill>
          <Pill className="sn-pill--title">{data.title}</Pill>
        </>
      }
    >
      <figure className="sn-persona-wide">
        <img
          src={data.overview.src}
          alt={data.overview.alt}
          width={data.overview.w}
          height={data.overview.h}
          loading="lazy"
        />
      </figure>

      <div className="sn-persona-grid">
        {data.personas.map((p) => (
          <figure key={p.name} className="sn-persona">
            <img src={p.card.src} alt={p.card.alt} width={p.card.w} height={p.card.h} loading="lazy" />
          </figure>
        ))}
      </div>
    </Section>
  )
}

/* 5.5 Strategy overview */
function StrategyOverview({ data }) {
  return (
    <Section
      id={data.id}
      tone="gray"
      split
      head={
        <>
          <Pill className="sn-pill--title">{data.title}</Pill>
          <Pill className="sn-pill--arrow"><Arrow dir={data.arrow} /></Pill>
        </>
      }
    >
      <div className="sn-strategy-stack">
        {data.cards.map((card) => (
          <article className="sn-strategy-card" key={card.number}>
            <div className="sn-strategy-main">
              <span className="sn-dot" style={{ background: card.dot }} />
              <h3 className="sn-strategy-title">{card.title}</h3>
              <ul className="sn-list sn-list--tight">
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <span className="sn-strategy-big-num" aria-hidden="true">{card.number}</span>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* 5.6–5.9 Strategy detail */
function StrategyDetail({ data }) {
  const tailPair = Boolean(data.tailPair) && data.images?.length > 2
  const mainImages = tailPair ? data.images.slice(0, -2) : data.images
  const pairImages = tailPair ? data.images.slice(-2) : null

  const renderImage = (img, i) => (
    <figure className="sn-img-item" key={i}>
      <img src={img.src} alt={img.alt} width={img.w} height={img.h} loading="lazy" />
    </figure>
  )

  return (
    <Section
      id={data.id}
      tone={data.tone || 'gray'}
      headRight={data.headAlign === 'right'}
      head={
        <>
          <Pill className="sn-pill--title">Strategy</Pill>
          <span className="sn-num">{data.number}</span>
        </>
      }
    >
      {data.sub ? <p className="sn-subtitle--big">{data.sub}</p> : null}
      {data.body ? <p className="sn-body">{data.body}</p> : null}

      {mainImages && mainImages.length ? (
        <div className={`sn-image-grid sn-image-grid--${Math.min(mainImages.length, 3)}`}>
          {mainImages.map(renderImage)}
        </div>
      ) : null}

      {pairImages ? (
        <div className="sn-pair-grid">
          {pairImages.map(renderImage)}
        </div>
      ) : null}

      {data.detail ? (
        <figure className="sn-figure">
          <img
            src={data.detail.src}
            alt={data.detail.alt}
            width={data.detail.w}
            height={data.detail.h}
            loading="lazy"
          />
        </figure>
      ) : null}
    </Section>
  )
}

/* ---------- 6. 内容主体 ---------- */
function SonimodBody({ study }) {
  return (
    <>
      <SonimodHero study={study} />
      <BackgroundSection data={study.background} needs={study.needs} />
      <ResearchSection data={study.research} />
      <UserProfileSection data={study.userProfile} />
      <StrategyOverview data={study.strategy} />
      <StrategyDetail data={study.strategy1} />
      <StrategyDetail data={study.strategy2} />
      <StrategyDetail data={study.strategy3} />
      <StrategyDetail data={study.strategy4} />
    </>
  )
}

/* ---------- 7. 主入口 ---------- */
export default function SonimodCaseStudy() {
  const slug = 'sonimod'
  const project = getProject(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) document.title = `${project.title} — Jessie Guan`
    return () => {
      document.title = 'Jessie Guan'
    }
  }, [project])

  return (
    <div className="case sonimod">
      <ReadingProgress />
      <CaseTop title={project ? project.title : 'Case study'} />

      <SonimodBody study={sonimodCaseStudy} />

      <CaseRail sections={RAILS_SONIMOD} />

      <ProjectIndex current={slug} />
      <Footer />
    </div>
  )
}
