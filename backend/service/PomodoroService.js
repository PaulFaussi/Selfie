const PomodoroRepository = require('../repository/PomodoroRepository');
const { extractUsername } = require('../JwtUtils');

class PomodoroService {

    constructor(db) {
        this.pomodoroRepository = new PomodoroRepository(db);
    }

    async findById(jwt, id) {
        const username = extractUsername(jwt);
        const pomodoro = await this.pomodoroRepository.findById(username, id);

        /* if (this.isPomodoroVisible(username, pomodoro)) {
            return pomodoro;
        } else {
            throw new Error("Pomodoro non trovato");
        } */

        if (pomodoro != null) {
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

    async createPomodoro(jwt, title, durationStudy, durationBreak, numberCycles, startDate) {

        return await this.pomodoroRepository.createPomodoro(jwt, title, durationStudy, durationBreak, numberCycles, startDate);
    }

    async copyPomodoro(jwt, idPomodoroDaCopiare) {

        const pomodoroDaCopiare = await this.findById(jwt, idPomodoroDaCopiare);

        return await this.pomodoroRepository.createPomodoro(jwt,
                                                            pomodoroDaCopiare.name,
                                                            pomodoroDaCopiare.durationStudy,
                                                            pomodoroDaCopiare.durationBreak,
                                                            pomodoroDaCopiare.numberCycles,
                                                            pomodoroDaCopiare.startDate);
    }

    async updateCyclesLeftPomodoro(jwt, id, cyclesLeft) {
        return await  this.pomodoroRepository.updateCyclesLeftPomodoro(id, jwt, cyclesLeft);
    }

    async completedPomodoro(jwt, id) {
        return await this.pomodoroRepository.completedPomodoro(id, jwt);
    }



    ////// PRIVATE

    isPomodoroVisible(username, pomodoro) {
        return pomodoro != null && (pomodoro.username === username);
    }

    filterPomodoroListByVisibility(username, pomodoroList) {
        return pomodoroList.filter((p) => { return this.isPomodoroVisible(username, p); });
    }
}

module.exports = PomodoroService;
