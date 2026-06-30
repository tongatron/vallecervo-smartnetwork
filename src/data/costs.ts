// STIME INDICATIVE (EUR) per la pianificazione — NON preventivi.
// Da validare con studio radio e offerte dei fornitori. Vedi plan.md §4.

export const costsDisclaimer =
  'Valori indicativi a scopo di pianificazione, da validare con studio radio e preventivi reali.'

export interface CostItem {
  label: string
  capex: number // costo una tantum totale stimato
  opexYear: number // costo annuo ricorrente stimato
  phase: 1 | 2 | 3 | 4
  detail: string
}

export const costItems: CostItem[] = [
  { label: '2 gateway fondovalle', capex: 5000, opexYear: 400, phase: 1, detail: '2 × gateway outdoor IP67 + palo/installazione' },
  { label: 'Server ChirpStack + Grafana', capex: 600, opexYear: 240, phase: 1, detail: 'Mini-PC / VPS + hosting e backup' },
  { label: 'Connettività fase 1', capex: 300, opexYear: 360, phase: 1, detail: 'Router 4G + SIM dati' },
  { label: '6 gateway aggiuntivi', capex: 16000, opexYear: 1200, phase: 2, detail: 'Vette/comuni: alcuni con ponte radio' },
  { label: 'Backhaul aree isolate (Starlink)', capex: 900, opexYear: 1200, phase: 2, detail: '2 siti satellitari (Piedicavallo, Montesinaro)' },
  { label: 'Ponti radio vetta', capex: 2400, opexYear: 100, phase: 2, detail: 'Mucrone ↔ Bielmonte e dorsale' },
  { label: '100 sensori IoT', capex: 18000, opexYear: 500, phase: 3, detail: 'Mix idro/meteo/geo/agri/turismo (80–400 € cad.)' },
  { label: 'Installazione e calibrazione sensori', capex: 6000, opexYear: 1500, phase: 3, detail: 'Sopralluoghi, staffe, manutenzione' },
  { label: 'Governance e formazione', capex: 3000, opexYear: 2000, phase: 4, detail: 'Costituzione ente, formazione, comunicazione' },
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
