import { ArrowRight, MapPin, Radio, Cpu } from 'lucide-react'
import { site } from '../data/content'
import { gateways } from '../data/gateways'
import { sensors } from '../data/sensors'

export default function Hero() {
  return (
    <section id="top" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <div className="container">
        <span className="eyebrow"><Radio size={14} /> Rete LoRaWAN · Valle Cervo (Biella)</span>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', margin: '20px 0 0', maxWidth: 900 }}>
          {site.title}
        </h1>
        <p style={{ fontSize: 'clamp(18px, 2.4vw, 24px)', color: 'var(--text)', maxWidth: 760, margin: '18px 0 0', lineHeight: 1.4 }}>
          {site.subtitle}
        </p>
        <p className="section-intro" style={{ marginTop: 18 }}>{site.claim}</p>

        <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <a className="btn btn-primary" href="#mappa">Esplora la mappa 3D <ArrowRight size={18} /></a>
          <a className="btn btn-ghost" href="#fasi">Fasi e costi</a>
        </div>

        <div className="grid grid-3" style={{ marginTop: 48 }}>
          <Stat icon={<Radio size={22} />} value={`${gateways.length}`} label="Gateway candidati" />
          <Stat icon={<MapPin size={22} />} value={`${sensors.length}+`} label="Sensori d’esempio" />
          <Stat icon={<Cpu size={22} />} value="100%" label="Software open source" />
        </div>
      </div>
    </section>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: 12, background: 'rgba(61,165,217,0.12)', color: 'var(--azzurro)' }}>
        {icon}
      </span>
      <div>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 700 }}>{value}</div>
        <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>{label}</div>
      </div>
    </div>
  )
}
