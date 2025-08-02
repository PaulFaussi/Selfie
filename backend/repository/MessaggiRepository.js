const {ObjectId} = require("mongodb");
const {extractToken} = require("../JwtUtils");


class MessaggiRepository {

    constructor(db) {
        this.collection = db.collection('messagges');
    }


    async findById(id) {
        try {
            const objId = new ObjectId(id);
            const messaggio = await this.collection.findOne({_id: objId});
            return messaggio;
        } catch (error) {
            console.error('Error retrieving messagge:', error);
            throw new Error(error);
        }
    }

    async findAllMessaggi(auth){
        try {
            const user = extractToken(auth);
            const query = { receiver: user.username };
            const messaggi = await this.collection.find(query).toArray();
            return messaggi;
        } catch (error) {
            console.error('Error retrieving notes:', error);
            throw new Error(error);
        }
    }


    async createMessage(auth, message) {
        try {
            const user = extractToken(auth);
            message.sender = user.username;

            const result = await this.collection.insertOne(message);

            if(result.acknowledged){
                console.log("Documento inserito correttamente - ", message.text);
                return;
            }
            else{
                throw new Error('Note creation failed.')
            }
        } catch(error){
            throw new Error(error);
        }
    }

    async updateMessage(message) {
        try {
            const { _id, ...updateFields } = message;
            const result = await this.collection.updateOne(
                { _id: new ObjectId(message._id) },
                { $set: updateFields }
            );

            if (result.modifiedCount <= 1) {
                console.log('Messaggio aggiornato con successo');
            } else {
                throw new Error('Nessun messaggio aggiornato');
            }
        } catch(error){
            throw new Error(error);
        }
    }

}


module.exports = MessaggiRepository;
