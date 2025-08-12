const EventRepository = require('../repository/EventRepository');

class EventService {
    constructor(db) {
        this.repository = new EventRepository(db);
    }

    async getAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(eventData) {
        try {
            return await this.repository.create(eventData);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id, eventData) {
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

    async delete(id) {
        try {
            return await this.repository.delete(id);
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
