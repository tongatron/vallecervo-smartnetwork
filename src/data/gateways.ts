// Gateway candidati della rete LoRaWAN Valle Cervo.
// Posizioni (x,z) NORMALIZZATE in [-1,1] sul piano della mappa 3D stilizzata:
// NON sono coordinate geografiche reali, ma una disposizione illustrativa che
// segue il fondovalle del Cervo (da Andorno, sud, verso Piedicavallo, nord).
// elev = quota relativa [0..1] usata per posizionare il marker sul rilievo.

export type Backhaul = 'Fibra' | 'Ponte radio' | '4G/5G' | 'Starlink'

export interface Gateway {
  id: string
  name: string
  comune: string
  x: number
  z: number
  elev: number
  coverage: number // raggio copertura stilizzato (unità mappa)
  backhaul: Backhaul
  phase: 1 | 2
  note: string
}

export const gateways: Gateway[] = [
  {
    id: 'gw-andorno', name: 'Andorno Micca', comune: 'Andorno Micca',
    x: 0.05, z: 0.85, elev: 0.18, coverage: 0.42, backhaul: 'Fibra', phase: 1,
    note: 'Porta della valle, fondovalle ben collegato in fibra.',
  },
  {
    id: 'gw-campiglia', name: 'Campiglia Cervo', comune: 'Campiglia Cervo',
    x: -0.10, z: 0.35, elev: 0.30, coverage: 0.40, backhaul: '4G/5G', phase: 1,
    note: 'Nodo centrale del fondovalle, copre più frazioni.',
  },
  {
    id: 'gw-rosazza', name: 'Rosazza', comune: 'Rosazza',
    x: -0.05, z: -0.05, elev: 0.40, coverage: 0.38, backhaul: '4G/5G', phase: 2,
    note: 'Centro storico, possibile sito condiviso con servizi comunali.',
  },
  {
    id: 'gw-piedicavallo', name: 'Piedicavallo', comune: 'Piedicavallo',
    x: -0.12, z: -0.55, elev: 0.55, coverage: 0.36, backhaul: 'Starlink', phase: 2,
    note: 'Alta valle, area isolata: backhaul satellitare.',
  },
  {
    id: 'gw-montesinaro', name: 'Montesinaro', comune: 'Piedicavallo',
    x: -0.45, z: -0.70, elev: 0.68, coverage: 0.34, backhaul: 'Starlink', phase: 2,
    note: 'Testata della valle (eventuale), copertura alpeggi e sentieri.',
  },
  {
    id: 'gw-oropa', name: 'Santuario di Oropa', comune: 'Biella (Oropa)',
    x: 0.62, z: 0.20, elev: 0.62, coverage: 0.48, backhaul: 'Fibra', phase: 1,
    note: 'Alto punto panoramico, ottima visibilità radio verso il fondovalle.',
  },
  {
    id: 'gw-mucrone', name: 'Monte Mucrone', comune: 'Biella',
    x: 0.50, z: -0.30, elev: 0.92, coverage: 0.55, backhaul: 'Ponte radio', phase: 2,
    note: 'Vetta: massima portata, snodo per ponti radio verso altri gateway.',
  },
  {
    id: 'gw-bielmonte', name: 'Bielmonte', comune: 'Veglio / Bielmonte',
    x: 0.78, z: -0.62, elev: 0.80, coverage: 0.50, backhaul: 'Ponte radio', phase: 2,
    note: 'Stazione turistica, copre versante e aree sciistiche.',
  },
]
