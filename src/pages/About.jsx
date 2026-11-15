import Layout from '../components/Layout.jsx'
import Photo from '../components/Photo.jsx'
import Text from '../components/Text.jsx'
import { DRAFT_MODE, about, members } from '../content.js'
import { isFilled } from '../lib.js'

const RATIO = '4/5'
const TREATMENTS = ['cold', 'natural', 'mono', 'haze']

export default function About() {
  const crew = members.filter((m) => isFilled(m.name) || DRAFT_MODE)

  return (
    <Layout page="about">
      <div className="page">
        <header className="page-head">
          <p className="kicker">about</p>
          <h1 className="page-title distress">Patron <em>of the</em> Moon</h1>
        </header>

        <section className="bio" aria-label="Biography">
          <div className="bio__text">
            {about.bio.map((p, i) => <Text key={i} as="p" value={p} />)}
          </div>
          {(isFilled(about.photo?.src) || DRAFT_MODE) && (
            <figure className="bio__photo">
              <Photo
                src={about.photo?.src}
                alt={isFilled(about.photo?.alt) ? about.photo.alt : 'Patron of the Moon'}
                ratio={about.photo?.ratio || '4/5'}
                treatment={about.photo?.treatment || 'cold'}
                label="[ADD BAND PHOTO]"
              />
            </figure>
          )}
        </section>

        {crew.length > 0 && (
          <section className="members" aria-labelledby="members-title">
            <h2 id="members-title" className="section-title">The members</h2>
            <ol className="members__grid">
              {crew.map((m, i) => {
                const alt = isFilled(m.photo?.alt)
                  ? m.photo.alt
                  : isFilled(m.name)
                    ? `${m.name}${isFilled(m.instrument) ? `, ${m.instrument}` : ''}`
                    : 'Band member portrait'
                return (
                  <li key={i} className={`member member--${(i % 4) + 1}`}>
                    <div className="member__frame">
                      <Photo
                        src={m.photo?.src}
                        alt={alt}
                        ratio={RATIO}
                        treatment={m.photo?.treatment || TREATMENTS[i % 4]}
                        label="[ADD MEMBER PHOTO]"
                      />
                    </div>
                    <div className="member__caption">
                      <span className="member__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <Text as="h3" className="member__name" value={m.name} />
                      <Text as="p" className="member__inst" value={m.instrument} />
                      <Text as="p" className="member__desc" value={m.description} />
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        )}
      </div>
    </Layout>
  )
}