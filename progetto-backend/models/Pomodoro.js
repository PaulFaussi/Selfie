import mongoose from 'mongoose';

const pomodoroSchema = new mongoose.Schema({
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
    },
    inizio: {
        type: Date,
        required: true
    },
    durata: {
        type: Number,
        required: true
    },
    durata_studio: {
        type: Number,
        required: true
    },
    durata_pausa: {
        type: Number,
        required: true
    },
    fase_attuale: {
        type: String,
        enum: ['STUDIO', 'PAUSA', null],
        default: null
    },
    scadenza_fase_attuale: {
        type: Date
    }
}, {
    timestamps: true
})

const Pomodoro = mongoose.model('Pomodoro', pomodoroSchema);