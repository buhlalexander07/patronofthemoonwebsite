/* =========================================================================
   PATRON OF THE MOON — SITE CONTENT
   Everything you'll normally edit lives in this one file.

   • Anything written as [SQUARE BRACKETS] is a placeholder. The site treats
     it as "not filled in yet".
   • Image paths are relative to the /public folder,
     e.g. 'images/photos/portrait-01.jpg' → public/images/photos/portrait-01.jpg
   ========================================================================= */

// DRAFT MODE
// true  → missing content shows as dashed, labelled placeholders so you can
//         see what still needs adding (plus a small banner at the bottom).
// false → missing fields simply disappear. SET TO false BEFORE LAUNCH.
export const DRAFT_MODE = false

export const site = {
  name: 'Patron of the Moon',
  // Full public address, no trailing slash. Used for the sitemap and link previews.
  // e.g. 'https://yourname.github.io/patron-of-the-moon' or 'https://patronofthemoon.com'
  url: 'https://patronofthemoon.com',
  genres: ['Indie Rock, Alternative Rock, Dream Pop'],
  // Band logo. Leave '' to use the typographic wordmark. e.g. 'images/logo/logo.png'
  logo: 'images/logo/logo.png',
  email: 'patronofthemoonband@gmail.com', // [ADD CONTACT EMAIL]
}

// Social links. Only filled-in links appear on the live site.
export const socials = [
  { label: 'Instagram', url: '[ADD INSTAGRAM URL]' },
  { label: 'Facebook', url: '[ADD FACEBOOK URL]' },
  { label: 'TikTok', url: '[ADD TIKTOK URL]' },
  { label: 'YouTube', url: '[ADD YOUTUBE URL]' },
  { label: 'Spotify', url: '[ADD SPOTIFY URL — WHEN AVAILABLE]' },
]

// Small bits of interface copy. Edit freely or set to '' to remove.
export const copy = {
  heroWords: '',
  photosLede: '',
  photosEmpty: 'Photographs are on their way.',
  showsLede: '',
  showsEmpty: 'No dates right now. Check back soon.',
  contactLabel: '',
}

/* ---------------------------------- HOME ---------------------------------- */
/* ---------------------------------- HOME ---------------------------------- */
export const home = {
  // Large opening image. Leave src '' to use the built-in moonlit illustration.
  heroImage: { src: 'images/hero/hero.JPG', alt: '' },
  // The three big links under the hero, in order. photo: any image path in /public.
  signposts: [
    { id: 'about', label: 'About', href: 'about/', photo: 'images/photos/band.JPG' },
    { id: 'shows', label: 'Shows', href: 'shows/', photo: 'images/photos/aesthetic-01.JPG' },
    { id: 'photos', label: 'Photos', href: 'photos/', photo: 'images/photos/group-01.JPG' },
  ],
}
/* ---------------------------------- ABOUT --------------------------------- */
export const about = {
  bio: [
    '[PLACEHOLDER: FINAL BAND BIOGRAPHY — paragraph one]',
    '[PLACEHOLDER: FINAL BAND BIOGRAPHY — paragraph two (optional)]',
  ],
  // Band photo beside the bio. ratio e.g. '4/5', '3/4'; treatment: natural | cold | haze | mono
  photo: { src: 'images/photos/band.JPG', alt: '', ratio: '4/5', treatment: 'cold' },
  influences: ['[ADD INFLUENCE]', '[ADD INFLUENCE]', '[ADD INFLUENCE]'],
}

// Add or remove member blocks freely; the layout adapts.
export const members = [
  {
    name: 'Alexander Buhl',
    instrument: 'Vocals, Rhythm Guitar, Bass',
    description: '[ADD SHORT PERSONAL DESCRIPTION]',
    photo: { src: 'images/members/member-01.JPG', alt: '' },
  },
  {
    name: 'Joseph Meyerhofer',
    instrument: 'Lead Guitar',
    description: '[ADD SHORT PERSONAL DESCRIPTION]',
    photo: { src: 'images/members/member-02.JPG', alt: '' },
  },
  {
    name: 'Aaron Meyerhofer',
    instrument: 'Bass, Rhythm Guitar',
    description: '[ADD SHORT PERSONAL DESCRIPTION]',
    photo: { src: 'images/members/member-03.JPG', alt: '' },
  },
  {
    name: 'Owen Korb',
    instrument: 'Drums',
    description: '[ADD SHORT PERSONAL DESCRIPTION]',
    photo: { src: 'images/members/member-04.JPG', alt: '' },
  },
]

/* --------------------------------- PHOTOS --------------------------------- */
// The tags shown at the top of the Photos page, in this order.
// Tags with no photos are hidden.
export const photoCategories = [
  { id: 'live', title: 'Live' },
  { id: 'rehearsal', title: 'Rehearsal' },
  { id: 'portraits', title: 'Portraits' },
  { id: 'other', title: 'Aesthetic' },
]

// Every photo on the Photos page, in the order shown.
// The mosaic makes positions 1, 9 wide, 4, 12 tall and 6, 14 large,
// so the order below puts group shots wide, portraits tall and aesthetic shots large.
export const photos = [
  { id: 'group-01', category: 'portraits', src: 'images/photos/group-01.JPG', alt: '', caption: '' },
  { id: 'aesthetic-01', category: 'other', src: 'images/photos/aesthetic-01.JPG', alt: '', caption: '' },
  { id: 'portrait-01', category: 'portraits', src: 'images/photos/portrait-01.JPG', alt: '', caption: '' ,feature: false },
  { id: 'aesthetic-02', category: 'other', src: 'images/photos/aesthetic-02.JPG', alt: '', caption: '' },
  { id: 'group-02', category: 'portraits', src: 'images/photos/group-02.JPG', alt: '', caption: '' },
  { id: 'portrait-02', category: 'portraits', src: 'images/photos/portrait-02.JPG', alt: '', caption: '' ,feature: false },
  { id: 'aesthetic-03', category: 'other', src: 'images/photos/aesthetic-03.JPG', alt: '', caption: '' },
  { id: 'portrait-03', category: 'portraits', src: 'images/photos/portrait-03.JPG', alt: '', caption: '' ,feature: false },
  { id: 'aesthetic-04', category: 'other', src: 'images/photos/aesthetic-04.JPG', alt: '', caption: '' },
  { id: 'group-03', category: 'portraits', src: 'images/photos/group-03.JPG', alt: '', caption: '' },
  { id: 'portrait-04', category: 'portraits', src: 'images/photos/portrait-04.JPG', alt: '', caption: '' ,feature: false },
  { id: 'aesthetic-05', category: 'other', src: 'images/photos/aesthetic-05.JPG', alt: '', caption: '' },
  { id: 'group-04', category: 'portraits', src: 'images/photos/group-04.JPG', alt: '', caption: '' },
  { id: 'aesthetic-06', category: 'other', src: 'images/photos/aesthetic-06.JPG', alt: '', caption: '' },

  // Slots for upcoming photos (hidden on the live site until filled in)
  { id: 'rehearsal-01', category: 'rehearsal', src: '[ADD PHOTO — images/photos/rehearsal-01.JPG]', alt: '', caption: '' },
  { id: 'live-01', category: 'live', src: '[ADD PHOTO — images/photos/live-01.JPG]', alt: '', caption: '' },
  { id: 'rehearsal-02', category: 'rehearsal', src: '[ADD PHOTO — images/photos/rehearsal-02.JPG]', alt: '', caption: '' },
  { id: 'live-02', category: 'live', src: '[ADD PHOTO — images/photos/live-02.JPG]', alt: '', caption: '' },
]

/* ---------------------------------- SHOWS --------------------------------- */
// Copy a block to add a show. Past dates move to "Past" automatically.
// Unfilled fields are hidden on the live site.
export const shows = [
  {
    id: 'first-show', // unique, no spaces
    tag: 'First show', // small label, or ''
    name: '[ADD EVENT NAME]',
    date: '[ADD SHOW DATE]', // format: 'YYYY-MM-DD', e.g. '2026-12-12'
    time: '[ADD DOORS / SET TIME]', // e.g. 'Doors 8pm'
    venue: '[ADD VENUE NAME]',
    location: '[ADD CITY, REGION]',
    support: ['[ADD SUPPORTING BAND]'], // list of other bands on the bill
    tickets: '[ADD TICKET INFO]', // e.g. '$10 advance / $12 door'
    ticketUrl: '[ADD TICKET URL]',
    artwork: { src: '[ADD VENUE ARTWORK — images/shows/first-show.jpg]', alt: '', ratio: '4/5' },
    details: '[ADD DETAILS — age restrictions, accessibility, etc.]',
  },
]