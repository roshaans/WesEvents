import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent implements OnInit {
  momentjs: any = moment;
  currentDate = moment()
  // currentDateTime = this.momentjs().format('YYYY-MM-DD HH:mm:ss ZZ');
  newDay = moment(this.currentDate).add(1, 'day').format('ddd');
  daysOfWeek = moment(this.newDay).format('ddd')

  currentFullDate =  Date.now
  // currentDate = this.currentFullDate.getDate
  // currentDay = this.currentFullDate.getDay
  // currentTime = this.currentFullDate.getHours
  
  days = {"First": [moment(this.currentDate).add(0, 'day').format('ddd'), moment(this.currentDate).add(0, 'day').format('DD'),true], "Second":  [moment(this.currentDate).add(1, 'day').format('ddd'), moment(this.currentDate).add(1, 'day').format('DD'), true], "Third": [moment(this.currentDate).add(2, 'day').format('ddd'), moment(this.currentDate).add(2, 'day').format('DD'), true], "Fourth": [moment(this.currentDate).add(3, 'day').format('ddd'), moment(this.currentDate).add(3, 'day').format('DD'), true], "Fifth": [moment(this.currentDate).add(4, 'day').format('ddd'), moment(this.currentDate).add(4, 'day').format('DD'), true], "Sixth": [moment(this.currentDate).add(5, 'day').format('ddd'), moment(this.currentDate).add(5, 'day').format('DD'), true] , "Seventh": [moment(this.currentDate).add(6, 'day').format('ddd'), moment(this.currentDate).add(6, 'day').format('DD'), true]  }

  daysEntries = Object.entries(this.days)
  allClickedDays = true; 
  
  changeColorDays(index){
    
    
    this.allClickedDays = false;
    if (this.daysEntries[index][1][2] == false ) {
      this.daysEntries[index][1][2] = true
    } else {
      this.daysEntries[index][1][2] = false

    }

    
  }

  
  constructor() { }

  ngOnInit() {}

  condition(){

  }

  allClickedFuncDays() {

    if(this.allClickedDays == true) {
      this.allClickedDays = false
    } else if(this.allClickedDays == false) {
      this.allClickedDays = true
    
    }

    if(this.allClickedDays  == true) {
      this.daysEntries.forEach(element => {
         element[1][2] = true;

}) } else {
  this.daysEntries.forEach(element => {
    element[1][2] = false;
})
}



  }
  
}
