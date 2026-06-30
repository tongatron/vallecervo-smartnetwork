import { Html } from '@react-three/drei'
import { useState } from 'react'
import type { Gateway } from '../../data/gateways'
import { llToWorld, kmToWorld } from './terrainUtils'

interface Props {
  gw: Gateway
  highlighted: boolean
  dimmed: boolean
  showCoverage: boolean
  onSelect: () => void
  selected: boolean
}

export default function GatewayNode({ gw, highlighted, dimmed, showCoverage, onSelect, selected }: Props) {
  const [hover, setHover] = useState(false)
  const [x, y, z] = llToWorld(gw.lon, gw.lat)
  const mastH = 0.9
  const accent = '#3DA5D9'
  const active = highlighted || selected || hover
  const opacity = dimmed && !active ? 0.25 : 1
  const coverageR = kmToWorld(gw.coverageKm)

  return (
    <group position={[x, y, z]}>
      {/* base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.12, 12]} />
        <meshStandardMaterial color="#0B2E4F" transparent opacity={opacity} />
      </mesh>
      {/* palo */}
      <mesh
        position={[0, mastH / 2 + 0.1, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
        onPointerOut={() => setHover(false)}
        onClick={(e) => { e.stopPropagation(); onSelect() }}
      >
        <cylinderGeometry args={[0.03, 0.03, mastH, 8]} />
        <meshStandardMaterial color="#cdd7e2" transparent opacity={opacity} />
      </mesh>
      {/* testa antenna */}
      <mesh position={[0, mastH + 0.18, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 1.2 : 0.5} transparent opacity={opacity} />
      </mesh>

      {/* cupola/cerchio di copertura */}
      {showCoverage && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <ringGeometry args={[coverageR * 0.97, coverageR, 48]} />
          <meshBasicMaterial color={accent} transparent opacity={active ? 0.6 : 0.25} side={2} />
        </mesh>
      )}
      {showCoverage && (
        <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[coverageR, 48]} />
          <meshBasicMaterial color={accent} transparent opacity={active ? 0.12 : 0.05} side={2} />
        </mesh>
      )}

      {(active) && (
        <Html distanceFactor={10} position={[0, mastH + 0.5, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(13,22,34,0.92)', border: '1px solid #3DA5D9',
            borderRadius: 8, padding: '6px 10px', whiteSpace: 'nowrap',
            fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, color: '#E8EEF4',
          }}>
            📡 {gw.name}
          </div>
        </Html>
      )}
    </group>
  )
}
