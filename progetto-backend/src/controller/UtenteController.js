import express from 'express';

class UtenteController {

    constructor(db) {
        this.router = express.Router();
        this.userService = new (require('../service/UtenteService'))(db);

        // Definizione degli endpoint
        this.router.get('/:id', this.getUser.bind(this));
    }

    
    async getUser(req, res) {
        const utenteId = req.params.id;
        try {
            const utente = await this.userService.findById(utenteId);
            res.status(200).json(utente);
        } catch (error) {
            res.status(500).send("Per ora funzione (firma di PaulFaussi)\n" + error.message);
        }
    }
}



module.exports = UtenteController;