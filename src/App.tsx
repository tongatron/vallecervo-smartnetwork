import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Why from './components/Why'
import Architecture from './components/Architecture'
import Meshtastic from './components/Meshtastic'
import MapSection from './components/Map3D/MapSection'
import Phases from './components/Phases'
import Costs from './components/Costs'
import Applications from './components/Applications'
import Governance from './components/Governance'
import Footer from './components/Footer'

export default function App() {
  // Stato condiviso: fase attiva evidenziata sulla mappa.
  const [activePhase, setActivePhase] = useState<number | null>(null)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Why />
        <Architecture />
        <Meshtastic />
        <MapSection activePhase={activePhase} setActivePhase={setActivePhase} />
        <Phases activePhase={activePhase} setActivePhase={setActivePhase} />
        <Costs />
        <Applications />
        <Governance />
      </main>
      <Footer />
    </>
  )
}
