import { useEffect } from 'react'
import Footer from './Footer'
import { CaseRail, CaseTop, CaseHero, ProjectIndex, ReadingProgress } from './CaseStudy'
import { getProject } from '../data/projects'
import { hiveeCaseStudy } from '../data/hiveeCaseStudy.js'
import '../styles/case-study-hivee.css'

/* ---------- 2. 页面目录 ---------- */
const RAILS_HIVEE = [
  { id: 'hv-overview', label: 'Overview' },
  { id: 'hv-problem', label: 'Problem Space' },
  { id: 'hv-research', label: 'Research' },
  { id: 'hv-whys', label: '5 Whys' },
  { id: 'hv-competitor', label: 'Competitor' },
  { id: 'hv-personas', label: 'Personas' },
  { id: 'hv-strategy', label: 'Strategy' },
  { id: 'hv-iterations', label: 'Iterations' }
]

/* ---------- 3. 视觉原子 ---------- */
function SectionHead({ title, sub }) {
  return (
    <header className="hv-shead">
      <h2>{title}</h2>
      {sub ? <p>{sub}</p> : null}
    </header>
  )
}

/* ---------- 5. 页面区块 ---------- */
/* 5.1 Head */
function HiveeHead({ study }) {
  return <CaseHero study={study} id="hv-overview" />
}

/* 5.2 Problem space */
function HiveeProblem({ data }) {
  const { decorations } = data

  return (
    <section className="hv-sec hv-sec--sky hv-problem" id={data.id}>
      <SectionHead title={data.title} sub={data.sub} />

      <div className="hv-problem-body">
        <p className="hv-problem-lead">{data.lead}</p>
        <p className="hv-problem-text">
          {data.body.map((seg, i) =>
            seg.strong ? (
              <mark key={i}>{seg.text}</mark>
            ) : (
              <span key={i}>{seg.text}</span>
            )
          )}
        </p>
      </div>

      <img className="hv-deco hv-deco--polygon" src={decorations.polygon} alt="" aria-hidden="true" />
      <img className="hv-deco hv-deco--rectangle" src={decorations.rectangle} alt="" aria-hidden="true" />
      <img className="hv-deco hv-deco--star" src={decorations.star} alt="" aria-hidden="true" />
      <img className="hv-deco hv-deco--ellipse" src={decorations.ellipse} alt="" aria-hidden="true" />

      <img
        className="hv-space-word"
        src={data.spaceWord.src}
        alt=""
        aria-hidden="true"
        width={data.spaceWord.w}
        height={data.spaceWord.h}
        loading="lazy"
      />
    </section>
  )
}

/* 5.3 Research */
function HiveeResearch({ data }) {
  return (
    <section className="hv-sec hv-sec--paper hv-research" id={data.id}>
      <SectionHead title={data.title} sub={data.sub} />

      <p className="hv-lead">{data.lead}</p>

      <div className="hv-group-card">
        <div className="hv-group-figure">
          <img
            className="hv-group-img"
            src={data.group.image.src}
            alt={data.group.image.alt}
            width={data.group.image.w}
            height={data.group.image.h}
            loading="lazy"
          />
        </div>
      </div>

      <div className="hv-chart-block">
        <p className="hv-chart-q">{data.challenges.question}</p>
        <figure className="hv-chart-fig">
          <img
            src={data.challenges.image.src}
            alt={data.challenges.image.alt}
            width={data.challenges.image.w}
            height={data.challenges.image.h}
            loading="lazy"
          />
        </figure>
      </div>

      <p className="hv-insight">
        {data.insight.lead} <span>{data.insight.value}</span>
      </p>

      <div className="hv-chart-block">
        <p className="hv-chart-q">{data.functions.question}</p>
        <figure className="hv-chart-fig">
          <img
            src={data.functions.image.src}
            alt={data.functions.image.alt}
            width={data.functions.image.w}
            height={data.functions.image.h}
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  )
}

/* 5.4 5 Whys */
function HiveeWhys({ data }) {
  return (
    <section className="hv-sec hv-sec--paper" id={data.id}>
      <SectionHead title={data.title} sub={data.sub} />

      <p className="hv-whys-lead">{data.lead}</p>

      <ol className="hv-whys">
        {data.items.map((item, i) => (
          <li className="hv-why" key={item.question}>
            <p className="hv-why-q">
              <span>{i + 1}.</span> {item.question}
            </p>

            <div className="hv-why-a">
              <p className="hv-why-value">
                {item.value}
                <sup>%</sup>
              </p>
              <p className="hv-why-answer">{item.answer}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* 5.5 Competitor */
function HiveeCompetitor({ data }) {
  return (
    <section className="hv-sec hv-sec--paper" id={data.id}>
      <SectionHead title={data.title} sub={data.sub} />

      <h3 className="hv-subhead">{data.currentTitle}</h3>
      <p className="hv-body-muted">{data.intro}</p>

      <figure className="hv-matrix">
        <img
          src={data.matrix.src}
          alt={data.matrix.alt}
          width={data.matrix.w}
          height={data.matrix.h}
          loading="lazy"
        />
      </figure>

      <p className="hv-body-muted hv-body-muted--wide">{data.positioning}</p>

      <figure className="hv-quadrant">
        <img
          src={data.quadrant.src}
          alt={data.quadrant.alt}
          width={data.quadrant.w}
          height={data.quadrant.h}
          loading="lazy"
        />
      </figure>
    </section>
  )
}

/* 5.6 Personas */
function HiveePersonas({ data }) {
  return (
    <section className="hv-sec hv-sec--mist hv-personas" id={data.id}>
      <SectionHead title={data.title} sub={data.sub} />

      <div className="hv-persona-grid">
        {data.items.map((persona) => (
          <figure className={`hv-persona hv-persona--${persona.align}`} key={persona.name}>
            <img
              className="hv-persona-card-img"
              src={persona.card.src}
              alt={persona.card.alt}
              width={persona.card.w}
              height={persona.card.h}
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}

/* 5.7 Strategy */
function HiveeStrategy({ data }) {
  return (
    <section className="hv-sec hv-sec--paper hv-strategy" id={data.id}>
      <SectionHead title={data.title} sub={data.sub} />

      <p className="hv-hmw">{data.hmw}</p>

      <div className="hv-strategy-cards">
        {data.cards.map((card) => (
          <article className={`hv-scard hv-scard--${card.tone}`} key={card.title}>
            <h3>{card.title}</h3>
            <ul>
              {card.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="hv-principles">
        {data.principles.map((item) => (
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>

      <figure className="hv-laptop hv-laptop--wide">
        <img
          src={data.hero.src}
          alt={data.hero.alt}
          width={data.hero.w}
          height={data.hero.h}
          loading="lazy"
        />
      </figure>

      <div className="hv-walkthrough">
        <figure className="hv-laptop hv-laptop--team">
          <img
            src={data.walkthrough.team.src}
            alt={data.walkthrough.team.alt}
            width={data.walkthrough.team.w}
            height={data.walkthrough.team.h}
            loading="lazy"
          />
        </figure>

        <div className="hv-walkthrough-side">
          <p className="hv-side-label">
            {data.walkthrough.label}
            <i />
          </p>

          <figure className="hv-walk-card">
            <img
              src={data.walkthrough.card.src}
              alt={data.walkthrough.card.alt}
              width={data.walkthrough.card.w}
              height={data.walkthrough.card.h}
              loading="lazy"
            />
          </figure>

          <p className="hv-side-label hv-side-label--end">
            {data.walkthrough.label2}
            <i />
          </p>
        </div>
      </div>

      <div className="hv-categorization">
        <div className="hv-categorization-text">
          <h3>{data.categorization.title}</h3>
          <p>{data.categorization.body}</p>
        </div>

        <figure className="hv-laptop hv-laptop--calendar">
          <img
            src={data.categorization.image.src}
            alt={data.categorization.image.alt}
            width={data.categorization.image.w}
            height={data.categorization.image.h}
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  )
}

/* 5.8 Iterations */
function Optimization({ group }) {
  return (
    <div className="hv-optimization">
      <h3 className="hv-subhead">Optimization</h3>

      <ol className="hv-optimization-list">
        {group.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>

      <ul className="hv-optimization-notes">
        {group.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      <figure className="hv-ring">
        <img src={group.ring.src} alt={group.ring.alt} width={group.ring.w} height={group.ring.h} loading="lazy" />
      </figure>
    </div>
  )
}

function HiveeIterations({ data }) {
  const [first, second] = data.groups

  return (
    <section className="hv-sec hv-sec--paper hv-iterations" id={data.id}>
      <SectionHead title={data.title} sub={data.sub} />

      <Optimization group={first} />

      <div className="hv-beforeafter">
        <p className="hv-ba-label">Before</p>
        <figure className="hv-shot">
          <img src={data.beforeDashboard.src} alt={data.beforeDashboard.alt} width={data.beforeDashboard.w} height={data.beforeDashboard.h} loading="lazy" />
        </figure>

        <p className="hv-ba-label">After</p>
        <figure className="hv-shot">
          <img src={data.afterDashboard.src} alt={data.afterDashboard.alt} width={data.afterDashboard.w} height={data.afterDashboard.h} loading="lazy" />
        </figure>
      </div>

      <Optimization group={second} />

      <div className="hv-beforeafter">
        <p className="hv-ba-label">Before</p>
        <figure className="hv-shot hv-shot--table">
          <img src={data.beforeTable.src} alt={data.beforeTable.alt} width={data.beforeTable.w} height={data.beforeTable.h} loading="lazy" />
        </figure>

        <p className="hv-ba-label">After</p>
        <figure className="hv-shot hv-shot--table">
          <img src={data.afterTable.src} alt={data.afterTable.alt} width={data.afterTable.w} height={data.afterTable.h} loading="lazy" />
        </figure>
      </div>
    </section>
  )
}

/* ---------- 6. 内容主体 ---------- */
function HiveeBody({ study }) {
  return (
    <>
      <HiveeHead study={study} />
      <HiveeProblem data={study.problem} />
      <HiveeResearch data={study.research} />
      <HiveeWhys data={study.whys} />
      <HiveeCompetitor data={study.competitor} />
      <HiveePersonas data={study.personas} />
      <HiveeStrategy data={study.strategy} />
      <HiveeIterations data={study.iterations} />
    </>
  )
}

/* ---------- 7. 主入口 ---------- */
export default function HiveeCaseStudy() {
  const slug = 'hivee'
  const project = getProject(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) document.title = `${project.title} — Jessie Guan`
    return () => {
      document.title = 'Jessie Guan'
    }
  }, [project])

  return (
    <div className="case hivee">
      <ReadingProgress />
      <CaseTop title={project ? project.title : 'Case study'} />

      <HiveeBody study={hiveeCaseStudy} />

      <CaseRail sections={RAILS_HIVEE} />

      <ProjectIndex current={slug} />
      <Footer />
    </div>
  )
}
