const {ObjectId} = require("mongodb");
const {extractToken} = require("../JwtUtils");
const {getCurrentDate} = require("../TimeMachine");

class PomodoroRepository {
    constructor(db) {
        this.collection = db.collection('pomodoros');
    }

    async findById(username, id) {
        const objId = new ObjectId(id);
        const pomodoro = await this.collection.findOne({ _id: objId });

        return pomodoro;
    }

    async findAllPomodoros() {
        const result =  await this.collection.find().toArray();

        return result;
    }

    async createPomodoro(jwt, title, durationStudy, durationBreak, numberCycles, startDate) {
        const user = extractToken(jwt);
        const now = getCurrentDate();

        const newPomodoro = {
            username: user.username,
            name: title,
            state: 'Ready to start',
            durationStudy: durationStudy,
            durationBreak: durationBreak,
            numberCycles,
            cyclesLeft: numberCycles,
            creationDate: now,
            startDate
        }
        const result = await this.collection.insertOne(newPomodoro);
        const idNewPomodoro = result.insertedId.toString();
        if(result.acknowledged){
            console.log("Document inserted successfully");
            return idNewPomodoro;
        }
        else{
            throw new Error('Note creation failed.');
        }
    }

    async updateCyclesLeftPomodoro(id, jwt, cyclesLeft) {
        const pomodoro = await this.collection.findOne({ _id: new ObjectId(id)});

        if (!pomodoro) {
            throw new Error('Pomodoro non trovato');
        }

        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { cyclesLeft } });

        if (result.modifiedCount === 0) {
            throw new Error('Aggiornamento del Pomodoro fallito');
        }

        return await this.collection.findOne({ _id: new ObjectId(id)});
    }

    async completedPomodoro(idPomodoro) {
        const pomodoro = await this.collection.findOne({ _id: new ObjectId(idPomodoro)});

        if (!pomodoro) {
            throw new Error('Pomodoro non trovato');
        }

        const result = await this.collection.updateOne(
            { _id: new ObjectId(idPomodoro) },
            { $set: { state: 'Completed' } });

        if (result.modifiedCount === 0) {
            throw new Error('Aggiornamento del Pomodoro fallito');
        }

        return await this.collection.findOne({ _id: new ObjectId(idPomodoro)});
    }

}




module.exports = PomodoroRepository;
