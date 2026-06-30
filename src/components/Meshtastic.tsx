import { Network, Compass, Sun, Radio } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts'
import { meshtastic, rangeData } from '../data/content'

const RANGE_COLORS = ['#FF6B6B', '#3DA5D9', '#FF6B6B', '#3DA5D9']

export default function Meshtastic() {
  return (
    <section id="meshtastic" className="alt">
      <div className="container">
        <span className="eyebrow"><Network size={14} /> Tecnologia complementare</span>
        <h2 className="section-title">{meshtastic.title}</h2>
        <p className="section-intro">{meshtastic.intro}</p>

        <div className="grid grid-3" style={{ marginTop: 36 }}>
          {meshtastic.characteristics.map((c) => (
            <div className="card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>

        {/* Diagramma: stella (LoRaWAN) vs mesh a nodi (Meshtastic) */}
        <div className="card" style={{ marginTop: 24, paddingTop: 28 }}>
          <h3 style={{ marginBottom: 18 }}>Stella vs. mesh: come viaggiano i dati</h3>
          <div className="grid grid-2">
            <TopologyDiagram
              mode="star"
              caption="LoRaWAN: ogni sensore parla direttamente con un gateway fisso."
            />
            <TopologyDiagram
              mode="mesh"
              caption="Meshtastic: ogni nodo ritrasmette ai vicini, “a salti”, finché il messaggio arriva a destinazione."
            />
          </div>
        </div>

        {/* Portata in km */}
        <div className="card" style={{ marginTop: 24, paddingTop: 28 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Radio size={18} /> Portata indicativa dei dispositivi (km)
          </h3>
          <p style={{ color: 'var(--text-dim)', marginBottom: 18 }}>
            La portata dipende fortemente da vegetazione, ostacoli e linea di vista (LoS) tra i nodi.
            Valori tipici per scenario:
          </p>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={rangeData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#25344a" />
                <XAxis type="number" stroke="#9fb0c2" fontSize={12} unit=" km" />
                <YAxis type="category" dataKey="tech" stroke="#9fb0c2" fontSize={12} width={220} />
                <Tooltip
                  formatter={(v: number) => `${v} km`}
                  contentStyle={{ background: '#131f30', border: '1px solid #25344a', borderRadius: 10, color: '#E8EEF4' }}
                />
                <Bar dataKey="km" radius={[0, 6, 6, 0]}>
                  {rangeData.map((d, i) => (
                    <Cell key={d.tech} fill={RANGE_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 13, color: 'var(--text-dim)' }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#FF6B6B', marginRight: 6 }} />Meshtastic</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#3DA5D9', marginRight: 6 }} />LoRaWAN</span>
          </div>
        </div>

        {/* Confronto LoRaWAN vs Meshtastic */}
        <div className="card" style={{ marginTop: 24, overflowX: 'auto' }}>
          <h3 style={{ marginBottom: 16 }}>LoRaWAN vs Meshtastic</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 560 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)' }}>
                <th style={{ padding: '8px 6px' }}>Aspetto</th>
                <th style={{ padding: '8px 6px', color: 'var(--azzurro)' }}>LoRaWAN</th>
                <th style={{ padding: '8px 6px', color: '#FF6B6B' }}>Meshtastic</th>
              </tr>
            </thead>
            <tbody>
              {meshtastic.comparison.map((row) => (
                <tr key={row.aspect} style={{ borderTop: '1px solid var(--line)' }}>
                  <td style={{ padding: '10px 6px', fontWeight: 600 }}>{row.aspect}</td>
                  <td style={{ padding: '10px 6px', color: 'var(--text-dim)' }}>{row.lorawan}</td>
                  <td style={{ padding: '10px 6px', color: 'var(--text-dim)' }}>{row.mesh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GPS escursionisti + nota alimentazione solare */}
        <div className="grid grid-2" style={{ marginTop: 24 }}>
          <div className="card">
            <span style={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: 12, background: 'rgba(255,107,107,0.14)', color: '#FF6B6B' }}>
              <Compass size={24} />
            </span>
            <h3 style={{ marginTop: 14 }}>{meshtastic.hiking.title}</h3>
            <p>{meshtastic.hiking.text}</p>
          </div>
          <div className="card">
            <span style={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: 12, background: 'rgba(224,160,80,0.14)', color: 'var(--ambra)' }}>
              <Sun size={24} />
            </span>
            <h3 style={{ marginTop: 14 }}>Alimentazione solare</h3>
            <p>
              I nodi mesh in quota e i gateway LoRaWAN senza rete elettrica (Piedicavallo, Montesinaro,
              Monte Mucrone) sono pensati per funzionare con un piccolo <strong>pannello solare e batteria
              tampone</strong>: nessun canone energia, solo un costo una tantum e manutenzione periodica
              della batteria. Vedi dettaglio in <a href="#costi">Costi</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TopologyDiagram({ mode, caption }: { mode: 'star' | 'mesh'; caption: string }) {
  return (
    <div>
      <svg viewBox="0 0 320 200" style={{ width: '100%', height: 200 }}>
        {mode === 'star' ? (
          <>
            {[
              [60, 40], [260, 40], [40, 160], [280, 160], [160, 170],
            ].map(([x, y], i) => (
              <line key={i} x1={160} y1={100} x2={x} y2={y} stroke="#3DA5D9" strokeWidth={1.5} opacity={0.6} />
            ))}
            <circle cx={160} cy={100} r={14} fill="#0B2E4F" stroke="#3DA5D9" strokeWidth={2} />
            <text x={160} y={104} textAnchor="middle" fontSize={9} fill="#3DA5D9">GW</text>
            {[[60, 40], [260, 40], [40, 160], [280, 160], [160, 170]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={7} fill="#3DA5D9" />
            ))}
          </>
        ) : (
          <>
            {[
              [[30, 100], [100, 50]],
              [[100, 50], [170, 110]],
              [[170, 110], [240, 60]],
              [[240, 60], [300, 120]],
              [[100, 50], [120, 150]],
              [[170, 110], [220, 170]],
            ].map(([[x1, y1], [x2, y2]], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FF6B6B" strokeWidth={1.5} opacity={0.6} />
            ))}
            {[[30, 100], [100, 50], [170, 110], [240, 60], [300, 120], [120, 150], [220, 170]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={7} fill="#FF6B6B" />
            ))}
          </>
        )}
      </svg>
      <p style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 4 }}>{caption}</p>
    </div>
  )
}
