import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { PomodoroService } from "../pomodoro.service";
import { PomodoroInterface } from "../pomodoro.interface";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-pomodoro-editor',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pomodoro-editor.component.html',
  styleUrl: './pomodoro-editor.component.css'
})
export class PomodoroEditorComponent  implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  pomodoroService = inject(PomodoroService);
  pomodoro: PomodoroInterface | null = null;
  pomodoroId = String(this.route.snapshot.params['id']);
  visibleDeletePopup: boolean = false;

  public updatedData!: {
    title: string,
    description: string,
    authList: string[],
    startDate: Date | string,
    studyDurationInMinutes: number | null,
    breakDurationInMinutes: number | null,
  };

  @ViewChild('pomodoroBody') pomodoroBody!: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    this.pomodoroService.getPomodoroById(this.pomodoroId).then((pomodoro) => {

      this.updatedData = {
        authList: pomodoro.authList,
        title: pomodoro.title,
        description: pomodoro.description,
        startDate: this.getFormattedDate(pomodoro.startDate),
        studyDurationInMinutes: pomodoro.studyDurationInMinutes,
        breakDurationInMinutes: pomodoro.breakDurationInMinutes
      }

      console.log(pomodoro);
    });
  }

  showDeletePopup() {
    this.visibleDeletePopup = !this.visibleDeletePopup;
  }

  openPopupEliminaPomodoro() {
    this.visibleDeletePopup = true;
  }

  deletePomodoro(){
    this.pomodoroService.deletePomodoro(this.pomodoroId).then(() => {
      console.log('Pomodoro eliminato con successo');
    });

    this.visibleDeletePopup = false;
  }

  updatePomodoro() {
    this.pomodoroService.updatePomodoro(this.pomodoroId, this.updatedData).then(() => {
      console.log('Pomodoro aggiornato con successo');
    });
  }

  // TODO (pf): inserire questa funzione in una classe di utils dedicata
  getFormattedDate(date: string | Date | undefined): string {
    if (!date) return '';

    // Crea un oggetto Date a partire dalla stringa ISO
    const d = new Date(date);

    // Restituisci la data nel formato yyyy-mm-dd
    return d.toISOString().split('T')[0]; // "2025-10-10"
  }

}
