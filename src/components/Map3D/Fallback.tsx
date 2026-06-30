import { gateways } from '../../data/gateways'
import { sensors, categoryMeta } from '../../data/sensors'
import type { Selection } from './Scene'

// Fallback testuale/2D quando WebGL non è disponibile (NFR-1, criterio FR-4).
export default function Fallback({ onSelect }: { onSelect: (s: Selection) => void }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'auto', padding: 20 }}>
      <p style={{ color: 'var(--ambra)', fontSize: 13, marginTop: 0 }}>
        Visualizzazione 3D non disponibile su questo dispositivo — elenco dei nodi:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 10 }}>
        {gateways.map((g) => (
          <button key={g.id} className="card" onClick={() => onSelect({ kind: 'gateway', id: g.id })}
            style={{ textAlign: 'left', cursor: 'pointer', color: 'var(--text)', padding: 12 }}>
            <strong>📡 {g.name}</strong>
            <div style={{ color: 'var(--text-dim)', fontSize: 12 }}>{g.comune} · {g.backhaul}</div>
          </button>
        ))}
        {sensors.map((s) => (
          <button key={s.id} className="card" onClick={() => onSelect({ kind: 'sensor', id: s.id })}
            style={{ textAlign: 'left', cursor: 'pointer', color: 'var(--text)', padding: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: categoryMeta[s.category].color, display: 'inline-block', marginRight: 6 }} />
            <span style={{ fontSize: 13 }}>{s.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
