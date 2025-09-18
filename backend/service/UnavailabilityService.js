
class UnavailabilityService {
    constructor(db) {
        this.repo = new (require("../repository/UnavailabilityRepository"))(db);
    }

    async createUnav(auth, data) {
        try{
            console.log(data)
            await this.repo.create(auth, data);
            
        } catch (error){
            throw new Error(error);
        }
    }

     async getByUser(utente) {
        return await this.repo.findByUser(utente);
    }

    /*
    async update(id, data) {
        return await this.repo.update(id, data);
    }

    async delete(id) {
        return await this.repo.delete(id);
    } */
}

module.exports = UnavailabilityService;
