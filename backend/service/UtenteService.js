class UtenteService {

    constructor(db) {
        this.utenteRepository = new (require('../repository/UtenteRepository'))(db);
    }

    async getUser(auth) {
        try{
            return await this.utenteRepository.getUser(auth);
        }
        catch(err){
            throw new Error (err);
        }
        
    }

    async loginUser(username, password){
        try{
            return await this.utenteRepository.loginUser(username, password);
        }
        catch(error){
            return error.message;
        }
        
    }

    async registerUser(firstname, lastname, username, password, dob){  
        try{
            return await this.utenteRepository.registerUser(firstname, lastname, username, password, dob);
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}


module.exports = UtenteService;