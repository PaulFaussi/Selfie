import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PreviewNoteComponent } from "../preview-note/preview-note.component";
import { CommonModule, NgFor } from "@angular/common";
import { FooterComponent } from "../footer/footer.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NoteInterface } from "../note-interface";

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent, PreviewNoteComponent, CommonModule, NgFor, ReactiveFormsModule],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.css'
})
export class PomodoroComponent {


  constructor (private router: Router, private activatedRoute : ActivatedRoute) {

  }

}
