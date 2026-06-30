import { useState } from 'react'
import { Html } from '@react-three/drei'
import type { SensorType } from '../../data/sensors'
import { categoryMeta } from '../../data/sensors'
import { llToWorld } from './terrainUtils'

interface Props {
  sensor: SensorType
  dimmed: boolean
  onSelect: () => void
  selected: boolean
}

export default function SensorNode({ sensor, dimmed, onSelect, selected }: Props) {
  const [hover, setHover] = useState(false)
  const [x, y, z] = llToWorld(sensor.lon, sensor.lat)
  const color = categoryMeta[sensor.category].color
  const active = hover || selected
  const opacity = dimmed && !active ? 0.2 : 1

  return (
    <group position={[x, y + 0.18, z]}>
      <mesh
        scale={active ? 1.5 : 1}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
        onPointerOut={() => setHover(false)}
        onClick={(e) => { e.stopPropagation(); onSelect() }}
      >
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.9 : 0.35} transparent opacity={opacity} />
      </mesh>
      {active && (
        <Html distanceFactor={10} position={[0, 0.3, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(13,22,34,0.92)', border: `1px solid ${color}`,
            borderRadius: 8, padding: '5px 9px', whiteSpace: 'nowrap',
            fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#E8EEF4',
          }}>
            {sensor.name}
          </div>
        </Html>
      )}
    </group>
  )
}
