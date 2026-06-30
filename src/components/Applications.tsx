import * as Icons from 'lucide-react'
import { Layers } from 'lucide-react'
import { applications } from '../data/applications'
import { categoryMeta } from '../data/sensors'

export default function Applications() {
  return (
    <section id="applicazioni" className="alt">
      <div className="container">
        <span className="eyebrow"><Layers size={14} /> A cosa serve</span>
        <h2 className="section-title">Applicazioni sul territorio</h2>
        <p className="section-intro">
          Una sola rete, molti servizi: dalla sicurezza idrogeologica all’agricoltura, dal turismo ai Comuni.
        </p>
        <div className="grid grid-3" style={{ marginTop: 36 }}>
          {applications.map((app) => {
            const Icon = (Icons as any)[app.icon] ?? Icons.Box
            const color = categoryMeta[app.category].color
            return (
              <div className="card" key={app.id}>
                <span style={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: 12, background: `${color}22`, color }}>
                  <Icon size={24} />
                </span>
                <h3 style={{ marginTop: 14 }}>{app.title}</h3>
                <p style={{ marginBottom: 14 }}>{app.benefit}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {app.examples.map((e) => (
                    <span className="pill" key={e}>{e}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
