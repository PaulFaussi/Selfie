import express from 'express';
import { MongoClient } from 'mongodb';
const UtenteController = require('./src/controller/UtenteController');





var db = null;

/** 
 * Connessione a MongoDB 
 */
async function connectToDB() {
    try {
        db = (await MongoClient.connect('mongodb://site232437:ahB4ha7j@ddf4450a64b7:27017')).db('local');
        console.log('Connesso a MongoDB');
    } catch(error) {
        console.error("Errore nel connettersi al DB\n", error);
    }
}

async function main() {
    const app = express();
    const port = 8080;
    await connectToDB();

    const utenteController = new UtenteController(db);

    app.use('/utenti', utenteController.router);

    app.listen(port, () => {
        console.log(`Server in esecuzione su http://localhost:${port}`);
    });

}

main();

