import { useMemo } from 'react'
import * as THREE from 'three'
import { DEM, WORLD_W, WORLD_D, elevToWorldY } from './terrainUtils'

// Mesh del terreno costruita dalle elevazioni REALI del DEM (src/data/dem.json).
// Colori per fascia altimetrica + hillshade calcolato dalle pendenze.
export default function Terrain() {
  const geometry = useMemo(() => {
    const W = DEM.width
    const H = DEM.height
    const h = DEM.heights
    const positions = new Float32Array(W * H * 3)
    const colors = new Float32Array(W * H * 3)

    const cVal = new THREE.Color()
    const cLow = new THREE.Color('#23503a')   // fondovalle / prati
    const cMid = new THREE.Color('#3f5a40')   // boschi
    const cHigh = new THREE.Color('#7d7468')  // pascoli alti
    const cRock = new THREE.Color('#8b8a90')  // roccia nuda
    const cSnow = new THREE.Color('#e6edf3')  // neve
    const range = Math.max(1, DEM.hMax - DEM.hMin)

    // fattore metri -> unità mondo in verticale
    const m2y = elevToWorldY(DEM.hMin + 1) - elevToWorldY(DEM.hMin)
    const dxStep = WORLD_W / (W - 1)
    const dzStep = WORLD_D / (H - 1)
    const light = new THREE.Vector3(-0.6, 1.0, -0.5).normalize()
    const n = new THREE.Vector3()

    for (let j = 0; j < H; j++) {
      for (let i = 0; i < W; i++) {
        const idx = (j * W + i) * 3
        positions[idx] = (i / (W - 1) - 0.5) * WORLD_W
        positions[idx + 1] = elevToWorldY(h[j][i])
        positions[idx + 2] = (j / (H - 1) - 0.5) * WORLD_D

        const hl = h[j][Math.max(0, i - 1)]
        const hr = h[j][Math.min(W - 1, i + 1)]
        const hN = h[Math.max(0, j - 1)][i]
        const hS = h[Math.min(H - 1, j + 1)][i]
        n.set(((hl - hr) * m2y) / (2 * dxStep), 1, ((hN - hS) * m2y) / (2 * dzStep)).normalize()
        const shade = 0.5 + 0.5 * Math.max(0, n.dot(light))

        const t = (h[j][i] - DEM.hMin) / range
        if (t < 0.3) cVal.lerpColors(cLow, cMid, t / 0.3)
        else if (t < 0.6) cVal.lerpColors(cMid, cHigh, (t - 0.3) / 0.3)
        else if (t < 0.85) cVal.lerpColors(cHigh, cRock, (t - 0.6) / 0.25)
        else cVal.lerpColors(cRock, cSnow, (t - 0.85) / 0.15)

        colors[idx] = cVal.r * shade
        colors[idx + 1] = cVal.g * shade
        colors[idx + 2] = cVal.b * shade
      }
    }

    const indices: number[] = []
    for (let j = 0; j < H - 1; j++) {
      for (let i = 0; i < W - 1; i++) {
        const a = j * W + i
        const b = a + 1
        const c = a + W
        const d = c + 1
        indices.push(a, c, b, b, c, d)
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.96} metalness={0.02} />
    </mesh>
  )
}
