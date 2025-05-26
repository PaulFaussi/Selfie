
/* const AttivitaController = require('./controller/AttivitaController');
const CalendarioController = require('./controller/CalendarioController');
const CategoriaController = require('./controller/CategoriaController');
const EventoController = require('./src/controller/EventoController'); */
const PomodoroController = require('./controller/PomodoroController');
const UtenteController = require('./controller/UtenteController');
const NoteController = require('./controller/NoteController');
const MessaggiController = require('./controller/MessaggiController');
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { server } = require('typescript');


var db;

// Time Machine
let serverDateTime = new Date;

setInterval(() => {
   serverDateTime = new Date(serverDateTime.getTime() + 1000);
}, 1000);




async function main() {
    const app = express();
    app.use(express.json());
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

    /* // creazione controllers
    const attivitaController = new AttivitaController(db);
    const calendarioController = new CalendarioController(db);
    const categoriaController = new CategoriaController(db);
    const eventoController = new EventoController(db); */
    const pomodoroController = new PomodoroController(db);
    const utenteController = new UtenteController(db);
    const noteController = new NoteController(db);
    const messaggiController = new MessaggiController(db);

    /* // creazione endpoints
    app.use('/attivita', attivitaController.router);
    app.use('/calendario', calendarioController.router);
    app.use('/categoria', categoriaController.router);
    app.use('/evento', eventoController.router); */
    app.use('/pomodoro', pomodoroController.router);
    app.use('/user', utenteController.router);
    app.use('/note', noteController.router);
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



 



  
  








