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

  async getPomodoroById(id: string): Promise<PomodoroInterface> {
    const url = `${this.apiUrl}/getPomodoro/${id}`;
    const token = this.getToken();

    return await firstValueFrom(this.httpService.get(url, token));
  }

  async deletePomodoro(id: string) {
    const url = `${this.apiUrl}/deletePomodoro/${id}`;
    const token = this.getToken();

    return await firstValueFrom(this.httpService.delete(url, token));
  }

  async updatePomodoro(id: string, pomodoro: any) {
    if (pomodoro === null) {
      return null;
    }

    console.log('Aggiornando il pomodoro... ');

    const url = `${this.apiUrl}/updatePomodoro/${id}`;
    const body = {pomodoro};
    const token = this.getToken();

    return await firstValueFrom(this.httpService.post(url, body, token));
  }

  sortByUpcomingPomodoros(list: PomodoroInterface[]): PomodoroInterface[] {
    const now: Date = new Date();

    return list
      .filter(obj => new Date(obj.startDate) > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  }

  sortByRecentPomodoros(list: PomodoroInterface[]): PomodoroInterface[] {
    const now: Date = new Date();

    return list
      .filter(obj => new Date(obj.startDate) < now)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }


  private getToken(): string {
    const token = localStorage.getItem('loginToken');
    if (token === null) {
      throw new Error('Errore. Effettuare il login');
    }
    return token;
  }

}
