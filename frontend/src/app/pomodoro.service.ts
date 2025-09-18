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

  apiUrl: string = 'http://localhost:8000/pomodoro'

  constructor(private httpService: HttpService, private loginService: LoginService) { }

  async createPomodoro(title: string,
                       durationStudy: number | null,
                       durationBreak: number | null,
                       numberCycles: number,
                       startDate: Date): Promise<any> {
    try {
      console.log("START DATE: " + startDate)
      const cyclesLeft = numberCycles;
      const url = `${this.apiUrl}/createPomodoro`;
      const body = {title, durationStudy, durationBreak, numberCycles, cyclesLeft, startDate};
      const token = this.loginService.getToken();

      const response = await firstValueFrom(this.httpService.post(url, body, token));
      return response._id;
    } catch (error: any) {
      alert(error.message);
    }
  }

  async copyPomodoro(id: string): Promise<any> {
    try {
      const url = `${this.apiUrl}/copyPomodoro/${id}`;
      const token = this.loginService.getToken();

      const response = await firstValueFrom(this.httpService.get(url, token));
      return response._id;
    } catch (error: any) {
      alert(error.message);
    }
  }

  async getAllPomodoros(): Promise<PomodoroInterface[]> {
    const url = `${this.apiUrl}/getAllPomodoros`;
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

  async updateCyclesLeft(id: string, cyclesLeft: number) {
    const url = `${this.apiUrl}/updateCyclesLeftPomodoro/${id}`;
    const body = { cyclesLeft };
    const token = this.loginService.getToken();

    return await firstValueFrom(this.httpService.post(url, body, token));
  }

  async completedPomodoro(id: string) {
    const url = `${this.apiUrl}/completedPomodoro/${id}`;
    const body = {};
    const token = this.loginService.getToken();

    return await firstValueFrom(this.httpService.post(url, body, token));
  }

  async updatePomodoro(id: string, pomodoro: any) {
    if (pomodoro === null) {
      return null;
    }

    // jwt, req.params.id, req.title, req.description, req.startDate, req.startDate, req.durationStudy, req.durationBreak);

    const url = `${this.apiUrl}/updatePomodoro/${id}`;
    const body = { title: pomodoro.title, description: pomodoro.description, startDate: pomodoro.startDate,
      durationStudy: pomodoro.durationStudy, durationBreak: pomodoro.durationBreak};
    const token = this.loginService.getToken();

    return await firstValueFrom(this.httpService.post(url, body, token));
  }


}
