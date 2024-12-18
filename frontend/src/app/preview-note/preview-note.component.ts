import { CommonModule } from '@angular/common';
import { Component, Input, inject} from '@angular/core';
import { NoteInterface} from '../note-interface';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview-note',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './preview-note.component.html',
  styleUrl: './preview-note.component.css'
})
export class PreviewNoteComponent {
  @Input() noteFetched!:NoteInterface;

  route: ActivatedRoute = inject(ActivatedRoute);

    
  truncateText(text: string): string {
    return text.length > 210 ? text.substring(0, 210) + '...' : text;
  }
  
  
}
