const jwt = require('jsonwebtoken');
// const Payload = require('../model/JwtPayload');

const SECRET_KEY = 'U1r3G8f0Hk3nZ4xT6bP9j2M5oA7yQ0Lw';


/**
 * Genera un JWT
 * @param {Payload} payload - username dell'utente a cui viene assegnato il token
 * @param {String} expiresIn - Durata del token (es. '1h', '2d')
 * @returns {String} Il token generato
 */
function generateToken(payload) {    //rimosso expiresIn = '1h'
    console.log(payload);
    return jwt.sign(payload, SECRET_KEY);
}


/**
 * Verifica se il token JWT è valido e restituisce il payload
 * @param {string} token - Il token JWT da verificare
 * @returns {Payload} Il payload decodificato se il token è valido
 * @throws {Error} Lancia un errore se il token è invalido o scaduto
 */
function extractToken(token) {
    try {
        return  jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error(`Errore nella lettura del payload: ${error.message}`);
    }
}

module.exports = {
    generateToken,
    extractToken
};