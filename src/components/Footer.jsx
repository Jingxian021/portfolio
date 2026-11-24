import { useLocation, useNavigate } from 'react-router-dom'
import { copy } from '../data/copy'
import { useLang } from '../i18n'

const EMAIL = 'jingxianguan021@gmail.com'

export default function Footer() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goSection = (id) => (e) => {
    e.preventDefault()
    if (pathname === '/') {
      scrollTo(id)
      return
    }
    navigate('/')
    setTimeout(() => scrollTo(id), 200)
  }

  const goTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      /* ignore */
    }
  }

  return (
    <footer className="footer" id="contact">
      <h2 className="footer-cta">
        {t({ en: "Let's make something ", zh: '一起做点什么 ' })}
        <a href={`mailto:${EMAIL}`}>{t({ en: 'together', zh: '吧' })}</a>.
      </h2>

      <div className="footer-grid">
        <div className="footer-col">
          <h4>{t({ en: 'Contact', zh: '联系' })}</h4>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              copyEmail()
            }}
          >
            {t({ en: 'Copy email', zh: '复制邮箱' })}
          </a>
        </div>

        <div className="footer-col">
          <h4>{t(copy.footer.social)}</h4>
          <a href="https://www.instagram.com/deerjessie021/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/jessie-guan-5ab51b247" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>

        <div className="footer-col">
          <h4>{t({ en: 'Navigate', zh: '导航' })}</h4>
          <a href="#home" onClick={goSection('home')}>{t(copy.nav.home)}</a>
          <a href="#projects" onClick={goSection('projects')}>{t(copy.nav.projects)}</a>
          <a href="#posters" onClick={goSection('posters')}>{t(copy.nav.posters)}</a>
          <a href="#about" onClick={goSection('about')}>{t(copy.nav.about)}</a>
        </div>

        <div className="footer-col">
          <h4>{t({ en: 'Status', zh: '状态' })}</h4>
          <span>{t({ en: 'Open to work', zh: '可接受合作' })}</span>
          <span>{t({ en: 'Based in China', zh: '坐标中国' })}</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Jessie Guan · {t(copy.footer.note)}</span>
        <a href="#top" onClick={goTop}>{t(copy.footer.top)} ↑</a>
      </div>
    </footer>
  )
}
