import { Component, Input, numberAttribute, OnInit } from '@angular/core';
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
    imports: [RouterModule, NavbarComponent, FooterComponent,
              PreviewNoteComponent, CommonModule, FormsModule,
              PreviewPomodoroComponent, TimemachineComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css'
})
export class PomodoroComponent implements OnInit {


  minutes: string = '30';
  seconds: string = '00';
  private intervalId: any;

  @Input() idPomodoro: string = '';

  pomodoro: {
    _id: string,
    name: string,
    state: 'DA INIZIARE' | 'STUDIO' | 'PAUSA' | 'COMPLETATO',
    durationStudy: number,
    durationBreak: number,
    cyclesLeft: number
  } = { _id: '', name: '', state: 'DA INIZIARE', durationStudy: 0, durationBreak: 0, cyclesLeft: 0};

  constructor (private router: Router, private activatedRoute : ActivatedRoute,
               private pomodoroService: PomodoroService) {
  }

  ngOnInit(): void {
    this.idPomodoro = this.activatedRoute.snapshot.paramMap.get('id') ?? ''
    this.setPomodoro();
  }

  setPomodoro() {

    if (this.idPomodoro == null || this.idPomodoro.length === 0) {


    } else {
      this.pomodoroService.getPomodoroById(this.idPomodoro)
        .then((p) => {

          this.pomodoro = {
            _id: p._id,
            name: p.name,
            state: p.state,
            durationStudy: p.durationStudy,
            durationBreak: p.durationBreak,
            cyclesLeft: p.cyclesLeft
          }

          this.resetTimer();
        })
    }

  }

  startStudio() {
    this.pomodoro.state = 'STUDIO';

    this.startPausaIsVisible = false;

    this.startTimer();
  }

  startPausa() {
    this.pomodoro.state = 'PAUSA';

    this.startPausaIsVisible = false;

    this.startTimer();
  }

  async fineCiclo() {
    this.stopTimer();

    await this.fineFasePausa();
  }

  ricominciaCiclo() {
    this.stopTimer()
    this.pomodoro.state = 'STUDIO';
    this.resetTimer();

    this.startPausaIsVisible = false;
  }

  resetTimer() {
    if (this.pomodoro.state === 'DA INIZIARE' || this.pomodoro.state === 'STUDIO') {
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


  public startPausaIsVisible: boolean = false;

  public isStartStudioButtonVisible(): boolean {
    return this.pomodoro.state === 'DA INIZIARE'
      || (this.pomodoro.state === 'STUDIO' && !this.isFaseAttualeInCorso())
  }

  public isStartPausaButtonVisible(): boolean {
    return this.pomodoro.state === 'PAUSA' && !this.isFaseAttualeInCorso()
  }

  public isFineCicloButtonVisible(): boolean {
    return this.pomodoro.state !== 'COMPLETATO'
  }

  public isRicominciaCicloButtonVisible(): boolean {
    return this.pomodoro.state !== 'DA INIZIARE'
      && this.pomodoro.state !== 'COMPLETATO'
      && ((this.pomodoro.state === 'STUDIO' && this.isFaseAttualeInCorso()) || (this.pomodoro.state === 'PAUSA'))
  }


  private async endFase() {
    this.stopTimer()

    if (this.pomodoro.state === 'STUDIO') {
      this.fineFaseStudio();
    }
    else if (this.pomodoro.state === 'PAUSA') {
      await this.fineFasePausa();
    }

  }

  private fineFaseStudio() {
    this.pomodoro.state = 'PAUSA';

    this.resetTimer();

    this.startPausaIsVisible = true;
  }

  private async fineFasePausa() {
    if (this.pomodoro.cyclesLeft <= 1) {
      await this.endPomodoro();
      return;
    }

    this.pomodoro.cyclesLeft = this.pomodoro.cyclesLeft - 1;

    await this.pomodoroService.updateCyclesLeft(this.idPomodoro, this.pomodoro.cyclesLeft);

    this.pomodoro.state = 'STUDIO';

    this.resetTimer();

    this.startPausaIsVisible = false;
  }

  private async endPomodoro() {
    this.pomodoro.state = 'COMPLETATO';

    this.minutes = this.formatMinutes(0);
    this.seconds = this.formatSeconds(0);
    this.pomodoro.cyclesLeft = 0;

    this.pomodoro.state = 'COMPLETATO';

    await this.pomodoroService.updateCyclesLeft(this.idPomodoro, 0);
    await this.pomodoroService.completedPomodoro(this.idPomodoro);

    this.startPausaIsVisible = false;

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

  private isFaseAttualeInCorso(): boolean {
    return this.intervalId;
  }
}
