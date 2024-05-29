const mongoose = require('mongoose');

const attivitaSchema = new mongoose.Schema({
    calendario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Calendario'
    },
    assegnato_a: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utente'
    }],
    titolo: {
        type: String,
        required: true,
        trim: true
    },
    descrizione: {
        type: String,
        trim: true
    },
    scadenza: {
        type: Date,
        required: true
    }
});

export const Attivita = mongoose.model('Attivita', attivitaSchema);