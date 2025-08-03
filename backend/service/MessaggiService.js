const {extractToken} = require("../JwtUtils");
const { getCurrentDate, updateCurrentDate} = require('../TimeMachine');

class MessaggiService {

    constructor(db) {
        this.messaggiRepository = new (require('../repository/MessaggiRepository'))(db);
    }

    async getAllMessages(auth) {
        try {
            const allMessages = await this.messaggiRepository.findAllMessaggi(auth);
            const sortedMessages = allMessages.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            return sortedMessages;
        } catch(error){
            throw new Error(error.message);
        }
    }


    async sendMessaggio(auth, messaggio) {
        try {
            const user = extractToken(auth);
            messaggio.sender = user.username;

            messaggio.date = getCurrentDate();

            return await this.messaggiRepository.createMessage(auth, messaggio);
        } catch(error){
            throw new Error(error.message);
        }
    }


    async markMessageAsRead(message){
        try {
            message.isRead = true;
            await this.messaggiRepository.updateMessage(message);
        } catch(error){
            throw new Error(error.message);
        }
    }
}

module.exports = MessaggiService;
