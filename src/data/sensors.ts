// Sensori d'esempio (illustrativi) collegati ai gateway.
// lat/lon reali approssimate per il posizionamento sul terreno DEM.
// Le categorie guidano colore e icona nella mappa 3D.

export type SensorCategory =
  | 'idro'        // livelli torrenti, pluviometri
  | 'meteo'       // stazioni meteo / neve
  | 'geo'         // frane / smottamenti
  | 'agricoltura' // umidità suolo, irrigazione, bestiame
  | 'turismo'     // conta-escursionisti, SOS, meteo rifugi
  | 'comuni'      // illuminazione, contatori acqua, rifiuti, aria, parcheggi
  | 'meshtastic'  // nodi mesh GPS/SOS per escursionisti, indipendenti dal LoRaWAN

export interface SensorType {
  id: string
  name: string
  category: SensorCategory
  lat: number
  lon: number
  phase: 1 | 2 | 3
  gateway: string // sito LoRaWAN più vicino (o nodo mesh di riferimento)
}

export const categoryMeta: Record<SensorCategory, { label: string; color: string }> = {
  idro: { label: 'Idrologia', color: '#3DA5D9' },
  meteo: { label: 'Meteo / Neve', color: '#8ECae6' },
  geo: { label: 'Geo / Frane', color: '#E0A050' },
  agricoltura: { label: 'Agricoltura', color: '#2E7D5B' },
  turismo: { label: 'Turismo', color: '#C77DFF' },
  comuni: { label: 'Servizi comunali', color: '#9AA7B5' },
  meshtastic: { label: 'Meshtastic GPS/SOS', color: '#FF6B6B' },
}

export const sensors: SensorType[] = [
  { id: 's1', name: 'Livello torrente Cervo — Andorno', category: 'idro', lat: 45.596, lon: 8.052, phase: 3, gateway: 'gw-andorno' },
  { id: 's2', name: 'Pluviometro Campiglia', category: 'idro', lat: 45.662, lon: 8.005, phase: 3, gateway: 'gw-campiglia' },
  { id: 's3', name: 'Livello torrente — Rosazza', category: 'idro', lat: 45.690, lon: 7.975, phase: 3, gateway: 'gw-rosazza' },
  { id: 's4', name: 'Stazione meteo Oropa', category: 'meteo', lat: 45.630, lon: 7.976, phase: 3, gateway: 'gw-oropa' },
  { id: 's5', name: 'Nivometro Mucrone', category: 'meteo', lat: 45.662, lon: 7.928, phase: 3, gateway: 'gw-mucrone' },
  { id: 's6', name: 'Meteo rifugio Bielmonte', category: 'meteo', lat: 45.685, lon: 8.110, phase: 3, gateway: 'gw-bielmonte' },
  { id: 's7', name: 'Sensore frana — versante Piedicavallo', category: 'geo', lat: 45.705, lon: 7.962, phase: 3, gateway: 'gw-piedicavallo' },
  { id: 's8', name: 'Inclinometro Montesinaro', category: 'geo', lat: 45.719, lon: 7.945, phase: 3, gateway: 'gw-montesinaro' },
  { id: 's9', name: 'Umidità suolo — alpeggio', category: 'agricoltura', lat: 45.645, lon: 7.955, phase: 3, gateway: 'gw-oropa' },
  { id: 's10', name: 'Monitoraggio bestiame', category: 'agricoltura', lat: 45.665, lon: 8.010, phase: 3, gateway: 'gw-campiglia' },
  { id: 's11', name: 'Livello vasca irrigazione', category: 'agricoltura', lat: 45.600, lon: 8.045, phase: 3, gateway: 'gw-andorno' },
  { id: 's12', name: 'Conta-escursionisti sentiero', category: 'turismo', lat: 45.668, lon: 7.940, phase: 3, gateway: 'gw-mucrone' },
  { id: 's13', name: 'Pulsante SOS rifugio', category: 'turismo', lat: 45.715, lon: 7.952, phase: 3, gateway: 'gw-montesinaro' },
  { id: 's14', name: 'Parcheggio Oropa (occupazione)', category: 'comuni', lat: 45.626, lon: 7.980, phase: 3, gateway: 'gw-oropa' },
  { id: 's15', name: 'Contatore acqua — Rosazza', category: 'comuni', lat: 45.693, lon: 7.970, phase: 3, gateway: 'gw-rosazza' },
  { id: 's16', name: 'Qualità aria — Andorno', category: 'comuni', lat: 45.592, lon: 8.060, phase: 3, gateway: 'gw-andorno' },
  // Nodi Meshtastic: rete mesh indipendente per GPS e SOS escursionisti sui sentieri
  { id: 'm1', name: 'Nodo mesh — Bocchetta di Margosio', category: 'meshtastic', lat: 45.672, lon: 7.935, phase: 3, gateway: 'gw-mucrone' },
  { id: 'm2', name: 'Nodo mesh — Rifugio Coda', category: 'meshtastic', lat: 45.655, lon: 7.918, phase: 3, gateway: 'gw-mucrone' },
  { id: 'm3', name: 'Nodo mesh — Alpe Camparient', category: 'meshtastic', lat: 45.712, lon: 7.940, phase: 3, gateway: 'gw-montesinaro' },
  { id: 'm4', name: 'Nodo mesh — Conca di Oropa', category: 'meshtastic', lat: 45.634, lon: 7.970, phase: 3, gateway: 'gw-oropa' },
]
