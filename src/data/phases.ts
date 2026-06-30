// Le 4 fasi del progetto (dalla bozza). gateways/sensors = id evidenziati in mappa.

export interface Phase {
  n: number
  title: string
  duration: string
  goal: string
  deliverables: string[]
  gateways: string[]
  sensors: string[]
}

export const phases: Phase[] = [
  {
    n: 1,
    title: 'Avvio — copertura del fondovalle',
    duration: '3 mesi',
    goal: 'Installare i primi 2 gateway e coprire il fondovalle.',
    deliverables: [
      '2 gateway operativi (Andorno Micca, Campiglia Cervo)',
      'Server ChirpStack + dashboard Grafana di base',
      'Test di copertura sul fondovalle',
    ],
    gateways: ['gw-andorno', 'gw-campiglia'],
    sensors: [],
  },
  {
    n: 2,
    title: 'Espansione — comuni e versanti',
    duration: '6 mesi',
    goal: 'Aggiungere 4-6 gateway per coprire i comuni laterali e i versanti.',
    deliverables: [
      'Gateway su Oropa, Mucrone, Rosazza, Piedicavallo, Bielmonte, Montesinaro',
      'Ponti radio tra le vette (Mucrone/Bielmonte)',
      'Copertura ~95% del fondovalle e centri abitati',
    ],
    gateways: ['gw-oropa', 'gw-mucrone', 'gw-rosazza', 'gw-piedicavallo', 'gw-bielmonte', 'gw-montesinaro'],
    sensors: [],
  },
  {
    n: 3,
    title: 'Sensoristica — primi 100 sensori',
    duration: '6-9 mesi',
    goal: 'Installare i primi sensori applicativi su tutta la rete.',
    deliverables: [
      'Idrologia e meteo per la protezione civile',
      'Pilot agricoltura, turismo e servizi comunali',
      'Automazioni e allerte via Node-RED',
    ],
    gateways: [],
    sensors: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13', 's14', 's15', 's16'],
  },
  {
    n: 4,
    title: 'Apertura — rete pubblica',
    duration: 'continuativa',
    goal: 'Aprire la rete a enti pubblici, aziende e cittadini.',
    deliverables: [
      'Governance (Fondazione/Associazione Valle Cervo Smart Network)',
      'Regole condivise per dispositivi di terzi',
      'Onboarding di Comuni, ARPA, Protezione Civile, scuole, maker',
    ],
    gateways: [],
    sensors: [],
  },
]
