import Layout from '../components/Layout.jsx'
import { url } from '../lib.js'

export default function NotFound() {
  return (
    <Layout page="notfound">
      <div className="lost">
        <p className="kicker">404</p>
        <h1 className="lost__title distress">Lost in the snow</h1>
        <p>This page isn't here. Maybe it never was.</p>
        <a className="more" href={url('')}>Back to the start <span aria-hidden="true">→</span></a>
      </div>
    </Layout>
  )
}