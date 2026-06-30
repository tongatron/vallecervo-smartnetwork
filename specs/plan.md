# Piano tecnico — Sito interattivo "Valle Cervo Smart Network"

**Data**: 2026-06-30 · Riferimenti: `constitution.md`, `spec.md`

## 1. Stack
- **Build**: Vite + React 18 + TypeScript.
- **3D**: Three.js via `@react-three/fiber` + `@react-three/drei`.
- **Stato UI**: React state/Context leggero (nessuna libreria pesante).
- **Stile**: CSS variables (palette costituzione) + CSS modules / plain CSS.
- **Grafici costi**: `recharts` (bar/area, leggero) oppure SVG custom.
- **Icone**: `lucide-react`.
- **Deploy**: build statica → GitHub Pages / Netlify.

## 2. Architettura cartelle
```
src/
  main.tsx, App.tsx
  theme.css                # variabili palette/tipografia
  data/
    gateways.ts            # 8 gateway: nome, coord stilizzate, quota, fase, backhaul
    sensors.ts             # sensori d'esempio: tipo, categoria, gateway, posizione
    phases.ts              # 4 fasi: titolo, durata, deliverable, id gateway/sensori
    costs.ts               # voci CAPEX/OPEX per fase (stime)
    applications.ts        # schede applicazioni
    content.ts             # testi sezioni (hero, perché, governance...)
  components/
    Nav.tsx, Hero.tsx, Why.tsx, Architecture.tsx,
    Map3D/ (Scene, Terrain, GatewayNode, SensorNode, CoverageDome, InfoPanel, Controls, Fallback)
    Phases.tsx, Costs.tsx, Applications.tsx, Governance.tsx, Footer.tsx
  hooks/useWebGL.ts
```

## 3. Mappa 3D (approccio stilizzato, no DEM esterno)
- Terreno: piano deformato proceduralmente (heightmap generata via funzione di
  rumore deterministica) che evoca una valle a V con fondovalle dove scorre il
  Cervo; nessun dato esterno → coerente con principio III costituzione.
- Sistema di coordinate locale: le posizioni dei gateway/sensori sono normalizzate
  (x,z in [-1,1]) in `data/`, con quota relativa per il rilievo.
- Gateway: mesh palo+antenna + `CoverageDome` semitrasparente (raggio ~ portata).
- Sensori: piccoli marker colorati per categoria; istanziati per performance.
- Interazione: `OrbitControls`, raycasting su click → `InfoPanel`.
- Filtri: per fase e per categoria sensore; toggle copertura.
- Performance: instancing per i sensori, dome a bassa risoluzione, `frameloop="demand"`.
- Fallback (`hooks/useWebGL`): se no WebGL → componente elenco 2D con stessi dati.

## 4. Dati e stime costi (indicativi, da validare)
Ordine di grandezza per la pianificazione (EUR), da sostituire con preventivi:
- Gateway outdoor LoRaWAN (8 dBi, IP67) + installazione/palo: ~1.500–3.000 €/gw.
- Backhaul: 4G/router ~150 € + ~15 €/mese; Starlink ~450 € + ~50 €/mese (siti isolati).
- Sensori IoT LoRaWAN: 80–400 € cad. a seconda del tipo.
- Server (ChirpStack/Grafana) su VPS o mini-PC: ~300–800 € + hosting ~10–30 €/mese.
- Le cifre esatte vivono in `data/costs.ts` con flag `stima: true`.

## 5. Sezioni → componenti (mappatura FR)
| FR | Componente |
|----|-----------|
| FR-1 | Hero |
| FR-2 | Why |
| FR-3 | Architecture (diagramma SVG) |
| FR-4 | Map3D/* |
| FR-5 | Phases |
| FR-6 | Costs (recharts) |
| FR-7 | Applications |
| FR-8 | Governance |
| FR-9 | Footer |

## 6. Tappe di implementazione
1. Scaffold Vite+TS+React, dipendenze, `theme.css`, Nav + layout scroll.
2. File `data/*` completi (single source of truth).
3. Sezioni statiche: Hero, Why, Architecture, Applications, Governance, Footer.
4. Phases (timeline interattiva).
5. Costs (tabella + grafici).
6. Map3D: terreno → gateway → copertura → sensori → interazione → filtri → fallback.
7. Collegamento Phases ↔ Map3D (evidenziazione).
8. Polish responsive/accessibilità, README, build di verifica.

## 7. Rischi / mitigazioni
- Performance 3D su mobile → instancing, demand frameloop, limitare sensori visibili.
- Realismo geografico → dichiarato "stilizzato/illustrativo" in UI (no fuorvianza).
- Stime costi → ovunque etichettate come indicative.

## 8. Verifica
`npm run build` senza errori; `npm run dev` mostra tutte le sezioni; mappa
interattiva e fallback testati; controllo contrasto/tastiera sulle CTA principali.
