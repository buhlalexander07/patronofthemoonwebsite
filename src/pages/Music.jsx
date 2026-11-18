import Layout from '../components/Layout.jsx'
import Photo from '../components/Photo.jsx'
import Text from '../components/Text.jsx'
import { DRAFT_MODE, release, copy } from '../content.js'
import { isFilled, isReleased, spotifyEmbed, parseDate, dateParts } from '../lib.js'

export default function Music() {
  const visible = isReleased(release) || DRAFT_MODE
  const d = parseDate(release.date)
  const parts = d ? dateParts(d) : null
  const embed = spotifyEmbed(release.spotify)
  const links = (release.links || []).filter((l) => isFilled(l.url) || DRAFT_MODE)
  const tracks = release.tracks.filter((t) => isFilled(t.title) || DRAFT_MODE)
  const credits = release.credits.filter((c) => isFilled(c.name) || DRAFT_MODE)
  const coverAlt = isFilled(release.coverAlt)
    ? release.coverAlt
    : `${isFilled(release.title) ? release.title : 'EP'} cover art`

  return (
    <Layout page="music">
      <div className="page">
        <header className="page-head">
          <p className="kicker">music</p>
          <h1 className="page-title distress">Music</h1>
        </header>

        {!visible ? (
          <p className="empty-note">{copy.musicEmpty}</p>
        ) : (
          <article className="release" aria-labelledby="release-title">
            <div className="release__cover">
              <Photo src={release.cover} alt={coverAlt} ratio="1/1" keepColor label="[ADD EP COVER]" />
            </div>

            <div className="release__body">
              <p className="release__meta">
                {release.type}{parts ? ` · ${parts.day} ${parts.month} ${parts.year}` : ''}
              </p>
              <Text as="h2" id="release-title" className="release__title" value={release.title} />
              {release.about.map((p, i) => (
                <Text key={i} as="p" className="release__about" value={p} />
              ))}

              {embed ? (
                <iframe
                  className="release__player"
                  src={embed}
                  title={`Listen to ${release.title} on Spotify`}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
              ) : DRAFT_MODE ? (
                <p className="ph">{release.spotify}</p>
              ) : null}

            {links.length > 0 && (
            <ul className="release__links">
                {links.map((l) => (
                <li key={l.label}>
                    {isFilled(l.url) ? (
                    <a className="btn" href={l.url} target="_blank" rel="noopener noreferrer">
                        {l.label} <span aria-hidden="true">{'\u2197\uFE0E'}</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    ) : (
                    <span className="ph">{l.label}: {l.url}</span>
                    )}
                </li>
                ))}
            </ul>
            )}

              {tracks.length > 0 && (
                <section className="release__section" aria-labelledby="tracks-title">
                  <h3 id="tracks-title" className="kicker">tracklist</h3>
                  <ol className="tracks">
                    {tracks.map((t, i) => (
                      <li key={i} className="tracks__row">
                        <span className="tracks__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                        <Text className="tracks__title" value={t.title} />
                        <Text className="tracks__len" value={t.length} />
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {credits.length > 0 && (
                <section className="release__section" aria-labelledby="credits-title">
                  <h3 id="credits-title" className="kicker">credits</h3>
                  <dl className="credits">
                    {credits.map((c, i) => (
                      <div key={i} className="credits__row">
                        <dt>{c.role}</dt>
                        <Text as="dd" value={c.name} />
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>
          </article>
        )}
      </div>
    </Layout>
  )
}