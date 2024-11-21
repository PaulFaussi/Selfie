import { ObjectId } from "mongodb"

export interface PomodoroInterface {
  _id: ObjectId,
  creator: string,
  title: string,
  description: string,
  start_date: Date,
  duration_in_minutes: number,
  study_duration_in_minutes: number,
  break_duration_in_minutes: number,
  state: "TO START" | "STUDY" | "BREAK" | "ON PAUSE" | "COMPLETED"
}
