import { Component, ElementRef, inject, ViewChild} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NotesService } from '../notes.service';
import { NoteInterface } from '../note-interface';
import { ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { marked, Marked } from 'marked';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule],
  templateUrl: "./note-editor.component.html",
  styleUrl: './note-editor.component.css'
})


export class NoteEditorComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  notesService = inject(NotesService);
  note : NoteInterface | undefined;
  noteId = String(this.route.snapshot.params['id']);
  markdownEnabled: boolean = false;
  markdownVisibility: string = 'none';
  @ViewChild('noteBody') noteBody!: ElementRef;
  

  constructor() {
    this.notesService.getNoteById(this.noteId).then((note) => {
      this.note = note;
      this.markdownEnabled = note.isMarkdown;
      console.log(note);

      if(this.markdownEnabled){
        this.markdownVisibility = '';
      }

    })
  }

  noteEditorForm = new FormGroup({
    noteBody: new FormControl('')
  });
  

  
  /* gestione dom e markdown */
  
  parseText(){
    const noteBody = this.noteBody.nativeElement.value;
    var parsedText = marked.parse(noteBody);
    this.noteBody.nativeElement.html = parsedText;

  
  }



  
  
  /* gestione popup */

  popupVisibility: string = 'none';
  deletePopupVisibility: string = 'none';
  overlayVisibility: string = 'none';

  showEditPopup() {
    if(this.popupVisibility == "none"){
      this.popupVisibility = '';
    }
    else{
      this.popupVisibility = 'none';
    }
    this.showOverlay();
  }
  showDeletePopup(){
    if(this.deletePopupVisibility == "none"){
      this.deletePopupVisibility = '';
    }
    else{
      this.deletePopupVisibility = 'none';
    } 
    this.showOverlay();
  }
  showOverlay(){
    if(this.overlayVisibility == "none"){
      this.overlayVisibility = '';
    }
    else{
      this.overlayVisibility = 'none';
    } 
  }
  openEditPopup(){
    this.showEditPopup();
  }
  openDeletePopup(){
    this.showEditPopup();
  }


  //getione/modifica note

  updateNote(){
    const noteBody = this.noteBody.nativeElement.value;
    this.notesService.updateNote(this.noteId, noteBody);
  }

  duplicateNote(){
    if(this.noteId != null){
      this.notesService.duplicateNote(this.noteId);
    } 
    else{
      console.log('Duplication error.')
    }
  }

  copyContent(){

  }
  deleteNote(){
    if(this.noteId!=null){
      this.notesService.deleteNote(this.noteId);
    }
  }
}

