class NoteService {

    constructor(db) {
        this.noteRepository = new (require('../repository/NoteRepository'))(db);
    }

    async findById(id) {
        try{
            return await this.noteRepository.findById(id);
        } catch(error){
            throw new Error(error.message);
        }
    }

    async getAllNotes(auth){
        try{
            return await this.noteRepository.findAllNotes(auth);
        }
        catch(error){
            throw new Error(error.message);
        }
        
    }

    async createNote(auth, title, category, isMarkdown, privacyMode, usersAuth){
        try{
            return await this.noteRepository.createNote(auth, title, category, isMarkdown, privacyMode, usersAuth);
        }catch(error){
            throw new Error(error.message);
        }
        
    }

    async duplicateNote(auth, id){
        try{
            return await this.noteRepository.duplicateNote(auth, id);
        }
        catch(error){
            throw new Error(error.message);
        }
    }

    async deleteNote(auth, id){
        try{
            return await this.noteRepository.deleteNote(auth, id);
        }
        catch(error){
            throw new Error(error.message);
        }
        
    }


    async updateNoteBody(id, noteBody){
        try{
            return await this.noteRepository.updateNoteBody(id, noteBody);
        }
        catch(error){
            throw new Error(error.message);
        }
    }
}


module.exports = NoteService;