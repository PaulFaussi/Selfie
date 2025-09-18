const { ObjectId } = require('mongodb');
const { extractUsername, extractToken } = require('../JwtUtils');

class UnavailabilityRepository {
    constructor(db) {
        this.collection = db.collection('unavailability');
    }

    async create(auth, body) {
        try{
            const user = extractUsername(auth);
            const data ={
                user: user,
                startDate: body.data.startDate,
                endDate: body.data.endDate,
                note: body.data.note
            }
            console.log(data);

            const res = await this.collection.insertOne(data);
            return res;
        } catch(error){
            throw new Error (error);
        }
    }

    async findByUser(utente) {
        return await this.collection.find({ utente }).toArray();
    }

    async update(id, data) {
        const result = await this.collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data },
            { returnDocument: 'after' }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount === 1;
    }
}

module.exports = UnavailabilityRepository;
