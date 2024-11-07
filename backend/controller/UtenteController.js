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
            res.status(500).json({error: error});
        }
    }

    async loginUser(req, res) {
        try{
            const token = await this.userService.loginUser(req.body.username, req.body.password);
            return res.status(200).json({token});
        }
        catch(error){
            if(error.message === "User not found"){
                return res.status(404).json({error: error.message});
            }
            else if(error.message === "Password not valid."){
                return res.status(401).json({error: error.message});
            }
            else{
                res.status(500).json({error: "Unexpected error"});
            }
            
        }
    }


    /* POST */

    async registerUser(req, res){
        try{
            const outcome = await this.userService.registerUser(req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.dob);
            res.status(200).send(outcome.message);
        }   
        catch(error){
            res.status(400).send({message: error.message});
        }
    }
}





module.exports = UtenteController;