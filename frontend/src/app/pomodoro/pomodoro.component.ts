import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PreviewNoteComponent } from "../preview-note/preview-note.component";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { PomodoroInterface } from "../pomodoro.interface";
import { PreviewPomodoroComponent } from "../preview-pomodoro/preview-pomodoro.component";
import { PomodoroService } from "../pomodoro.service";
import { TimemachineComponent } from "../timemachine/timemachine.component";

@Component({
  selector: 'app-pomodoro',
  standalone: true,
    imports: [RouterModule, NavbarComponent, FooterComponent, PreviewNoteComponent, CommonModule, FormsModule, PreviewPomodoroComponent, TimemachineComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css'
})
export class PomodoroComponent implements OnInit {

  public showDialogCreaPomodoro: boolean = false;

  public pomodoroList: PomodoroInterface[] = [];

  public pomodoro = {
    name: '',
    startDate: null,
    startTime: null,
    durationWork: null,
    durationBreak: null
  };

  constructor (private router: Router, private activatedRoute : ActivatedRoute,
               private pomodoroService: PomodoroService) {
  }

  ngOnInit(): void {
    this.getAllPomodoros();
  }


  openCreateNewPomodoroWindow() {
    this.showDialogCreaPomodoro = true;
  }

  async salvaNewPomodoro() {
    const body: PomodoroInterface = {
      _id: '',
      creator: { username: '', exp: 0, iat: 0 },
      authList: [],
      title: this.pomodoro.name,
      description: '',
      startDate: new Date(`${this.pomodoro.startDate}T${this.pomodoro.startTime}`),
      studyDurationInMinutes: this.pomodoro.durationWork,
      breakDurationInMinutes: this.pomodoro.durationBreak,
      lastModificationDate: new Date(),
      creationDate: new Date(),
    }

    await this.pomodoroService.createPomodoro(body.title, body.description, body.startDate, body.studyDurationInMinutes, body.breakDurationInMinutes);

    this.getAllPomodoros();
    this.showDialogCreaPomodoro = false;
  }

  eliminaNewPomodoro() {
    this.showDialogCreaPomodoro = false;
    this.pomodoro = { name: '', startDate: null, startTime: null, durationWork: null, durationBreak: null };
  }

  openSortFilterWindow() {
    console.log("Ordina/Filtra i Pomodoro");
  }



  ////// PRIVATE

  private getAllPomodoros() {
    this.pomodoroService.getAllPomodoros().then((result: PomodoroInterface[]) => {
      this.pomodoroList = this.pomodoroService.sortByUpcomingPomodoros(result);
    })
  }

}
