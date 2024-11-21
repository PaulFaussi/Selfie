
class UtenteRepository {
    constructor(db) {
        this.collection = db.collection('users');
    }

    async getUser(auth) {
        const username = jwt.decode(auth).username;
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
        const userFound = await this.collection.findOne({username: username});

        if(!userFound){
            throw new Error("User not found");
        }

        if(userFound.password != password){
            throw new Error('Password not valid.');
        }
        else{
            const token = jwt.sign({username}, SECRET_KEY);
            return token;
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
