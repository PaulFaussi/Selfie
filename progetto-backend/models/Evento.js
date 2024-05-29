const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    calendario: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Calendario'
    },
    invitati_pending: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utente'
    }],
    invitati:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utente'
    }],
    pomodoro: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pomodoro'
    },
    inizio: {
        type: Date,
        required: true
    },
    durata: {
        type: Number,
        required: true
    },
    descrizione: {
        type: String,
        trim: true
    },
    frequenza: {
        type: Number
    },
    scadenza: {
        type: Date
    },
    luogo: {
        type: String
    }

}, {
    timestamps: true
});

export const Evento = mongoose.model('Evento', eventoSchema);