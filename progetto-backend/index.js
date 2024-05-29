const express = require('express');
const mongoose = require('mongoose');
const Utente = require('./models/Utente');

/** 
 * Connessione a MongoDB 
 */
async function connectToDB() {
    mongoose.connect('mongodb://localhost:27017/mydatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connesso a MongoDB');
    }).catch((err) => {
        console.error('Errore di connessione a MongoDB:', err);
    });
}

async function main() {
    const app = express();
    const port = 3000;

    await connectToDB();
    
    // Middleware per parsing del body delle richieste in formato JSON
    app.use(express.json());
    
    // Avvio del server
    app.listen(port, () => {
        console.log(`Server in esecuzione su http://localhost:${port}`);
    });
}

main();