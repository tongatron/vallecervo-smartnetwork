import type { SensorCategory } from './sensors'

export interface Application {
  id: string
  title: string
  icon: string // nome icona lucide
  category: SensorCategory
  examples: string[]
  benefit: string
}

export const applications: Application[] = [
  {
    id: 'protezione-civile',
    title: 'Protezione civile',
    icon: 'ShieldAlert',
    category: 'idro',
    examples: ['Livelli dei torrenti', 'Pluviometri', 'Frane e smottamenti', 'Temperatura e neve'],
    benefit: 'Allerta precoce su rischio idrogeologico, dati in tempo reale per i Comuni.',
  },
  {
    id: 'turismo',
    title: 'Turismo',
    icon: 'Mountain',
    category: 'turismo',
    examples: ['Conteggio escursionisti', 'Meteo nei rifugi', 'Pulsanti SOS', 'Affollamento parcheggi'],
    benefit: 'Sicurezza sui sentieri e servizi migliori per i visitatori.',
  },
  {
    id: 'agricoltura',
    title: 'Agricoltura e allevamento',
    icon: 'Sprout',
    category: 'agricoltura',
    examples: ['Umidità del terreno', 'Irrigazione', 'Livello vasche', 'Monitoraggio bestiame'],
    benefit: 'Risparmio idrico e supporto alle aziende agricole di montagna.',
  },
  {
    id: 'comuni',
    title: 'Servizi comunali',
    icon: 'Building2',
    category: 'comuni',
    examples: ['Illuminazione pubblica', 'Contatori acqua', 'Cassonetti intelligenti', 'Qualità aria', 'Parcheggi'],
    benefit: 'Efficienza e risparmio nei servizi pubblici comunali.',
  },
  {
    id: 'escursionisti',
    title: 'Sicurezza escursionisti (GPS)',
    icon: 'Compass',
    category: 'meshtastic',
    examples: ['Condivisione posizione GPS', 'Messaggistica off-grid', 'Pulsante SOS', 'Tracciamento gruppi'],
    benefit: 'Comunicazione e localizzazione anche dove non arriva il cellulare, senza SIM né canoni, tramite dispositivi Meshtastic a mesh.',
  },
  {
    id: 'ricerca',
    title: 'Ricerca e scuole',
    icon: 'GraduationCap',
    category: 'meteo',
    examples: ['Università di Torino', 'Politecnico di Torino', 'Scuole superiori', 'Maker e associazioni'],
    benefit: 'Infrastruttura aperta per progetti didattici e di ricerca sul territorio.',
  },
]
