const PomodoroRepository = require('../repository/PomodoroRepository');
const { extractUsername } = require('../JwtUtils');
const {getCurrentDate} = require("../TimeMachine");

class PomodoroService {

    constructor(db) {
        this.pomodoroRepository = new PomodoroRepository(db);
    }

    async findById(jwt, id) {
        const username = extractUsername(jwt);
        const pomodoro = await this.pomodoroRepository.findById(username, id);

        if (this.isPomodoroVisible(username, pomodoro)) {
            return pomodoro;
        } else {
            throw new Error("Pomodoro non trovato");
        }
    }

    async findAllPomodoros(jwt) {
        const username = extractUsername(jwt);
        const pomodoroList = await this.pomodoroRepository.findAllPomodoros();

        return this.filterPomodoroListByVisibility(username, pomodoroList)
    }

    async createPomodoro(jwt, title, durationStudy, durationBreak, numberCycles, cyclesLeft, startDate) {

        await this.pomodoroRepository.createPomodoro(jwt, title, durationStudy, durationBreak, numberCycles, cyclesLeft, startDate);
    }

    async deletePomodoro(jwt, req) {
        const username = extractUsername(jwt);
        const id = req.params.id;
        await this.pomodoroRepository.deletePomodoro(username, id);
    }

    async updateCyclesLeftPomodoro(jwt, id, cyclesLeft) {
        return await  this.pomodoroRepository.updateCyclesLeftPomodoro(id, jwt, cyclesLeft);
    }

    async completedPomodoro(jwt, id) {
        return await this.pomodoroRepository.completedPomodoro(id, jwt);
    }

    async updatePomodoro(jwt, id, title, description, startDate, durationStudy, durationBreak) {
        return await  this.pomodoroRepository.updatePomodoro(id, jwt, title, description, startDate, durationStudy, durationBreak);
    }



    ////// PRIVATE

    isPomodoroVisible(username, pomodoro) {
        return pomodoro != null && (pomodoro.creator === username);
    }

    filterPomodoroListByVisibility(username, pomodoroList) {
        return pomodoroList.filter((p) => { return this.isPomodoroVisible(username, p); });
    }
}

module.exports = PomodoroService;
