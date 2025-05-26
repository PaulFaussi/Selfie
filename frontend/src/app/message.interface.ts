import { Timestamp } from "rxjs";


export interface MessageInterface {
  sender: string,
  receiver: string,
  text: string,
  date: Date,
  isRead: boolean
}
