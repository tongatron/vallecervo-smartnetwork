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
