import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timemachine',
  standalone: true,
  imports: [],
  templateUrl: './timemachine.component.html' ,
  styleUrl: './timemachine.component.css'
})
export class TimemachineComponent {
  constructor(private http: HttpClient){
  }

  url='http://localhost:8000'
  boxVis: string = "";
  popupVis: string = "none";
  

  timemachinePopup(){
    this.boxVis = 'none';
    this.popupVis = '';
  }

  closeTm(){
    this.boxVis = '';
    this.popupVis = 'none';
  }



  async setTm(dateTime: string) {
    let newDateTime: string;
    if(dateTime != "Now"){
      newDateTime = new Date(dateTime).toLocaleString();
    }
    else{
      newDateTime = dateTime;
    }
    
    
    this.http.post<{ message?: string, error?: string}>(`${this.url}/timeMachine`, { newDateTime }
    ).subscribe({
      next: (res) => {
        if (res.message) { 
          console.log("Time set:", newDateTime );
        } else {
          alert(`Unable to set date/time: ${res.error || 'Unknown error'}`);
        }
      },
      error: (err) => {
        console.error('Time machine error:', err.error.error || 'Unknown error');
        alert(`Time machine failure: ${err.error.error}`);
      }
    });
    this.closeTm();
    
  }



  restoreTm(){
    this.setTm("Now");
    this.closeTm();
    alert("Date/Time restored.")
  }







}
