# Valle Cervo Smart Network — sito interattivo

🌐 **Sito live: [tongatron.org/vallecervo-smartnetwork](https://tongatron.org/vallecervo-smartnetwork/)**

Pagina interattiva di presentazione del progetto di **rete LoRaWAN pubblica e aperta**
per la Valle Cervo (Biella): obiettivi, tecnologie, fasi, costi, applicazioni e una
**mappa 3D** con una prima ipotesi di posizionamento di gateway e sensori.

UI in stile istituzionale/tecnologico. Stack 100% open source nel progetto descritto
(ChirpStack, Grafana, PostgreSQL, Node-RED).

## Mappa 3D con terreno reale

La mappa 3D ricostruisce il **terreno reale** della Valle Cervo a partire da dati di
elevazione DEM (tile **Terrarium**, AWS Open Data). I dati vengono scaricati, ricuciti e
campionati una sola volta dallo script `scripts/build-dem.mjs` e salvati nel repo come
`src/data/dem.json` (griglia di quote reali in metri). Così il sito resta interamente
**self-contained**, senza dipendenze esterne a runtime.

Gateway e sensori sono posizionati alle **coordinate geografiche reali** dei siti
candidati e proiettati sul terreno tramite interpolazione bilineare delle quote.

Per rigenerare il DEM (es. con un bounding box diverso):

```bash
node scripts/build-dem.mjs
```

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build statica in dist/
npm run preview  # anteprima della build
```

Deploy automatico su GitHub Pages a ogni push su `main`
(workflow `.github/workflows/deploy.yml`).

## Tecnologie del sito
- **Vite + React + TypeScript**
- **Three.js** via `@react-three/fiber` / `drei` per la mappa 3D (terreno da DEM reale,
  colori per fascia altimetrica e hillshade)
- **Recharts** per i grafici dei costi
- **lucide-react** per le icone

## Struttura
```
specs/                 # documenti in stile spec-kit (constitution, spec, plan)
scripts/build-dem.mjs  # genera src/data/dem.json dai tile DEM
src/data/              # dati di dominio: gateway, sensori, fasi, costi, dem, testi
src/components/         # sezioni del sito
src/components/Map3D/   # mappa 3D interattiva (terreno DEM) + fallback 2D
```

## Modificare i contenuti
Tutti i dati (gateway, sensori, fasi, costi, testi) sono in `src/data/`, separati dal
codice di presentazione: si possono aggiornare senza toccare i componenti.

## Note importanti
- Posizioni dei gateway, coperture e **costi sono indicativi/illustrativi**, da validare
  con uno studio radio professionale e preventivi reali.
- La mappa 3D ha un **fallback testuale/2D** se WebGL non è disponibile.

## Documenti di progetto
- `bozza progetto.md` — bozza originale dei contenuti
- `specs/constitution.md` — principi e identità visiva
- `specs/spec.md` — requisiti funzionali
- `specs/plan.md` — piano tecnico e stime
