import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private router: Router) {

  }

  url='http://localhost:8000/user'

  async loginRequest(username: string, password: string) {
    this.http.post<{ token?: string; user?: string, userFound?: any; message?: string; error?: string }>(
        `${this.url}/login`, { username, password }
    ).subscribe({
        next: (res) => {
            if (res.token && res.userFound) {
                localStorage.setItem("loginToken", res.token);
                localStorage.setItem('username', res.userFound.username)
                localStorage.setItem("firstname", res.userFound.name);
                localStorage.setItem("lastname", res.userFound.lastname);
                console.log("Token ottenuto: ", localStorage.getItem("loginToken"));
                this.router.navigateByUrl('');
            } else {
                alert(`Login failed: ${res.message || 'Unknown error'}`);
            }
        },
        error: (err) => {
            console.error('Login failed:', err.error?.message || 'Unknown error');
            alert(`Login failed: ${err.error?.message}`);
        }
    });
  }



    async registerRequest( firstname: string, lastname: string, username: string,password: string, dob: Date ): Promise<boolean> {
      this.http.post<{ message?: string; error?: string }>(
        `${this.url}/register`, { firstname, lastname, username, password, dob }
      ).subscribe({
        next: (res) => {
          if (!res.error) {
            alert("Registration successful");
          } else {
            alert(`Registration failed: ${res.message || 'Unknown error'}`);
          }
        },
        error: (err) => {
          console.error('Registration failed:', err.error?.message || 'Unknown error');
          alert(`Registration failed: ${err.error?.message}`);
        }
      });
       
      return true;
    }




  async getUser(): Promise<any> {
    const token = localStorage.getItem('loginToken');
    const data = await fetch(`${this.url}/getUser`, {method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `${token}`}});
    return await data.json() ?? {};
  }

  getToken(): string {
    const token = localStorage.getItem('loginToken');
    if (token === null || token === undefined) {
      throw new Error('Errore. Effettuare il login');
    }
    return token;
  }

}
