import { MountainSnow } from 'lucide-react'
import { why } from '../data/content'

export default function Why() {
  return (
    <section id="perche" className="alt">
      <div className="container">
        <span className="eyebrow"><MountainSnow size={14} /> Il territorio</span>
        <h2 className="section-title">{why.title}</h2>
        <p className="section-intro">{why.intro}</p>
        <div className="grid grid-3" style={{ marginTop: 36 }}>
          {why.points.map((p) => (
            <div className="card" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
