import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router){

  }

  openLoginDashboard(){
    if(localStorage.getItem('loginToken')){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.router.navigateByUrl('/login');
    }

  }







}
