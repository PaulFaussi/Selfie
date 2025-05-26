import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from "@angular/common";
import { MessageInterface } from "../message.interface";
import { FormsModule } from "@angular/forms";
import { MessageService } from "../message.service";


// TODO (next step): implementare le notifiche utilizzando la variabile booleana "isRead"
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  chatTabVis: boolean = false;
  hasNotification: boolean = false;
  private timerId!: ReturnType<typeof setInterval>;

  usernameReceiver: string = "";
  messageToSend: string = "";

  messageList: MessageInterface[] = [];

  messageService: MessageService = inject(MessageService);

  constructor(private router: Router){}


  ngOnInit(): void {
    this.messageToSend = "";
    this.usernameReceiver = "";
    this.messageList = [];

    this.refreshNotifications();

    this.chatTabVis = false;
    this.hasNotification = false;

    this.timerId = setInterval(() => {
      this.refreshNotifications();
    }, 20_000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }



  openLoginDashboard(){
    if(localStorage.getItem('loginToken')){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.router.navigateByUrl('/login');
    }

  }

  chatTab(){
    // this.refreshNotifications();

    this.chatTabVis = !this.chatTabVis;
    this.hasNotification = false;
  }

  refreshNotifications(){
    this.messageService.getAllMessages().then((messages: MessageInterface[]) => {
      if(messages.some(message => !message.isRead) && !this.chatTabVis) {
        this.hasNotification = true;

        for (const message of messages) {
          if (!message.isRead) {
            this.messageService.markMessageAsRead(message);
          }
        }
      }

      this.messageList = messages;
    });
  }

  sendMessage(){
    const message: MessageInterface = {
      sender: '',
      receiver: this.usernameReceiver,
      text: this.messageToSend,
      date: new Date(),
      isRead: false
    };

    console.log(message);

    this.messageService.sendMessage(message).then(() => {
      this.usernameReceiver = "";
      this.messageToSend = "";
    })

  }

}
