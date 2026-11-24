import { copy } from '../data/copy'
import { useLang } from '../i18n'
import FluidMask from '../components/FluidMask'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="section hero" id="home">
      <FluidMask
        name={copy.hero.name}
        text={t(copy.hero.lede)}
        lines={t(copy.hero.lines)}
      />

      <div className="hero-inner">
        {/* 大字已画入 canvas base 层以参与涟漪折射；DOM 仅占位保布局 */}
        <h1 className="hero-title" aria-hidden="true" style={{ visibility: 'hidden' }}>
          {t(copy.hero.lines).map((line) => (
            <span className="line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
      </div>

      <div className="scroll-mark">
        <i aria-hidden="true" />
        <span>{t(copy.hero.scroll)}</span>
      </div>
    </section>
  )
}
