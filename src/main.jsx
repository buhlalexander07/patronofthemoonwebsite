import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Photos from './pages/Photos.jsx'
import Shows from './pages/Shows.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

const pages = { home: Home, about: About, photos: Photos, shows: Shows, contact: Contact, notfound: NotFound }
const Page = pages[document.body.dataset.page] || NotFound

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>
)