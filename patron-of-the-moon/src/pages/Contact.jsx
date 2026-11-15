import Layout from '../components/Layout.jsx'
import Text from '../components/Text.jsx'
import Logo from '../components/Logo.jsx'
import { SocialLinks, EmailLink, visibleSocials } from '../components/Links.jsx'
import { copy } from '../content.js'

export default function Contact() {
  return (
    <Layout page="contact">
      <div className="page">
        <header className="page-head">
          <p className="kicker">contact</p>
          <h1 className="page-title distress">Write to us</h1>
        </header>

        <div className="contact">
        <section className="contact__mail" aria-label="Email">
          <Text as="p" className="contact__label" value={copy.contactLabel} />
          <div className="contact__stack">
            <EmailLink className="contact__email" />
            <Logo className="contact__logo" />
          </div>
        </section>

          {visibleSocials().length > 0 && (
            <section className="contact__social" aria-labelledby="social-title">
              <h2 id="social-title" className="kicker">elsewhere</h2>
              <SocialLinks variant="list" />
            </section>
          )}
        </div>
      </div>
    </Layout>
  )
}