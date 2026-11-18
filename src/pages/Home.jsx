import Layout from '../components/Layout.jsx'
import Photo from '../components/Photo.jsx'
import MoonField from '../components/MoonField.jsx'
import { DRAFT_MODE, site, home, shows, copy, release } from '../content.js'
import { isFilled, url, splitShows, dateParts, isReleased } from '../lib.js'

export default function Home() {
  const hasHero = isFilled(home.heroImage.src)

  const next = splitShows(shows).upcoming[0]
  const nextParts = next && next._date ? dateParts(next._date) : null
  const showsNote = nextParts
    ? `Next: ${nextParts.day} ${nextParts.month}${isFilled(next.venue) ? ` · ${next.venue}` : ''}`
    : null

  return (
    <Layout page="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__visual">
          {hasHero ? (
            <Photo src={home.heroImage.src} alt={home.heroImage.alt || ''} className="hero__photo" priority />
          ) : (
            <MoonField />
          )}
        </div>

        <div className="hero__inner">
          {isFilled(site.logo) && <img className="hero__logo" src={url(site.logo)} alt="" />}
          <h1 id="hero-title" className="hero__title distress">
            <span className="hero__line hero__line--a">Patron</span>{' '}
            <span className="hero__line hero__line--b">of the</span>{' '}
            <span className="hero__line hero__line--c">Moon</span>
          </h1>
        </div>

        {isFilled(copy.heroWords) && <p className="hero__aside" aria-hidden="true">{copy.heroWords}</p>}
      </section>

      <nav className="signposts" aria-label="Explore the site">
        {home.signposts
          .filter((s) => s.id !== 'music' || isReleased(release) || DRAFT_MODE)
          .map((s) => {
          const note = s.id === 'shows' ? showsNote : null
          return (
            <a key={s.id} className="signpost" href={url(s.href)}>
              <Photo src={s.photo} alt="" className="signpost__photo" />
              <span className="signpost__text">
                <span className="signpost__label">{s.label}</span>
                {note && <span className="signpost__note">{note}</span>}
              </span>
            </a>
          )
        })}
      </nav>
    </Layout>
  )
}