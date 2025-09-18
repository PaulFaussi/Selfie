const { ObjectId } = require('mongodb');
const { extractUsername, extractToken } = require('../JwtUtils');

class EventRepository {
    constructor(db) {
        this.collection = db.collection('events');
    }

    async findAll(token) {
        const user = extractUsername(token);
        return await this.collection.find({ $or: [ { creatore: user },{ assegnati: user } ]}).toArray();
    }

    async create(eventData, auth) {
        const newEvent = {
            ...eventData,
            creatore: extractUsername(auth),
            assegnati: eventData.assegnati || [],
            partecipazioni: (eventData.assegnati || []).map(u => ({
                utente: u,
                stato: 'in_attesa'
            }))
        };
        const result = await this.collection.insertOne(newEvent);
        return { ...newEvent, _id: result.insertedId };
    }

    async update(id, eventData) {
        const objId = new ObjectId(id);
        const updateData = {
            ...eventData,
            creatore: eventData.creatore || 'sconosciuto',
            assegnati: eventData.assegnati || []
        };
        await this.collection.updateOne({ _id: objId }, { $set: updateData });
        return await this.collection.findOne({ _id: objId });
    }

    async updatePartecipazione(id, utente, stato) {
        const objId = new ObjectId(id);
        const event = await this.collection.findOne({ _id: objId });

        if (!event) throw new Error('Evento non trovato');

        const index = event.partecipazioni.findIndex(p => p.utente === utente);
        if (index !== -1) {
            event.partecipazioni[index].stato = stato;
        } else {
            event.partecipazioni.push({ utente, stato });
        }

        await this.collection.updateOne(
            { _id: objId },
            { $set: { partecipazioni: event.partecipazioni } }
        );
        return;
    }

    async deleteEvent(auth, id) {
         await this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    async deleteSeries(originalId) {
        const original = await this.collection.findOne({ _id: new ObjectId(originalId) });

        if (!original) throw new Error('Evento non trovato');

        const toDelete = await this.collection.find({
            title: original.title,
            recurrence: original.recurrence,
            startTime: original.startTime,
            startDate: { $gte: original.startDate },
            color: original.color
        }).toArray();

        const ids = toDelete.map(ev => ev._id);
        await this.collection.deleteMany({ _id: { $in: ids } });

        return ids.length;
    }
}

module.exports = EventRepository;
