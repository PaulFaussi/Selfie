const express = require('express');
const {getJwtFromRequest, extractUsername} = require("../utils/JwtUtils");
const PomodoroService = require('../service/PomodoroService');

class PomodoroController {

    constructor(db) {
        this.router = express.Router();
        this.pomodoroService = new PomodoroService(db);

        // Definizione degli endpoint
        this.router.get('/getPomodoro/:id', this.getPomodoro.bind(this));
        this.router.get('/getAllPomodoros', this.getAllPomodoros.bind(this));
        this.router.post('/createPomodoro', this.createPomodoro.bind(this));
        this.router.delete('/deletePomodoro', this.deletePomodoro.bind(this));


    }


    //GET

    async getPomodoro(req, res) {
        const id = req.params.id;
        const jwt = getJwtFromRequest(req);
        try {
            const pomodoro = await this.pomodoroService.findById(jwt, id);
            res.status(200).json(pomodoro);
        } catch (error) {
            res.status(400).json(error.message);
            console.log(error);
        }
    }

    async getAllPomodoros(req, res) {
        const id = req.params.id;
        const jwt = getJwtFromRequest(req);
        try {
            const pomodoros = await this.pomodoroService.findAllPomodoros(jwt);
            res.status(200).json(pomodoros);
        } catch (error) {
            res.status(400).json(error.message);
            console.log(error);
        }
    }


    //POST

    async createPomodoro(req, res) {
        const jwt = getJwtFromRequest(req);
        try {
            await this.pomodoroService.createPomodoro(jwt, req);

            res.status(200).json(`Pomodoro creato con successo`);
        } catch (error) {
            res.status(400).json(error.message);
            console.log(error);
        }
    }


    //DELETE

    async deletePomodoro(req, res) {
        const jwt = getJwtFromRequest(req);
        const id = req.params.id;
        try {
            const deletedPomodoro = await this.pomodoroService.deletePomodoro(jwt, id);
            res.status(200).json(`Pomodoro '${deletedPomodoro.title}' eliminato con successo`)
        } catch (error) {
            res.status(400).json(error.message);
            console.log(error);
        }
    }

}

module.exports = PomodoroController;
