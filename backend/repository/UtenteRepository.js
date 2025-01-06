const jwt = require('jsonwebtoken');
const { generateToken, extractToken} = require('../JwtUtils.js');
const Payload = require('../JwtPayload.js')
const SECRET_KEY = 'U1r3G8f0Hk3nZ4xT6bP9j2M5oA7yQ0Lw';

class UtenteRepository {
    constructor(db) {
        this.collection = db.collection('users');
    }

    async getUser(auth) {
        const username = extractToken(auth);
        try{
            const user = this.collection.findOne({ username: username});
            if(user){
                return user;
            }
            else{
                throw new Error("User not find.")
            }
        }
        catch(error){
            throw new Error(error);
        }
    }


    async loginUser(username, password){
        try{
            const userFound = await this.collection.findOne({username: username});
            if(!userFound){
                console.log("User inesistente")
                throw new Error("user error");
            }
            if(userFound.password != password){
                console.log("Wrong psw")
                throw new Error("psw error");
            }
            else{
                const token = generateToken(username);
                console.log('token generato: ', token);
                return token;
            }
        } catch(error){
            throw new Error(error);
        }
    }


    async registerUser(firstname, lastname, username, password, dob){
        const newUser ={
            username: username,
            password: password,
            name: firstname,
            lastname: lastname,
            dob: dob
        }
        console.log(newUser);

        try {
            const existingUser = await this.collection.findOne({ username: username });
            if (existingUser) {
                throw new Error("User in out db.");
            }
            else{
                const result = await this.collection.insertOne(newUser);
                console.log(result);
                return { message: "User registered successfully"};
            }
            
        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }
    }
}

module.exports = UtenteRepository;
