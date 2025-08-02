const express = require('express');
const {getJwtFromRequest, extractToken, extractUsername} = require('../JwtUtils');
const { getCurrentDate, updateCurrentDate} = require('../TimeMachine');


class GenericController {
    constructor() {

        this.router = express.Router();

        this.router.get('/isTokenValido', this.isTokenValido.bind(this));
        this.router.get('/getCurrentDate', this.getCurrentDate.bind(this));
        this.router.post('/updateCurrentDate', this.updateCurrentDate.bind(this))

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

    getCurrentDate(req, res) {

        try {
            const currentDate = getCurrentDate();
            res.status(200).json({currentDate});
        } catch (error) {
            res.status(500).json(error.message);
            console.log(error);
        }
    }

    updateCurrentDate(req, res) {

        try {
            const date = req.body.updatedDate;
            console.log(req.body);
            console.log(date);
            updateCurrentDate(date);
            res.status(200).json({message: 'Data aggiornata con successo'});
        } catch (error) {
            res.status(500).json(error.message);
            console.log(error);
        }
    }
}


module.exports = GenericController;
