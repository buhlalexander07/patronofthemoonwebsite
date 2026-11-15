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