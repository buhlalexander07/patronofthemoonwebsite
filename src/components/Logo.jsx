import { useEffect, useRef, useState } from 'react'

/** Patron of the Moon monogram: white disc, blue P · moon · T M, set in Cinzel. */
const BLUE = '#06061E'
const DISC = '#E2E5E9'
const FONT = '700 100px Cinzel'

// Each letter is fitted into its box (in the 200×200 circle) keeping its natural
// proportions, centered across and resting on the bottom edge.
const LETTERS = [
  { ch: 'P', x: 38, y: 39, w: 48, h: 56 },
  { ch: 'T', x: 30, y: 108, w: 53, h: 58 },
  { ch: 'M', x: 86, y: 108, w: 78, h: 58 },
]
const MOON = { cx: 126, cy: 69, r: 33 }

export default function Logo({ className = '', label = 'Patron of the Moon' }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    document.fonts.load(FONT).then(() => {
      if (!alive || !ref.current) return
      const ctx = document.createElement('canvas').getContext('2d')
      ctx.font = FONT
      ref.current.querySelectorAll('text[data-i]').forEach((t) => {
        const b = LETTERS[t.dataset.i]
        const m = ctx.measureText(b.ch)
        const iw = m.actualBoundingBoxLeft + m.actualBoundingBoxRight
        const ih = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
        const s = Math.min(b.h / ih, b.w / iw)
        const tx = b.x + (b.w - iw * s) / 2 + m.actualBoundingBoxLeft * s
        const ty = b.y + b.h - m.actualBoundingBoxDescent * s
        t.setAttribute('transform', `translate(${tx} ${ty}) scale(${s})`)
      })
      setReady(true)
    })
    return () => { alive = false }
  }, [])

  return (
    <svg ref={ref} className={`logo ${className}`.trim()} viewBox="0 0 200 200" role="img" aria-label={label}>
      <circle cx="100" cy="100" r="100" fill={DISC} />
      <circle cx={MOON.cx} cy={MOON.cy} r={MOON.r} fill={BLUE} />
      <g
        fill={BLUE}
        fontFamily="Cinzel, serif"
        fontWeight="700"
        fontSize="100"
        visibility={ready ? 'visible' : 'hidden'}
      >
        {LETTERS.map((l, i) => (
          <text key={l.ch} data-i={i} x="0" y="0">{l.ch}</text>
        ))}
      </g>
    </svg>
  )
}