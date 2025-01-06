// import { ObjectId } from 'mongodb'

export interface UserInterface {
    _id: string,
    username: string,
    password: string,
    name: string,
    lastname: string,
    dob: Date
}
