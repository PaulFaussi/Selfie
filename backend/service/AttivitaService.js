const AttivitaRepository = require('../repository/AttivitaRepository');

class AttivitaService {
    constructor(db) {
        this.repo = new AttivitaRepository(db);
    }

    async create(attivita) {
        return await this.repo.create(attivita);
    }

    async getAll(creatore) {
        const filter = creatore ? { creatore } : {};
        return await this.repo.findAll(filter);
    }

    async getById(id) {
        return await this.repo.findById(id);
    }

    async update(id, data) {
        return await this.repo.update(id, data);
    }

    async delete(id) {
        return await this.repo.delete(id);
    }

    async complete(id) {
        return await this.repo.complete(id);
    }
}

module.exports = AttivitaService;
