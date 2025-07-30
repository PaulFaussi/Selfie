const express = require('express');

class UtenteController {

    constructor(db) {
        this.router = express.Router();
        this.userService = new (require('../service/UtenteService'))(db);

        // Definizione degli endpoint
        this.router.get('/:id', this.getUser.bind(this));
        this.router.post('/register', this.registerUser.bind(this));
        this.router.post('/login', this.loginUser.bind(this));
        this.router.get('/getUser', this.getUser.bind(this));
    }

    //GET
    async getUser(req, res) {
        const authHeader = req.headers['authorization'];
        try {
            const user = await this.userService.getUser(authHeader);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async loginUser(req, res) {
        try{
            const token = await this.userService.loginUser(req.body.username, req.body.password);
            console.log("[Login] - Token sent.")
            return res.status(200).json({token});
        }
        catch(error){
            console.log("Errore durante il login", error.message);
            if(error.message === "Error: user error") {
                return res.status(404).json({ message: "Username error" });
            } else if(error.message === "Error: psw error") {
                return res.status(401).json({ message: "Password error" });
            } else {
                return res.status(500).json({ error: "Unexpected error" });
            }
            
        }
    }


    /* POST */

    async registerUser(req, res){
        try{
            const outcome = await this.userService.registerUser(req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.dob);
            res.status(200).json({message: outcome.message});
        }   
        catch(error){
            res.status(400).json({message: error.message});
        }
    }
}





module.exports = UtenteController;
