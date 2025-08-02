import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { LoginService } from "./login.service";
import { firstValueFrom } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TimeMachineService {

  apiUrl: string = 'http://localhost:9000/generic';

  constructor(private httpService: HttpService) { }

  async getCurrentDate(): Promise<Date> {
    try {
      const url = `${this.apiUrl}/getCurrentDate`;

      const response = await firstValueFrom(this.httpService.get(url, null));
      return new Date(response.currentDate);
    } catch (error) {
      console.error('Errore durante il recupero della data:', error);
      throw error;
    }
  }

  async updateCurrentDate(newDate: Date): Promise<void> {

    try {
      const url = `${this.apiUrl}/updateCurrentDate`;
      const body = { updatedDate: newDate }

      await firstValueFrom(this.httpService.post(url, body, null));
    } catch (error: any) {
      alert(error.message);
    }
  }
}
