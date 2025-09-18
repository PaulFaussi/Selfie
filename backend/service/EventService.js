const EventRepository = require('../repository/EventRepository');

class EventService {
    constructor(db) {
        this.repository = new EventRepository(db);
    }

    async getAll(token) {
        try {
            return await this.repository.findAll(token);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(eventData, auth) {
        try {
            return await this.repository.create(eventData, auth);
        } catch (error) {
            console.log(error)
            throw new Error(error.message);
        }
    }

    async updateEvent(id, eventData) {
        try {
            return await this.repository.update(id, eventData);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async replyToInvite(eventId, utente, stato) {
        try {
            return await this.repository.updatePartecipazione(eventId, utente, stato);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteEvent(auth, id) {
        try {
            return await this.repository.deleteEvent(auth, id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteSeries(originalId) {
        try {
            return await this.repository.deleteSeries(originalId);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = EventService;
