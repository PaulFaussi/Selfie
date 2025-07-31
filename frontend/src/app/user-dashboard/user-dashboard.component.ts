import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserInterface } from '../user-interface';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgIf, CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  loginService = inject(LoginService)
  userInterface!: UserInterface;

  username!: string;
  firstname!: string;
  lastname!: string;
  dob!: Date;

  constructor(private route: Router) {
    this.loginService.getUser().then((user) => {
      this.username = localStorage.getItem("username") || "user";
      this.firstname = localStorage.getItem("firstname") || "user";
      this.lastname = localStorage.getItem("lastname") || "";
      console.log(user);
    })
  }
    //collegare valori

  

  logout(){
    localStorage.removeItem('loginToken');
    this.route.navigateByUrl('/login');
  }

  homepageRedirect(){
    this.route.navigateByUrl('');
  }
}
