import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { PomodoroInterface } from "./pomodoro.interface";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {

  apiUrl: string = 'http://localhost:4316/pomodoro'

  constructor(private httpService: HttpService) { }

  async createPomodoro(pomodoro: PomodoroInterface): Promise<void> {
    try {
      const url = `${this.apiUrl}/createPomodoro`;
      const body = {pomodoro};
      const token = this.getToken();

      this.httpService.post(url, body, token).subscribe();
    } catch (error: any) {
      alert(error.message);
    }
  }

  async getAllPomodoros(): Promise<PomodoroInterface[]> {
    const url = `${this.apiUrl}/getAllPomodoros`;
    const token = this.getToken();

    return await firstValueFrom(this.httpService.get(url, token));
  }


  private getToken(): string {
    const token = localStorage.getItem('loginToken');
    if (token === null) {
      throw new Error('Errore. Effettuare il login');
    }
    return token;
  }
}
