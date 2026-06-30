import { Radio } from 'lucide-react'

const links = [
  ['#perche', 'Perché'],
  ['#architettura', 'Tecnologia'],
  ['#meshtastic', 'Meshtastic'],
  ['#mappa', 'Mappa 3D'],
  ['#fasi', 'Fasi'],
  ['#costi', 'Costi'],
  ['#applicazioni', 'Applicazioni'],
  ['#governance', 'Governance'],
]

export default function Nav() {
  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(10px)',
        background: 'rgba(13,22,34,0.72)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}
      >
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--text)' }}>
          <span style={{ display: 'grid', placeItems: 'center', width: 34, height: 34, borderRadius: 9, background: 'var(--azzurro)', color: '#04141f' }}>
            <Radio size={20} />
          </span>
          <strong style={{ fontFamily: 'var(--font-head)', fontSize: 16 }}>Valle Cervo Smart Network</strong>
        </a>
        <nav style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }} className="nav-links">
          {links.map(([href, label]) => (
            <a key={href} href={href}
              style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14, padding: '8px 10px', borderRadius: 8 }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <style>{`@media (max-width: 820px){ .nav-links{ display:none !important; } }`}</style>
    </header>
  )
}
