import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { copy } from '../data/copy'
import { useLang } from '../i18n'

const ITEMS = [
  { id: 'projects', key: 'projects' },
  { id: 'photos', key: 'photos' },
  { id: 'posters', key: 'posters' },
  { id: 'about', key: 'about' }
]

export default function BottomNav({ active: propActive }) {
  const { lang, t } = useLang()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)

  // 路由级高亮：/photos 与 case study 页不依赖首页的滚动监听
  const routeActive =
    pathname === '/photos' ? 'photos' : pathname.startsWith('/projects/') ? 'projects' : null
  const active = routeActive ?? propActive

  // 滚动到 footer 时隐藏底部导航
  useEffect(() => {
    const footer = document.getElementById('contact')
    const nav = navRef.current
    if (!footer || !nav || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nav.classList.add('nav-hidden')
          } else {
            nav.classList.remove('nav-hidden')
          }
        })
      },
      { threshold: 0.85 }
    )
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  // 首页 section 用滚动定位；其余路由先回首页再定位（与 Footer 一致）
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const go = (id) => {
    if (id === 'photos') {
      navigate('/photos')
      return
    }
    if (pathname === '/') {
      scrollTo(id)
      return
    }
    navigate('/')
    setTimeout(() => scrollTo(id), 220)
  }

  const pillClass = (isActive) => `nav-pill${isActive ? ' is-active' : ''}`
  const isHome = active === 'home'

  return (
    <nav ref={navRef} className="nav" aria-label={lang === 'zh' ? '主导航' : 'Main'}>
      <button
        type="button"
        className={`nav-brand${isHome ? ' active' : ''}`}
        aria-current={isHome ? 'true' : undefined}
        onClick={() => go('home')}
      >
        <span className={pillClass(isHome)} aria-hidden="true" />
        <span className="nav-label">{t(copy.nav.home)}</span>
      </button>

      <div className="nav-links">
        {ITEMS.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-item${isActive ? ' active' : ''}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => go(item.id)}
            >
              <span className={pillClass(isActive)} aria-hidden="true" />
              <span className="nav-label">{t(copy.nav[item.key])}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
