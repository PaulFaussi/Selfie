// import { ObjectId } from 'mongodb'

export interface PomodoroInterface {

  _id: string,
  name: string,
  state: 'DA INIZIARE' | 'STUDIO' | 'PAUSA' | 'COMPLETATO',
  durationStudy: number,
  durationBreak: number,
  numberCycles: number,
  cyclesLeft: number,
  creationDate: Date,
  startDate: Date
}

