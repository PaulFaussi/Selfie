import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { TimemachineComponent } from "../timemachine/timemachine.component";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { PomodoroService } from "../pomodoro.service";
import { TimeMachineService } from "../time-machine.service";

@Component({
  selector: 'app-pomodoro-create',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TimemachineComponent,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './pomodoro-create.component.html',
  styleUrl: './pomodoro-create.component.css'
})
export class PomodoroCreateComponent  implements OnInit {

  showPopupSchedulePomodoro: boolean = false;

  private syncing: boolean = false;

  public newPomodoroData!: {
    title: string,
    durationStudy: number,
    durationBreak: number,
    numberCycles: number,
    duration: number,
    startDateString: string
  }


  constructor(private router: Router, private pomodoroService: PomodoroService, private timeMachineService: TimeMachineService) {
  }

  ngOnInit(): void {
    this.setDefaultPomodoro();
  }

  async creaPomodoro() {
    if (this.newPomodoroData.numberCycles === 0 || this.newPomodoroData.duration === 0) {
      alert("Durata del Pomodoro non valida");
      return;
    }

    const idNewPomodoro = await this.pomodoroService.createPomodoro(this.newPomodoroData.title,
                                              this.newPomodoroData.durationStudy,
                                              this.newPomodoroData.durationBreak,
                                              this.newPomodoroData.numberCycles,
                                              await this.timeMachineService.getCurrentDate());

    await this.router.navigateByUrl(`/pomodoro/${idNewPomodoro}`);
  }

  async creaScheduledPomodoro() {
    await this.pomodoroService.createPomodoro(this.newPomodoroData.title,
      this.newPomodoroData.durationStudy,
      this.newPomodoroData.durationBreak,
      this.newPomodoroData.numberCycles,
      this.castStringToDate(this.newPomodoroData.startDateString));

    await this.router.navigateByUrl('');
  }

  schedulePomodoro() {
    if (this.newPomodoroData.numberCycles === 0 || this.newPomodoroData.duration === 0) {
      alert("Durata del Pomodoro non valida");
      return;
    }

    this.showPopupSchedulePomodoro = true;
  }

  closeScheduleBox() {
    this.showPopupSchedulePomodoro = false;
  }

  onNumberCyclesChange(value: number | null) {
    if (this.syncing) {
      return;
    }

    this.syncing = true;

    if (value === null || value === undefined) {
      this.newPomodoroData.duration = 0;

    } else {
      this.newPomodoroData.duration = (this.newPomodoroData.durationStudy + this.newPomodoroData.durationBreak) * this.newPomodoroData.numberCycles;

    }

    this.syncing = false;
  }

  onDurationChange(value: number | null) {
    if (this.syncing) {
      return;
    }

    this.syncing = true;

    if (value === null || value === undefined) {
      this.newPomodoroData.numberCycles = 0;

    } else if (this.newPomodoroData.duration % (this.newPomodoroData.durationStudy + this.newPomodoroData.durationBreak) !== 0) {
      this.newPomodoroData.numberCycles = 0;

    } else {
      this.newPomodoroData.numberCycles = this.newPomodoroData.duration / (this.newPomodoroData.durationStudy + this.newPomodoroData.durationBreak)

    }

    this.syncing = false;
  }

  private async setDefaultPomodoro() {
    this.newPomodoroData = {
      title: 'Titolo',
      durationStudy: 30,
      durationBreak: 5,
      numberCycles: 5,
      duration: 175,
      startDateString: this.castDateToString(await this.timeMachineService.getCurrentDate())
    }
  }

  private castDateToString(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  private castStringToDate(string: string): Date {
    return new Date(string);
  }
}
