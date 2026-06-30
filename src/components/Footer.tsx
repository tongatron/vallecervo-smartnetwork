import { Radio } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: '40px 0', marginTop: 20 }}>
      <div className="container" style={{ display: 'flex', gap: 16, justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: 9, background: 'var(--azzurro)', color: '#04141f' }}>
            <Radio size={18} />
          </span>
          <strong style={{ fontFamily: 'var(--font-head)' }}>Valle Cervo Smart Network</strong>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: 13, maxWidth: 560, margin: 0 }}>
          Documento di progetto a scopo illustrativo. Posizioni dei gateway, coperture e costi sono
          indicativi e da validare con uno studio radio e preventivi reali. Stack software open source.
        </p>
      </div>
    </footer>
  )
}
