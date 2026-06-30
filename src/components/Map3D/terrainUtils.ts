// Geometria stilizzata della Valle Cervo (NON dati DEM reali).
// La valle corre lungo l'asse Z; i versanti salgono lungo |X|.
// Tutto deterministico: stessa forma a ogni render.

export const MAP_SIZE = 12 // lato del piano in unità mondo
export const HEIGHT_SCALE = 1

// Pseudo-rumore deterministico (no dipendenze esterne).
function noise(x: number, z: number): number {
  return (
    Math.sin(x * 1.7 + z * 0.6) * 0.5 +
    Math.sin(x * 0.8 - z * 1.3) * 0.35 +
    Math.sin(x * 2.6 + z * 2.1) * 0.18 +
    Math.cos(z * 1.1) * 0.3
  )
}

// nx, nz in [-1, 1] (coordinate normalizzate dei dati) -> altezza mondo.
export function terrainHeight(nx: number, nz: number): number {
  // Versanti: il fondovalle è leggermente spostato verso x = -0.1.
  const ridge = Math.pow(Math.abs(nx + 0.1), 1.6) * 4.2
  // Risalita verso la testata della valle (nord, nz negativo).
  const head = Math.max(0, -nz) * 1.6
  const bumps = (noise(nx * 3, nz * 3) + 1) * 0.45
  const floor = 0.2
  return (ridge + head + bumps + floor) * HEIGHT_SCALE
}

// Converte coord normalizzate [-1,1] in posizione mondo [x,y,z].
export function toWorld(nx: number, nz: number): [number, number, number] {
  const half = MAP_SIZE / 2
  return [nx * half, terrainHeight(nx, nz), nz * half]
}
