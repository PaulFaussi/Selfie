import { Routes } from '@angular/router';
import { HomeComponent }       from './home/home.component';
import { LoginpageComponent }  from './loginpage/loginpage.component';
import { NotesComponent }      from './notes/notes.component';
import { NoteEditorComponent } from './note-editor/note-editor.component';
/* import { UserDashboardComponent } from './user-dashboard/user-dashboard.component'; */
import { PomodoroComponent } from "./pomodoro/pomodoro.component";
import { PomodoroEditorComponent } from "./pomodoro-editor/pomodoro-editor.component";



import { CalendarComponent }   from './calendar/calendar.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Selfie.'
    },
    {
        path: 'login',
        component: LoginpageComponent,
        title: 'Login.'
    },
    {
        path: 'notes',
        component: NotesComponent,
        title: 'Notes.'
    },
    {
        path: 'note-editor/:id',
        component: NoteEditorComponent,
        title: 'NoteEditor.'
    },
    {
        path: 'dashboard',
        component: UserDashboardComponent,
        title: 'Dashboard'
    },
    {
        path: 'pomodoro',
        component: PomodoroComponent,
        title: 'Pomodoro'
    },
    {
      path: 'pomodoro-editor/:id',
      component: PomodoroEditorComponent,
      title: 'PomodoroEditor.'
    },
  // UNICA rotta Calendar
    {
    path: 'calendar',
    component: CalendarComponent,
    title: 'Calendar.'
    },

  // fallback
  { path: '**',          redirectTo: '' }
];
