const PomodoroRepository = require('../repository/PomodoroRepository');
const { extractUsername } = require('../JwtUtils');

class PomodoroService {

    constructor(db) {
        this.pomodoroRepository = new PomodoroRepository(db);
    }

    async findById(jwt, id) {
        const username = extractUsername(jwt);
        return  await this.pomodoroRepository.findById(username, id);
    }

    async findAllPomodoros(jwt) {
        const username = extractUsername(jwt);
        return await this.pomodoroRepository.findAllPomodoros();
    }

    async findAllPomodorosSorted(jwt, sortType) {
        const username = extractUsername(jwt);
        const allPomodoros = await this.findAllPomodoros(jwt);

        if (sortType === 'START_RECENT') {
            console.log("siamo qui 1");
            allPomodoros.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
        }
        if (sortType === 'START_OLDEST') {
            console.log("siamo qui 2");
            allPomodoros.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        }
        if (sortType === 'LAST_MODIFIED') {
            console.log("siamo qui 3");
            allPomodoros.sort((a, b) => b.lastModificationDate.getTime() - a.lastModificationDate.getTime());
        }
        if (sortType === 'CREATION_OLDEST') {
            console.log("siamo qui 4");
            allPomodoros.sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime());
        }
        if (sortType === 'CREATION_RECENT') {
            console.log("siamo qui 5");
            allPomodoros.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
        }

        return allPomodoros;
    }

    async createPomodoro(jwt, title, description, startDate, studyDurationInMinutes, breakDurationInMinutes) {

        await this.pomodoroRepository.createPomodoro(jwt, title, description, new Date(startDate), studyDurationInMinutes, breakDurationInMinutes);
    }

    async deletePomodoro(jwt, req) {
        const username = extractUsername(jwt);
        const id = req.params.id;
        await this.pomodoroRepository.deletePomodoro(username, id);
    }

    async updatePomodoro(jwt, id, title, description, startDate, studyDurationInMinutes, breakDurationInMinutes) {
        return await  this.pomodoroRepository.updatePomodoro(id, jwt, title, description, startDate, studyDurationInMinutes, breakDurationInMinutes);
    }

}

module.exports = PomodoroService;
