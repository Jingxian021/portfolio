import { useEffect } from 'react'
import Footer from './Footer'
import { CaseRail, CaseTop, CaseHero, ProjectIndex, ReadingProgress } from './CaseStudy'
import { getProject } from '../data/projects'
import { noteEditorStudy as study } from '../data/noteEditorCaseStudy'
import '../styles/case-study-note-editor.css'

/* ---------- 2. 页面目录 ---------- */
const RAILS_NOTE_EDITOR = [
  { id: 'ne-about', label: 'About' },
  { id: 'ne-competitors', label: 'Competitors' },
  { id: 'ne-research', label: 'User Research' },
  { id: 'ne-swot', label: 'SWOT' },
  { id: 'ne-strategy', label: 'Opportunity & Strategy' },
  { id: 'ne-solution1', label: 'Solution 1' },
  { id: 'ne-edge', label: 'Edge Cases' },
  { id: 'ne-solution2', label: 'Solution 2' },
  { id: 'ne-solution3', label: 'Solution 3' },
  { id: 'ne-solution4', label: 'Solution 4' },
  { id: 'ne-system', label: 'Design System' }
]

/* ---------- 3. 视觉原子 ---------- */
function Pill({ children, className = '' }) {
  return <p className={`ne-pill ${className}`}>{children}</p>
}

function Rich({ text }) {
  return (
    <>
      {String(text).split('\n').map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 ? <br /> : null}
          {line.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
            if (part.startsWith('_') && part.endsWith('_')) return <em key={index}>{part.slice(1, -1)}</em>
            return part
          })}
        </span>
      ))}
    </>
  )
}

function Figure({ src, alt, className = '' }) {
  return (
    <figure className={`ne-figure ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
    </figure>
  )
}

function CompetitorGroup({ group }) {
  return (
    <>
      <p className={`ne-compare-head ne-compare-head--${group.tone}`}>{group.label}</p>
      {group.items.map((item) => (
        <article className="ne-comp" key={item.name}>
          <img className="ne-comp-logo" src={item.logo} alt={`${item.name} logo`} loading="lazy" />
          <ul className="ne-features">
            {item.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
          <p className="ne-comp-focus"><Rich text={item.focus} /></p>
          <p className="ne-comp-model"><Rich text={item.model} /></p>
          <p className="ne-comp-share">{item.share}</p>
        </article>
      ))}
    </>
  )
}

function PainPoint({ scenario }) {
  return (
    <article className={`ne-pain ne-pain--${scenario.tone}`}>
      <div className="ne-pain-body">
        <p className="ne-pain-label">{scenario.label}</p>
        {scenario.lines.map((line, index) => (
          <p className="ne-pain-line" key={index}>
            <img src={scenario.avatars[index] || scenario.avatars[scenario.avatars.length - 1]} alt="" loading="lazy" />
            <span><Rich text={line} /></span>
          </p>
        ))}
      </div>
      <aside className="ne-pain-aside">
        <p className="ne-pain-title">{scenario.title}</p>
        <img className="ne-pain-stat" src={scenario.stat} alt="" loading="lazy" />
      </aside>
    </article>
  )
}

/* ---------- 6. 内容主体 ---------- */
function NoteEditorBody() {
  return (
    <main className="ne-main">
      {/* ---------- 5. 页面区块 ---------- */}
      {/* 5.1 Hero ---------- */}
      <CaseHero study={study} />

      {/* 5.2 About ---------- */}
      <section className="ne-sec ne-sec--gray" id="ne-about">
        <Pill>About</Pill>
        <p className="ne-lede"><Rich text={study.about.lede} /></p>
        <div className="ne-app-panels">
          {study.about.panels.map((panel) => (
            <Figure src={panel.src} alt={panel.alt} key={panel.alt} />
          ))}
        </div>
      </section>

      {/* 5.3 Competitors ---------- */}
      <section className="ne-sec ne-sec--gray" id="ne-competitors">
        <Pill>Competitors</Pill>
        <div className="ne-compare">
          {study.competitors.groups.map((group) => (
            <CompetitorGroup group={group} key={group.label} />
          ))}
        </div>
        <ol className="ne-conclusion">
          {study.competitors.conclusion.map((item) => <li key={item}>{item}</li>)}
        </ol>

        <div className="ne-block">
          <h2 className="ne-h2">{study.competitors.ethnography.title}</h2>
          <p className="ne-copy"><Rich text={study.competitors.ethnography.copy} /></p>
          <div className="ne-stat-cards">
            {study.competitors.ethnography.cards.map((card) => (
              <Figure src={card.src} alt={card.alt} key={card.alt} />
            ))}
          </div>
        </div>

        <div className="ne-block">
          <h2 className="ne-h2">{study.competitors.positioning.title}</h2>
          <div className="ne-position">
            {study.competitors.positioning.cards.map((card) => (
              <Figure src={card.src} alt={card.alt} className="ne-position-card" key={card.alt} />
            ))}
          </div>
        </div>
      </section>

      {/* 5.4 User Research ---------- */}
      <section className="ne-sec ne-sec--gray" id="ne-research">
        <Pill>User Research</Pill>
        <p className="ne-lede">{study.research.lede}</p>

        <h2 className="ne-h2 ne-h2--sub">{study.research.painsTitle}</h2>
        <div className="ne-pains">
          {study.research.pains.map((scenario) => <PainPoint scenario={scenario} key={scenario.label} />)}
        </div>

        <div className="ne-needs">
          <h2 className="ne-h2">{study.research.needsTitle}</h2>
          <ol>
            {study.research.needs.map((need) => (
              <li key={typeof need === 'string' ? need : need.text}>
                {typeof need === 'string' ? need : (
                  <>
                    {need.text}
                    <ul>
                      {need.children.map((child) => <li key={child}>{child}</li>)}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
        <p className="ne-credit">{study.research.credit}</p>
      </section>

      {/* 5.5 SWOT ---------- */}
      <section className="ne-sec ne-sec--sky" id="ne-swot">
        <Pill>SWOT</Pill>
        <h2 className="ne-h2 ne-h2--sub">{study.swot.analysisTitle}</h2>
        <div className="ne-swot">
          {study.swot.items.map((item) => (
            <article className={`ne-swot-card ne-swot-card--${item.tone}`} key={item.title}>
              <h3>{item.title}</h3>
              <p><Rich text={item.body} /></p>
            </article>
          ))}
        </div>
        <div className="ne-idea">
          <h2 className="ne-h2">{study.swot.ideaTitle}</h2>
          {study.swot.ideaLines.map((line) => <p key={line}>{line}</p>)}
        </div>
        <p className="ne-credit">{study.swot.credit}</p>
      </section>

      {/* 5.6 Opportunity & Strategy ---------- */}
      <section className="ne-sec ne-sec--gray" id="ne-strategy">
        <Pill>Opportunity & Strategy</Pill>
        <h2 className="ne-h2 ne-h2--sub">{study.strategy.hmwTitle}</h2>
        <div className="ne-hmws">
          {study.strategy.hmws.map((question, index) => (
            <article className={`ne-hmw ne-hmw--${(index % 4) + 1}`} key={question}>
              <span className="ne-hmw-index">{index + 1}</span>
              <div>
                <p className="ne-hmw-label">How might we</p>
                <hr className="ne-hr" />
                <p className="ne-hmw-text">{question}</p>
              </div>
            </article>
          ))}
        </div>

        <h2 className="ne-h2 ne-h2--sub">{study.strategy.title}</h2>
        <ol className="ne-strategy">
          {study.strategy.items.map((item, index) => (
            <li key={index}><span><Rich text={item} /></span></li>
          ))}
        </ol>
      </section>

      {/* 5.7 Solution 1 ---------- */}
      <section className="ne-sec ne-sec--gray" id="ne-solution1">
        <Pill>Solution 1</Pill>
        <h2 className="ne-question"><em>How might we</em> <strong>{study.solution1.question}</strong></h2>
        <ul className="ne-bullets">
          {study.solution1.bullets.map((item, index) => <li key={index}><Rich text={item} /></li>)}
        </ul>
        <Figure
          src={study.solution1.voice.src}
          alt={study.solution1.voice.alt}
          className="ne-voice"
        />
        <div className="ne-voice-mobile">
          {study.solution1.voiceMobile.map((item) => (
            <Figure src={item.src} alt={item.alt} key={item.alt} />
          ))}
        </div>

        <h2 className="ne-h2 ne-h2--sub"><Rich text={study.solution1.reliabilityTitle} /></h2>
        <ul className="ne-bullets ne-bullets--tight">
          {study.solution1.reliabilityBullets.map((item, index) => <li key={index}><Rich text={item} /></li>)}
        </ul>

        <div className="ne-ai">
          <Figure src={study.solution1.ai.src} alt={study.solution1.ai.alt} />
        </div>

        <div className="ne-locate">
          <Figure src={study.solution1.locate.src} alt={study.solution1.locate.alt} />
        </div>
      </section>

      {/* 5.8 Edge cases ---------- */}
      <section className="ne-sec ne-sec--mint" id="ne-edge">
        <Pill className="ne-pill--lg">{study.edge.pill}</Pill>
        <div className="ne-edges">
          {study.edge.cards.map((card) => (
            <article className={`ne-edge-card ne-edge-card--${card.tone}`} key={card.title}>
              <h3><em>{card.title}</em></h3>
              {card.paragraphs.map((paragraph, index) => <p key={index}><Rich text={paragraph} /></p>)}
              {card.figures.map((figure) => (
                <Figure src={figure.src} alt={figure.alt} key={figure.alt} />
              ))}
              {card.subheading && <h4>{card.subheading}</h4>}
              {card.paragraphsAfter?.map((paragraph, index) => <p key={index}><Rich text={paragraph} /></p>)}
              {card.figuresAfter?.map((figure) => (
                <Figure src={figure.src} alt={figure.alt} key={figure.alt} />
              ))}
            </article>
          ))}
        </div>
      </section>

      {/* 5.9 Solution 2 ---------- */}
      <section className="ne-sec ne-sec--gray" id="ne-solution2">
        <Pill>Solution 2</Pill>
        <h2 className="ne-question"><em>How might we</em> <strong>{study.solution2.question}</strong></h2>
        <ul className="ne-bullets">
          {study.solution2.bullets.map((item, index) => <li key={index}><Rich text={item} /></li>)}
        </ul>
        <Figure
          src={study.solution2.figure.src}
          alt={study.solution2.figure.alt}
          className="ne-bleed"
        />

        <h2 className="ne-gesture-title">{study.solution2.gestureTitle}</h2>
        <div className="ne-gestures">
          {study.solution2.gestures.map((gesture) => (
            <article className="ne-gesture" key={gesture.key}>
              <img src={gesture.image} alt="" loading="lazy" />
              <p>{gesture.text}</p>
            </article>
          ))}
          <article className="ne-gesture ne-gesture--coach">
            <img src={study.solution2.coach.image} alt={study.solution2.coach.alt} loading="lazy" />
            <div>
              <p>{study.solution2.coach.text}</p>
              <p className="ne-credit">{study.solution2.coach.credit}</p>
            </div>
          </article>
        </div>
      </section>

      {/* 5.10 Solution 3 ---------- */}
      <section className="ne-sec ne-sec--gray" id="ne-solution3">
        <Pill>Solution 3</Pill>
        <h2 className="ne-question"><em>How might we</em> <strong>{study.solution3.question}</strong></h2>
        <ul className="ne-bullets">
          {study.solution3.bullets.map((item, index) => <li key={index}><Rich text={item} /></li>)}
        </ul>

        <div className="ne-library">
          <figure className="ne-file-card">
            <img src={study.solution3.showcase.src} alt={study.solution3.showcase.alt} loading="lazy" />
          </figure>
          <div className="ne-library-side">
            <p className="ne-copy">{study.solution3.manageCopy}</p>
            <div className="ne-folders">
              {study.solution3.folders.map((item) => (
                <Figure src={item.src} alt={item.alt} key={item.alt} />
              ))}
            </div>
          </div>
        </div>

        <div className="ne-formation">
          <Figure src={study.solution3.formation.src} alt={study.solution3.formation.alt} />
        </div>

        {study.solution3.features.map((feature) => (
          feature.gesture ? (
            <div className="ne-feature ne-feature--links" key={feature.title}>
              <div className="ne-link-gesture">
                <img src={feature.gesture.image} alt="" loading="lazy" />
                <p>{feature.gesture.text}</p>
              </div>
              <div className="ne-link-body">
                <h3>{feature.title}</h3>
                <p className="ne-copy"><Rich text={feature.copy} /></p>
                <Figure src={feature.figure.src} alt={feature.figure.alt} />
              </div>
            </div>
          ) : (
            <div className="ne-feature" key={feature.title}>
              <h3>{feature.title}</h3>
              <p className="ne-copy"><Rich text={feature.copy} /></p>
              <Figure src={feature.figure.src} alt={feature.figure.alt} />
            </div>
          )
        ))}
      </section>

      {/* 5.11 Solution 4 ---------- */}
      <section className="ne-sec ne-sec--sky" id="ne-solution4">
        <Pill>Solution 4</Pill>
        <h2 className="ne-question"><em>How might we</em> <strong>{study.solution4.question}</strong></h2>
        <p className="ne-copy"><Rich text={study.solution4.copy} /></p>
        {study.solution4.figures.map((figure) => (
          <Figure src={figure.src} alt={figure.alt} className="ne-bleed" key={figure.alt} />
        ))}
      </section>

      {/* 5.12 Design System ---------- */}
      <section className="ne-sec ne-sec--gray" id="ne-system">
        <Pill>Design System</Pill>
        <p className="ne-lede">{study.system.lede}</p>

        <div className="ne-tokens">
          <h2 className="ne-h2 ne-h2--sub">{study.system.tokensTitle}</h2>
          <Figure src={study.system.tokens.src} alt={study.system.tokens.alt} />
        </div>

        <div className="ne-scale ne-scale--first">
          <Figure src={study.system.spacing.src} alt={study.system.spacing.alt} />
        </div>
        <div className="ne-scale ne-scale--radius">
          <Figure src={study.system.radius.src} alt={study.system.radius.alt} />
        </div>

        <div className="ne-icons">
          <Pill>{study.system.iconsTitle}</Pill>
          <p className="ne-copy">{study.system.iconsCopy}</p>
          <Figure src={study.system.icons.src} alt={study.system.icons.alt} />
        </div>

        <div className="ne-empty">
          {study.system.emptyStates.map((state) => (
            <Figure src={state.src} alt={state.alt} key={state.src} />
          ))}
        </div>
      </section>
    </main>
  )
}

/* ---------- 7. 主入口 ---------- */
export default function NoteEditorCaseStudy() {
  const project = getProject(study.slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = study.documentTitle
    return () => { document.title = 'Jessie Guan' }
  }, [])

  return (
    <div className="case note-editor">
      <ReadingProgress />
      <CaseTop title={project ? project.title : 'Case study'} />

      <NoteEditorBody />

      <CaseRail sections={RAILS_NOTE_EDITOR} />
      <ProjectIndex current={study.slug} />
      <Footer />
    </div>
  )
}
