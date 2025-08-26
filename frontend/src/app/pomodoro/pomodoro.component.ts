import { Component, numberAttribute, OnInit } from '@angular/core';
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
import { SortPomodoroEnum } from "../sort-pomodoro.enum";

@Component({
  selector: 'app-pomodoro',
  standalone: true,
    imports: [RouterModule, NavbarComponent, FooterComponent, PreviewNoteComponent, CommonModule, FormsModule, PreviewPomodoroComponent, TimemachineComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css'
})
export class PomodoroComponent implements OnInit {

  public showDialogCreaPomodoro: boolean = false;

  minutes: string = '25';
  seconds: string = '00';
  private intervalId: any;

  public pomodoro = {
    _id: '0',
    name: '',
    state: '',
    cyclesLeft: 0,

  };

  constructor (private router: Router, private activatedRoute : ActivatedRoute,
               private pomodoroService: PomodoroService) {
  }

  ngOnInit(): void {
    this.setPomodoro();
    this.startTimer();

  }

  setPomodoro() {

    this.pomodoro = {
      _id: '0',
      name: 'Nome del pomodoro',
      state: 'STUDIO',
      cyclesLeft: 2
    }
  }

  openCreateNewPomodoroWindow() {
    this.showDialogCreaPomodoro = true;
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      const minutes = Number(this.minutes)
      const seconds = Number(this.seconds)
      if (minutes === 0) {
        if (seconds === 0) {
          clearInterval(this.intervalId);
        } else {
          this.seconds = (seconds - 1) > 9 ? (seconds - 1).toString() : '0' + (seconds - 1).toString();
        }
      } else {
        if (seconds === 0) {
          this.minutes = (minutes - 1) > 9 ? (minutes - 1).toString() : '0' + (minutes - 1).toString();
          this.seconds = '59';
        } else {
          this.seconds = (seconds - 1) > 9 ? (seconds - 1).toString() : '0' + (seconds - 1).toString();
        }
      }
    }, 1000);
  }
}
