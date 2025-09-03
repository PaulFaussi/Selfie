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
import { TimeMachineService } from "../time-machine.service";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PreviewNoteComponent, RouterModule, NavbarComponent,
            PreviewPomodoroComponent, FooterComponent, TimemachineComponent,
            NgIf, CommonModule, DayComponent, WeekComponent],
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

  showNextPomodoros: boolean = true;
  allPomodoros: PomodoroInterface[] = [];
  pomodoroToDisplay: PomodoroInterface[] = [];
  pomodoroService: PomodoroService = inject(PomodoroService);

  timeMachineService: TimeMachineService = inject(TimeMachineService);
  genericService: GenericService = inject(GenericService);

  constructor (private router: Router, private activatedRoute : ActivatedRoute) {
  }


  ngOnInit(){

    this.timeMachineService.getCurrentDate()
      .then(currentDate => { this.today = currentDate })

    this.genericService.checkTokenValido()
      .then((result: boolean) => {

        if (!result) {
          this.router.navigateByUrl('/login');
          return;
        }


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

        this.pomodoroService.getAllPomodoros().then(async (pomodoros: PomodoroInterface[]) => {
          this.allPomodoros = pomodoros.map(p => {p.startDate = new Date(p.startDate); return p;});
          await this.updatePomodoroToDisplay();
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

  async switchPomodoroToDisplay() {
    this.showNextPomodoros = !this.showNextPomodoros;
    await this.updatePomodoroToDisplay();
  }

    toggleCalendarView() {
    this.showDayView = !this.showDayView;
  }



  private async updatePomodoroToDisplay() {
    if (this.showNextPomodoros) {
      this.pomodoroToDisplay = this.allPomodoros
        .filter(p => p.state !== 'COMPLETATO')
        .sort((p1, p2) => p1.startDate.getTime() - p2.startDate.getTime());
    } else {
      this.pomodoroToDisplay = this.allPomodoros
        .filter(p => p.state === 'COMPLETATO')
        .sort((p1, p2) => p2.startDate.getTime() - p1.startDate.getTime());
    }

    // massimo 3 pomodori nella home
    this.pomodoroToDisplay = this.pomodoroToDisplay.length <= 3
      ? this.pomodoroToDisplay
      : this.pomodoroToDisplay.slice(0, 3);
  }



}



