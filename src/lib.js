import { DRAFT_MODE } from './content.js'

/** Prefix a site path with the base URL (needed on GitHub Pages project sites). */
export function url(path = '') {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path
  return import.meta.env.BASE_URL + String(path).replace(/^\/+/, '')
}

/** True when a value has real content: not empty, not a [PLACEHOLDER]. */
export function isFilled(value) {
  if (value == null) return false
  if (Array.isArray(value)) return value.some(isFilled)
  const s = String(value).trim()
  return s !== '' && !/^\[[\s\S]*\]$/.test(s)
}

/** Render a field? Real content always; placeholders only in draft mode. */
export function shouldShow(value) {
  return isFilled(value) || (DRAFT_MODE && value != null && String(value).trim() !== '')
}

export function photoAlt(p) {
  return isFilled(p.alt) ? p.alt : 'Photograph — Patron of the Moon'
}

export function parseDate(s) {
  if (!isFilled(s)) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s).trim())
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null
}

export function dateParts(d) {
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    weekday: d.toLocaleString('en-US', { weekday: 'long' }),
    year: d.getFullYear(),
  }
}

/** Split shows into upcoming (soonest first, undated last) and past (latest first). */
export function splitShows(list) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const visible = list
    .filter((s) => DRAFT_MODE || isFilled(s.name) || isFilled(s.date) || isFilled(s.venue))
    .map((s) => ({ ...s, _date: parseDate(s.date) }))
  const time = (s) => (s._date ? s._date.getTime() : Infinity)
  return {
    upcoming: visible.filter((s) => !s._date || s._date >= today).sort((a, b) => time(a) - time(b)),
    past: visible.filter((s) => s._date && s._date < today).sort((a, b) => time(b) - time(a)),
  }
}

/** The release is live once it has a title and its date has arrived. */
export function isReleased(r) {
  if (!r || !isFilled(r.title)) return false
  const d = parseDate(r.date)
  if (!d) return true
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d <= today
}

/** Turn a normal Spotify share link into its embed-player address. */
export function spotifyEmbed(link) {
  if (!isFilled(link)) return null
  const m = /open\.spotify\.com\/(?:intl-[a-z-]+\/)?(album|track|playlist)\/([A-Za-z0-9]+)/.exec(link)
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?theme=0` : null
}

/** Pull the video id out of any YouTube link (watch, youtu.be, shorts, live). */
export function youtubeId(link) {
  if (!isFilled(link)) return null
  const m = /(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/.exec(link)
  return m ? m[1] : null
}