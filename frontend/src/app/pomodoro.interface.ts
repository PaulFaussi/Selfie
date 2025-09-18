// import { ObjectId } from 'mongodb'

export interface PomodoroInterface {

  _id: string,
  name: string,
  state: 'Ready to start' | 'Studying...' | 'Break Time' | 'Completed',
  durationStudy: number,
  durationBreak: number,
  numberCycles: number,
  cyclesLeft: number,
  creationDate: Date,
  startDate: Date
}

