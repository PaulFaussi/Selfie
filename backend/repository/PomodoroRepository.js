const {ObjectId} = require("mongodb");
const {extractToken} = require("../JwtUtils");

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
//         studyDurationInMinutes: number | null,
//         breakDurationInMinutes: number | null,
//         lastModificationDate: Date,
//         creationDate: Date,
//     // duration_in_minutes: number, TODO (pf): da implementare
//     // state: "TO START" | "STUDY" | "BREAK" | "ON PAUSE" | "COMPLETED"
// }


    async createPomodoro(jwt, title, description, startDate, studyDurationInMinutes, breakDurationInMinutes) {
        const creator = extractToken(jwt);
        const now = new Date();
        const newPomodoro = {
            creator,
            authList: [],
            title,
            description,
            startDate,
            studyDurationInMinutes,
            breakDurationInMinutes,
            lastModificationDate: now,
            creationDate: now
            // duration_in_minutes: number, TODO (pf): da implementare
            // state: "TO START" | "STUDY" | "BREAK" | "ON PAUSE" | "COMPLETED"
        }
        const result = await this.collection.insertOne(newPomodoro);
        if(result.acknowledged){
            console.log("Document inserted successfully");
        }
        else{
            throw new Error('Note creation failed.');
        }
    }


    async updatePomodoro(id, jwt, title, description, startDate, studyDurationInMinutes, breakDurationInMinutes) {
        const pomodoro = await this.collection.findOne({ _id: new ObjectId(id)});

        if (!pomodoro) {
            throw new Error('Pomodoro non trovato');
        }

        const now = new Date();
        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, description, startDate, studyDurationInMinutes, breakDurationInMinutes, lastModificationDate: now} });

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
