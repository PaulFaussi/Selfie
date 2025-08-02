import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from "../message.service";
import { MessageInterface } from "../message.interface";
import { CommonModule, NgIf } from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  chatTabVis: boolean = false;
  hasNotification: boolean = false;
  private timerId!: ReturnType<typeof setInterval>;

  messageList: MessageInterface[] = [];

  messageService: MessageService = inject(MessageService);

  constructor(private router: Router){

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

  // chatTab(){
  //   if(this.chatTabVis == ''){
  //     this.chatTabVis = 'none';
  //   }
  //   else{
  //     this.chatTabVis = '';
  //   }
  // }

  refreshNotifications(){
    this.messageService.getAllMessages().then((messages: MessageInterface[]) => {
      if(!this.chatTabVis) {
      // if(messages.some(message => !message.isRead) && !this.chatTabVis) {
        this.hasNotification = true;

        for (const message of messages) {
          this.messageService.markMessageAsRead(message);
          // if (!message.isRead) {
          //   this.messageService.markMessageAsRead(message);
          // }
        }
      }

      this.messageList = messages;

      console.log(this.messageList);
    });
  }

  sendMessage(username: string, message: string){
    const messageInterface: MessageInterface = {
      sender: '',
      receiver: username,
      text: message,
      date: new Date(),
      isRead: false
    };

    console.log(messageInterface);

    this.messageService.sendMessage(messageInterface).then(() => {
    })

  }

}
