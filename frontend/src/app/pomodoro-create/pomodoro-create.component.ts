import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { TimemachineComponent } from "../timemachine/timemachine.component";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-pomodoro-create',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    TimemachineComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './pomodoro-create.component.html',
  styleUrl: './pomodoro-create.component.css'
})
export class PomodoroCreateComponent  implements OnInit {

  public newPomodoroData!: {
    title: string,
    durationStudy: number,
    durationBreak: number,
    numberCycles: number,
    duration: number
  }


  constructor(private router: Router) {
  }

  ngOnInit(): void {

    this.newPomodoroData = {
      title: 'Titolo',
      durationStudy: 30,
      durationBreak: 5,
      numberCycles: 5,
      duration: 175
    }
  }

  creaPomodoro() {

    // TODO da implementare

    console.log(this.newPomodoroData);
  }

  schedulePomodoro() {

    // TODO da implementare

    console.log(this.newPomodoroData);
  }
}
