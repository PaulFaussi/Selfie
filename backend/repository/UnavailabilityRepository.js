const { ObjectId } = require('mongodb');

class UnavailabilityRepository {
    constructor(db) {
        this.collection = db.collection('unavailability');
    }

    async create(data) {
        const result = await this.collection.insertOne(data);
        return { ...data, _id: result.insertedId };
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
