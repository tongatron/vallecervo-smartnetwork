// STIME INDICATIVE (EUR) per la pianificazione — NON preventivi.
// Da validare con studio radio e offerte dei fornitori. Vedi plan.md §4.

export const costsDisclaimer =
  'Valori indicativi a scopo di pianificazione, da validare con studio radio e preventivi reali.'

export type CostCategory = 'Hardware' | 'Energia' | 'Connettività' | 'Manutenzione' | 'Hosting' | 'Governance'

export const categoryColor: Record<CostCategory, string> = {
  Hardware: '#3DA5D9',
  Energia: '#E0A050',
  Connettività: '#8ECae6',
  Manutenzione: '#2E7D5B',
  Hosting: '#C77DFF',
  Governance: '#9AA7B5',
}

export interface CostItem {
  label: string
  capex: number // costo una tantum totale stimato
  opexYear: number // costo annuo ricorrente stimato
  phase: 1 | 2 | 3 | 4
  category: CostCategory
  detail: string
}

export const costItems: CostItem[] = [
  { label: '2 gateway fondovalle', capex: 5000, opexYear: 0, phase: 1, category: 'Hardware', detail: '2 × gateway outdoor IP67 + palo/installazione, alimentati da rete elettrica' },
  { label: 'Server ChirpStack + Grafana', capex: 600, opexYear: 240, phase: 1, category: 'Hosting', detail: 'Mini-PC / VPS, canone hosting e backup dati' },
  { label: 'Connettività fase 1', capex: 300, opexYear: 360, phase: 1, category: 'Connettività', detail: 'Router 4G + canone SIM dati per 2 gateway' },
  { label: '6 gateway aggiuntivi', capex: 16000, opexYear: 0, phase: 2, category: 'Hardware', detail: 'Vette/comuni: alcuni con ponte radio' },
  { label: 'Alimentazione solare siti isolati', capex: 2400, opexYear: 150, phase: 2, category: 'Energia', detail: 'Pannello + batteria + regolatore per 3 gateway senza rete elettrica (Piedicavallo, Montesinaro, Mucrone); l’OPEX copre solo sostituzione batterie/manutenzione, l’energia solare è gratuita' },
  { label: 'Backhaul aree isolate (Starlink)', capex: 900, opexYear: 1200, phase: 2, category: 'Connettività', detail: 'Canone abbonamento satellitare per 2 siti isolati (Piedicavallo, Montesinaro)' },
  { label: 'Ponti radio vetta', capex: 2400, opexYear: 100, phase: 2, category: 'Connettività', detail: 'Mucrone ↔ Bielmonte e dorsale, manutenzione allineamento antenne' },
  { label: '100 sensori IoT', capex: 18000, opexYear: 0, phase: 3, category: 'Hardware', detail: 'Mix idro/meteo/geo/agri/turismo (80–400 € cad.), batteria pluriennale: consumo energetico trascurabile' },
  { label: 'Dispositivi Meshtastic GPS escursionisti', capex: 4000, opexYear: 0, phase: 3, category: 'Hardware', detail: '~25 dispositivi tascabili GPS/SOS a mesh, nessun canone (no SIM, nessuna infrastruttura richiesta)' },
  { label: 'Installazione e calibrazione sensori', capex: 6000, opexYear: 1500, phase: 3, category: 'Manutenzione', detail: 'Sopralluoghi sul campo, staffe, ricalibrazione periodica e logistica in quota' },
  { label: 'Governance e formazione', capex: 3000, opexYear: 2000, phase: 4, category: 'Governance', detail: 'Costituzione ente, formazione operatori, comunicazione verso cittadini' },
]

// Aggregati per fase, calcolati dai costItems.
export interface PhaseCost {
  phase: number
  label: string
  capex: number
  opexYear: number
}

export const phaseCosts: PhaseCost[] = [1, 2, 3, 4].map((p) => {
  const items = costItems.filter((c) => c.phase === p)
  return {
    phase: p,
    label: `Fase ${p}`,
    capex: items.reduce((s, c) => s + c.capex, 0),
    opexYear: items.reduce((s, c) => s + c.opexYear, 0),
  }
})

export const totalCapex = costItems.reduce((s, c) => s + c.capex, 0)
export const totalOpexYear = costItems.reduce((s, c) => s + c.opexYear, 0)

// Composizione dell'OPEX annuo per categoria (per il grafico a torta).
export interface OpexSlice {
  category: CostCategory
  value: number
}

export const opexByCategory: OpexSlice[] = (Object.keys(categoryColor) as CostCategory[])
  .map((category) => ({
    category,
    value: costItems.filter((c) => c.category === category).reduce((s, c) => s + c.opexYear, 0),
  }))
  .filter((s) => s.value > 0)

// Risposta esplicita: il consumo elettrico dei dispositivi NON è una voce di costo
// rilevante. I sensori LoRaWAN/Meshtastic durano anni con una batteria (mA-level,
// trasmissioni di pochi secondi al giorno). I gateway richiedono alimentazione
// continua ma il costo energetico è marginale: dove non c'è rete elettrica si usa
// un kit solare (CAPEX una tantum), non un canone energia ricorrente.
export const opexExplain = [
  { label: 'Connettività', text: 'Canoni SIM dati / satellitari per il backhaul dei gateway verso Internet.' },
  { label: 'Manutenzione', text: 'Sopralluoghi in quota, ricalibrazione sensori, sostituzione batterie e controllo pannelli solari.' },
  { label: 'Hosting', text: 'Server/VPS per ChirpStack, Grafana, backup e storage dei dati.' },
  { label: 'Energia', text: 'Marginale: i sensori durano anni a batteria, i gateway isolati usano kit solari (costo una tantum, non un canone).' },
  { label: 'Governance', text: 'Formazione, comunicazione e coordinamento dell’ente gestore della rete.' },
]
