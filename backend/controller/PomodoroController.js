const express = require('express');
const {getJwtFromRequest, extractUsername} = require('../JwtUtils');

class PomodoroController {

    constructor(db) {
        this.router = express.Router();
        this.pomodoroService = new (require('../service/PomodoroService'))(db);

        // Definizione degli endpoint
        this.router.get('/getPomodoro/:id', this.getPomodoro.bind(this));
        this.router.get('/getAllPomodoros', this.getAllPomodoros.bind(this));
        this.router.post('/createPomodoro', this.createPomodoro.bind(this));
        this.router.post('/updatePomodoro/:id', this.updatePomodoro.bind(this));
        this.router.delete('/deletePomodoro/:id', this.deletePomodoro.bind(this));


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
        try {
            const jwt = getJwtFromRequest(req);
            await this.pomodoroService.createPomodoro(jwt, req.body.title, req.body.durationStudy, req.body.durationBreak, req.body.numberCycles, req.body.cyclesLeft, req.body.startDate);

            res.status(200).json(`Pomodoro creato con successo`);
        } catch (error) {
            res.status(400).json(error.message);
            console.log(error);
        }
    }

    // TODO (pf) (next step): ripartire da qui -> implementare gli endpoint di modifica del Pomodoro. Agganciare quindi il FE ai nuovi endpoint
    async updateCyclesLeftPomodoro(req, res) {
        const jwt = getJwtFromRequest(req);
        try {
            const updatedPomodoro = await this.pomodoroService.updateCyclesLeftPomodoro(jwt, req.params.id, req.body.cyclesLeft);
            res.status(200).json({ pomodoro: updatedPomodoro, message: `Pomodoro ${updatedPomodoro.title} aggiornato con successo` });
        } catch (error) {
            res.status(400).json(error.message);
            console.log(error);
        }
    }

    async updatePomodoro(req, res) {
        const jwt = getJwtFromRequest(req);
        try {
            const updatedPomodoro = await this.pomodoroService.updatePomodoro(jwt, req.params.id, req.body.title, req.body.description, new Date(req.body.startDate), req.body.durationStudy, req.body.durationBreak);
            res.status(200).json({ pomodoro: updatedPomodoro, message: `Pomodoro ${updatedPomodoro.title} aggiornato con successo` });
        } catch (error) {
            res.status(400).json(error.message);
            console.log(error);
        }
    }

    //DELETE

    async deletePomodoro(req, res) {
        const jwt = getJwtFromRequest(req);
        try {
            await this.pomodoroService.deletePomodoro(jwt, req);
            res.status(200).json(`Pomodoro eliminato con successo`)
        } catch (error) {
            res.status(400).json(error.message);
            console.log(error);
        }
    }

}

module.exports = PomodoroController;
