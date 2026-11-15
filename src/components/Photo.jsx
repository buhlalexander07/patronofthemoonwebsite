import { useState } from 'react'
import { DRAFT_MODE } from '../content.js'
import { isFilled, url } from '../lib.js'

// One look for every photo on the site: 'natural' | 'cold' | 'haze' | 'mono'
const SITE_TREATMENT = 'cold'

/**
 * A photograph with the site's film treatment.
 * Missing or broken images become a quiet frame (or a labelled placeholder in draft mode).
 */
export default function Photo({ src, alt = '', ratio, keepColor = false, className = '', priority = false, label }) {
  const [state, setState] = useState('loading')
  const usable = isFilled(src) && state !== 'error'
  const look = keepColor ? 'natural' : SITE_TREATMENT
  const classes = ['photo', `photo--${look}`, !usable && 'photo--empty', !usable && DRAFT_MODE && 'photo--draft', className]
    .filter(Boolean)
    .join(' ')

  const draftLabel = state === 'error' ? `[FILE NOT FOUND] ${src}` : src || label || '[ADD PHOTO]'

  return (
    <div className={classes} style={ratio ? { aspectRatio: ratio } : undefined}>
      {usable ? (
        <img
          src={url(src)}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          className={state === 'loaded' ? 'is-loaded' : undefined}
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
        />
      ) : (
        <div className="photo__empty" aria-hidden="true">
          {DRAFT_MODE && <span className="photo__label">{draftLabel}</span>}
        </div>
      )}
    </div>
  )
}