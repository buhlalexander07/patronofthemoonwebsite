import Photo from './Photo.jsx'
import Text from './Text.jsx'
import { DRAFT_MODE, site } from '../content.js'
import { isFilled, shouldShow, dateParts } from '../lib.js'

function Row({ label, value }) {
  if (!shouldShow(value)) return null
  return (
    <div className="show__row">
      <dt>{label}</dt>
      <Text as="dd" value={value} />
    </div>
  )
}

/** Typographic stand-in poster used on the live site when no venue artwork exists. */
function TypePoster({ show, parts }) {
  return (
    <div className="type-poster" aria-hidden="true">
      <span className="type-poster__moon" />
      <p className="type-poster__name">Patron<em>of the</em>Moon</p>
      <p className="type-poster__foot">
        <span>{parts ? `${parts.day} ${parts.month}` : 'soon'}</span>
        <span>{isFilled(show.venue) ? show.venue : 'live'}</span>
      </p>
    </div>
  )
}

export default function ShowCard({ show }) {
  const parts = show._date ? dateParts(show._date) : null
  const nameFilled = isFilled(show.name)
  const title = nameFilled || DRAFT_MODE ? show.name || '[ADD EVENT NAME]' : `${site.name}, live`
  const supportText = (show.support || []).filter(shouldShow).join(' · ')
  const art = show.artwork || {}

  return (
    <article className="show" aria-labelledby={`show-${show.id}`}>
      <div className="show__visual">
        {isFilled(art.src) || DRAFT_MODE ? (
          <Photo
            src={art.src}
            alt={isFilled(art.alt) ? art.alt : `Poster for ${nameFilled ? show.name : 'the show'}`}
            ratio={art.ratio || '4/5'}
            label="[ADD VENUE ARTWORK]"
          />
        ) : (
          <TypePoster show={show} parts={parts} />
        )}
      </div>

      <div className="show__body">
        {isFilled(show.tag) && <p className="show__tag">{show.tag}</p>}

        <div className="show__date">
          {parts ? (
            <time dateTime={String(show.date).trim()}>
              <span className="show__day">{parts.day}</span>
              <span className="show__month">{parts.month} {parts.year}</span>
              <span className="show__weekday">{parts.weekday}</span>
            </time>
          ) : DRAFT_MODE ? (
            <span className="ph">{show.date || '[ADD SHOW DATE]'}</span>
          ) : (
            <span className="show__tba">Date to be announced</span>
          )}
        </div>

        <h2 id={`show-${show.id}`} className={`show__title${!nameFilled && DRAFT_MODE ? ' ph' : ''}`}>{title}</h2>

        <dl className="show__meta">
          <Row label="venue" value={show.venue} />
          <Row label="where" value={show.location} />
          <Row label="time" value={show.time} />
          {supportText && <Row label="with" value={supportText} />}
          <Row label="tickets" value={show.tickets} />
        </dl>

        <Text as="p" className="show__details" value={show.details} />

        {isFilled(show.ticketUrl) ? (
          <a className="btn" href={show.ticketUrl} target="_blank" rel="noopener noreferrer">
            Tickets <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : DRAFT_MODE && show.ticketUrl ? (
          <p className="ph">{show.ticketUrl}</p>
        ) : null}
      </div>
    </article>
  )
}