const express = require('express');
const {getJwtFromRequest, extractToken, extractUsername} = require('../JwtUtils');


class GenericController {
    constructor() {

        this.router = express.Router();

        this.router.get('/isTokenValido', this.isTokenValido.bind(this));

    }




    isTokenValido(req, res) {

        console.log("Stiamo verificando la validità del token");

        try {
            const jwt = getJwtFromRequest(req);
            const payload = extractToken(jwt);
            console.log("Token valido");
            res.status(200).json();
        } catch (error) {
            console.log("Token NON valido");
            res.status(400).json(error.message);
            console.log(error);
        }
    }
}


module.exports = GenericController;
