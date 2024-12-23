class NoteService {

    constructor(db) {
        this.noteRepository = new (require('../repository/NoteRepository'))(db);
    }

    async findById(id) {
        return await this.noteRepository.findById(id);
    }

    async getAllNotes(auth){
        try{
            return await this.noteRepository.findAllNotes(auth);
        }
        catch(error){
            throw new Error(error);
        }
        
    }

    async createNote(auth, title, category, isMarkdown, privacyMode, usersAuth){
        try{
            return await this.noteRepository.createNote(auth, title, category, isMarkdown, privacyMode, usersAuth);
        }catch(error){
            return error;
        }
        
    }

    async duplicateNote(auth, id){
        try{
            return await this.noteRepository.duplicateNote(auth, id);
        }
        catch(error){
            throw new Error(error);
        }
    }

    async deleteNote(auth, id){
        try{
            return await this.noteRepository.deleteNote(auth, id);
        }
        catch(error){
            return error; //THROW!!!!!!!!!!!!!!
        }
        
    }


    async updateNoteBody(id, noteBody){
        try{
            return await this.noteRepository.updateNoteBody(id, noteBody);
        }
        catch(error){
            throw new Error;
        }
    }
}


module.exports = NoteService;
