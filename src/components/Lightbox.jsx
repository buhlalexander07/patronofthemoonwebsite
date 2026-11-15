import { useEffect, useRef } from 'react'
import { url, photoAlt, isFilled } from '../lib.js'
import { SITE_TREATMENT } from './Photo.jsx'

/** Full-screen photo viewer with previous/next, keyboard and swipe. */
export default function Lightbox({ items, index, onChange, onClose }) {
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const count = items.length
  const p = items[index]

  const prev = () => onChange((index - 1 + count) % count)
  const next = () => onChange((index + 1) % count)

  // Lock page scrolling and focus the close button while open
  useEffect(() => {
    const before = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.body.style.overflow = before }
  }, [])

  // Keyboard: Esc closes, arrows move
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index])

  // Swipe on phones
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)()
  }

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <div className={`lightbox__frame photo--${SITE_TREATMENT}`}>
          <img key={p.id} className="lightbox__img" src={url(p.src)} alt={photoAlt(p)} />
        </div>
        {isFilled(p.caption) && <figcaption className="lightbox__caption">{p.caption}</figcaption>}
      </figure>

      {count > 1 && (
        <>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            ←
          </button>
          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            →
          </button>
        </>
      )}

      <button ref={closeRef} type="button" className="lightbox__close" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <p className="lightbox__count" aria-live="polite">{index + 1} / {count}</p>
    </div>
  )
}