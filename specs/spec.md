# Specifica funzionale — Sito interattivo "Valle Cervo Smart Network"

**Stato**: bozza 1.0 · **Data**: 2026-06-30 · **Fonte contenuti**: `bozza progetto.md`

## 1. Scopo
Pagina web interattiva che presenta in modo chiaro e convincente il progetto di
rete LoRaWAN per la Valle Cervo (Biella): obiettivi, tecnologie, fasi, costi,
applicazioni e una mappa 3D con una prima ipotesi di posizionamento di gateway e
sensori. Destinatari: amministratori comunali, Unione Montana, enti (ARPA,
Protezione Civile), potenziali partner e cittadini.

## 2. Personas
- **Amministratore / decisore**: vuole capire utilità, costi e fasi in pochi minuti.
- **Tecnico / partner**: vuole architettura, scelte tecnologiche, copertura.
- **Cittadino / curioso**: vuole capire "a cosa serve" con esempi concreti.

## 3. Requisiti funzionali (FR)

### FR-1 Hero / introduzione
Titolo, sottotitolo, claim "infrastruttura pubblica come una strada", CTA verso
mappa e fasi.

### FR-2 Sezione "Perché qui"
Motivazioni territoriali della bozza (poco urbanizzato, dislivello, corsi d'acqua,
rischio idrogeologico, copertura cellulare non uniforme). Mostrate come schede.

### FR-3 Architettura tecnologica
Diagramma del flusso dati: Sensori → LoRaWAN → Gateway → ChirpStack → DB
PostgreSQL → Grafana / Node-RED. Backhaul: fibra / ponte radio / 4-5G / Starlink.
Box con lo stack open source.

### FR-4 Mappa 3D interattiva (cuore del sito)
- Rilievo stilizzato della Valle Cervo generato via Three.js (no DEM esterno).
- Marker **gateway** (6-8) nei siti candidati con cerchi/coni di copertura.
- Marker **sensori** di esempio per categoria (torrente, pluviometro, meteo, frana,
  agricoltura, turismo).
- Interazione: orbita/zoom, click su un nodo → pannello con dettagli.
- Toggle: mostra/nascondi copertura, filtra per fase, filtra per tipo sensore.
- **Fallback** 2D/elenco se WebGL non disponibile.

### FR-5 Timeline delle fasi
4 fasi della bozza (Fase 1: 2 gateway/3 mesi; Fase 2: +4 gateway/6 mesi;
Fase 3: primi 100 sensori; Fase 4: apertura a enti e cittadini). Interattiva:
clic su una fase evidenzia gateway/sensori corrispondenti sulla mappa.

### FR-6 Costi
Tabella e grafici di stima CAPEX (gateway, sensori, installazione, backhaul) e
OPEX annuale (connettività, manutenzione, hosting). Aggregati per fase. Tutti i
valori marcati come **stime indicative** da validare con studio radio e preventivi.

### FR-7 Applicazioni
Schede per: Protezione civile, Turismo, Agricoltura, Comuni, Ricerca — con esempi
di sensori e benefici, dalla bozza.

### FR-8 Governance ed evoluzioni
Fondazione/Associazione, infrastruttura aperta; evoluzioni future (mesh Wi-Fi,
qualità acqua, incendi, allerta meteo, dati satellitari).

### FR-9 Footer
Disclaimer "documento di progetto, valori indicativi", crediti, licenza, contatti.

## 4. Requisiti non funzionali
- **NFR-1** Responsive (mobile → desktop), contrasto AA, navigazione tastiera.
- **NFR-2** Caricamento iniziale < 3s su connessione media; mappa 3D lazy-loaded.
- **NFR-3** Dati di dominio (gateway, sensori, fasi, costi) in file dati separati.
- **NFR-4** Multilingua non richiesto in v1 (solo italiano), ma testi centralizzati.

## 5. Dati di dominio (riassunto, dettaglio in `data/`)
- **Gateway candidati**: Oropa, Monte Mucrone, Bielmonte, Rosazza, Piedicavallo,
  Andorno Micca, Campiglia Cervo, Montesinaro (eventuale).
- **Categorie sensori**: idro (livello torrenti, pluviometri), meteo/neve,
  geo (frane/smottamenti), agricoltura (umidità, irrigazione, bestiame),
  turismo (conta-escursionisti, SOS, meteo rifugi), comuni (illuminazione, acqua,
  rifiuti, aria, parcheggi).

## 6. Out of scope (v1)
- Backend reale / dati live da sensori.
- Studio radio professionale (le coperture sono illustrative).
- Autenticazione, area riservata.

## 7. Criteri di accettazione
- Tutte le sezioni FR-1..FR-9 presenti e navigabili.
- Mappa 3D interattiva con almeno 8 gateway e ≥12 sensori d'esempio, con fallback.
- Costi e fasi coerenti con i dati in `data/` e marcati come stime.
- Funziona offline dopo build (nessuna dipendenza esterna obbligatoria a runtime).
