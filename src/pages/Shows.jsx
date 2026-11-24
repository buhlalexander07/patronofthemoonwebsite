import Layout from '../components/Layout.jsx'
import ShowCard from '../components/ShowCard.jsx'
import Text from '../components/Text.jsx'
import YouTube from '../components/YouTube.jsx'
import { shows, showsVideo, copy } from '../content.js'
import { isFilled, splitShows, dateParts, parseDate, youtubeId } from '../lib.js'

export default function Shows() {
  const { upcoming, past } = splitShows(shows)

  const videoId = youtubeId(showsVideo?.youtube)
  const vd = parseDate(showsVideo?.date)
  const vp = vd ? dateParts(vd) : null
  const videoWhere = [
    isFilled(showsVideo?.venue) ? `Rehearsal at ${showsVideo.venue}` : null,
    vp ? `${vp.month} ${vp.year}` : null,
  ].filter(Boolean).join(' · ')

  return (
    <Layout page="shows">
      <div className="page">
        <header className="page-head">
          <p className="kicker">live</p>
          <h1 className="page-title distress">Shows</h1>
          <Text as="p" className="page-lede" value={copy.showsLede} />
        </header>

        {videoId && (
          <figure className="shows-video">
            <YouTube
              id={videoId}
              title={isFilled(showsVideo.title) ? `${showsVideo.title}, live` : 'Live video'}
            />
            <figcaption className="live__caption">
              <Text className="live__title" value={showsVideo.title} />
              {videoWhere && <span className="live__where">{videoWhere}</span>}
            </figcaption>
          </figure>
        )}

        {upcoming.length > 0 ? (
          <div className="shows-list">
            {upcoming.map((s) => <ShowCard key={s.id} show={s} />)}
          </div>
        ) : (
          <p className="empty-note">{copy.showsEmpty}</p>
        )}

        {past.length > 0 && (
          <section className="past" aria-labelledby="past-title">
            <h2 id="past-title" className="section-title">Past</h2>
            <ul className="past__list">
              {past.map((s) => {
                const d = dateParts(s._date)
                return (
                  <li key={s.id}>
                    <time dateTime={s.date}>{d.day} {d.month} {d.year}</time>
                    <span>{[s.venue, s.location].filter(isFilled).join(', ') || s.name}</span>
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </div>
    </Layout>
  )
}