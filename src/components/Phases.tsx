import { Clock, CheckCircle2, GitBranch } from 'lucide-react'
import { phases } from '../data/phases'

interface Props {
  activePhase: number | null
  setActivePhase: (p: number | null) => void
}

export default function Phases({ activePhase, setActivePhase }: Props) {
  return (
    <section id="fasi" className="alt">
      <div className="container">
        <span className="eyebrow"><GitBranch size={14} /> Roadmap</span>
        <h2 className="section-title">Le fasi del progetto</h2>
        <p className="section-intro">
          Un percorso graduale e a basso rischio. Passa il mouse o tocca una fase per evidenziarla sulla mappa 3D.
        </p>

        <div className="grid grid-2" style={{ marginTop: 36 }}>
          {phases.map((ph) => {
            const active = activePhase === ph.n
            return (
              <button
                key={ph.n}
                className="card"
                onMouseEnter={() => setActivePhase(ph.n)}
                onFocus={() => setActivePhase(ph.n)}
                onClick={() => setActivePhase(active ? null : ph.n)}
                style={{
                  textAlign: 'left', cursor: 'pointer', color: 'var(--text)',
                  borderColor: active ? 'var(--azzurro)' : 'var(--line)',
                  boxShadow: active ? '0 0 0 1px var(--azzurro), 0 12px 30px rgba(61,165,217,0.12)' : 'none',
                  transition: 'border-color .2s, box-shadow .2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ display: 'grid', placeItems: 'center', width: 34, height: 34, borderRadius: '50%', background: 'var(--azzurro)', color: '#04141f', fontWeight: 700, fontFamily: 'var(--font-head)' }}>
                      {ph.n}
                    </span>
                    <strong style={{ fontFamily: 'var(--font-head)', fontSize: 18 }}>{ph.title}</strong>
                  </span>
                  <span className="pill"><Clock size={13} /> {ph.duration}</span>
                </div>
                <p style={{ margin: '14px 0 12px' }}>{ph.goal}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {ph.deliverables.map((d) => (
                    <li key={d} style={{ display: 'flex', gap: 8, color: 'var(--text-dim)', fontSize: 14 }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--verde)', flexShrink: 0, marginTop: 2 }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
