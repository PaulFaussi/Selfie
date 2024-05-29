const mongoose = require('mongoose');

// Definizione dello schema
const utenteSchema = new mongoose.Schema({
    utentename: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: false,
        unique: false,
        lowercase: false
    },
    nome: {
        type: String
    },
    cognome: {
        type: String
    }
}, {
    timestamps: true
});

export const Utente = mongoose.model('Utente', utenteSchema);