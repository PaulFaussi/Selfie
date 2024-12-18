import { Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreviewNoteComponent } from '../preview-note/preview-note.component';
import { FooterComponent } from '../footer/footer.component';
import { NoteInterface } from '../note-interface';
import { NotesService } from '../notes.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { TimemachineComponent } from '../timemachine/timemachine.component';



@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent, PreviewNoteComponent, TimemachineComponent, CommonModule, NgFor, ReactiveFormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})


export class NotesComponent {
  notesService: NotesService = inject(NotesService);
  testNotesList : NoteInterface[] = [];
  notesToDisplay: NoteInterface[] = [];
  originalNotes: NoteInterface[] = [];
  noteId: string | null = this.activatedRoute.snapshot.paramMap.get('id');

  noteTitle: string = 'New note';
  isMarkdown: boolean = false;
  privacyMode: number = 1;
  usersAuth: string[] = [];

  noteForm = new FormGroup({
    noteTitle: new FormControl(''),
    noteCategory: new FormControl('')
  });

  
  formattedString(array: string[]): string {
    let newArray = array.map(item => `@${item}`);
    return newArray.join('\n');
  }
  submitNoteCreation(){
    window.location.reload();
    console.log(this.noteForm.value.noteCategory);
    return this.notesService.createNote(this.noteForm.value.noteTitle!, this.noteForm.value.noteCategory!, this.isMarkdown, this.privacyMode, this.usersAuth);
    
  }
  deleteNote(){
    console.log(this.noteId);
    if(this.noteId!=null){
      this.notesService.deleteNote(this.noteId);
    }
  }


  constructor (private router: Router, private activatedRoute : ActivatedRoute) {
    
    this.notesService.getAllNotes().then((testNotesList : NoteInterface[]) => {
        this.testNotesList = testNotesList;
        this.originalNotes = testNotesList;

        if(this.testNotesList.length === 0){
          this.noNotesAvailable = "";
        }
        else{
          this.noNotesAvailable = "none";
        }
      }
    )
  }







  // dom management

  overlayVisibility: string = 'none';
  popupVisibility: string = 'none';
  sortingVisibility: string = 'none';
  authTabVisibility: string = "none";
  noNotesAvailable: string = 'none';

  openTab(){
    this.popupVisibility = "";
    this.overlayVisibility = '';
  }
  closeTab(){
    this.popupVisibility = "none";
    this.overlayVisibility = 'none';
  }
  showAuthTab(){
    this.authTabVisibility = '';
  }
  hideAuthTab(){
    this.authTabVisibility = 'none';
  }
  addUserAuth(value: string){
    if( this.usersAuth.includes(value.trim())){
      alert("User already in the authorization list.");
    }
    else if( value.trim() == '' ){
      alert("User invalid.")
    }
    else{
      this.usersAuth.push(value.trim());
    }
  }
  removeUserAuth(value: string){
    this.usersAuth = this.usersAuth.filter(string => string !== value);
  }
  switchPrivacyMode(value: number){
    this.privacyMode = value;
  }
  changeMarkdown(){
    if(this.isMarkdown == false){
      this.isMarkdown = true;
    }
    else{
      this.isMarkdown = false;
    }
  }


  //sorting popup

  openSortingPopup(){
    this.sortingVisibility = '';
    this.overlayVisibility = '';
  }
  closeSortingPopup(){
    this.sortingVisibility = 'none';
    this.overlayVisibility = 'none';
    
    if(this.testNotesList.length === 0){
      this.noNotesAvailable = "";
    }
    else{
      this.noNotesAvailable = "none";
    }
  }
  sortLastModified(){
    this.notesToDisplay = this.testNotesList.sort((a, b) => {
      return new Date(b.lastModificationDate).getTime() - new Date(a.lastModificationDate).getTime();
    });
    this.testNotesList = this.notesToDisplay;
    this.closeSortingPopup();
  }
  sortMostRecent(){
    this.notesToDisplay = this.testNotesList.sort((a, b) => {
      return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
    });
    this.testNotesList = this.notesToDisplay;
    this.closeSortingPopup();
  }
  sortLeastRecent(){
    this.notesToDisplay = this.testNotesList.sort((a, b) => {
      return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
    });
    this.testNotesList = this.notesToDisplay;
    this.closeSortingPopup();
  }
  sortShortest(){
    this.notesToDisplay = this.testNotesList.sort((a, b) => {
      return a.body.length - b.body.length;
    });
    this.testNotesList = this.notesToDisplay;
    this.closeSortingPopup();
  }
  sortLongest(){
    this.notesToDisplay = this.testNotesList.sort((a, b) => {
      return b.body.length - a.body.length;
    });
    this.testNotesList = this.notesToDisplay;
    this.closeSortingPopup();
  }


  filterCategory(cat: string){
    this.notesToDisplay = this.originalNotes.filter(note => note.category == cat);
    this.testNotesList = this.notesToDisplay;
    this.closeSortingPopup();
  }

  resetFilter(){
    this.testNotesList = this.originalNotes;
    this.closeSortingPopup();
  }

}
