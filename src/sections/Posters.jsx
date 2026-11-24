import { Link } from 'react-router-dom'
import { copy } from '../data/copy'
import { posterSeries } from '../data/media'
import { useLang } from '../i18n'

export default function Posters() {
  const { t } = useLang()

  return (
    <section className="section" id="posters">
      <div className="sec-head" data-reveal>
        <h2 className="sec-title">{t(copy.posters.title)}</h2>
        <span className="sec-label">
          {posterSeries.length} {t(copy.posters.series)}
        </span>
      </div>

      <div className="posters-list">
        {posterSeries.map((series) => (
          <article className="posters-item" id={`poster-${series.slug}`} key={series.slug} data-reveal>
            <div className="posters-text-col">
              <span className="posters-year">2025</span>
              <h3 className="posters-title">
                {series.hasPage ? (
                  <Link to={`/posters/${series.slug}`}>{series.title}</Link>
                ) : series.title}
              </h3>
            </div>
            <div className="posters-cover" aria-hidden="true">
              {series.cover ? <img src={series.cover} alt="" loading="lazy" decoding="async" /> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
