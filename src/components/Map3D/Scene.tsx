import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import Terrain from './Terrain'
import GatewayNode from './GatewayNode'
import SensorNode from './SensorNode'
import { gateways } from '../../data/gateways'
import { sensors } from '../../data/sensors'
import type { SensorCategory } from '../../data/sensors'
import { phases } from '../../data/phases'

export interface Selection {
  kind: 'gateway' | 'sensor'
  id: string
}

interface Props {
  activePhase: number | null
  showCoverage: boolean
  activeCategories: Set<SensorCategory>
  selection: Selection | null
  onSelect: (s: Selection | null) => void
}

export default function Scene({ activePhase, showCoverage, activeCategories, selection, onSelect }: Props) {
  const phase = activePhase ? phases.find((p) => p.n === activePhase) : null
  const hlGateways = new Set(phase?.gateways ?? [])
  const hlSensors = new Set(phase?.sensors ?? [])
  const phaseActive = !!phase

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [9, 8, 11], fov: 42 }}
      onPointerMissed={() => onSelect(null)}
    >
      <Sky sunPosition={[20, 12, 8]} turbidity={6} rayleigh={2} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[12, 16, 8]} intensity={1.4} castShadow />
      <hemisphereLight args={['#bcd3e6', '#243018', 0.5]} />

      <Terrain />

      {gateways.map((gw) => (
        <GatewayNode
          key={gw.id}
          gw={gw}
          showCoverage={showCoverage}
          highlighted={hlGateways.has(gw.id)}
          dimmed={phaseActive && !hlGateways.has(gw.id)}
          selected={selection?.kind === 'gateway' && selection.id === gw.id}
          onSelect={() => onSelect({ kind: 'gateway', id: gw.id })}
        />
      ))}

      {sensors.map((s) => {
        const catOn = activeCategories.has(s.category)
        if (!catOn) return null
        const dimmed = phaseActive && !hlSensors.has(s.id)
        return (
          <SensorNode
            key={s.id}
            sensor={s}
            dimmed={dimmed}
            selected={selection?.kind === 'sensor' && selection.id === s.id}
            onSelect={() => onSelect({ kind: 'sensor', id: s.id })}
          />
        )
      })}

      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={22}
        maxPolarAngle={Math.PI / 2.15}
        target={[0, 1.5, 0]}
      />
    </Canvas>
  )
}
