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

    async createPomodoro(jwt, title, description, startDate, studyDurationInMinutes, breakDurationInMinutes) {

        await this.pomodoroRepository.createPomodoro(jwt, title, description, startDate, studyDurationInMinutes, breakDurationInMinutes);
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
