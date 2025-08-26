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

  public startStudioIsVisible: boolean = true;
  public startPausaIsVisible: boolean = false;
  public fineCicloIsVisible: boolean = false;
  public ricominciaCicloIsVisible: boolean = false;
  public actionButtonIsClickable: boolean = true;

  minutes: string = '25';
  seconds: string = '00';
  private intervalId: any;

  public pomodoro = {
    _id: '0',
    name: '',
    state: 'STUDIO',
    durationStudy: 30,
    durationBreak: 5,
    cyclesLeft: 0,

  };

  constructor (private router: Router, private activatedRoute : ActivatedRoute,
               private pomodoroService: PomodoroService) {
  }

  ngOnInit(): void {
    this.setPomodoro();

  }

  setPomodoro() {

    // TODO applicare la logica per ottenere il Pomodoro corretto

    this.pomodoro = {
      _id: '0',
      name: 'Nome del pomodoro',
      state: 'STUDIO',
      durationStudy: 0,
      durationBreak: 0,
      cyclesLeft: 2
    }

    this.resetTimer();
  }

  openCreateNewPomodoroWindow() {
    this.showDialogCreaPomodoro = true;
  }

  startStudio() {
    this.startStudioIsVisible = false;
    this.startPausaIsVisible = false;
    this.fineCicloIsVisible = true;
    this.ricominciaCicloIsVisible = true;

    this.startTimer();
  }

  startPausa() {
    this.startStudioIsVisible = false;
    this.startPausaIsVisible = false;
    this.fineCicloIsVisible = true;
    this.ricominciaCicloIsVisible = true;

    this.startTimer();
  }

  fineCiclo() {
    this.stopTimer();

    this.fineFasePausa();
  }

  ricominciaCiclo() {
    this.stopTimer()
    this.pomodoro.state = 'STUDIO';
    this.resetTimer();

    this.startStudioIsVisible = true;
    this.startPausaIsVisible = false;
    this.fineCicloIsVisible = false;
    this.ricominciaCicloIsVisible = false;
  }

  resetTimer() {
    if (this.pomodoro.state === 'STUDIO') {
      this.minutes = this.formatMinutes(this.pomodoro.durationStudy);
      this.seconds = this.formatSeconds(0);
    } else if (this.pomodoro.state === 'PAUSA') {
      this.minutes = this.formatMinutes(this.pomodoro.durationBreak);
      this.seconds = this.formatSeconds(0);
    }
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      const minutes = Number(this.minutes)
      const seconds = Number(this.seconds)
      if (minutes === 0) {
        if (seconds === 0) {
          clearInterval(this.intervalId);
          this.endFase();
        } else {
          this.seconds = this.formatSeconds(seconds - 1);
        }
      } else {
        if (seconds === 0) {
          this.minutes = this.formatMinutes(minutes - 1);
          this.seconds = '59';
        } else {
          this.seconds = this.formatSeconds(seconds - 1);
        }
      }
    }, 1000);
  }


  private endFase() {
    this.stopTimer()

    if (this.pomodoro.state === 'STUDIO') {
      this.fineFaseStudio();
    }
    else if (this.pomodoro.state === 'PAUSA') {
      this.fineFasePausa();
    }

  }

  private fineFaseStudio() {
    this.pomodoro.state = 'PAUSA';

    this.resetTimer();

    this.startStudioIsVisible = false;
    this.startPausaIsVisible = true;
    this.fineCicloIsVisible = true;
    this.ricominciaCicloIsVisible = true;
  }

  private fineFasePausa() {
    if (this.pomodoro.cyclesLeft <= 1) {
      this.endPomodoro();
      return;
    }

    this.pomodoro.cyclesLeft = this.pomodoro.cyclesLeft - 1;

    // TODO aggiornare il db che è stato completato un ciclo

    this.pomodoro.state = 'STUDIO';

    this.resetTimer();

    this.startStudioIsVisible = true;
    this.startPausaIsVisible = false;
    this.fineCicloIsVisible = false;
    this.ricominciaCicloIsVisible = false;
  }

  private endPomodoro() {
    this.minutes = this.formatMinutes(0);
    this.seconds = this.formatSeconds(0);
    this.pomodoro.cyclesLeft = 0;

    this.pomodoro.state = 'COMPLETATO';

    this.startStudioIsVisible = false;
    this.startPausaIsVisible = false;
    this.fineCicloIsVisible = false;
    this.ricominciaCicloIsVisible = false;

    // TODO aggiornare il db che è stato completato il Pomodoro
  }

  private stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private formatMinutes(minutes: number): string {
    return minutes > 9 ? minutes.toString() : '0' + minutes.toString();
  }

  private formatSeconds(seconds: number): string {
    return seconds > 9 ? seconds.toString() : '0' + seconds.toString();
  }
}
