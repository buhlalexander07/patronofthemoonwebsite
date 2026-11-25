import { DRAFT_MODE, site, release } from '../content.js'
import { isFilled, isReleased, url } from '../lib.js'
import { SocialLinks, EmailLink } from './Links.jsx'


const NAV = [
  { id: 'about', label: 'About', href: 'about/' },
  { id: 'music', label: 'Music', href: 'music/' },
  { id: 'shows', label: 'Shows', href: 'shows/' },
  { id: 'photos', label: 'Photos', href: 'photos/' },
  { id: 'contact', label: 'Contact', href: 'contact/' },
]

export default function Layout({ page, children }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      {/* Static "ink bleed" filter used by the large display type */}
      <svg className="defs" aria-hidden="true" focusable="false">
        <filter id="pom-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
        <filter id="pom-split" colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.02 0.24 0.62 1" />
            <feFuncG type="table" tableValues="0.03 0.27 0.6 0.95" />
            <feFuncB type="table" tableValues="0.18 0.46 0.68 0.86" />
          </feComponentTransfer>
        </filter>
      </svg>

      <header className={`masthead${page === 'home' ? ' masthead--overlay' : ''}`}>
      <a className="masthead__mark" href={url('')} aria-label="Patron of the Moon — home">
        <span>Patron</span>
        <em>of the</em>
        <span>Moon</span>
      </a>
        <nav aria-label="Main">
          <ul className="nav">
            {NAV.filter((item) => item.id !== 'music' || isReleased(release) || DRAFT_MODE).map((item, i) => (
              <li key={item.id}>
                {i > 0 && <span className="nav__sep" aria-hidden="true">/</span>}
                <a href={url(item.href)} aria-current={page === item.id ? 'page' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>{children}</main>

      <footer className="footer">
        <p className="footer__name">Patron <em>of the</em> Moon</p>
        <SocialLinks />
        <p className="footer__meta">
          <EmailLink className="footer__email" />
          <span className="footer__copy">© {new Date().getFullYear()} Patron of the Moon</span>
        </p>
      </footer>

      {DRAFT_MODE && (
        <p className="draft-banner">Draft mode: placeholders visible. Set DRAFT_MODE to false in src/content.js before launch.</p>
      )}
    </>
  )
}