import { ObjectId } from "mongodb"

export interface UserInterface {
    _id: ObjectId,
    username: string,
    password: string,
    name: string,
    lastname: string,
  // FIXME date_of_birthday sarebbe più chiaro -> ci ho messo un po' a capire il significato di "dob"
    dob: Date
}
