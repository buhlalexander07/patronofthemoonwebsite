import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { site } from './src/content.js'

const root = fileURLToPath(new URL('.', import.meta.url))
const page = (p) => root + p

// '/' locally and for custom domains. '/<repo-name>/' on GitHub project sites
// (the deploy workflow sets this automatically).
const base = process.env.BASE_PATH || '/'

const isPlaceholder = (v) => !v || /^\[.*\]$/.test(String(v).trim())
const SITE_URL = isPlaceholder(site.url) ? '' : String(site.url).replace(/\/+$/, '')
const PAGES = ['', 'about/', 'music/', 'photos/', 'shows/', 'contact/']

// Fills absolute URLs into the HTML and writes sitemap.xml + robots.txt at build time.
function siteFiles() {
  return {
    name: 'patron-site-files',
    transformIndexHtml(html) {
      return SITE_URL
        ? html.replaceAll('__SITE_URL__', SITE_URL)
        : html.replace(/^.*__SITE_URL__.*\r?\n/gm, '') // drop canonical/OG-url tags until site.url is set
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (SITE_URL) {
        const today = new Date().toISOString().slice(0, 10)
        const urls = PAGES.map((p) => `  <url><loc>${SITE_URL}/${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
        robots.push(`Sitemap: ${SITE_URL}/sitemap.xml`)
      } else {
        this.warn('site.url is not set in src/content.js — sitemap.xml and absolute social-preview URLs were skipped.')
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })
    },
  }
}

export default defineConfig({
  base,
  appType: 'mpa',
  plugins: [react(), siteFiles()],
  build: {
    rollupOptions: {
      input: {
        home: page('index.html'),
        about: page('about/index.html'),
        music: page('music/index.html'),
        photos: page('photos/index.html'),
        shows: page('shows/index.html'),
        contact: page('contact/index.html'),
        notfound: page('404.html'),
      },
    },
  },
})