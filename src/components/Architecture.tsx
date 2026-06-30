import { Cpu, Database, LineChart, Workflow, Radio, Server, Wifi } from 'lucide-react'
import { architecture } from '../data/content'

const flow = [
  { icon: <Radio size={22} />, title: 'Sensori', sub: 'Pochi byte, batteria per anni' },
  { icon: <Wifi size={22} />, title: 'LoRaWAN', sub: 'Radio a lungo raggio' },
  { icon: <Server size={22} />, title: 'Gateway', sub: '6–8 punti in quota' },
  { icon: <Cpu size={22} />, title: 'ChirpStack', sub: 'Network server' },
  { icon: <Database size={22} />, title: 'PostgreSQL', sub: 'Archivio dati' },
  { icon: <LineChart size={22} />, title: 'Grafana', sub: 'Dashboard' },
]

const stackIcon: Record<string, React.ReactNode> = {
  ChirpStack: <Cpu size={18} />, PostgreSQL: <Database size={18} />,
  Grafana: <LineChart size={18} />, 'Node-RED': <Workflow size={18} />,
}

export default function Architecture() {
  return (
    <section id="architettura">
      <div className="container">
        <span className="eyebrow"><Cpu size={14} /> Tecnologia</span>
        <h2 className="section-title">{architecture.title}</h2>
        <p className="section-intro">{architecture.intro}</p>

        <div style={{ display: 'flex', alignItems: 'stretch', gap: 10, marginTop: 36, flexWrap: 'wrap' }}>
          {flow.map((f, i) => (
            <div key={f.title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="card" style={{ width: 150, textAlign: 'center', padding: 16 }}>
                <span style={{ display: 'grid', placeItems: 'center', width: 44, height: 44, borderRadius: 12, margin: '0 auto 10px', background: 'rgba(61,165,217,0.12)', color: 'var(--azzurro)' }}>
                  {f.icon}
                </span>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600 }}>{f.title}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 2 }}>{f.sub}</div>
              </div>
              {i < flow.length - 1 && (
                <span style={{ color: 'var(--azzurro)', fontSize: 22 }}>→</span>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-2" style={{ marginTop: 32 }}>
          <div className="card">
            <h3>Stack open source</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              {architecture.stack.map((s) => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ display: 'grid', placeItems: 'center', width: 36, height: 36, borderRadius: 9, background: 'rgba(46,125,91,0.16)', color: 'var(--verde)' }}>
                    {stackIcon[s.name]}
                  </span>
                  <div>
                    <strong>{s.name}</strong>
                    <span style={{ color: 'var(--text-dim)', marginLeft: 8, fontSize: 14 }}>{s.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Collegamento a Internet (backhaul)</h3>
            <p style={{ marginBottom: 14 }}>Ogni gateway usa la connessione più adatta al sito:</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {architecture.backhaul.map((b) => (
                <span className="pill" key={b}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
