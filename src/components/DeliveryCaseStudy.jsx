import { useEffect, useState } from 'react'
import Footer from './Footer'
import { CaseHero, CaseTop, ProjectIndex, ReadingProgress } from './CaseStudy'
import { getProject } from '../data/projects'
import { deliveryStudy as study } from '../data/deliveryCaseStudy'
import '../styles/case-study-delivery.css'

/* ---------- 2. 页面目录 ---------- */
const RAILS_DELIVERY = [
  { id: 'dlv-background', label: 'Background' },
  { id: 'dlv-needs', label: 'Users’ Needs' },
  { id: 'dlv-space', label: 'Problem Space' },
  { id: 'dlv-strategy', label: 'Strategy' },
  { id: 'dlv-design', label: 'Design' },
  { id: 'dlv-delivery', label: 'Delivery' },
  { id: 'dlv-exception', label: 'Exception' },
  { id: 'dlv-product', label: 'Product' },
  { id: 'dlv-usability', label: 'Usability' }
]

const ROLES = ['CEO', 'Manager', 'Staff', 'Kitchen']

/* ---------- 3. 视觉原子 ---------- */
/* 富文本：数组里的 ['文字', 'b'] 会把这段加粗 */
function Rich({ parts }) {
  return (
    <>
      {parts.map(([text, tag], i) =>
        tag === 'b' ? <b key={i}>{text}</b> : <span key={i}>{text}</span>
      )}
    </>
  )
}

function Rail() {
  const [active, setActive] = useState(RAILS_DELIVERY[0].id)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.32
      let current = RAILS_DELIVERY[0].id

      RAILS_DELIVERY.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      })

      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const jump = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' })
  }

  return (
    <nav className="dlv-rail" aria-label="Case study sections">
      {RAILS_DELIVERY.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={active === id ? 'is-active' : ''}
          onClick={() => jump(id)}
          aria-label={label}
        >
          <span className="dlv-rail-tip">{label}</span>
          <i />
        </button>
      ))}
    </nav>
  )
}

function Pill({ children }) {
  return <span className="dlv-tag">{children}</span>
}

function RoleStack({ roles = ROLES }) {
  return (
    <div className="dlv-roles" aria-hidden="true">
      {roles.map((role) => (
        <span key={role} className={`dlv-role dlv-role--${role.toLowerCase()}`}>
          {role}
        </span>
      ))}
    </div>
  )
}

/* ---------- 4. 页面头部 ---------- */
function Head() {
  return <CaseHero study={study} id="dlv-top" />
}

/* ---------- 5. 页面区块 ---------- */
/* 5.1 Background */
function Background() {
  const { blocks, problems, challenges } = study.background

  return (
    <section className="dlv-card dlv-bg" id="dlv-background">
      <Pill>Background</Pill>

      <div className="dlv-bg-copy">
        <div>
          {blocks.map((block) => (
            <div className="dlv-bg-block" key={block.title}>
              <h2 className="dlv-h3">{block.title}</h2>
              {block.lines.map((line, i) => (
                <p className="dlv-lit" key={i}>
                  <Rich parts={line.parts} />
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="dlv-bg-lists">
        <h2 className="dlv-h3">Problems</h2>
        <ul className="dlv-note">
          {problems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="dlv-h3">Challenges</h2>
        <ul className="dlv-note">
          {challenges.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 5.2 Needs */
function Needs() {
  const { intro, rows, cards } = study.needs

  return (
    <section className="dlv-card dlv-needs" id="dlv-needs">
      <Pill>Users’ Needs Analysis</Pill>

      <div className="dlv-needs-panel">
        <div className="dlv-needs-intro">
          {intro.map((line, i) => (
            <p className="dlv-lit" key={i}>
              <Rich parts={line.parts} />
            </p>
          ))}
        </div>

        <div className="dlv-table">
          <div className="dlv-table-head">
            <span />
            <span>Needs’ Analysis</span>
            <span>Related Sector</span>
          </div>

          {rows.map((row) => (
            <div className="dlv-table-row" key={row.role}>
              <span className={`dlv-pill dlv-pill--${row.role.split(' ')[0].toLowerCase()}`}>{row.role}</span>

              <ul className="dlv-needs-list">
                {row.needs.map((need, i) => (
                  <li key={i}>
                    <Rich parts={need[0].parts} />
                  </li>
                ))}
              </ul>

              <ul className="dlv-sectors">
                {row.sectors.map((sector) => (
                  <li key={sector}>{sector}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="dlv-needs-cards">
        {cards.map((card) => (
          <article className="dlv-need-card" key={card.role}>
            <span className={`dlv-pill dlv-pill--${card.role.split(' ')[0].toLowerCase()}`}>{card.role}</span>

            <div className="dlv-need-body">
              {card.lines &&
                card.lines.map((line, i) => (
                  <p className="dlv-lit" key={i}>
                    {line}
                  </p>
                ))}

              {card.bullets && (
                <ul className="dlv-need-bullets">
                  {card.bullets.map((bullet, i) => (
                    <li key={i}>
                      <Rich parts={bullet.parts} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* 5.3 Space */
function Space() {
  const { lead, items } = study.space

  return (
    <section className="dlv-space" id="dlv-space">
      <Pill>Problem Space</Pill>

      <p className="dlv-space-lead">{lead}</p>

      <ol className="dlv-space-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  )
}

/* 5.4 Strategy */
function Strategy() {
  return (
    <section className="dlv-card" id="dlv-strategy">
      <Pill>Strategy</Pill>

      <div className="dlv-strategy">
        {study.strategy.map((item) => (
          <article className="dlv-strategy-card" key={item.index}>
            <div className="dlv-strategy-head">
              <span className="dlv-strategy-num">{item.index}</span>
              <h2 className="dlv-h3">{item.title}</h2>
            </div>

            <ul className="dlv-note dlv-note--flat">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

/* 5.5 Design */
function Design() {
  const { intro, dashboards, flowIntro, patterns, flow } = study.design

  return (
    <section className="dlv-card dlv-design" id="dlv-design">
      <Pill>Design</Pill>

      <div className="dlv-design-grid">
        <div className="dlv-design-body">
          <h2 className="dlv-h3 dlv-h3--wide">Dashboard Overview</h2>
          {intro.map((line, i) => (
            <p className="dlv-lit" key={i}>
              <Rich parts={line.parts} />
            </p>
          ))}

          <div className="dlv-dash">
            {dashboards.map((item, i) => (
              <figure className={`dlv-dash-item dlv-dash-item--${i + 1}`} key={item.role}>
                <figcaption>
                  <span className="dlv-dash-role">{item.role}</span>
                  <span className="dlv-dash-note">{item.note}</span>
                </figcaption>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </figure>
            ))}
          </div>

          <h2 className="dlv-h3 dlv-h3--wide dlv-flow-title">Robot Delivery Flow</h2>
          {flowIntro.map((line, i) => (
            <p className="dlv-lit" key={i}>
              <Rich parts={line.parts} />
            </p>
          ))}

          <p className="dlv-patterns-label">Patterns</p>
          <figure className="dlv-patterns">
            <img src={patterns.src} alt={patterns.alt} loading="lazy" />
          </figure>

          <ol className="dlv-flow">
            {flow.map((step) => (
              <li className="dlv-flow-step" key={step.node}>
                <div className="dlv-flow-node">
                  <span>{step.node}</span>
                </div>

                <div className="dlv-flow-copy">
                  {step.groups.map((group) => (
                    <div className="dlv-flow-group" key={group.who}>
                      <p className="dlv-flow-who">{group.who}</p>
                      <ul>
                        {group.lines.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <RoleStack />
      </div>
    </section>
  )
}

/* 5.6 Delivery */
function Delivery() {
  const { record, features } = study.delivery

  return (
    <section className="dlv-card dlv-delivery" id="dlv-delivery">
      <Pill>Delivery</Pill>

      <div className="dlv-design-grid">
        <div className="dlv-design-body">
          <div className="dlv-record">
            <h3 className="dlv-feature-title">{record.title}</h3>
            {record.body.map((line, i) => (
              <p className="dlv-lit" key={i}>
                <Rich parts={line.parts} />
              </p>
            ))}

            <figure className="dlv-laptop">
              <img src={record.image} alt={record.alt} loading="lazy" />
            </figure>
          </div>

          <div className="dlv-features">
            {features.map((feature) => (
              <article className="dlv-feature" key={feature.title}>
                <div className="dlv-feature-media">
                  {feature.chipImage && (
                    <figure className="dlv-charge-chip">
                      <img
                        src={feature.chipImage}
                        alt="Robot Linda - 11 with 90% battery while charging"
                        loading="lazy"
                      />
                    </figure>
                  )}

                  {feature.image && (
                    <figure className="dlv-feature-fig">
                      <img src={feature.image} alt={feature.alt} loading="lazy" />
                    </figure>
                  )}
                </div>

                <div className="dlv-feature-copy">
                  <h3 className="dlv-feature-title">{feature.title}</h3>
                  {feature.body.map((line, j) => (
                    <p className="dlv-lit" key={j}>
                      <Rich parts={line.parts} />
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <RoleStack roles={['CEO', 'Manager', 'Staff']} />
      </div>
    </section>
  )
}

/* 5.7 Exception */
function Exception() {
  const {
    intro,
    diagram,
    categoriesNote,
    graph,
    kanbanNote,
    statusCards,
    handlingTitle,
    handlingBody,
    card
  } = study.exception

  return (
    <section className="dlv-card dlv-exception" id="dlv-exception">
      <Pill>Delivery Management</Pill>

      <div className="dlv-exception-lede">
        {intro.map((line, i) => (
          <p className="dlv-lit" key={i}>
            <Rich parts={line.parts} />
          </p>
        ))}
      </div>

      <figure className="dlv-exception-diagram">
        <img src={diagram.src} alt={diagram.alt} loading="lazy" />
      </figure>

      <div className="dlv-exception-note">
        {categoriesNote.map((line, i) => (
          <p className="dlv-lit" key={i}>
            <Rich parts={line.parts} />
          </p>
        ))}
      </div>

      <figure className="dlv-issue-graph">
        <img src={graph.src} alt={graph.alt} loading="lazy" />
      </figure>

      <div className="dlv-exception-note dlv-exception-note--kanban">
        {kanbanNote.map((line, i) => (
          <p className="dlv-lit" key={i}>
            <Rich parts={line.parts} />
          </p>
        ))}
      </div>

      <div className="dlv-status-row">
        {statusCards.map((item) => (
          <figure key={item.alt}>
            <img src={item.src} alt={item.alt} loading="lazy" />
          </figure>
        ))}
      </div>

      <div className="dlv-handling">
        <div className="dlv-handling-copy">
          <h2 className="dlv-h3 dlv-h3--wide">{handlingTitle}</h2>
          {handlingBody.map((line, i) => (
            <p className="dlv-lit" key={i}>
              <Rich parts={line.parts} />
            </p>
          ))}
        </div>

        <figure className="dlv-handling-card">
          <img src={card.src} alt={card.alt} loading="lazy" />
        </figure>
      </div>
    </section>
  )
}

/* 5.8 Product */
function Product() {
  const { laptop, title, body, table, shift } = study.product

  return (
    <section className="dlv-card dlv-product" id="dlv-product">
      <Pill>Product</Pill>

      <div className="dlv-design-grid">
        <div className="dlv-design-body">
          <figure className="dlv-laptop">
            <img src={laptop.src} alt={laptop.alt} loading="lazy" />
          </figure>

          <h2 className="dlv-h3 dlv-h3--wide dlv-product-title">{title}</h2>
          {body.map((line, i) => (
            <p className="dlv-lit" key={i}>
              <Rich parts={line.parts} />
            </p>
          ))}

          <figure className="dlv-product-table">
            <img src={table.src} alt={table.alt} loading="lazy" />
          </figure>

          <figure className="dlv-shift">
            <img src={shift.src} alt={shift.alt} loading="lazy" />
          </figure>
        </div>

        <RoleStack />
      </div>
    </section>
  )
}

/* 5.9 Usability */
function Usability() {
  const { title, intro, iterations, stateCards } = study.usability

  return (
    <section className="dlv-card dlv-usability" id="dlv-usability">
      <Pill>Usability Test</Pill>

      <h2 className="dlv-h3 dlv-h3--wide">{title}</h2>

      <div className="dlv-usability-intro">
        {intro.map((line, i) => (
          <p className="dlv-lit" key={i}>
            {line}
          </p>
        ))}
      </div>

      <div className="dlv-iterations">
        {iterations.map((item) => (
          <article className="dlv-iteration" key={item.index}>
            <div className="dlv-iteration-card">
              <span className="dlv-num">{item.index}</span>
              <figure>
                <img src={item.image} alt={item.alt} loading="lazy" />
              </figure>
            </div>

            <div className="dlv-iteration-copy">
              <p className="dlv-iteration-label">{item.label}</p>
              <ul className="dlv-marks">
                {item.points.map((point, i) => (
                  <li key={i} className={point.ok === false ? 'is-no' : point.ok ? 'is-yes' : ''}>
                    <Rich parts={point.parts} />
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <h2 className="dlv-h3 dlv-h3--wide dlv-state-title">{stateCards.title}</h2>
      <p className="dlv-lit dlv-state-intro">
        <Rich parts={stateCards.intro[0].parts} />
      </p>

      <div className="dlv-state-list">
        {stateCards.rows.map((row) => (
          <article className="dlv-state" key={row.name}>
            <p className="dlv-state-name">{row.name}</p>

            <div className="dlv-state-pair">
              <figure className="dlv-state-before">
                <figcaption>Previous <span aria-hidden="true">✕</span></figcaption>
                <img src={row.before} alt={row.beforeAlt} loading="lazy" />
              </figure>

              <figure className="dlv-state-after">
                <figcaption>Current <span aria-hidden="true">✓</span></figcaption>
                <img src={row.after} alt={row.afterAlt} loading="lazy" />
              </figure>
            </div>

            <ul className="dlv-state-notes">
              {row.notes.map((note, i) => (
                <li key={i}>
                  <Rich parts={note.parts} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- 6. 内容主体 ---------- */
function DeliveryBody() {
  return (
    <div className="dlv">
      <Rail />

      <div className="dlv-main">
        <Head />
        <Background />
        <Needs />
        <Space />
        <Strategy />
        <Design />
        <Delivery />
        <Exception />
        <Product />
        <Usability />
      </div>
    </div>
  )
}

/* ---------- 7. 主入口 ---------- */
export default function DeliveryCaseStudy() {
  const slug = 'robot-delivery'
  const project = getProject(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) document.title = `${project.title} — Jessie Guan`
    return () => {
      document.title = 'Jessie Guan'
    }
  }, [project])

  return (
    <div className="case delivery">
      <ReadingProgress />
      <CaseTop title={project ? project.title : 'Case study'} />

      <DeliveryBody />

      <ProjectIndex current={slug} />
      <Footer />
    </div>
  )
}
