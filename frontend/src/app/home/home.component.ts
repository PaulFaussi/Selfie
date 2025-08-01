import { Component, inject } from '@angular/core';
import { PreviewNoteComponent } from '../preview-note/preview-note.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { NoteInterface } from '../note-interface';
import { NotesService } from '../notes.service';
import { OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { PomodoroInterface } from "../pomodoro.interface";
import { PomodoroService } from "../pomodoro.service";
import { GenericService } from "../generic.service";
import { PreviewPomodoroComponent } from "../preview-pomodoro/preview-pomodoro.component";
import { FooterComponent } from "../footer/footer.component";
import { TimemachineComponent } from '../timemachine/timemachine.component';
import { DayComponent } from '../calendar/day/day.component';
import { WeekComponent } from '../calendar/week/week.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PreviewNoteComponent, RouterModule, NavbarComponent, PreviewPomodoroComponent, FooterComponent, TimemachineComponent, NgIf, CommonModule, DayComponent, WeekComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {


  showDayView: boolean = true;

  // Data di riferimento per il preview
  today = new Date();



  noteList: NoteInterface[] = [];
  recentNotes: NoteInterface[] = [];
  olderNotes: NoteInterface[] = [];
  notesService: NotesService = inject(NotesService);
  noteToDisplay: NoteInterface[] = []
  noNotesAvailable: string = '';

  showUpcomingPomodoros: boolean = true;
  upcomingPomodoros: PomodoroInterface[] = [];
  recentPomodoros: PomodoroInterface[] = [];
  pomodoroToDisplay: PomodoroInterface[] = [];
  pomodoroService: PomodoroService = inject(PomodoroService);

  genericService: GenericService = inject(GenericService);

  constructor (private router: Router, private activatedRoute : ActivatedRoute) {
    if(localStorage.getItem("loginToken") == null ){
      this.router.navigateByUrl('/login');
    }
  }


  ngOnInit(){

    this.genericService.checkTokenValido()
      .then((result: boolean) => {
        this.notesService.getAllNotes().then((notes : NoteInterface[]) => {
          this.noteList = notes;

          this.recentNotes = notes
            .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
            .slice(0, 3);

          this.olderNotes = notes
            .sort((a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime())
            .slice(0, 3);
          this.noteToDisplay = this.recentNotes;

          if(this.noteToDisplay.length < 1){
            this.noNotesAvailable = 'none';
          }

        });

        this.pomodoroService.getAllPomodoros().then((pomodoros: PomodoroInterface[]) => {
          const futurePomodoros = this.pomodoroService.filterByFuturePomodoros(pomodoros);
          this.upcomingPomodoros = this.pomodoroService
            .sortByUpcomingPomodoros(futurePomodoros)
            .slice(0, 3);

          const pastPomodoros = this.pomodoroService.filterByPastPomodoros(pomodoros);
          this.recentPomodoros = this.pomodoroService
            .sortByRecentPomodoros(pastPomodoros)
            .slice(0, 3);

          this.pomodoroToDisplay = this.upcomingPomodoros;
        });
    })
      .catch((error: any) => {
        this.router.navigateByUrl('/login');
      })
  }

  noop() {}   // serve per catturare l’output del newEvent senza errori

  switchNoteToDisplay(){
    if(this.noteToDisplay === this.recentNotes){
      this.noteToDisplay = this.olderNotes;
    }
    else{
      this.noteToDisplay = this.recentNotes;
    }
  }

  switchPomodoroToDisplay() {    //POSSIBILE ERRORE
  this.showUpcomingPomodoros = !this.showUpcomingPomodoros;
    if(this.showUpcomingPomodoros) {
      this.pomodoroToDisplay = this.upcomingPomodoros;
    } else {
      this.pomodoroToDisplay = this.recentPomodoros;
    }

  }

    toggleCalendarView() {
    this.showDayView = !this.showDayView;
  }

}



