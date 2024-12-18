import { Component, inject, Inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Route } from '@angular/router';
import { LoginService } from '../login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})

export class LoginpageComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  loginService = inject(LoginService);

  constructor() {}

  loginForm = new FormGroup({
    username:  new FormControl(''),
    password: new FormControl('')
  })

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    dob: new FormControl('')

  })

  submitLoginRequest(){
    this.loginService.loginRequest(
      this.loginForm.value.username ?? '',
      this.loginForm.value.password ?? ''
      /* completare */
    )
  }

  async submitRegisterRequest(){
    let dateofbirth : Date;
    dateofbirth = new Date(this.registerForm.value.dob!);

    /* check dati input non null */

    const result = await this.loginService.registerRequest(
      this.registerForm.value.firstName ?? '',
      this.registerForm.value.lastName ?? '',
      this.registerForm.value.username ?? '',
      this.registerForm.value.password ?? '',
      dateofbirth
    )

    if(result===true){
      alert("Registration successful.")
    }
  }


  
  displayStyleLogin: string = ('');
  displayStyleRegister: string = ('none');
  loginColor: string = ('white');
  registerColor: string=('rgb(193, 193, 193)');
  loginBorder: string = ('1px solid white');
  registerBorder: string = ('1px solid rgb(193, 193, 193)');

  swapTabs(input: Number) {
    if(input==1){
      this.displayStyleLogin = '';
      this.displayStyleRegister = 'none';
      this.loginColor = 'white';
      this.registerColor = 'rgb(193, 193, 193)';
      this.loginBorder = '1px solid white';
      this.registerBorder = '1px solid rgb(193, 193, 193)';
    }
    else{
      this.displayStyleLogin = 'none';
      this.displayStyleRegister = '';
      this.loginColor = 'rgb(193, 193, 193)';
      this.registerColor = 'white';
      this.loginBorder = '1px solid rgb(193, 193, 193)';
      this.registerBorder = '1px solid white';
    }
  }


}
