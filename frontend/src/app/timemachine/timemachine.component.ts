import { Component, OnInit } from '@angular/core';
import { ClockService } from "../clock.service";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-timemachine',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './timemachine.component.html' ,
  styleUrl: './timemachine.component.css'
})
export class TimemachineComponent implements OnInit {
  constructor(private clockService: ClockService){
  }

  boxVis: boolean = true;
  popupVis: boolean = false;
  currentDate: Date = new Date();
  selectedDateStr: string = '';

  ngOnInit(): void {
    this.boxVis = true;
    this.popupVis = false;

    const currentDate = this.clockService.getCurrent();
    if (currentDate == null) {
      this.clockService.time$.subscribe((now) => { this.currentDate = now });
    } else {
      this.clockService.setVirtualNow(currentDate);
    }
  }




  timemachinePopup(){
    this.selectedDateStr = this.clockService.getCurrentString();
    console.log(this.selectedDateStr);

    this.boxVis = false;
    this.popupVis = true;
  }

  closeTm(){
    this.boxVis = true;
    this.popupVis = false;
  }



  async setTm() {
    console.log(this.selectedDateStr);

    this.clockService.setVirtualNow(new Date(this.selectedDateStr));


    this.closeTm();

  }



  restoreTm(){
    this.clockService.setVirtualNow(new Date());
    this.selectedDateStr = this.clockService.getCurrentString();

    this.setTm();
    this.closeTm();
    alert("Date/Time restored.")
  }







}
