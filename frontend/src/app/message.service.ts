import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { LoginService } from "./login.service";
import { MessageInterface } from "./message.interface";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  apiUrl: string = 'http://localhost:9000/messaggi'


  constructor(private httpService: HttpService, private loginService: LoginService) { }

  async getAllMessages(): Promise<MessageInterface[]> {
    const url = `${this.apiUrl}/getAllMessages`;
    const token = this.loginService.getToken();

    return await firstValueFrom(this.httpService.get(url, token));
  }

  async sendMessage(message: MessageInterface) {
    try {
      const url = `${this.apiUrl}/sendMessage`;
      const body = { message };
      const token = this.loginService.getToken();

      this.httpService.post(url, body, token).subscribe();
    } catch (error: any) {
      alert(error.message);
    }
  }

  async markMessageAsRead(message: MessageInterface) {
    try {
      const url = `${this.apiUrl}/read`;
      const body = { message };
      const token = this.loginService.getToken();

      this.httpService.post(url, body, token).subscribe();
    } catch (error: any) {
      alert(error.message);
    }
  }
}
