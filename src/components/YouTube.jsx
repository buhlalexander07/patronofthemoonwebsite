import { useState } from 'react'

export default function YouTube({ id, title }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="yt">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" className="yt__poster" aria-label={`Play ${title}`} onClick={() => setPlaying(true)}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="yt__play" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}