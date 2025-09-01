import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private router: Router) {

  }

  url='http://localhost:9000/user'

  async loginRequest(username: string, password: string) {
    this.http.post<{ token?: string; userFound?: any; message?: string; error?: string }>(
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


  async registerRequest(firstname: string, lastname: string, username: string, password: string, dob: Date) : Promise<boolean>{
    const data = {firstname: firstname, lastname: lastname, username: username, password: password, dob: dob};
    console.log(data);

    try{
      const response = await fetch(`${this.url}/register`, {method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return true;

    }
    catch (error) {
      return false;
    }
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
