// Testi centralizzati delle sezioni narrative.

export const site = {
  title: 'Valle Cervo Smart Network',
  subtitle:
    'Una rete LoRaWAN aperta per il monitoraggio ambientale, la protezione civile e i servizi ai cittadini.',
  claim:
    'Un’infrastruttura pubblica e condivisa per la Valle Cervo — come una strada o la rete elettrica, ma per i dati del territorio.',
}

export const why = {
  title: 'Perché proprio la Valle Cervo',
  intro:
    'Il territorio della Valle Cervo (Biella) ha caratteristiche ideali per una rete a lungo raggio e bassissimo consumo.',
  points: [
    { title: 'Territorio poco urbanizzato', text: 'Ampie aree naturali dove la sensoristica diffusa fa la differenza.' },
    { title: 'Forte dislivello', text: 'Dalle vette al fondovalle: poche antenne in quota coprono molto territorio.' },
    { title: 'Numerosi corsi d’acqua', text: 'Torrenti e rischio idrogeologico da monitorare in continuo.' },
    { title: 'Molti sentieri e alpeggi', text: 'Turismo e attività agro-pastorali da supportare con dati e sicurezza.' },
    { title: 'Copertura cellulare non uniforme', text: 'LoRaWAN raggiunge dove il 4G/5G non arriva, con consumi minimi.' },
    { title: 'Migliaia di sensori possibili', text: 'Un solo gateway serve centinaia di dispositivi a basso costo.' },
  ],
}

export const architecture = {
  title: 'Come funziona la rete',
  intro:
    'I sensori inviano pochi byte via radio LoRa ai gateway, che li inoltrano al server. Tutto su software open source.',
  stack: [
    { name: 'ChirpStack', role: 'Network server LoRaWAN' },
    { name: 'PostgreSQL', role: 'Database dei dati' },
    { name: 'Grafana', role: 'Dashboard e visualizzazione' },
    { name: 'Node-RED', role: 'Automazioni e allerte' },
  ],
  backhaul: ['Fibra ottica', 'Ponte radio', '4G/5G', 'Starlink (aree isolate)'],
  power: ['Rete elettrica (centri abitati)', 'Solare + batteria (vette e siti isolati)'],
}

// Portata indicativa dei dispositivi radio, per il grafico in sezione Tecnologia/Meshtastic.
// Valori tipici, fortemente dipendenti da orografia, vegetazione e linea di vista (LoS).
export const rangeData = [
  { tech: 'Meshtastic nodo↔nodo (bosco/abitato)', km: 2 },
  { tech: 'LoRaWAN gateway↔sensore (fondovalle)', km: 5 },
  { tech: 'Meshtastic nodo↔nodo (crinale, LoS)', km: 8 },
  { tech: 'LoRaWAN gateway↔sensore (vetta, LoS)', km: 15 },
]

export const meshtastic = {
  title: 'Meshtastic — comunicazione e GPS off-grid',
  intro:
    'Accanto alla rete LoRaWAN, la Valle Cervo può ospitare anche una rete Meshtastic: dispositivi tascabili open source che parlano tra loro in modalità mesh, senza bisogno di SIM, internet o un gestore di rete.',
  characteristics: [
    {
      title: 'Funzionamento a nodi (mesh)',
      text: 'Ogni dispositivo è un nodo che riceve e ritrasmette i messaggi dei nodi vicini, "saltando" di nodo in nodo (multi-hop) fino a destinazione: non serve un gateway centrale come in LoRaWAN.',
    },
    {
      title: 'Nessuna infrastruttura richiesta',
      text: 'I dispositivi formano la rete tra loro: bastano alcuni nodi sui crinali/sentieri per estendere la copertura, anche dove non c’è nessun gateway LoRaWAN.',
    },
    {
      title: 'Messaggistica e GPS off-grid',
      text: 'Messaggi di testo cifrati e condivisione della posizione GPS tra escursionisti, anche senza copertura cellulare.',
    },
    {
      title: 'Nessun canone',
      text: 'Nessuna SIM, nessun abbonamento: solo l’acquisto del dispositivo (~80–150 € l’uno).',
    },
    {
      title: 'Autonomia lunga',
      text: 'Batteria che dura giorni o settimane, ricaricabile anche con un piccolo pannello solare portatile.',
    },
    {
      title: 'Open source',
      text: 'Firmware e protocollo aperti, comunità attiva, hardware economico basato su chip LoRa.',
    },
  ],
  comparison: [
    { aspect: 'Topologia', lorawan: 'A stella (sensori → gateway)', mesh: 'A maglia (nodo → nodo → nodo)' },
    { aspect: 'Infrastruttura', lorawan: 'Richiede gateway fissi', mesh: 'I dispositivi stessi sono la rete' },
    { aspect: 'Uso tipico', lorawan: 'Sensori fissi, invio dati periodico', mesh: 'Persone in movimento, messaggi e GPS' },
    { aspect: 'Connessione a Internet', lorawan: 'Sempre (via gateway)', mesh: 'Opzionale (solo se un nodo fa da bridge)' },
    { aspect: 'Costi ricorrenti', lorawan: 'Canone dati/satellite sui gateway', mesh: 'Nessuno' },
  ],
  hiking: {
    title: 'GPS e sicurezza per escursionisti',
    text:
      'Un piccolo numero di dispositivi Meshtastic, distribuiti tra rifugi, bivacchi e punti panoramici della Valle Cervo, può offrire a escursionisti e soccorso alpino: condivisione in tempo reale della posizione GPS del gruppo, messaggistica di testo anche senza campo, e un pulsante SOS che inoltra l’allarme di nodo in nodo fino al primo punto con connettività (rifugio o gateway LoRaWAN/Internet).',
  },
}

export const governance = {
  title: 'Governance e futuro',
  intro:
    'La rete può essere gestita come infrastruttura aperta da una Fondazione o Associazione "Valle Cervo Smart Network".',
  partners: [
    'Comuni della Valle Cervo',
    'Unione Montana Valle Cervo - La Bürsch',
    'Associazioni locali',
    'Aziende e scuole',
    'Cittadini e maker',
  ],
  future: [
    'Mesh Wi-Fi nei centri abitati',
    'Sensori qualità dell’acqua lungo il Cervo',
    'Monitoraggio incendi boschivi',
    'Allerta rapida per eventi meteo estremi',
    'Integrazione con dati satellitari e modelli previsionali',
  ],
}
