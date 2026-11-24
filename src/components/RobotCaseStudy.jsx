import { useEffect } from 'react'
import Footer from './Footer'
import { CaseRail, ReadingProgress, CaseTop, CaseHero, ProjectIndex } from './CaseStudy'
import { getProject } from '../data/projects'
import { robotCaseStudy } from '../data/robotCaseStudy'
import '../styles/case-study-robot.css'

/* ---------- 2. 页面目录 ---------- */
const RAILS_ROBOT = [
  { id: 'case-overview', label: 'Overview' },
  { id: 'case-problems', label: 'Problems' },
  { id: 'case-research', label: 'Research' },
  { id: 'case-flow', label: 'User flow' },
  { id: 'case-phase', label: 'Working phase' },
  { id: 'case-personas', label: 'Personas' },
  { id: 'case-strategy', label: 'Strategy' },
  { id: 'case-design', label: 'Design' }
]

/* ---------- 3. 视觉？ ---------- */
function Pill({ children }) {
  return <span className="case-tag case-tag--solid">{children}</span>
}

/* ---------- 5. 页面区块 ---------- */
function RobotOverview({ study }) {
  const { headline, charts, title } = study.stats

  return (
    <section className="case-overview" aria-label="Overview and market">
      <Pill>Background</Pill>
      <p className="case-lede">{study.intro}</p>

      <div className="case-target">
        <span className="case-kicker">Target</span>
        <p>{study.target}</p>
      </div>

      <div className="case-market">
        <h3 className="case-market-title">{title}</h3>

        <div className="case-market-grid">
          <div className="case-market-stack">
            {headline.map((stat) => (
              <figure className="case-stat" key={stat.alt}>
                <img src={stat.src} alt={stat.alt} width={stat.w} height={stat.h} loading="lazy" />
              </figure>
            ))}
          </div>

          <div className="case-market-pair">
            {charts.map((stat) => (
              <figure className="case-stat" key={stat.alt}>
                <img src={stat.src} alt={stat.alt} width={stat.w} height={stat.h} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Problems({ items }) {
  return (
    <section className="case-blue case-problems" id="case-problems">
      <Pill>Problems</Pill>
      <div className="problem-grid">
        {items.map((text, i) => (
          <article className="problem-item" key={text}>
            <span className="problem-index">{String(i + 1).padStart(2, '0')}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Research({ research }) {
  return (
    <section className="case-blue case-research" id="case-research">
      <Pill>Research</Pill>

      <p className="research-lead">
        {research.lead} <em>{research.emphasis}</em>
      </p>

      <div className="research-grid">
        {research.phases.map((phase) => (
          <article className="research-phase" key={phase.name}>
            <h3>{phase.name}</h3>
            <div className="phase-rule" />
            <p className="phase-time">
              <b>{phase.time}</b>
              <span>{phase.unit}</span>
            </p>
            <p className="phase-title">{phase.title}</p>
            <p className="phase-body">{phase.body}</p>
            <p className="phase-insight">{phase.insight}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function SplitProblems({ items }) {
  return (
    <section className="case-split">
      {items.map((item) => (
        <article className="split-row" key={item.value}>
          <div className="split-figure">
            <span className="split-value">
              {item.value}
              <sup>%</sup>
            </span>
            <span className="split-caption">{item.unit.replace('% ', '')}</span>
          </div>

          <div className="split-body">
            <p>{item.text}</p>
            <div className="split-bar">
              <i style={{ width: `${item.value}%` }} />
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

function Personas({ personas }) {
  return (
    <section className="case-personas" aria-label="Personas" id="case-personas">
      <div className="persona-grid">
        {personas.map((persona) => (
          <article className="persona" key={persona.name}>
            <header className="persona-head">
              <h3>{persona.name}</h3>
              <p className="persona-freq">
                <span>Use Frequency</span>
                <span className="freq" aria-label={`${persona.frequency} of 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <i key={i} className={i < persona.frequency ? 'on' : ''} />
                  ))}
                </span>
              </p>
            </header>

            <div className="persona-body">
              <img
                className="persona-avatar"
                src={persona.avatar}
                alt={`${persona.name}`}
                loading="lazy"
              />
            </div>

            <div className="persona-lists">
              <div>
                <h4>Pain:</h4>
                <ul>
                  {persona.pain.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Goals:</h4>
                <ul>
                  {persona.goals.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Strategy({ strategies }) {
  return (
    <section className="case-strategy" id="case-strategy">
      <Pill>Strategy</Pill>
      <div className="strategy-grid">
        {strategies.map((card, i) => (
          <figure className={`strategy-card strategy-card--${i + 1}`} key={card.alt}>
            <img src={card.src} alt={card.alt} width={card.w} height={card.h} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  )
}

function Design({ shots }) {
  return (
    <section className="case-design" id="case-design">
      <Pill>Design</Pill>
      <div className="design-list">
        {shots.map((shot) => (
          <figure className="design-item" key={`${shot.phase}-${shot.title}`}>
            <img src={shot.src} alt={`${shot.phase} — ${shot.title}`} width={shot.w} height={shot.h} loading="lazy" />
            <figcaption>
              <span className="design-phase">{shot.phase}</span>
              <div>
                <p className="design-title">{shot.title}</p>
                <p className="design-caption">{shot.caption}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ---------- 6. 内容主体 ---------- */
function RobotBody({ study }) {
  return (
    <>
      <CaseHero study={study} id="case-overview" />

      <RobotOverview study={study} />

      <Problems items={study.problems} />

      <Research research={study.research} />

      <section className="case-about" aria-label="Workflow">
        <Pill>Workflow</Pill>
        <figure className="case-figure case-rot case-rot--flow" id="case-flow">
          <img
            src={study.flows.userFlow.src}
            alt={study.flows.userFlow.alt}
            width={study.flows.userFlow.w}
            height={study.flows.userFlow.h}
            loading="lazy"
          />
        </figure>

        <figure className="case-figure case-rot case-rot--phase" id="case-phase">
          <img
            src={study.flows.workPhase.src}
            alt={study.flows.workPhase.alt}
            width={study.flows.workPhase.w}
            height={study.flows.workPhase.h}
            loading="lazy"
          />
        </figure>
        <SplitProblems items={study.splitProblems} />
        <Personas personas={study.personas} />
      </section>
      <Strategy strategies={study.strategies} />
      <Design shots={study.design} />
    </>
  )
}

/* ---------- 7. 主入口 ---------- */
export default function RobotCaseStudy() {
  const slug = 'robot-manipulator'
  const project = getProject(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) document.title = `${project.title} — Jessie Guan`
    return () => {
      document.title = 'Jessie Guan'
    }
  }, [project])

  return (
    <div className="case robot">
      <ReadingProgress />
      <CaseTop title={project ? project.title : 'Case study'} />
      <RobotBody study={robotCaseStudy} />
      <CaseRail sections={RAILS_ROBOT} />
      <ProjectIndex current={slug} />
      <Footer />
    </div>
  )
}
