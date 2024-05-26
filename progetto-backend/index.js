const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware per parsing del body delle richieste in formato JSON
app.use(express.json());

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connesso a MongoDB');
}).catch((err) => {
    console.error('Errore di connessione a MongoDB:', err);
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});