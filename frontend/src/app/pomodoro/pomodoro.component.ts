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
    state: 'Ready to start' | 'Studying...' | 'Break Time' | 'Completed',
    durationStudy: number,
    durationBreak: number,
    numberCycles: number,
    cyclesLeft: number,
    duration: number
  } = { _id: '', name: '', state: 'Ready to start', durationStudy: 0, durationBreak: 0, numberCycles: 0, cyclesLeft: 0, duration: 0};

  constructor (private router: Router, private activatedRoute : ActivatedRoute,
               private pomodoroService: PomodoroService) {
  }

  ngOnInit(): void {
    this.idPomodoro = this.activatedRoute.snapshot.paramMap.get('id') ?? ''
    this.setPomodoro();
  }

  setGenericPomodoro() {
    this.pomodoro = {
      _id: '',
      name: 'Default Pomodoro',
      state: 'Ready to start',
      durationStudy: 30,
      durationBreak: 5,
      numberCycles: 5,
      cyclesLeft: 5,
      duration: 175
    }
  }

  setPomodoro() {

    if (this.idPomodoro == null || this.idPomodoro.length === 0) {
      this.setGenericPomodoro();
      this.resetTimer();

    } else {
      this.pomodoroService.getPomodoroById(this.idPomodoro)
        .then((p) => {
          this.pomodoro = {
            _id: p._id,
            name: p.name,
            state: p.state,
            durationStudy: p.durationStudy,
            durationBreak: p.durationBreak,
            numberCycles: p.numberCycles,
            cyclesLeft: p.cyclesLeft,
            duration: (p.durationStudy + p.durationBreak) * p.numberCycles
          }

          this.resetTimer();

        })
        .catch(() => {
          this.setGenericPomodoro();
          this.resetTimer();
        })
    }

  }

  startStudio() {
    this.pomodoro.state = 'Studying...';

    this.startTimer();
  }

  startPausa() {
    this.pomodoro.state = 'Break Time';

    this.startTimer();
  }

  goToBreakTime() {
    this.pomodoro.state = 'Break Time';

    this.resetTimer();
  }

  async fineCiclo() {
    this.stopTimer();

    await this.fineFaseBreakTime();
  }

  ricominciaCiclo() {
    this.stopTimer()
    this.pomodoro.state = 'Studying...';
    this.resetTimer();
  }

  resetTimer() {
    if (this.isFaseAttualeInCorso()) {
      this.stopTimer();
    }

    if (this.pomodoro.state === 'Ready to start' || this.pomodoro.state === 'Studying...') {
      this.minutes = this.formatMinutes(this.pomodoro.durationStudy);
      this.seconds = this.formatSeconds(0);
    } else if (this.pomodoro.state === 'Break Time') {
      this.minutes = this.formatMinutes(this.pomodoro.durationBreak);
      this.seconds = this.formatSeconds(0);
    }
  }

  startTimer() {
    this.intervalId = setInterval(async () => {
      const minutes = Number(this.minutes)
      const seconds = Number(this.seconds)
      if (minutes === 0) {
        if (seconds === 0) {
          clearInterval(this.intervalId);
          await this.endFase();
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


  public isStartStudioButtonVisible(): boolean {
    return this.pomodoro.state === 'Ready to start'
      || (this.pomodoro.state === 'Studying...' && !this.isFaseAttualeInCorso())
  }

  public isStartPausaButtonVisible(): boolean {
    return this.pomodoro.state === 'Break Time' && !this.isFaseAttualeInCorso()
  }

  public isSkipToPauseButtonVisible(): boolean {
    return this.pomodoro.state === 'Studying...' && this.isFaseAttualeInCorso();
  }


  public isFineCicloButtonVisible(): boolean {
    return this.pomodoro.state !== 'Completed'
  }

  public isRicominciaCicloButtonVisible(): boolean {
    return this.pomodoro.state !== 'Ready to start'
      && this.pomodoro.state !== 'Completed'
      && ((this.pomodoro.state === 'Studying...' && this.isFaseAttualeInCorso()) || (this.pomodoro.state === 'Break Time'))
  }

  public formatTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const stringHours = hours > 0 ? `${hours}h ` : '';
    const stringMinutes = remainingMinutes >= 10 ? `${remainingMinutes} min` : `0${remainingMinutes} min`;

    return stringHours + stringMinutes;
  }


  private async endFase() {
    if (this.pomodoro.state === 'Studying...') {
      console.log("Fine fase studio");
      this.goToBreakTime();
    }

    else if (this.pomodoro.state === 'Break Time') {
      console.log("Fine fase pausa");
      await this.fineFaseBreakTime();
    }

    else {
      this.stopTimer();
    }
  }

  private async fineFaseBreakTime() {
    if (this.pomodoro.cyclesLeft <= 1) {
      await this.endPomodoro();
      return;
    }

    this.pomodoro.cyclesLeft = this.pomodoro.cyclesLeft - 1;

    try {
            await this.pomodoroService.updateCyclesLeft(this.idPomodoro, this.pomodoro.cyclesLeft);
          } catch (error) {
            // caso pomodoro non memorizzato a db
    }

    this.pomodoro.state = 'Studying...';

    this.resetTimer();
  }

  private async endPomodoro() {
    this.pomodoro.state = 'Completed';

    this.minutes = this.formatMinutes(0);
    this.seconds = this.formatSeconds(0);
    this.pomodoro.cyclesLeft = 0;

    this.pomodoro.state = 'Completed';

    try {
      await this.pomodoroService.updateCyclesLeft(this.idPomodoro, this.pomodoro.cyclesLeft);
      await this.pomodoroService.completedPomodoro(this.idPomodoro);
    } catch (error) {
      // caso pomodoro non memorizzato a db
    }


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
