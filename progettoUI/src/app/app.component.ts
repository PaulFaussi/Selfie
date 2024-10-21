import { Component } from '@angular/core';
/* import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery'; */
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  standalone: true,
  imports: [RouterModule, HomeComponent],
  styleUrl: './app.component.css', 
  
})

export class AppComponent {
  title = 'progettoUI';

  /* constructor(private http: HttpClient) { }

  userValue: string = '';
  pswValue: string = '';

  sendLoginData() {
    //console.log('Valore user:', this.userValue, "Valore psw: ", this.pswValue);
    const body = {username: this.userValue, password: this.pswValue};

    $.ajax({
      url: 'https://esempio.com/api/dati',
      dataType: 'json',
      success: function(data) {
        console.log(data);
      },
      error: function() {
        console.log('Errore nella richiesta AJAX');
      }
    });

    
  } */

}

