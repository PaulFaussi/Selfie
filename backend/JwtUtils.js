const jwt = require('jsonwebtoken');
// const Payload = require('../model/JwtPayload');

const SECRET_KEY = 'U1r3G8f0Hk3nZ4xT6bP9j2M5oA7yQ0Lw';


/**
 * Genera un JWT
 * @param {Payload} payload - username dell'utente a cui viene assegnato il token
 * @param {String} expiresIn - Durata del token (es. '1h', '2d')
 * @returns {String} Il token generato
 */
function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}


/**
 * Verifica se il token JWT è valido e restituisce il payload
 * @param {string} token - Il token JWT da verificare
 * @returns {Payload} Il payload decodificato se il token è valido
 * @throws {Error} Lancia un errore se il token è invalido o scaduto
 */
function extractToken(token) {
    return  jwt.verify(token, SECRET_KEY);
}


/**
 * Verifica se il token JWT è valido e restituisce l'username dell'utente a cui è associato il token
 * @param {string} token - Il token JWT da verificare
 * @returns {string} L'username dell'utente a cui il token è associato
 * @throws {Error} Lancia un errore se il token è invalido o scaduto
 */
function extractUsername(token) {
    return extractToken(token).username;
}


/**
 * Data una chiamata HTTP REST, restituisce il JWT presente nell'header della chiamata
 * @param req - Request ricevuta in ingresso dal backend
 * @returns {string} - ritorna il JWT in formato Stringa
 */
function getJwtFromRequest(req) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    throw new Error(`Problema nel leggere il jwt dalla Request.\nAuth Header: ${authHeader}`);
}


module.exports = { generateToken, extractToken, extractUsername, getJwtFromRequest }
