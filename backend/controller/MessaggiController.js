const express = require("express");
const {getJwtFromRequest} = require("../JwtUtils");


class MessaggiController {

    constructor(db) {
        this.router = express.Router();
        this.messaggiService = new (require('../service/MessaggiService'))(db);

        // Definizione degli endpoint
        this.router.get('/getAllMessages', this.getAllMessages.bind(this));
        this.router.post('/sendMessage', this.sendMessage.bind(this));
        this.router.post('/read', this.markMessageAsRead.bind(this));
    }



    // GET

    async getAllMessages(req, res) {
        try {
            const jwt = getJwtFromRequest(req);
            const messaggi = await this.messaggiService.getAllMessages(jwt);
            if(messaggi){
                messaggi.forEach(m => {
                    m.date = new Date(m.date).toLocaleDateString() + " " + new Date(m.date).toLocaleTimeString();
                });
                res.status(200).json(messaggi);
            }
            else{
                res.status(200).json({message: "No messagges found."})
            }
        }catch(error) {
            res.status(400).json(error.message);
        }
    }


    // POST

    async sendMessage(req, res) {
        try {
            const jwt = getJwtFromRequest(req);
            await this.messaggiService.sendMessaggio(jwt, req.body.message);
            res.status(200).json( {message: 'Message created successfully.'} );
        }
        catch(error){
            res.status(400).json(error.message);
            console.log(error);
        }
    }

    async markMessageAsRead(req, res) {
        try {
            await this.messaggiService.markMessageAsRead(req.body.message);
            res.status(200).json( {message: 'Message set as read.'} );
        } catch(error){
            res.status(400).json(error.message);
            console.log(error);
        }
    }


}


module.exports = MessaggiController;
