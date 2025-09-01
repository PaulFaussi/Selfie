import { Component, Input, OnInit } from '@angular/core';
import { PomodoroInterface } from "../pomodoro.interface";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-preview-pomodoro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './preview-pomodoro.component.html',
  styleUrl: './preview-pomodoro.component.css'
})
export class PreviewPomodoroComponent implements OnInit {
  @Input() pomodoro!: PomodoroInterface;


  ngOnInit() {
    // this.pomodoro = {
    //   _id: '0',
    //   creator: null,
    //   authList: [],
    //   title: 'Nome del Pomodoro',
    //   description: '',
    //   startDate: new Date(),
    //   durationStudy: 30,
    //   durationBreak: 5,
    //   lastModificationDate: new Date(),
    //   creationDate: new Date()
    // }
  }

}
