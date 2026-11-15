import { DRAFT_MODE, site, socials } from '../content.js'
import { isFilled } from '../lib.js'

export const visibleSocials = () => socials.filter((s) => isFilled(s.url) || (DRAFT_MODE && s.url))

export function SocialLinks({ variant = 'inline', className = '' }) {
  const items = visibleSocials()
  if (!items.length) return null
  return (
    <ul className={`socials socials--${variant} ${className}`.trim()}>
      {items.map((s) => (
        <li key={s.label}>
          {isFilled(s.url) ? (
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="ph">{s.label}: {s.url}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function EmailLink({ className = '' }) {
  if (isFilled(site.email)) {
    return <a className={className || undefined} href={`mailto:${site.email}`}>{site.email}</a>
  }
  return DRAFT_MODE ? <span className={`${className} ph`.trim()}>{site.email}</span> : null
}