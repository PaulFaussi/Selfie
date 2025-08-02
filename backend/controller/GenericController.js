const express = require('express');
const {getJwtFromRequest, extractToken, extractUsername} = require('../JwtUtils');


class GenericController {
    constructor() {

        this.router = express.Router();

        this.router.get('/isTokenValido', this.isTokenValido.bind(this));

    }




    isTokenValido(req, res) {

        try {
            const jwt = getJwtFromRequest(req);
            const payload = extractToken(jwt);
            res.status(200).json();
        } catch (error) {
            res.status(400).json(error.message);
            console.log(error);
        }
    }
}


module.exports = GenericController;
