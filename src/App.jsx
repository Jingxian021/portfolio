import { useEffect, useLayoutEffect, useState } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { LangProvider } from './i18n'
import { useReveal } from './hooks/useReveal'
import BottomNav from './components/BottomNav'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import RobotCaseStudy from './components/RobotCaseStudy'
import NutriCaseStudy from './components/NutriCaseStudy'
import HiveeCaseStudy from './components/HiveeCaseStudy'
import DeliveryCaseStudy from './components/DeliveryCaseStudy'
import NoteEditorCaseStudy from './components/NoteEditorCaseStudy'
import SonimodCaseStudy from './components/SonimodCaseStudy'
import PosterPage from './components/PosterPage'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Posters from './sections/Posters'
import About from './sections/About'
import Photos from './sections/Photos'
import { ReadingProgress, CaseTop, ProjectIndex, Pending } from './components/CaseStudy'
import { getProject } from './data/projects'

const IDS = ['home', 'projects', 'posters', 'about']

/* slug → 独立 case study 页面组件 */
const CASE_PAGES = {
  'robot-manipulator': RobotCaseStudy,
  'nutri-notebook': NutriCaseStudy,
  'hivee': HiveeCaseStudy,
  'robot-delivery': DeliveryCaseStudy,
  'note-editor': NoteEditorCaseStudy,
  'sonimod': SonimodCaseStudy
}

function Home() {
  const [active, setActive] = useState('home')
  const { state } = useLocation()

  useLayoutEffect(() => {
    const target = state?.scrollTo
    if (!target) {
      window.scrollTo(0, 0)
      return
    }

    document.getElementById(target)?.scrollIntoView({ block: 'center' })
  }, [state])

  useEffect(() => {
    const elements = IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px' }
    )

    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useReveal('v3')

  return (
    <>
      <main className="page">
        <Hero />
        <Projects />
        <Posters />
        <About />
        <Footer />
      </main>

      <BottomNav active={active} />
    </>
  )
}

/* ---------- Case study 路由分发 ---------- */
function CaseStudyRouter() {
  const { slug } = useParams()
  const Page = CASE_PAGES[slug]

  if (Page) return <Page />

  const project = getProject(slug)
  return (
    <div className="case">
      <ReadingProgress />
      <CaseTop title={project ? project.title : 'Case study'} />
      <Pending project={project} />
      <ProjectIndex current={slug} />
      <Footer />
    </div>
  )
}

/* 支持直接访问 /projects/sonimod 这类 path 链接：自动转换为 hash 路由 */
if (typeof window !== 'undefined' && window.location.pathname !== '/') {
  const path = window.location.pathname + window.location.search
  window.history.replaceState(null, '', `/#${path}`)
}

export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/posters/:slug" element={<PosterPage />} />
          <Route path="/projects/:slug" element={<CaseStudyRouter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <PageLoader />
      </HashRouter>
    </LangProvider>
  )
}
