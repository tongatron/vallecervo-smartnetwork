import { Suspense, lazy, useState } from 'react'
import { Map as MapIcon, X, Eye, EyeOff } from 'lucide-react'
import { useWebGL } from '../../hooks/useWebGL'
import { gateways } from '../../data/gateways'
import { sensors, categoryMeta } from '../../data/sensors'
import type { SensorCategory } from '../../data/sensors'
import { phases } from '../../data/phases'
import type { Selection } from './Scene'
import Fallback from './Fallback'

const Scene = lazy(() => import('./Scene'))

const allCategories = Object.keys(categoryMeta) as SensorCategory[]

interface Props {
  activePhase: number | null
  setActivePhase: (p: number | null) => void
}

export default function MapSection({ activePhase, setActivePhase }: Props) {
  const webgl = useWebGL()
  const [showCoverage, setShowCoverage] = useState(true)
  const [activeCategories, setActiveCategories] = useState<Set<SensorCategory>>(new Set(allCategories))
  const [selection, setSelection] = useState<Selection | null>(null)

  const toggleCat = (c: SensorCategory) => {
    const next = new Set(activeCategories)
    next.has(c) ? next.delete(c) : next.add(c)
    setActiveCategories(next)
  }

  const selGw = selection?.kind === 'gateway' ? gateways.find((g) => g.id === selection.id) : null
  const selSensor = selection?.kind === 'sensor' ? sensors.find((s) => s.id === selection.id) : null
  const selSensorGw = selSensor ? gateways.find((g) => g.id === selSensor.gateway) : null

  return (
    <section id="mappa">
      <div className="container">
        <span className="eyebrow"><MapIcon size={14} /> Mappa interattiva</span>
        <h2 className="section-title">Una prima configurazione della rete</h2>
        <p className="section-intro">
          Terreno ricostruito da dati di <strong>elevazione reali</strong> (DEM) della Valle Cervo. Gateway e
          sensori sono posizionati alle coordinate dei siti candidati. Ruota, zooma e clicca un nodo per i
          dettagli; i raggi di copertura sono stime indicative.
        </p>

        {/* Controlli */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '24px 0 16px', alignItems: 'center' }}>
          <button className="pill" onClick={() => setShowCoverage((v) => !v)}
            style={{ cursor: 'pointer', color: 'var(--text)', borderColor: showCoverage ? 'var(--azzurro)' : 'var(--line)' }}>
            {showCoverage ? <Eye size={14} /> : <EyeOff size={14} />} Copertura
          </button>
          <span style={{ width: 1, height: 22, background: 'var(--line)' }} />
          {phases.map((p) => (
            <button key={p.n} className="pill"
              onClick={() => setActivePhase(activePhase === p.n ? null : p.n)}
              style={{ cursor: 'pointer', color: 'var(--text)', borderColor: activePhase === p.n ? 'var(--azzurro)' : 'var(--line)', background: activePhase === p.n ? 'rgba(61,165,217,0.12)' : 'transparent' }}>
              Fase {p.n}
            </button>
          ))}
          {activePhase && (
            <button className="pill" onClick={() => setActivePhase(null)} style={{ cursor: 'pointer', color: 'var(--ambra)' }}>
              <X size={13} /> tutte
            </button>
          )}
        </div>

        {/* Legenda categorie sensori (toggle) */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {allCategories.map((c) => {
            const on = activeCategories.has(c)
            return (
              <button key={c} onClick={() => toggleCat(c)} className="pill"
                style={{ cursor: 'pointer', color: on ? 'var(--text)' : 'var(--text-dim)', opacity: on ? 1 : 0.5, borderColor: on ? categoryMeta[c].color : 'var(--line)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: categoryMeta[c].color, display: 'inline-block' }} />
                {categoryMeta[c].label}
              </button>
            )
          })}
        </div>

        {/* Viewport */}
        <div style={{ position: 'relative', height: 'min(70vh, 560px)', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--line)', background: 'linear-gradient(180deg,#0e1a2a,#0b1320)' }}>
          {webgl ? (
            <Suspense fallback={<Loading />}>
              <Scene
                activePhase={activePhase}
                showCoverage={showCoverage}
                activeCategories={activeCategories}
                selection={selection}
                onSelect={setSelection}
              />
            </Suspense>
          ) : (
            <Fallback onSelect={setSelection} />
          )}

          {/* Pannello dettagli */}
          {(selGw || selSensor) && (
            <div style={{
              position: 'absolute', top: 14, right: 14, width: 280, maxWidth: 'calc(100% - 28px)',
              background: 'rgba(13,22,34,0.95)', border: '1px solid var(--azzurro)', borderRadius: 12, padding: 16,
            }}>
              <button onClick={() => setSelection(null)} aria-label="Chiudi"
                style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
              {selGw && (
                <>
                  <div className="pill" style={{ color: 'var(--azzurro)', borderColor: 'var(--azzurro)' }}>Gateway · Fase {selGw.phase}</div>
                  <h3 style={{ margin: '12px 0 4px' }}>{selGw.name}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: 13, margin: '0 0 12px' }}>{selGw.comune}</p>
                  <Row label="Backhaul" value={selGw.backhaul} />
                  <Row label="Copertura" value="stilizzata" />
                  <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 12, lineHeight: 1.5 }}>{selGw.note}</p>
                </>
              )}
              {selSensor && (
                <>
                  <div className="pill" style={{ color: categoryMeta[selSensor.category].color, borderColor: categoryMeta[selSensor.category].color }}>
                    {categoryMeta[selSensor.category].label}
                  </div>
                  <h3 style={{ margin: '12px 0 10px' }}>{selSensor.name}</h3>
                  <Row label="Gateway" value={selSensorGw?.name ?? '—'} />
                  <Row label="Fase" value={`Fase ${selSensor.phase}`} />
                </>
              )}
            </div>
          )}
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 12 }}>
          {gateways.length} gateway · {sensors.length} sensori d’esempio · terreno da DEM reale (Terrarium, AWS Open Data).
        </p>
      </div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid var(--line)', fontSize: 14 }}>
      <span style={{ color: 'var(--text-dim)' }}>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function Loading() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--text-dim)' }}>
      Caricamento mappa 3D…
    </div>
  )
}
