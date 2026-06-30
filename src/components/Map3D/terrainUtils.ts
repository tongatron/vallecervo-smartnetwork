// Proiezione del terreno DEM reale (src/data/dem.json) nello spazio 3D.
// Elevazioni in metri reali; lat/lon proiettati in modo proporzionale ai metri.
import dem from '../../data/dem.json'

export interface Dem {
  bbox: { west: number; east: number; south: number; north: number }
  width: number
  height: number
  hMin: number
  hMax: number
  heights: number[][]
}

export const DEM = dem as Dem

const { west, east, south, north } = DEM.bbox
const lonRange = east - west
const latRange = north - south
const midLat = (north + south) / 2

// Dimensioni reali dell'area (metri)
const metersX = lonRange * 111320 * Math.cos((midLat * Math.PI) / 180)
const metersZ = latRange * 110540

// Scala: il lato orizzontale maggiore diventa MAP_SIZE unità mondo.
export const MAP_SIZE = 14
const scale = MAP_SIZE / Math.max(metersX, metersZ)
export const WORLD_W = metersX * scale
export const WORLD_D = metersZ * scale

// Esagerazione verticale leggera per leggibilità (terreno comunque realistico).
const V_EXAG = 1.7
const vScale = scale * V_EXAG

// Campiona la quota (metri) per lon/lat con interpolazione bilineare.
export function sampleElevation(lon: number, lat: number): number {
  const fx = ((lon - west) / lonRange) * (DEM.width - 1)
  const fy = ((north - lat) / latRange) * (DEM.height - 1)
  const x0 = Math.max(0, Math.min(DEM.width - 1, Math.floor(fx)))
  const y0 = Math.max(0, Math.min(DEM.height - 1, Math.floor(fy)))
  const x1 = Math.min(DEM.width - 1, x0 + 1)
  const y1 = Math.min(DEM.height - 1, y0 + 1)
  const dx = fx - x0
  const dy = fy - y0
  const h = DEM.heights
  return (
    h[y0][x0] * (1 - dx) * (1 - dy) +
    h[y0][x1] * dx * (1 - dy) +
    h[y1][x0] * (1 - dx) * dy +
    h[y1][x1] * dx * dy
  )
}

// Quota (metri) -> Y mondo (origine sul punto più basso del DEM).
export function elevToWorldY(elevM: number): number {
  return (elevM - DEM.hMin) * vScale
}

// lon/lat -> posizione mondo [x, y, z], con Y sul terreno.
export function llToWorld(lon: number, lat: number): [number, number, number] {
  const u = (lon - west) / lonRange
  const v = (north - lat) / latRange
  const x = (u - 0.5) * WORLD_W
  const z = (v - 0.5) * WORLD_D
  const y = elevToWorldY(sampleElevation(lon, lat))
  return [x, y, z]
}

// Converte una distanza in km in unità mondo (per i raggi di copertura).
export function kmToWorld(km: number): number {
  return km * 1000 * scale
}
