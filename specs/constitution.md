# Costituzione di progetto — Valle Cervo Smart Network (sito interattivo)

Documento di riferimento (stile spec-kit) che fissa i principi non negoziabili
per la realizzazione della pagina interattiva di presentazione del progetto
di rete LoRaWAN della Valle Cervo.

## Principi

### I. Chiarezza istituzionale prima dell'effetto
Il sito comunica un'infrastruttura pubblica. Ogni scelta grafica deve aumentare
la comprensione e la credibilità del progetto verso Comuni, enti e cittadini.
Niente effetti che ostacolino la leggibilità dei dati (costi, fasi, copertura).

### II. Dati verificabili e tracciabili
Costi, numero di gateway, durate delle fasi e siti candidati provengono dalla
bozza di progetto (`bozza progetto.md`) o da stime esplicitamente segnalate
come tali. Ogni numero presente nel sito ha origine in `spec.md` o `plan.md`.

### III. Tutto open / self-contained dove possibile
Coerente con lo spirito del progetto (ChirpStack, Grafana, PostgreSQL, Node-RED
open source), il sito non dipende da servizi proprietari a pagamento. La mappa 3D
è generata via codice (Three.js), senza tile o DEM esterni obbligatori.

### IV. Accessibilità e responsività
Contrasto AA, navigazione da tastiera, testo leggibile su mobile. La mappa 3D
ha sempre un fallback testuale/2D con le stesse informazioni.

### V. Manutenibilità
Dati (gateway, sensori, fasi, costi) separati dal codice di presentazione, in
file di dati dedicati, così che un non-sviluppatore possa aggiornarli.

## Identità visiva

- **Tono**: istituzionale + tecnologico. Sobrio, affidabile, "infrastruttura pubblica".
- **Palette**:
  - Blu istituzionale profondo `#0B2E4F` (primario)
  - Verde valle/alpino `#2E7D5B` (secondario, ambiente)
  - Azzurro tecnologico `#3DA5D9` (accent, dati/segnale)
  - Grigio neutro `#1A2230` / `#F4F6F8` (superfici scuro/chiaro)
  - Ambra `#E0A050` (allerta / protezione civile)
- **Tipografia**: sans-serif geometrica per i titoli (es. Inter / Space Grotesk),
  sans-serif leggibile per il corpo.
- **Iconografia**: lineare, coerente, tema IoT/montagna.

## Governance del documento
Le modifiche alla costituzione richiedono aggiornamento di `spec.md` e `plan.md`
se ne intaccano i contenuti. Versione 1.0.0 — 2026-06-30.
