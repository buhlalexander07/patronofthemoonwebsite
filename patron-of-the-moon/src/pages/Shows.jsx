import Layout from '../components/Layout.jsx'
import ShowCard from '../components/ShowCard.jsx'
import Text from '../components/Text.jsx'
import { shows, copy } from '../content.js'
import { isFilled, splitShows, dateParts } from '../lib.js'

export default function Shows() {
  const { upcoming, past } = splitShows(shows)

  return (
    <Layout page="shows">
      <div className="page">
        <header className="page-head">
          <p className="kicker">live</p>
          <h1 className="page-title distress">Shows</h1>
          <Text as="p" className="page-lede" value={copy.showsLede} />
        </header>

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