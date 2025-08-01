import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { firstValueFrom, Observable } from "rxjs";
import { Router } from '@angular/router';
import { LoginService } from "./login.service";



@Injectable({
  providedIn: 'root'
})
export class GenericService {

  apiUrl: string = 'http://localhost:9000/generic';

  constructor(private httpService: HttpService, private loginService: LoginService) { }

  async checkTokenValido(): Promise<boolean> {

    try {
      const url = `${this.apiUrl}/isTokenValido`;
      const token = this.loginService.getToken();

      if (token === null || token === undefined) {
        return false;
      }


      await firstValueFrom(this.httpService.get(url, token));
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }
}

