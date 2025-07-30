// backend/app.js

/* const AttivitaController = require('./controller/AttivitaController');
const CalendarioController = require('./controller/CalendarioController');
const CategoriaController = require('./controller/CategoriaController');
const EventoController = require('./src/controller/EventoController'); */
const PomodoroController = require('./controller/PomodoroController');
const UtenteController = require('./controller/UtenteController');
const NoteController = require('./controller/NoteController');
const MessaggiController = require('./controller/MessaggiController');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { server } = require('typescript');

// Import controller/router
const UtenteController = require('./controller/UtenteController');
const NoteController = require('./controller/NoteController');
const eventRouter = require('./controller/EventController');
const attivitaRouter = require('./controller/AttivitaController');
const unavailabilityRouter = require('./controller/UnavailabilityController');


// Time Machine
let serverDateTime = new Date;

setInterval(() => {
   serverDateTime = new Date(serverDateTime.getTime() + 1000);
}, 1000);




async function main() {
const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/evento', eventRouter);
app.use('/attivita', attivitaRouter);
app.use('/unavailability', unavailabilityRouter);

    const corsOptions = {
        origin: 'http://localhost:4200', //problemi su macchina dipartimento ??
        methods:['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    };
    // app.use(cors({
    //     origin: 'http://localhost:4200' //problemi su macchina dipartimento ??
    // }));
    app.use(cors(corsOptions));

    const port = 8000;
    await connectToDB();

// Connessione a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Selfie', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connesso a MongoDB');
  startServer();
})
.catch(err => {
  console.error('❌ Errore nella connessione a MongoDB:', err);
  process.exit(1);
});

function startServer() {
  // Controllers che usano direttamente MongoDB
  const db = mongoose.connection.db;
    /* // creazione controllers
    const attivitaController = new AttivitaController(db);
    const calendarioController = new CalendarioController(db);
    const categoriaController = new CategoriaController(db);
    const eventoController = new EventoController(db); */
    const pomodoroController = new PomodoroController(db);
  const utenteController = new UtenteController(db);
  const noteController = new NoteController(db);

    /* // creazione endpoints
    app.use('/attivita', attivitaController.router);
    app.use('/calendario', calendarioController.router);
    app.use('/categoria', categoriaController.router);
    app.use('/evento', eventoController.router); */
    app.use('/pomodoro', pomodoroController.router);
    app.use('/user', utenteController.router);
  // Rotte
  app.use('/utente', utenteController.router);
  app.use('/note', noteController.router);
  app.use('/evento', eventRouter); // Eventi già pronti con mongoose
    app.use('/messaggi', messaggiController.router);


    //endpoint Time Machine
    app.post('/timeMachine', (req, res) => {
        const { newDateTime } = req.body;

        if(newDateTime == "Now"){
            updatedTime = new Date();
        }
        else{
            updatedTime = new Date(newDateTime);
        }

        if (isNaN(updatedTime.getTime())) {
          return res.status(400).json({ error: 'Formato data/ora non valido.' });
        }

        updatedTime.setHours(updatedTime.getHours() + 1); //correzione fuso orario
        serverDateTime = updatedTime;

        console.log("Data e ora aggiornati: ", serverDateTime);
        res.status(200).json({ message: 'Data e ora aggiornate con successo!', serverDateTime});
    });


  app.listen(port, () => {
    console.log(`🚀 Server in esecuzione su http://localhost:${port}`);
  });
}
        console.log(`Server in esecuzione su http://localhost:${port}`);
    });


}

main();



async function connectToDB() {
    const uri = "mongodb://localhost:27017/selfie_2";                 // URL TEST LOCALE
    /* const uri = 'mongodb://mongo_site232437:27017/Selfie' */     // URL MACCHINE UNI
    const client = new MongoClient(uri);

    try {
        await client.connect();

        db = client.db();

        const adminDb = client.db().admin();
        const pingResult = await adminDb.ping();

        // TODO viene stampato il messaggio di successo anche quando la connessione non viene stabilita
        if (pingResult.ok === 1) {
            console.log("Connessione al database stabilita.");
        } else {
            throw new Error("Errore connessione al DB.");
        }

    } catch(error) {
        console.error("Errore nel connettersi al DB\n");
    }

}

















