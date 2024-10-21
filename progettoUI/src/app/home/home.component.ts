import { Component } from '@angular/core';
import { PreviewNoteComponent } from '../preview-note/preview-note.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PreviewNoteComponent, RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  
}
