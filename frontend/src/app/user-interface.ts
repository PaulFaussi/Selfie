import { ObjectId } from "mongodb"

export interface UserInterface {
    _id: ObjectId,
    username: string,
    password: string,
    name: string,
    lastname: string,
    dob: Date
}
