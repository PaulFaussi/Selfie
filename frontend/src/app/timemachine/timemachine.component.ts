import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { TimeMachineService } from "../time-machine.service";

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
  constructor(private timeMachineService: TimeMachineService){
  }

  boxVis: boolean = true;
  popupVis: boolean = false;
  selectedDateStr: string = '';

  ngOnInit(): void {
    this.boxVis = true;
    this.popupVis = false;

  }




  async timemachinePopup(){
    const selectedDate = await this.timeMachineService.getCurrentDate();
    this.selectedDateStr = selectedDate.toISOString().slice(0, -1);

    this.boxVis = false;
    this.popupVis = true;
  }

  closeTm(){
    this.boxVis = true;
    this.popupVis = false;
  }



  async setTm() {

    await this.timeMachineService.updateCurrentDate(new Date(this.selectedDateStr));


    this.closeTm();

  }



  async restoreTm(){
    await this.timeMachineService.updateCurrentDate(new Date());
    this.selectedDateStr = (await this.timeMachineService.getCurrentDate()).toISOString().slice(0, -1);

    await this.setTm();
    this.closeTm();
    alert("Date/Time restored.")
  }








}
