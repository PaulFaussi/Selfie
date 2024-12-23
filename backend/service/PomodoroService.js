const PomodoroRepository = require("../repository/PomodoroRepository");
const { extractUsername } = require("../utils/JwtUtils");

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
        return await this.pomodoroRepository.findAllPomodoros(username);
    }

    async createPomodoro(jwt, req) {
        const username = extractUsername(jwt);

        const pomodoro = {
            creator: username,
            authList: [], // TODO (pf): da implementare
            title: req.body.pomodoro.title,
            description: req.body.pomodoro.description,
            startDate: new Date(req.body.pomodoro.startDate),
            studyDurationInMinutes: req.body.pomodoro.studyDurationInMinutes,
            breakDurationInMinutes: req.body.pomodoro.breakDurationInMinutes,
            lastModificationDate: new Date(),
            creationDate: new Date()
        }

        await this.pomodoroRepository.createPomodoro(pomodoro);
    }

    async deletePomodoro(jwt, id) {
        const username = extractUsername((jwt));
        return await this.pomodoroRepository.deletePomodoro(username, id);
    }


}

module.exports = PomodoroService;
