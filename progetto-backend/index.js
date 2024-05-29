const express = require('express');
const mongoose = require('mongoose');
const Utente = require('./models/Utente');

/** 
 * Connessione a MongoDB 
 */
async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connesso a MongoDB');
    } catch (error) {
        console.error('Errore di connessione a MongoDB:', error);
        process.exit(1);
    }
}

async function main() {
    const app = express();
    const port = 8000;

    await connectToDB();
    
    // Middleware per parsing del body delle richieste in formato JSON
    app.use(express.json());
    
    // Avvio del server
    app.listen(port, () => {
        console.log(`Server in esecuzione su http://localhost:${port}`);
    });

    await createRandomUser();
}

main();


async function createRandomUser() {
    const utenteData = {
        username: "PaulFaussi",
        password: "That's my password",
        nome: "Paul",
        cognome: "Faussi"
    };

    try {
        const utente = new Utente(utenteData);
        await utente.save();
        console.log('Utente creato con successo:', utente);
    } catch (error) {
        console.error('Errore durante la creazione dell\'utente:', error);
    }
}