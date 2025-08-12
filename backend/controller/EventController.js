// backend/controller/EventController.js
const express = require('express');
const EventService = require('../service/EventService');

class EventController {
    constructor(db) {
        this.router = express.Router();
        this.service = new EventService(db);

        this.router.get('/', this.getAllEvents.bind(this));
        this.router.post('/', this.createEvent.bind(this));
        this.router.delete('/:id', this.deleteEvent.bind(this));
        this.router.patch('/:id', this.updateEvent.bind(this));
        this.router.patch('/:id/partecipazione', this.updatePartecipazione.bind(this));
    }

    async getAllEvents(req, res) {
        try {
            const auth = req.headers.authorization;
            const events = await this.service.getAllEvents(auth);
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createEvent(req, res) {
        try {
            const auth = req.headers.authorization;
            const event = await this.service.createEvent(auth, req.body);
            res.status(201).json(event);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteEvent(req, res) {
        try {
            const auth = req.headers.authorization;
            await this.service.deleteEvent(auth, req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateEvent(req, res) {
        try {
            const auth = req.headers.authorization;
            const event = await this.service.updateEvent(auth, req.params.id, req.body);
            res.status(200).json(event);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updatePartecipazione(req, res) {
        try {
            const auth = req.headers.authorization;
            const result = await this.service.updatePartecipazione(auth, req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = EventController;
