# Valle Cervo Smart Network — sito interattivo

Pagina interattiva di presentazione del progetto di **rete LoRaWAN pubblica e aperta**
per la Valle Cervo (Biella): obiettivi, tecnologie, fasi, costi, applicazioni e una
**mappa 3D** con una prima ipotesi di posizionamento di gateway e sensori.

UI in stile istituzionale/tecnologico. Stack 100% open source nel progetto descritto
(ChirpStack, Grafana, PostgreSQL, Node-RED).

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build statica in dist/
npm run preview  # anteprima della build
```

## Tecnologie del sito
- **Vite + React + TypeScript**
- **Three.js** via `@react-three/fiber` / `drei` per la mappa 3D (rilievo stilizzato
  generato via codice, nessun dato DEM esterno)
- **Recharts** per i grafici dei costi
- **lucide-react** per le icone

## Struttura
```
specs/        # documenti in stile spec-kit (constitution, spec, plan)
src/data/     # dati di dominio: gateway, sensori, fasi, costi, applicazioni, testi
src/components/        # sezioni del sito
src/components/Map3D/  # mappa 3D interattiva + fallback 2D
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
