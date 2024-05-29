const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Utente'
    },
    nome: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const Categoria = mongoose.model('Categoria', categoriaSchema);