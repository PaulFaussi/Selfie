import express from 'express';
import { connect } from 'mongoose';
import { Utente } from './models/Utente.js';

const urlMongoDb = 'mongodb://site232437:ahB4ha7j@mongo_site232437:27017/mydatabase';

/** 
 * Connessione a MongoDB 
 */
async function connectToDB() {
    try {
        await connect(urlMongoDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connesso a MongoDB');
    } catch (error) {
        console.error('Errore di connessione a MongoDB:', error);
    }
}

async function main() {
    const app = express();
    const port = 8000;

    await connectToDB();

    await createRandomUser();
    await getRandomUser();
    await deleteRandomUser();
    await getRandomUser();
    
    // TODO: decommentare questa porzione di codice
    /*
    // Middleware per parsing del body delle richieste in formato JSON
    app.use(json());
    
    // Avvio del server
    app.listen(port, () => {
        console.log(`Server in esecuzione su http://localhost:${port}`);
    });
    */
}

main();


// TODO: eliminare le funzioni qui sotto
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

async function getRandomUser() {
    try {
        const username = "PaulFaussi";

        // Use the findOne method to find a user by username
        const user = await Utente.findOne({ username });

        if (user) {
            console.log('Utente trovato:', user);
        } else {
            console.log('Utente non trovato');
        }
        
        return user; // Return the user object
    } catch (error) {
        console.error('Errore durante la ricerca dell\'utente:', error);
        throw error; // Throw the error to handle it in the caller function if needed
    }
}

async function deleteRandomUser() {
    try {
        const username = "PaulFaussi";

        // Use the findOne method to find a user by username
        const user = await Utente.deleteOne({ username });

        if (user) {
            console.log('Utente trovato:', user);
        } else {
            console.log('Utente non trovato');
        }
        
        return user; // Return the user object
    } catch (error) {
        console.error('Errore durante la ricerca dell\'utente:', error);
        throw error; // Throw the error to handle it in the caller function if needed
    }
}