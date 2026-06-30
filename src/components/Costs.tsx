import { Euro, Info } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from 'recharts'
import { costItems, phaseCosts, totalCapex, totalOpexYear, costsDisclaimer } from '../data/costs'

const fmt = (n: number) => n.toLocaleString('it-IT')

export default function Costs() {
  const chartData = phaseCosts.map((p) => ({
    name: p.label,
    'Investimento (CAPEX)': p.capex,
    'Annuo (OPEX)': p.opexYear,
  }))

  return (
    <section id="costi">
      <div className="container">
        <span className="eyebrow"><Euro size={14} /> Sostenibilità economica</span>
        <h2 className="section-title">Stima dei costi</h2>
        <p className="section-intro">
          Ordini di grandezza per pianificare l’investimento per fasi.
        </p>
        <div style={{ marginTop: 14 }}>
          <span className="badge-stima"><Info size={12} style={{ verticalAlign: '-2px' }} /> {costsDisclaimer}</span>
        </div>

        <div className="grid grid-3" style={{ marginTop: 32 }}>
          <div className="card">
            <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>Investimento totale (CAPEX)</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 34, fontWeight: 700, marginTop: 6 }}>~{fmt(totalCapex)} €</div>
          </div>
          <div className="card">
            <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>Costo annuo (OPEX)</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 34, fontWeight: 700, marginTop: 6 }}>~{fmt(totalOpexYear)} €/anno</div>
          </div>
          <div className="card">
            <div style={{ color: 'var(--text-dim)', fontSize: 14 }}>Modello</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 600, marginTop: 10 }}>Investimento condiviso tra enti, fondi e partner</div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20, paddingTop: 28 }}>
          <h3 style={{ marginBottom: 16 }}>Costi per fase</h3>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#25344a" />
                <XAxis dataKey="name" stroke="#9fb0c2" fontSize={13} />
                <YAxis stroke="#9fb0c2" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  formatter={(v: number) => `${fmt(v)} €`}
                  contentStyle={{ background: '#131f30', border: '1px solid #25344a', borderRadius: 10, color: '#E8EEF4' }}
                />
                <Legend />
                <Bar dataKey="Investimento (CAPEX)" fill="#3DA5D9" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Annuo (OPEX)" fill="#2E7D5B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20, overflowX: 'auto' }}>
          <h3 style={{ marginBottom: 16 }}>Dettaglio voci</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 560 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)' }}>
                <th style={{ padding: '8px 6px' }}>Voce</th>
                <th style={{ padding: '8px 6px' }}>Fase</th>
                <th style={{ padding: '8px 6px', textAlign: 'right' }}>CAPEX</th>
                <th style={{ padding: '8px 6px', textAlign: 'right' }}>OPEX/anno</th>
              </tr>
            </thead>
            <tbody>
              {costItems.map((c) => (
                <tr key={c.label} style={{ borderTop: '1px solid var(--line)' }}>
                  <td style={{ padding: '10px 6px' }}>
                    <div>{c.label}</div>
                    <div style={{ color: 'var(--text-dim)', fontSize: 12 }}>{c.detail}</div>
                  </td>
                  <td style={{ padding: '10px 6px' }}>{c.phase}</td>
                  <td style={{ padding: '10px 6px', textAlign: 'right' }}>{fmt(c.capex)} €</td>
                  <td style={{ padding: '10px 6px', textAlign: 'right' }}>{fmt(c.opexYear)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
