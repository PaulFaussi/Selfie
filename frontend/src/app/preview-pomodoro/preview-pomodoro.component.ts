import { Component, Input } from '@angular/core';
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
export class PreviewPomodoroComponent {
  @Input() pomodoro!: PomodoroInterface;


  truncateText(text: string): string {
    return text.length > 210 ? text.substring(0, 210) + '...' : text;
  }

}
