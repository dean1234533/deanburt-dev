import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, { setGeoModule } from './App.jsx'

async function start() {
  // Area pages are prerendered, so their data must be ready before hydrating to match that HTML.
  if (window.location.pathname.startsWith('/areas')) {
    setGeoModule(await import('./geoPages'))
  }
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

start()
