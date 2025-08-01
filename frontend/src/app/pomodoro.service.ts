import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { PomodoroInterface } from "./pomodoro.interface";
import { firstValueFrom, Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {

  apiUrl: string = 'http://localhost:9000/pomodoro'

  constructor(private httpService: HttpService, private loginService: LoginService) { }

  async createPomodoro(title: string, description: string, startDate: Date, studyDurationInMinutes: number | null, breakDurationInMinutes: number | null): Promise<void> {
    try {
      const url = `${this.apiUrl}/createPomodoro`;
      const body = {title, description, startDate, studyDurationInMinutes, breakDurationInMinutes};
      const token = this.loginService.getToken();

      this.httpService.post(url, body, token).subscribe();
    } catch (error: any) {
      alert(error.message);
    }
  }

  async getAllPomodoros(): Promise<PomodoroInterface[]> {
    const url = `${this.apiUrl}/getAllPomodoros`;
    const token = this.loginService.getToken();

    return await firstValueFrom(this.httpService.get(url, token));
  }

  async getAllPomodorosSorted(sortType: string): Promise<PomodoroInterface[]> {
    const url = `${this.apiUrl}/getAllPomodoros/${sortType}`;
    const token = this.loginService.getToken();

    return await firstValueFrom(this.httpService.get(url, token));
  }

  async getPomodoroById(id: string): Promise<PomodoroInterface> {
    const url = `${this.apiUrl}/getPomodoro/${id}`;
    const token = this.loginService.getToken();

    return await firstValueFrom(this.httpService.get(url, token));
  }

  async deletePomodoro(id: string) {
    const url = `${this.apiUrl}/deletePomodoro/${id}`;
    const token = this.loginService.getToken();

    return await firstValueFrom(this.httpService.delete(url, token));
  }

  async updatePomodoro(id: string, pomodoro: any) {
    if (pomodoro === null) {
      return null;
    }

    console.log('Aggiornando il pomodoro... ');
    // jwt, req.params.id, req.title, req.description, req.startDate, req.startDate, req.studyDurationInMinutes, req.breakDurationInMinutes);

    const url = `${this.apiUrl}/updatePomodoro/${id}`;
    const body = { title: pomodoro.title, description: pomodoro.description, startDate: pomodoro.startDate,
      studyDurationInMinutes: pomodoro.studyDurationInMinutes, breakDurationInMinutes: pomodoro.breakDurationInMinutes};
    const token = this.loginService.getToken();

    return await firstValueFrom(this.httpService.post(url, body, token));
  }

  filterByFuturePomodoros(list: PomodoroInterface[]): PomodoroInterface[] {
    const now: Date = new Date();

    return list.filter(obj => new Date(obj.startDate) >= now);
  }

  filterByPastPomodoros(list: PomodoroInterface[]): PomodoroInterface[] {
    const now: Date = new Date();

    return list.filter(obj => new Date(obj.startDate) <= now);
  }

  sortByUpcomingPomodoros(list: PomodoroInterface[]): PomodoroInterface[] {
    return list.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  }

  sortByRecentPomodoros(list: PomodoroInterface[]): PomodoroInterface[] {
    return list.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }


}
