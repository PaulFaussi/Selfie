const UnavailabilityRepository = require('../repository/UnavailabilityRepository');

class UnavailabilityService {
    constructor(db) {
        this.repo = new UnavailabilityRepository(db);
    }

    async create(data) {
        return await this.repo.create(data);
    }

    async getByUser(utente) {
        return await this.repo.findByUser(utente);
    }

    async update(id, data) {
        return await this.repo.update(id, data);
    }

    async delete(id) {
        return await this.repo.delete(id);
    }
}

module.exports = UnavailabilityService;
