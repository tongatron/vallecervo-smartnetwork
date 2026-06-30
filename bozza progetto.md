# **Progetto: Rete LoRaWAN della Valle Cervo**

## **Titolo**

**Valle Cervo Smart Network**
 Una rete LoRaWAN aperta per il monitoraggio ambientale, la protezione civile e i servizi ai cittadini.

------

# **Obiettivi**

Realizzare una rete radio LoRaWAN che copra l’intera Valle Cervo mediante una serie di gateway installati in punti strategici.

La rete costituirà un’infrastruttura pubblica utilizzabile da:

- Comuni
- Protezione Civile
- ARPA
- aziende agricole
- allevatori
- operatori turistici
- università
- cittadini e maker

L’idea è creare un’infrastruttura condivisa, come una strada o la rete elettrica.

------

# **Motivazioni**

La Valle Cervo presenta caratteristiche ideali:

- territorio poco urbanizzato
- forte dislivello
- numerosi corsi d’acqua
- elevato rischio idrogeologico
- molti sentieri
- copertura cellulare non uniforme

Una rete LoRaWAN consente di collegare migliaia di sensori con consumi energetici minimi.

------

# **Infrastruttura**

## **Gateway principali**

Installazione iniziale di 6-8 gateway.

Possibili siti:

- Santuario di Oropa
- Monte Mucrone
- Bielmonte
- Rosazza
- Piedicavallo
- Andorno Micca
- Campiglia Cervo
- Montesinaro (eventuale)

Le posizioni definitive andrebbero determinate mediante uno studio radio.

------

## **Collegamento Internet**

Ogni gateway può utilizzare:

- fibra ottica dove disponibile
- ponte radio
- connessione 4G/5G
- Starlink nelle aree isolate

------

# **Copertura prevista**

Obiettivo:

- 95% del fondovalle
- tutti i principali centri abitati
- principali sentieri
- alpeggi
- aree agricole

------

# **Applicazioni**

## **Protezione civile**

Monitoraggio in tempo reale di:

- livelli torrenti
- pluviometri
- frane
- smottamenti
- temperatura
- neve

------

## **Turismo**

Sensori presso:

- rifugi
- sentieri
- parcheggi

Possibilità di:

- conteggio escursionisti
- monitoraggio meteo
- pulsanti SOS
- monitoraggio affollamento

------

## **Agricoltura**

Sensori per:

- umidità terreno
- temperatura
- irrigazione
- livello vasche
- monitoraggio bestiame

------

## **Comuni**

- illuminazione pubblica
- contatori acqua
- cassonetti intelligenti
- qualità dell’aria
- parcheggi

------

## **Ricerca**

Rete disponibile per:

- Università di Torino
- Politecnico di Torino
- scuole superiori
- maker
- associazioni

------

# **Architettura software**

Server LoRaWAN:

- ChirpStack

Dashboard:

- Grafana

Database:

- PostgreSQL

Automazione:

- Node-RED

Tutto software open source.

------

# **Fasi**

## **Fase 1**

2 gateway

Copertura del fondovalle.

Durata:

3 mesi.

------

## **Fase 2**

Aggiunta di altri 4 gateway.

Copertura dei comuni laterali.

Durata:

6 mesi.

------

## **Fase 3**

Installazione dei primi 100 sensori.

------

## **Fase 4**

Apertura della rete agli enti pubblici e ai cittadini.

# **Governance**

Si potrebbe costituire una **Fondazione** o un’**Associazione Valle Cervo Smart Network**, con la partecipazione di:

- Comuni della Valle Cervo;
- Unione Montana Valle Cervo - La Bürsch;
- associazioni locali;
- aziende;
- scuole;
- cittadini.

La rete potrebbe essere gestita come **infrastruttura aperta**, consentendo a enti e privati di installare dispositivi compatibili nel rispetto di regole condivise.

## **Evoluzioni future**

Una volta realizzata la rete LoRaWAN, si potrebbero aggiungere:

- gateway per reti mesh Wi-Fi nei centri abitati;
- sensori di qualità dell’acqua lungo il torrente Cervo;
- monitoraggio degli incendi boschivi;
- sistemi di allerta rapida per eventi meteorologici estremi;
- integrazione con dati satellitari e modelli previsionali.

Per una valle di dimensioni contenute come la Valle Cervo, un progetto di questo tipo è tecnicamente realizzabile con un investimento relativamente contenuto e potrebbe costituire una base tecnologica utile per protezione civile, gestione del territorio, turismo e agricoltura per molti anni.

È una buona domanda. In realtà **LoRaWAN e una rete mesh Wi-Fi hanno scopi molto diversi**, ma possono essere complementari.

### **Perché aggiungere una rete mesh Wi-Fi?**

LoRaWAN è ottima per i **sensori**, ma non può trasportare grandi quantità di dati. Ad esempio:

- una stazione meteo invia pochi byte ogni 10 minuti;
- un sensore di livello del torrente invia un numero ogni minuto;
- un contatore dell’acqua invia la lettura una volta al giorno.

Non può invece gestire:

- navigazione Internet;
- telecamere;
- telefonate VoIP;
- aggiornamenti software pesanti;
- accesso Wi-Fi pubblico.

Una rete **mesh Wi-Fi** serve proprio a questo.

### **Esempio in Valle Cervo**

Immagina il centro di Rosazza.

Potresti avere:

- **LoRaWAN** che collega:
  - i contatori dell’acqua;
  - il sensore del torrente;
  - i sensori meteo;
  - l’illuminazione pubblica.

E contemporaneamente una **mesh Wi-Fi** che offre:

- Wi-Fi gratuito nella piazza;
- connessione ai rifugi;
- collegamento delle webcam turistiche;
- connessione di computer comunali in edifici vicini;
- accesso temporaneo durante eventi o emergenze.

### **Un’altra possibilità: usare gli stessi pali**

Un vantaggio è che i pali o gli edifici su cui installi i gateway LoRaWAN possono ospitare anche:

- access point Wi-Fi;
- ponti radio;
- telecamere;
- sensori ambientali.

Così si sfrutta la stessa infrastruttura fisica (alimentazione, staffe, manutenzione).

### **Serve davvero?**

Dipende dall’obiettivo del progetto.

Se lo scopo è:

- monitoraggio ambientale;
- protezione civile;
- agricoltura;
- gestione dei servizi comunali;

allora **una rete LoRaWAN è sufficiente**.

Se invece vuoi creare una vera **infrastruttura digitale della valle**, allora puoi affiancare:

- **LoRaWAN** per l’IoT a basso consumo;
- **Wi-Fi mesh** per la connettività locale;
- **ponti radio** per collegare i nodi tra loro dove manca la fibra;
- eventualmente **fibra ottica** nei punti principali.

Per la Valle Cervo, personalmente partirei dalla sola LoRaWAN: è la parte con il miglior rapporto costi/benefici. La rete mesh Wi-Fi potrebbe essere un’evoluzione successiva, solo se emergerà un’esigenza concreta di connettività nei centri abitati o lungo i percorsi turistici