const { ObjectId } = require('mongodb');

class AttivitaRepository {
    constructor(db) {
        this.collection = db.collection('attivita');
    }

    async create(attivita) {
        const result = await this.collection.insertOne(attivita);
        return { ...attivita, _id: result.insertedId };
    }

    async findAll(filter = {}) {
        return await this.collection.find(filter).sort({ dataScadenza: 1 }).toArray();
    }

    async findById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    async update(id, updateData) {
        const result = await this.collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount === 1;
    }

    async complete(id) {
        const result = await this.collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { completata: true } },
            { returnDocument: 'after' }
        );
        return result.value;
    }
}

module.exports = AttivitaRepository;
