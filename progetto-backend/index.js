import express from 'express';
import { Utente } from './models/Utente.js';
import { MongoClient } from 'mongodb';

var db = null;
var collectionName = "Utente";
var collection = null;

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
    const port = 8000;

    await connectToDB();

    // await createCollection();
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

async function createCollection() {
    try {
        collection = await db.createCollection(collectionName);
        console.log("Collection creata con successo", collection);
    } catch (error) {
        console.log("Errore nel creare la Collection: ", error);
    }
}


async function createRandomUser() {
    const utenteData = {
        username: "PaulFaussi",
        password: "That's my password",
        nome: "Paul",
        cognome: "Faussi"
    };

    try {
        const insertResult = await collection.insertOne(utenteData);
        console.log('Utente creato con successo:', insertResult);
    } catch (error) {
        console.error('Errore durante la creazione dell\'utente:', error);
    }
}

async function getRandomUser() {
    try {
        const username = "PaulFaussi";
        const query = { username };
        const utente = await db.collection(collectionName).findOne(query);

        if (utente) {
            console.log('Utente trovato:', utente);
        } else {
            console.log('Utente non trovato');
        }
        
        return user; // Return the user object
    } catch (error) {
        console.error('Errore durante la ricerca dell\'utente:', error);
    }
}

async function deleteRandomUser() {
    try {
        const query = { username };
        const deleteResult = await db.collection(collectionName).deleteOne(query);

        if (deleteResult) {
            console.log('Utente trovato:', deleteResult);
        } else {
            console.log('Utente non trovato');
        }
        
        return deleteResult; 
    } catch (error) {
        console.error('Errore durante la eliminazione dell\'utente:', error);
    }
}