import { ObjectId } from "mongodb"

export interface PomodoroInterface {
  _id: string,
  creator: string,
  authList: string[],
  title: string,
  description: string,
  startDate: Date,
  studyDurationInMinutes: number | null,
  breakDurationInMinutes: number | null,
  lastModificationDate: Date,
  creationDate: Date,
  // duration_in_minutes: number, TODO (pf): da implementare
  // state: "TO START" | "STUDY" | "BREAK" | "ON PAUSE" | "COMPLETED"
}
