const jwt = require('jsonwebtoken');
const { generateToken, extractToken} = require('../JwtUtils.js');
const { ObjectId } = require('mongodb');

class NoteRepository {
    
    constructor(db) {
        this.collection = db.collection('notes');
    }




    //GET

    async findById(id) {
        try {
            const objId = new ObjectId(id);
            const note = await this.collection.findOne({_id: objId}); 
            return note;
        } catch (error) {
            console.error('Error retrieving note:', error);
            throw new Error(error);
        }
    }

    async findAllNotes(auth){
        try {
            const user = extractToken(auth);
            const query = { $or: [{creator: user}, {authList: user}]};
            const notes = await this.collection.find(query).toArray(); 
            return notes;
        } catch (error) {
            console.error('Error retrieving notes:', error);
            throw new Error(error);
        }
    }


    //POST

    async createNote(auth, title, notecategory, isMarkdown, privacyMode, authList){
        try{
            const creator = extractToken(auth);
            const newNote = {
                title: title,
                body: '',
                category: notecategory.toLowerCase(),
                isMarkdown: isMarkdown,
                pricavyMode: privacyMode,
                authList: authList,
                creationDate: new Date,
                lastModificationDate: new Date,
                creator: creator
            };
            console.log(newNote);
            const result = await this.collection.insertOne(newNote);
            if(result.acknowledged){
                console.log("Documento inserito correttamente - ", newNote.title);
                return;
            }
            else{
                throw new Error('Note creation failed.')
            }

        }catch(error){
            throw new Error(error);
        }
    }

    async duplicateNote(auth, id){
        try{
            const creator = extractToken(auth);
            const note = await this.collection.findOne({_id: new ObjectId(id)});

            if(note.creator === creator){
                const newNote = {
                    title: `${note.title} - Copy`,
                    body: note.body,
                    isMarkdown: note.isMarkdown,
                    pricavyMode: note.privacyMode,
                    authList: note.authList,
                    creationDate: note.creationDate,
                    lastModificationDate: note.lastModificationDate,
                    creator: creator
                }
                await this.collection.insertOne(newNote);
                console.log('Note duplicated.')
                return
            }
            else{
                console.log('Duplication error - Unauthorized.')
                throw new Error("Authorization error.");
            }
        }
        catch(error){
            throw new Error(error);
        }
    }
    

    //DELETE    

    async deleteNote(auth, id){
        try{
            const creator = extractToken(auth);
            const note = await this.collection.findOne({_id: new ObjectId(id)});

            if(note.creator === creator){
                const result = await this.collection.deleteOne({_id: new ObjectId(id)});
                if(result.deletedCount === 1){
                    console.log('note deleted');
                    return "Note deleted";
                }
                else{
                    throw new Error('Note deletion failed.');
                }
            }
            else{
                throw new Error('Note deletion failed - Unauthorized');
            }
        }
        catch(error){
            throw new Error(error);
        }
    }




    //PATCH
    async updateNoteBody(id, noteBody){
        try{
            const note = await this.collection.findOne({_id: new ObjectId(id)});
            if(note){
                console.log(note);
                const result = await this.collection.updateOne({ _id: new ObjectId(id) },
                { $set: { body: noteBody, lastModificationDate: new Date} });

                /* const newNote = await this.collection.findOne({_id: new ObjectId(id)});
                console.log(newNote); */
                if(result.modifiedCount != 0){
                    console.log('note updated.');
                    return;
                }
                else{
                    throw new Error('Note update failed.');
                }
            }
            else{
                throw new Error('Note deletion failed - Unauthorized');
            }
        }
        catch(error){
            throw new Error(error);
        }   
    }
}

module.exports = NoteRepository;
