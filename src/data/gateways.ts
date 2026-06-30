// Gateway candidati della rete LoRaWAN Valle Cervo.
// lat/lon = coordinate geografiche reali approssimate dei siti candidati,
// usate per posizionare i marker sul terreno DEM reale (src/data/dem.json).

export type Backhaul = 'Fibra' | 'Ponte radio' | '4G/5G' | 'Starlink'
export type Power = 'Rete elettrica' | 'Solare + batteria'

export interface Gateway {
  id: string
  name: string
  comune: string
  lat: number
  lon: number
  coverageKm: number // raggio di copertura stimato (km)
  backhaul: Backhaul
  power: Power
  phase: 1 | 2
  note: string
}

export const gateways: Gateway[] = [
  {
    id: 'gw-andorno', name: 'Andorno Micca', comune: 'Andorno Micca',
    lat: 45.594, lon: 8.058, coverageKm: 4, backhaul: 'Fibra', power: 'Rete elettrica', phase: 1,
    note: 'Porta della valle, fondovalle ben collegato in fibra.',
  },
  {
    id: 'gw-campiglia', name: 'Campiglia Cervo', comune: 'Campiglia Cervo',
    lat: 45.660, lon: 8.001, coverageKm: 4, backhaul: '4G/5G', power: 'Rete elettrica', phase: 1,
    note: 'Nodo centrale del fondovalle, copre più frazioni.',
  },
  {
    id: 'gw-rosazza', name: 'Rosazza', comune: 'Rosazza',
    lat: 45.692, lon: 7.972, coverageKm: 3.5, backhaul: '4G/5G', power: 'Rete elettrica', phase: 2,
    note: 'Centro storico, possibile sito condiviso con servizi comunali.',
  },
  {
    id: 'gw-piedicavallo', name: 'Piedicavallo', comune: 'Piedicavallo',
    lat: 45.709, lon: 7.957, coverageKm: 3.5, backhaul: 'Starlink', power: 'Solare + batteria', phase: 2,
    note: 'Alta valle, area isolata: backhaul satellitare e alimentazione solare.',
  },
  {
    id: 'gw-montesinaro', name: 'Montesinaro', comune: 'Piedicavallo',
    lat: 45.717, lon: 7.949, coverageKm: 3, backhaul: 'Starlink', power: 'Solare + batteria', phase: 2,
    note: 'Testata della valle (eventuale), copertura alpeggi e sentieri, nessuna rete elettrica.',
  },
  {
    id: 'gw-oropa', name: 'Santuario di Oropa', comune: 'Biella (Oropa)',
    lat: 45.628, lon: 7.978, coverageKm: 5, backhaul: 'Fibra', power: 'Rete elettrica', phase: 1,
    note: 'Alto punto panoramico, ottima visibilità radio verso il fondovalle.',
  },
  {
    id: 'gw-mucrone', name: 'Monte Mucrone', comune: 'Biella',
    lat: 45.660, lon: 7.926, coverageKm: 6, backhaul: 'Ponte radio', power: 'Solare + batteria', phase: 2,
    note: 'Vetta (~2335 m): massima portata, snodo per ponti radio, sito senza rete elettrica.',
  },
  {
    id: 'gw-bielmonte', name: 'Bielmonte', comune: 'Veglio / Bielmonte',
    lat: 45.683, lon: 8.114, coverageKm: 5, backhaul: 'Ponte radio', power: 'Rete elettrica', phase: 2,
    note: 'Stazione turistica, copre versante e aree sciistiche, energia da impianti esistenti.',
  },
]
