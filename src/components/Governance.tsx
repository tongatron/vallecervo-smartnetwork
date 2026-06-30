import { Users, Sparkles } from 'lucide-react'
import { governance } from '../data/content'

export default function Governance() {
  return (
    <section id="governance">
      <div className="container">
        <span className="eyebrow"><Users size={14} /> Modello</span>
        <h2 className="section-title">{governance.title}</h2>
        <p className="section-intro">{governance.intro}</p>

        <div className="grid grid-2" style={{ marginTop: 36 }}>
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Users size={18} /> Chi partecipa</h3>
            <ul style={{ margin: '14px 0 0', paddingLeft: 18, color: 'var(--text-dim)', lineHeight: 1.9 }}>
              {governance.partners.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Sparkles size={18} /> Evoluzioni future</h3>
            <ul style={{ margin: '14px 0 0', paddingLeft: 18, color: 'var(--text-dim)', lineHeight: 1.9 }}>
              {governance.future.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
