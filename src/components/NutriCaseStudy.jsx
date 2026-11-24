import { useEffect } from 'react'
import Footer from './Footer'
import { CaseRail, ReadingProgress, CaseTop, CaseHero, ProjectIndex } from './CaseStudy'
import { getProject } from '../data/projects'
import { nutriCaseStudy } from '../data/nutriCaseStudy'
import '../styles/case-study-nutri.css'

/* ---------- 2. 页面目录 ---------- */
const RAILS_NUTRI = [
  { id: 'n-background', label: 'Background' },
  { id: 'n-persona', label: 'Persona' },
  { id: 'n-strategy', label: 'Strategy' },
  { id: 'n-strategy1', label: 'Strategy - 1' },
  { id: 'n-usability', label: 'Usability' },
  { id: 'n-strategy2', label: 'Strategy - 2' },
  { id: 'n-strategy3', label: 'Strategy - 3' },
  { id: 'n-theme', label: 'Theme Color' }
]

/* ---------- 3. 视觉原子 ---------- */
function Pill({ children }) {
  return <span className="nutri-chip">{children}</span>
}

/* ---------- 5. 页面区块 ---------- */
/* 5.1 Background */
function NutriBackground({ data }) {
  return (
    <section className="nutri-sec nutri-sec--mint" id="n-background">
      <div className="nutri-inner">
        <Pill>{data.chip}</Pill>

        <div className="nutri-bg-top">
          <figure className="nutri-subhealth">
            <img src={data.stat.src} alt={data.stat.alt} />
          </figure>
          <p className="nutri-italic nutri-bg-intro">{data.intro}</p>
        </div>

        <div className="nutri-diary">
          <h2 className="nutri-h3">{data.diary.title}</h2>
          <p className="nutri-italic">{data.diary.lead}</p>

          <div className="nutri-diary-tables">
            {data.diary.tables.map((t) => (
              <figure key={t.alt}>
                <img src={t.src} alt={t.alt} loading="lazy" />
              </figure>
            ))}
          </div>

          <p className="nutri-italic nutri-diary-follow">{data.diary.follow}</p>

          <div className="nutri-pattern-cards">
            {data.diary.cards.map((c) => (
              <figure className={`nutri-pattern nutri-pattern--${c.size}`} key={c.alt}>
                <img src={c.src} alt={c.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* 5.2 Persona */
function NutriPersona({ data }) {
  return (
    <section className="nutri-sec" id="n-persona">
      <div className="nutri-inner">
        <Pill>{data.chip}</Pill>
        <p className="nutri-italic nutri-lead">{data.lead}</p>

        <div className="nutri-persona-grid">
          <figure className="nutri-persona-goals">
            <img src={data.goals.src} alt={data.goals.alt} loading="lazy" />
          </figure>

          <div className="nutri-persona-right">
            <figure className="nutri-persona-card">
              <img src={data.card.src} alt={data.card.alt} loading="lazy" />
            </figure>
            <p className="nutri-italic nutri-quote">{data.quote}</p>
          </div>
        </div>

        <figure className="nutri-persona-frustration">
          <img src={data.frustration.src} alt={data.frustration.alt} loading="lazy" />
        </figure>
      </div>
    </section>
  )
}

/* 5.3 Strategy */
function NutriStrategy({ data }) {
  return (
    <section className="nutri-sec" id="n-strategy">
      <div className="nutri-inner">
        <Pill>{data.chip}</Pill>

        <div className="nutri-strategy-list">
          {data.items.map((item) => (
            <article className="nutri-strategy-item" key={item.index}>
              <span className="nutri-strategy-num">{item.index}</span>
              <div>
                <h3>{item.title}</h3>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 5.4 Strategy - 1 process */
function NutriProcess({ data }) {
  return (
    <section className="nutri-sec nutri-sec--light" id="n-strategy1">
      <div className="nutri-inner">
        <Pill>{data.chip}</Pill>

        <div className="nutri-process">
          <div className="nutri-process-col">
            <h3 className="nutri-h4">{data.now.title}</h3>
            <figure>
              <img src={data.now.src} alt={data.now.alt} loading="lazy" />
            </figure>
          </div>

          <div className="nutri-process-col">
            <h3 className="nutri-h4">{data.before.title}</h3>
            <figure>
              <img src={data.before.src} alt={data.before.alt} loading="lazy" />
            </figure>
          </div>
        </div>

        <p className="nutri-less">
          <span className="nutri-less-left">{data.less.left}</span>
          <span>
            {data.less.right.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </span>
        </p>
      </div>
    </section>
  )
}

/* 5.5 Strategy - 1 features */
function NutriFeatures({ items }) {
  return (
    <section className="nutri-sec nutri-features">
      <div className="nutri-inner">
        {items.map((item, i) => (
          <article className={`nutri-feature nutri-feature--${item.layout}`} key={i}>
            {item.title && (
              <div className="nutri-feature-text">
                <h3>{item.title}</h3>
                {item.body && <p className="nutri-italic">{item.body}</p>}
              </div>
            )}

            {item.images.map((img) => (
              <figure className={`nutri-feature-fig nutri-feature-fig--${img.size}`} key={img.src}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </figure>
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}

/* 5.6 Usability Test */
function NutriUsability({ data }) {
  const [left, right] = data.items

  return (
    <section className="nutri-sec nutri-sec--fade" id="n-usability">
      <div className="nutri-inner">
        <Pill>{data.chip}</Pill>

        <div className="nutri-usability">
          <article className="nutri-usability-left">
            <h3 className="nutri-h4">{left.title}</h3>
            <p className="nutri-italic">{left.body}</p>
            <figure>
              <img src={left.src} alt={left.alt} loading="lazy" />
            </figure>
            <p className="nutri-italic nutri-note">{left.note}</p>
          </article>

          <article className="nutri-usability-right">
            <div>
              <h3 className="nutri-h4">{right.title}</h3>
              <p className="nutri-italic">{right.body}</p>
            </div>
            <figure>
              <img src={right.src} alt={right.alt} loading="lazy" />
            </figure>
            <p className="nutri-italic nutri-note">{right.note}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

/* 5.7 Strategy - 2 */
function NutriCalendar({ data }) {
  return (
    <section className="nutri-sec" id="n-strategy2">
      <div className="nutri-inner">
        <Pill>{data.chip}</Pill>

        <div className="nutri-cal">
          <div className="nutri-cal-phones">
            {data.phones.map((phone, i) => (
              <figure key={phone.alt} className={`nutri-phone nutri-phone--${i + 1}`}>
                <img src={phone.src} alt={phone.alt} loading="lazy" />
              </figure>
            ))}
          </div>

          <div className="nutri-cal-blocks">
            {data.blocks.map((block) => (
              <div key={block.title}>
                <h3 className="nutri-h4">{block.title}</h3>
                <p className="nutri-italic">{block.body}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="nutri-h3 nutri-recommend-title">{data.recommendTitle}</h3>

        <div className="nutri-recommend">
          {data.recommend.map((card) => (
            <figure key={card.alt}>
              <img src={card.src} alt={card.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>

      <div className="nutri-band">
        <div className="nutri-inner">
          <h3 className="nutri-h3 nutri-band-title">{data.bandTitle}</h3>

          <div className="nutri-detail">
            <figure className="nutri-detail-card">
              <img src={data.bandCard.src} alt={data.bandCard.alt} loading="lazy" />
            </figure>
            <figure className="nutri-detail-pie">
              <img src={data.bandPie.src} alt={data.bandPie.alt} loading="lazy" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 5.8 Strategy - 3 */
function NutriHabit({ data }) {
  return (
    <section className="nutri-sec" id="n-strategy3">
      <div className="nutri-inner">
        <Pill>{data.chip}</Pill>

        <div className="nutri-habit-top">
          <div className="nutri-habit-text">
            {data.blocks.map((block) => (
              <div key={block.title}>
                <h3 className="nutri-h4">{block.title}</h3>
                <p className="nutri-italic">{block.body}</p>
              </div>
            ))}
          </div>

          <figure className="nutri-phone nutri-habit-home">
            <img src={data.home.src} alt={data.home.alt} loading="lazy" />
          </figure>
        </div>

        <div className="nutri-habit-mid">
          <figure className="nutri-phone nutri-habit-square">
            <img src={data.square.src} alt={data.square.alt} loading="lazy" />
          </figure>
          <p className="nutri-italic nutri-habit-emoji">{data.emojiBody}</p>
        </div>
      </div>

      <div className="nutri-band nutri-band--gray">
        <figure className="nutri-handheld">
          <img src={data.handheld.src} alt={data.handheld.alt} loading="lazy" />
        </figure>
      </div>
    </section>
  )
}

/* 5.9 Theme Color */
function NutriTheme({ data }) {
  return (
    <section className="nutri-sec" id="n-theme">
      <div className="nutri-inner">
        <Pill>{data.chip}</Pill>

        <div className="nutri-theme-head">
          <span className="nutri-swatch" style={{ background: data.swatch }} />
          <h3 className="nutri-theme-title">{data.heading}</h3>
        </div>

        <div className="nutri-theme-rows">
          {data.rows.map((row) => (
            <div className="nutri-theme-row" key={row.label}>
              <div className="nutri-theme-label">
                <span>{row.label}</span>
                <b>{row.value}</b>
              </div>
              <p>{row.note}</p>
            </div>
          ))}
        </div>

        <div className="nutri-shades">
          {data.notes.map((note) => (
            <article key={note.title}>
              <div className="nutri-shade-rule">
                <i />
              </div>
              <h4>{note.title}</h4>
              <p className="nutri-italic">{note.body}</p>
              <figure>
                <img src={note.image.src} alt={note.image.alt} loading="lazy" />
              </figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 6. 内容主体 ---------- */
function NutriBody({ study }) {
  return (
    <>
      <CaseHero study={study} />

      <NutriBackground data={study.background} />
      <NutriPersona data={study.persona} />
      <NutriStrategy data={study.strategy} />
      <NutriProcess data={study.process} />
      <NutriFeatures items={study.features} />
      <NutriUsability data={study.usability} />
      <NutriCalendar data={study.calendar} />
      <NutriHabit data={study.habit} />
      <NutriTheme data={study.theme} />
    </>
  )
}

/* ---------- 7. 主入口 ---------- */
export default function NutriCaseStudy() {
  const slug = 'nutri-notebook'
  const project = getProject(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) document.title = `${project.title} — Jessie Guan`
    return () => {
      document.title = 'Jessie Guan'
    }
  }, [project])

  return (
    <div className="case nutri">
      <ReadingProgress />
      <CaseTop title={project ? project.title : 'Case study'} />

      <NutriBody study={nutriCaseStudy} />

      <CaseRail sections={RAILS_NUTRI} />

      <ProjectIndex current={slug} />
      <Footer />
    </div>
  )
}
