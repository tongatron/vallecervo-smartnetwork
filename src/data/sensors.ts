// Sensori d'esempio (illustrativi) collegati ai gateway. Posizioni normalizzate
// come per i gateway. Le categorie guidano colore e icona nella mappa 3D.

export type SensorCategory =
  | 'idro'        // livelli torrenti, pluviometri
  | 'meteo'       // stazioni meteo / neve
  | 'geo'         // frane / smottamenti
  | 'agricoltura' // umidità suolo, irrigazione, bestiame
  | 'turismo'     // conta-escursionisti, SOS, meteo rifugi
  | 'comuni'      // illuminazione, contatori acqua, rifiuti, aria, parcheggi

export interface SensorType {
  id: string
  name: string
  category: SensorCategory
  x: number
  z: number
  elev: number
  phase: 1 | 2 | 3
  gateway: string
}

export const categoryMeta: Record<SensorCategory, { label: string; color: string }> = {
  idro: { label: 'Idrologia', color: '#3DA5D9' },
  meteo: { label: 'Meteo / Neve', color: '#8ECae6' },
  geo: { label: 'Geo / Frane', color: '#E0A050' },
  agricoltura: { label: 'Agricoltura', color: '#2E7D5B' },
  turismo: { label: 'Turismo', color: '#C77DFF' },
  comuni: { label: 'Servizi comunali', color: '#9AA7B5' },
}

export const sensors: SensorType[] = [
  { id: 's1', name: 'Livello torrente Cervo — Andorno', category: 'idro', x: 0.02, z: 0.78, elev: 0.16, phase: 3, gateway: 'gw-andorno' },
  { id: 's2', name: 'Pluviometro Campiglia', category: 'idro', x: -0.06, z: 0.40, elev: 0.30, phase: 3, gateway: 'gw-campiglia' },
  { id: 's3', name: 'Livello torrente — Rosazza', category: 'idro', x: -0.02, z: 0.00, elev: 0.39, phase: 3, gateway: 'gw-rosazza' },
  { id: 's4', name: 'Stazione meteo Oropa', category: 'meteo', x: 0.58, z: 0.16, elev: 0.61, phase: 3, gateway: 'gw-oropa' },
  { id: 's5', name: 'Nivometro Mucrone', category: 'meteo', x: 0.48, z: -0.28, elev: 0.90, phase: 3, gateway: 'gw-mucrone' },
  { id: 's6', name: 'Meteo rifugio Bielmonte', category: 'meteo', x: 0.74, z: -0.58, elev: 0.79, phase: 3, gateway: 'gw-bielmonte' },
  { id: 's7', name: 'Sensore frana — versante Piedicavallo', category: 'geo', x: -0.20, z: -0.50, elev: 0.58, phase: 3, gateway: 'gw-piedicavallo' },
  { id: 's8', name: 'Inclinometro Montesinaro', category: 'geo', x: -0.42, z: -0.66, elev: 0.67, phase: 3, gateway: 'gw-montesinaro' },
  { id: 's9', name: 'Umidità suolo — alpeggio', category: 'agricoltura', x: 0.30, z: -0.05, elev: 0.50, phase: 3, gateway: 'gw-oropa' },
  { id: 's10', name: 'Monitoraggio bestiame', category: 'agricoltura', x: -0.30, z: 0.20, elev: 0.34, phase: 3, gateway: 'gw-campiglia' },
  { id: 's11', name: 'Livello vasca irrigazione', category: 'agricoltura', x: 0.12, z: 0.55, elev: 0.24, phase: 3, gateway: 'gw-andorno' },
  { id: 's12', name: 'Conta-escursionisti sentiero', category: 'turismo', x: 0.20, z: -0.40, elev: 0.70, phase: 3, gateway: 'gw-mucrone' },
  { id: 's13', name: 'Pulsante SOS rifugio', category: 'turismo', x: -0.34, z: -0.62, elev: 0.66, phase: 3, gateway: 'gw-montesinaro' },
  { id: 's14', name: 'Parcheggio Oropa (occupazione)', category: 'comuni', x: 0.55, z: 0.26, elev: 0.60, phase: 3, gateway: 'gw-oropa' },
  { id: 's15', name: 'Contatore acqua — Rosazza', category: 'comuni', x: -0.08, z: -0.08, elev: 0.40, phase: 3, gateway: 'gw-rosazza' },
  { id: 's16', name: 'Qualità aria — Andorno', category: 'comuni', x: 0.10, z: 0.88, elev: 0.18, phase: 3, gateway: 'gw-andorno' },
]
