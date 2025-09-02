// backend/app.js
const PomodoroController = require('./controller/PomodoroController');
const UtenteController = require('./controller/UtenteController');
const NoteController = require('./controller/NoteController');
const MessaggiController = require('./controller/MessaggiController');
const GenericController = require('./controller/GenericController');

const EventController = require('./controller/EventController');
const createAttivitaRouter = require('./controller/AttivitaController');
const createUnavailabilityRouter = require('./controller/UnavailabilityController');

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

let db;

// Time Machine
let serverDateTime = new Date;

setInterval(() => {
   serverDateTime = new Date(serverDateTime.getTime() + 1000);
}, 1000);

async function main() {
  const app = express();
  const port = 9000;

  // Middleware
  app.use(express.json());

  app.use(cors()); 
  const corsOptions = {
    origin: 'http://localhost:4200', //problemi su macchina dipartimento ??
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }; 

  db = await connectToDB(); // ✅ CORRETTO: salviamo il db restituito

  // Controllers che usano direttamente MongoDB
  // creazione controllers
  /* const attivitaController = new AttivitaController(db);
  const eventoController = new EventController(db); */
  const pomodoroController = new PomodoroController(db);
  const utenteController = new UtenteController(db);
  const noteController = new NoteController(db);
  const messaggiController = new MessaggiController(db);
  const genericController = new GenericController();
  const eventoController = new EventController(db);

  // creazione endpoints
  app.use('/evento', eventoController.router);
  app.use('/attivita', createAttivitaRouter(db));
  app.use('/unavailability', createUnavailabilityRouter(db));
  /*app.use('/calendario', calendarioController.router); */
  app.use('/pomodoro', pomodoroController.router);
  app.use('/generic', genericController.router);
  app.use('/user', utenteController.router);
  app.use('/utente', utenteController.router);
  app.use('/notes', noteController.router);
  app.use('/messaggi', messaggiController.router);


  // TODO (pf): assicurarmi che questo endpoint sulla time machine non serva più (abbiamo l'endpoint dedicato dentro GenericController
  // //endpoint Time Machine
  // app.post('/timeMachine', (req, res) => {
  //     const { newDateTime } = req.body;
  //
  //     if(newDateTime === "Now"){
  //         updatedTime = new Date();
  //     }
  //     else{
  //         updatedTime = new Date(newDateTime);
  //     }
  //
  //     if (isNaN(updatedTime.getTime())) {
  //       return res.status(400).json({ error: 'Formato data/ora non valido.' });
  //     }
  //
  //     updatedTime.setHours(updatedTime.getHours() + 1); //correzione fuso orario
  //     serverDateTime = updatedTime;
  //
  //     console.log("Data e ora aggiornati: ", serverDateTime);
  //     res.status(200).json({ message: 'Data e ora aggiornate con successo!', serverDateTime});
  // });

  app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
  });
}

main();

async function connectToDB() {
    const uri = "mongodb://localhost:27017/Selfie";                 // URL TEST LOCALE
    // const uri = "mongodb://sam:sam@mongo_site232437:27017/Selfie?authSource=Selfie";       URL MACCHINE UNI
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(); // ✅ CORRETTO: otteniamo l'oggetto database

        const adminDb = db.admin();
        const pingResult = await adminDb.ping();

        if (pingResult.ok === 1) {
            console.log("Connessione al database stabilita.");
        } else {
            throw new Error("Errore connessione al DB.");
        }

        return db; // ✅ Ritorna il database

    } catch(error) {
        console.error("Errore nel connettersi al DB\n", error);
        throw error;
    }
}
