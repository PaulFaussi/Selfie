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

  chatTabVis: string = 'none';

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




  chatTab(){
    if(this.chatTabVis == ''){
      this.chatTabVis = 'none';
    }
    else{
      this.chatTabVis = '';
    }
  }

  refreshNotifications(){
    
  }

  sendMessage(){

  }

}
