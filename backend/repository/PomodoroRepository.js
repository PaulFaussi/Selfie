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


// export interface PomodoroInterface {
//     _id: string,
//         creator: CreatorInterface,
//         authList: string[],
//         title: string,
//         description: string,
//         startDate: Date,
//         durationStudy: number | null,
//         durationBreak: number | null,
//         lastModificationDate: Date,
//         creationDate: Date,
//     // duration_in_minutes: number, TODO (pf): da implementare
//     // state: "TO START" | "STUDY" | "BREAK" | "ON PAUSE" | "COMPLETED"
// }


    async createPomodoro(jwt, title, durationStudy, durationBreak, numberCycles, cyclesLeft, startDate) {
        const creator = extractToken(jwt);
        const now = getCurrentDate();

        console.log("Start Date:");
        console.log(startDate);
        console.log("\n\n\n");

        const newPomodoro = {
            creator: creator.username,
            name: title,
            state: 'DA INIZIARE',
            durationStudy: durationStudy,
            durationBreak: durationBreak,
            numberCycles,
            cyclesLeft,
            creationDate: now,
            startDate: new Date(startDate)
        }
        const result = await this.collection.insertOne(newPomodoro);
        if(result.acknowledged){
            console.log("Document inserted successfully");
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

    async updatePomodoro(id, jwt, title, description, startDate, durationStudy, durationBreak) {
        const pomodoro = await this.collection.findOne({ _id: new ObjectId(id)});

        if (!pomodoro) {
            throw new Error('Pomodoro non trovato');
        }

        const now = getCurrentDate();
        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, description, startDate, durationStudy, durationBreak, astModificationDate: nowl} });

        if (result.modifiedCount === 0) {
            throw new Error('Aggiornamento del Pomodoro fallito');
        }

        return await this.collection.findOne({ _id: new ObjectId(id)});
    }



    async deletePomodoro(username, id) {
        const pomodoro = await this.collection.findOne({ _id: new ObjectId(id)});

        if (pomodoro.creator.username !== username) {
            const errorMessage = "Non hai i diritti per eliminare il Pomodoro";
            throw new Error(errorMessage);
        }

        const result = await this.collection.deleteOne({ _id: new ObjectId(id)});
        if (result.deletedCount !== 1) {
            const errorMessage = "Errore nell'eliminare il Pomodoro";
            throw new Error(errorMessage);
        }
    }

}




module.exports = PomodoroRepository;
