const mongoose = require('mongoose');

// Definizione dello schema
const userSchema = new mongoose.Schema({
    username: {
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
    name: {
        type: String
    },
    surname: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);