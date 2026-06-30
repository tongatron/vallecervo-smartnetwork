import { useMemo } from 'react'
import * as THREE from 'three'
import { MAP_SIZE, terrainHeight } from './terrainUtils'

// Mesh del terreno costruita da una griglia deformata con terrainHeight().
export default function Terrain() {
  const geometry = useMemo(() => {
    const seg = 90
    const geo = new THREE.PlaneGeometry(MAP_SIZE, MAP_SIZE, seg, seg)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position
    const colorLow = new THREE.Color('#1f4f3a')   // fondovalle verde
    const colorMid = new THREE.Color('#3c5a44')   // boschi
    const colorHigh = new THREE.Color('#6b7787')  // roccia
    const colorSnow = new THREE.Color('#d8e2ec')  // neve in quota
    const colors: number[] = []
    let maxH = 0
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const nx = x / (MAP_SIZE / 2)
      const nz = z / (MAP_SIZE / 2)
      const h = terrainHeight(nx, nz)
      pos.setY(i, h)
      if (h > maxH) maxH = h
    }
    for (let i = 0; i < pos.count; i++) {
      const h = pos.getY(i)
      const t = Math.min(1, h / 6)
      const c = new THREE.Color()
      if (t < 0.33) c.lerpColors(colorLow, colorMid, t / 0.33)
      else if (t < 0.7) c.lerpColors(colorMid, colorHigh, (t - 0.33) / 0.37)
      else c.lerpColors(colorHigh, colorSnow, (t - 0.7) / 0.3)
      colors.push(c.r, c.g, c.b)
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors flatShading roughness={0.95} metalness={0.05} />
    </mesh>
  )
}
