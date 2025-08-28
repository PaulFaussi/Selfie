// import { ObjectId } from 'mongodb'

import { CreatorInterface } from "./creator.interface";

// TODO aggiustare questa interfaccia (corrisponde a ciò che salveremo a db)
export interface PomodoroInterface {
  _id: string,
  creator: CreatorInterface | null,
  authList: string[],
  title: string,
  description: string,
  startDate: Date,
  studyDurationInMinutes: number | null,
  breakDurationInMinutes: number | null,
  lastModificationDate: Date,
  creationDate: Date,
  // duration_in_minutes: number, TODO (pf): da implementare
  // state: "TO START" | "STUDY" | "BREAK" | "ON PAUSE" | "COMPLETED" TODO (pf): da implementare
}
