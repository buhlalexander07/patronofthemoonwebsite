import { useState } from 'react'
import Layout from '../components/Layout.jsx'
import Photo from '../components/Photo.jsx'
import Text from '../components/Text.jsx'
import { DRAFT_MODE, photos, photoCategories, copy } from '../content.js'
import { isFilled, photoAlt } from '../lib.js'

export default function Photos() {
  const [filter, setFilter] = useState('all')

  const all = photos.filter((p) => isFilled(p.src) || DRAFT_MODE)
  const tags = photoCategories.filter((c) => all.some((p) => p.category === c.id))
  const shown = filter === 'all' ? all : all.filter((p) => p.category === filter)

  // Every 8 photos get one wide and one large spot. A photo marked
  // feature: false passes its spot on to the next photo that can take it.
  let pending = null
  const tiles = shown.map((p, i) => {
    if (i % 8 === 0) pending = 'wide'
    if (i % 8 === 5) pending = 'large'
    let size = 'standard'
    if (pending && p.feature !== false) {
      size = pending
      pending = null
    }
    return { ...p, size }
  })

  return (
    <Layout page="photos">
      <div className="page">
        <header className="page-head">
          <p className="kicker">archive</p>
          <h1 className="page-title distress">Photographs</h1>
          <Text as="p" className="page-lede" value={copy.photosLede} />
        </header>

        {all.length === 0 ? (
          <p className="empty-note">{copy.photosEmpty}</p>
        ) : (
          <>
            {tags.length > 1 && (
              <nav aria-label="Filter photographs">
                <ul className="tags">
                  {[{ id: 'all', title: 'All' }, ...tags].map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        className="tags__btn"
                        aria-pressed={filter === t.id}
                        onClick={() => setFilter(t.id)}
                      >
                        {t.id}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="pgrid">
              {tiles.map((p) => (
                <figure key={p.id} className={`pgrid__item pgrid__item--${p.size}`}>
                  <Photo src={p.src} alt={photoAlt(p)} />
                  {isFilled(p.caption) && <figcaption>{p.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}