import { Component, inject } from '@angular/core';
import { PreviewNoteComponent } from '../preview-note/preview-note.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { NoteInterface } from '../note-interface';
import { NotesService } from '../notes.service';
import { OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { PomodoroInterface } from "../pomodoro.interface";
import { PomodoroService } from "../pomodoro.service";
import { PreviewPomodoroComponent } from "../preview-pomodoro/preview-pomodoro.component";
import { FooterComponent } from "../footer/footer.component";

// TODO (pf): permettere all'utente di editare un Pomodoro

import { TimemachineComponent } from '../timemachine/timemachine.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PreviewNoteComponent, RouterModule, NavbarComponent, CommonModule, NgFor, PreviewPomodoroComponent, FooterComponent, TimemachineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  noteList: NoteInterface[] = [];
  recentNotes: NoteInterface[] = [];
  olderNotes: NoteInterface[] = [];
  notesService: NotesService = inject(NotesService);

  noteToDisplay: NoteInterface[] = []
  noNotesAvailable: string = 'none';

  showUpcomingPomodoros: boolean = true;
  upcomingPomodoros: PomodoroInterface[] = [];
  recentPomodoros: PomodoroInterface[] = [];
  pomodoroToDisplay: PomodoroInterface[] = [];
  pomodoroService: PomodoroService = inject(PomodoroService);

  constructor (private router: Router, private activatedRoute : ActivatedRoute) {
    if(localStorage.getItem("loginToken") == null ){
      this.router.navigateByUrl('login');
    }
  }


  ngOnInit(){
    this.notesService.getAllNotes().then((notes : NoteInterface[]) => {
      this.noteList = notes;
      console.log(this.noteList);

      this.recentNotes = notes
      .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
      .slice(0, 3);

      this.olderNotes = notes
      .sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime())
      .slice(0, 3);
      this.noteToDisplay = this.recentNotes;

      if(this.noteList.length === 0){
        this.noNotesAvailable = '';
      }
    });

    this.pomodoroService.getAllPomodoros().then((pomodoros: PomodoroInterface[]) => {
      this.upcomingPomodoros = this.pomodoroService
        .sortByUpcomingPomodoros(pomodoros)
        .slice(0, 3);

      this.recentPomodoros = this.pomodoroService
        .sortByRecentPomodoros(pomodoros)
        .slice(0, 3);

      this.pomodoroToDisplay = this.upcomingPomodoros;
    });
  }

  switchNoteToDisplay(){
    if(this.noteToDisplay === this.recentNotes){
      this.noteToDisplay = this.olderNotes;
    }
    else{
      this.noteToDisplay = this.recentNotes;
    }
  }

  switchPomodoroToDisplay() {
    this.showUpcomingPomodoros = !this.showUpcomingPomodoros;

    if(this.showUpcomingPomodoros) {
      this.pomodoroToDisplay = this.upcomingPomodoros;
    } else {
      this.pomodoroToDisplay = this.recentPomodoros;
    }

  }

}
