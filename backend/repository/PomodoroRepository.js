const {ObjectId} = require("mongodb");

class PomodoroRepository {
    constructor(db) {
        this.collection = db.collection('pomodoros');
    }

    async findById(username, id) {
        const objId = new ObjectId(id);
        const pomodoro = await this.collection.findOne({ _id: objId });

        // TODO (pf): implementare la logica per controllare se l'utente può visualizzare il pomodoro
        return pomodoro;
        // if (pomodoro != null && (pomodoro.creator === username || pomodoro.authList.contains(username))) {
        //     return pomodoro;
        // } else {
        //     const errorMessage = "Errore nell'ottenere il Pomodoro";
        //     throw new Error(errorMessage);
        // }
    }

    async findAllPomodoros(username) {
        const query = { $or: [{ creator: username }, { authList: username }]};
        return await this.collection.find(query).toArray();
    }

    async createPomodoro(pomodoro) {
        console.log(pomodoro);
        const result = await this.collection.insertOne(pomodoro);
        if(result.acknowledged){
            console.log("Document inserted successfully - ", result.title);
        }
        else{
            throw new Error('Note creation failed.');
        }
    }

    async deletePomodoro(username, id) {
        const pomodoro = await this.collection.findOne({ _id: new ObjectId(id)});

        if (pomodoro.creator !== username) {
            const errorMessage = "Non hai i diritti per eliminare il Pomodoro";
            throw new Error(errorMessage);
        }

        const result = await this.collection.deleteOne({ _id: new ObjectId(id)});
        if (result.deletedCount !== 1) {
            const errorMessage = "Errore nell'eliminare il Pomodoro";
            throw new Error(errorMessage);
        }
    }

    async updatePomodoro(username, id, updatedData) {
        const pomodoro = await this.collection.findOne({ _id: new ObjectId(id)});

        if (!pomodoro) {
            throw new Error('Pomodoro non trovato');
        }

        if (pomodoro.creator !== username) {
            const errorMessage = "Non hai i diritti per eliminare il Pomodoro";
            throw new Error(errorMessage);
        }

        console.log("updated data:");
        console.log(updatedData);

        const { _id, ...dataToUpdate } = updatedData;

        console.log("data to update:");
        console.log(dataToUpdate);
        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: dataToUpdate });

        console.log("result:");
        console.log(result);
        if (result.modifiedCount === 0) {
            throw new Error('Aggiornamento del Pomodoro fallito');
        }

        return await this.collection.findOne({ _id: new ObjectId(id)});
    }

}




module.exports = PomodoroRepository;
