// Scarica i tile DEM open (Terrarium, AWS Open Data) per la Valle Cervo,
// li ricuce e campiona un heightmap (elevazioni reali in metri) salvato nel repo.
// Eseguire una sola volta: `node scripts/build-dem.mjs`. Output: src/data/dem.json
import https from 'node:https'
import { PNG } from 'pngjs'
import { writeFileSync, mkdirSync } from 'node:fs'

// Bounding box Valle Cervo (Biella) — lon/lat
const BBOX = { west: 7.88, east: 8.13, south: 45.58, north: 45.73 }
const ZOOM = 12
const OUT_W = 220 // risoluzione griglia campionata
const OUT_H = 150

const lon2tile = (lon, z) => ((lon + 180) / 360) * 2 ** z
const lat2tile = (lat, z) => {
  const r = (lat * Math.PI) / 180
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z
}

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, (r) => {
      const chunks = []
      r.on('data', (c) => chunks.push(c))
      r.on('end', () => res(Buffer.concat(chunks)))
    }).on('error', rej)
  })
}

async function main() {
  const tx0 = Math.floor(lon2tile(BBOX.west, ZOOM))
  const tx1 = Math.floor(lon2tile(BBOX.east, ZOOM))
  const ty0 = Math.floor(lat2tile(BBOX.north, ZOOM))
  const ty1 = Math.floor(lat2tile(BBOX.south, ZOOM))
  const nx = tx1 - tx0 + 1
  const ny = ty1 - ty0 + 1
  console.log(`Tile x ${tx0}..${tx1} (${nx}), y ${ty0}..${ty1} (${ny})`)

  const TS = 256
  const W = nx * TS
  const H = ny * TS
  const elev = new Float32Array(W * H)

  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const url = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${ZOOM}/${tx0 + i}/${ty0 + j}.png`
      const buf = await get(url)
      const png = PNG.sync.read(buf)
      for (let y = 0; y < TS; y++) {
        for (let x = 0; x < TS; x++) {
          const idx = (y * TS + x) * 4
          const r = png.data[idx], g = png.data[idx + 1], b = png.data[idx + 2]
          const e = r * 256 + g + b / 256 - 32768
          elev[(j * TS + y) * W + (i * TS + x)] = e
        }
      }
      process.stdout.write('.')
    }
  }
  console.log('\nTile scaricati e decodificati.')

  // Estensione geografica coperta dai tile
  const tileLonW = tx0 / 2 ** ZOOM * 360 - 180
  const tileLonE = (tx1 + 1) / 2 ** ZOOM * 360 - 180
  const tile2lat = (ty) => {
    const n = Math.PI - (2 * Math.PI * ty) / 2 ** ZOOM
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)))
  }
  const tileLatN = tile2lat(ty0)
  const tileLatS = tile2lat(ty1 + 1)

  // Campiona la griglia OUT_W x OUT_H sul bbox richiesto (equirettangolare)
  const heights = new Array(OUT_H)
  let hMin = Infinity, hMax = -Infinity
  for (let j = 0; j < OUT_H; j++) {
    const lat = BBOX.north - ((BBOX.north - BBOX.south) * j) / (OUT_H - 1)
    const row = new Array(OUT_W)
    for (let i = 0; i < OUT_W; i++) {
      const lon = BBOX.west + ((BBOX.east - BBOX.west) * i) / (OUT_W - 1)
      const fx = ((lon - tileLonW) / (tileLonE - tileLonW)) * (W - 1)
      const fy = ((tileLatN - lat) / (tileLatN - tileLatS)) * (H - 1)
      const x0 = Math.floor(fx), y0 = Math.floor(fy)
      const x1 = Math.min(W - 1, x0 + 1), y1 = Math.min(H - 1, y0 + 1)
      const dx = fx - x0, dy = fy - y0
      const e =
        elev[y0 * W + x0] * (1 - dx) * (1 - dy) +
        elev[y0 * W + x1] * dx * (1 - dy) +
        elev[y1 * W + x0] * (1 - dx) * dy +
        elev[y1 * W + x1] * dx * dy
      const v = Math.round(e)
      row[i] = v
      if (v < hMin) hMin = v
      if (v > hMax) hMax = v
    }
    heights[j] = row
  }

  mkdirSync('src/data', { recursive: true })
  const out = {
    source: 'Terrarium DEM (AWS Open Data) — elevazioni reali in metri',
    bbox: BBOX,
    width: OUT_W,
    height: OUT_H,
    hMin,
    hMax,
    heights,
  }
  writeFileSync('src/data/dem.json', JSON.stringify(out))
  console.log(`Scritto src/data/dem.json — quota ${hMin}..${hMax} m, griglia ${OUT_W}x${OUT_H}`)
}

main()
