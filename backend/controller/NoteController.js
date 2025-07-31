const express = require('express');

class NoteController {

    constructor(db) {
        this.router = express.Router();
        this.noteService = new (require('../service/NoteService'))(db);

        // Definizione degli endpoint
        this.router.get('/getNote/:id', this.getNote.bind(this));
        this.router.get('/getAllNotes', this.getAllNotes.bind(this));
        this.router.post('/createNote', this.createNote.bind(this));
        this.router.post('/duplicateNote', this.duplicateNote.bind(this));
        this.router.delete('/deleteNote', this.deleteNote.bind(this));
        this.router.patch('/updateNoteBody', this.updateNoteBody.bind(this));
    }



    //GET
    
    async getNote(req, res) {
        const id = req.params.id;
        try {
            const note = await this.noteService.findById(id);
            res.status(200).json(note);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async getAllNotes(req, res){
        try{
            const authHeader = req.headers['authorization'];
            const notes = await this.noteService.getAllNotes(authHeader);
            if(notes){
                res.status(200).json(notes);
            }
            else{
                res.status(200).json({message: "No notes found."})
            }
            
        }catch(error){
            res.status(400).json(error.message);
        }
    }



    //POST

    async createNote(req, res){
        try{
            const authHeader = req.headers['authorization'];
            await this.noteService.createNote(authHeader, req.body.title, req.body.category, req.body.isMarkdown, req.body.privacyMode, req.body.authList);
            res.status(200).json( {message: 'Note created successfully.'} );
        }
        catch(error){
            res.status(400).json(error.message);
            console.log(error);
        }
    }

    async duplicateNote(req, res){
        try{
            const authHeader = req.headers['authorization'];
            await this.noteService.duplicateNote(authHeader, req.body.id);
            res.status(200).json( {message: 'Note duplicated successfully.'} );
        }
        catch(error){
            res.status(400).json( {error: error.message} );
            console.log("errore duplicazione");
        }
    }


    
    //DELETE

    async deleteNote(req, res){
        try{
            const authHeader = req.headers['authorization'];
            await this.noteService.deleteNote(authHeader, req.body.id);
            res.status(200).json( {message: 'Note deleted.'} );
        }
        catch(error){
            res.status(400).json(error.message);
            console.log(error);
        }
    }

    //PATCH

    async updateNoteBody(req, res){
        try{
            await this.noteService.updateNoteBody(req.body.id, req.body.noteBody);
            res.status(200).json( {message: 'Note updated successfully.'} );
        }
        catch(error){
            res.status(400).json(error.message);
            console.log(error);
        }

    }
}



module.exports = NoteController;