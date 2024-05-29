const mongoose = require('mongoose');

const calendarioSchema = new mongoose.Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Utente'
    },
    nome: {
        type: String,
        required: true,
        trim: true
    },
    descrizione: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

export const Calendario = mongoose.model('Calendario', calendarioSchema);