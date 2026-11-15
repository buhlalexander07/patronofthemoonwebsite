# Patron of the Moon — website

Static multi-page site (React + Vite) for GitHub Pages. No backend, no CMS:
all content lives in `src/content.js`.

## Run it locally
1. Install Node.js 20+.
2. `npm install`
3. `npm run dev` → open the address it prints.
4. `npm run build` then `npm run preview` to check the production build.

## Before launch — checklist
- [ ] Fill in `src/content.js` (bio, members, shows, email, socials).
- [ ] Add photos to `public/images/...` and point to them in `content.js`.
- [ ] Set `site.url` (needed for the sitemap and link previews).
- [ ] Add `public/og-image.jpg` (1200×630) for social link previews.
- [ ] Replace `public/favicon.svg` with the band logo (optional).
- [ ] Set `DRAFT_MODE = false` in `src/content.js`.

## Draft mode
While `DRAFT_MODE` is `true`, missing content appears as dashed placeholders,
with a small banner at the bottom of every page. When `false`, unfilled fields
are hidden and missing photos become quiet blank frames.

## Replacing photographs
1. Export JPGs or WebPs at most ~2000px on the long edge, ideally under ~400KB.
   squoosh.app is a free tool for this.
2. Put them in `public/images/photos/` (members: `public/images/members/`,
   show posters: `public/images/shows/`, hero: `public/images/hero/`,
   logo: `public/images/logo/`).
3. In `src/content.js`, set `src` to the path *without* `public/`, e.g.
   `src: 'images/photos/portrait-01.jpg'`, and write a short `alt` description.
4. Per photo, choose `size` (small/medium/large/wide), `ratio` (e.g. '3/4'),
   and `treatment` (natural/cold/haze/mono). Mix treatments.
5. To add a photo, copy a line in `photos` and give it a new unique `id`.
   Homepage photos are chosen by id in `home.selected` and `home.galleryPreview`.
6. A file that can't be found shows "[FILE NOT FOUND]" in draft mode. Check
   spelling and capitalisation.

## Editing shows
In `shows`, edit the block or copy it to add another. Use dates in the format
`'YYYY-MM-DD'`. Shows move to "Past" automatically the day after. Leave any
unknown field as its `[PLACEHOLDER]`; it is hidden on the live site. With no
venue artwork, the live site shows a typographic poster instead.

## Social links & email
Edit `socials` and `site.email`. Paste full URLs (`https://...`). Unfilled
links don't appear. To add a platform, add a `{ label, url }` line.

## Biography & members
`about.bio` holds one string per paragraph. `about.influences` is a list.
In `members`, add or remove blocks freely; the collage adapts.

## Video (optional)
Put an `.mp4` in `public/images/video/` and set `home.video.src`. It never
autoplays and starts muted.

## Deploying to GitHub Pages
1. Create a GitHub repository and push this project to the `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source:
   GitHub Actions.**
3. Every push to `main` builds and deploys automatically (see the Actions
   tab). The site appears at `https://USERNAME.github.io/REPO-NAME/`.
4. Set `site.url` in `content.js` to that address and push again.

**Custom domain:** in `.github/workflows/deploy.yml` change `BASE_PATH` to
`/`, add a file `public/CNAME` containing just the domain, configure DNS as
GitHub describes, and set `site.url` to the domain. Note: `robots.txt` is only
read by search engines at a domain root, so it only takes effect on a custom
domain or a `USERNAME.github.io` repository.

## Updating
Edit files → commit → push to `main`. It's live after the Action finishes
(~1–2 min).

## Adding things later
- **A new page** (e.g. Music, News): copy `about/index.html` to a new folder,
  change its title/description and `data-page`. Create `src/pages/Music.jsx`,
  register it in `src/main.jsx`, add it to `NAV` in
  `src/components/Layout.jsx`, add the HTML to `rollupOptions.input` in
  `vite.config.js`, and add the path to `PAGES` there for the sitemap.
- **Embedded audio / releases:** add a list to `content.js` and a section
  component, the same way shows work.

## Fonts
Loaded from Google Fonts: Antonio (condensed headings), IM Fell English
(worn serif), Special Elite (typewriter labels), Karla (body). To self-host
for speed or privacy, download them into `public/fonts/` and swap the
`<link>` tags for `@font-face` rules.

## Structure
```
index.html, about/, photos/, shows/, contact/, 404.html   page shells + SEO tags
src/content.js        ← all editable content
src/lib.js            helpers (paths, placeholders, dates)
src/main.jsx          picks the page to render
src/components/       Layout, Photo, Text, Links, MoonField, ShowCard
src/pages/            Home, About, Photos, Shows, Contact, NotFound
src/styles/main.css   the whole visual system (tokens at the top)
public/               favicon, images, og-image
.github/workflows/    automatic GitHub Pages deployment
```