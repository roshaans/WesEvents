import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-filter',
  templateUrl: './time-filter.component.html',
  styleUrls: ['./time-filter.component.scss'],
})
export class TimeFilterComponent implements OnInit {

  time = {"Morning": true, "Afternoon":  true, "Evening":  true, "Night":  true }

  timeEntries = Object.entries(this.time)
  allClicked = true;
  constructor() { }

  ngOnInit() {}
  changeColor(index){

    this.allClicked  = false;
    
    if (this.timeEntries[index][1] == false ) {
      this.timeEntries[index][1] = true
    } else {
      this.timeEntries[index][1] = false

    }

    
  }

  allClickedFunc() {

    if(this.allClicked == true) {
      this.allClicked = false
    } else if(this.allClicked == false) {
      this.allClicked = true
    
    }

    if(this.allClicked  == true) {
      this.timeEntries.forEach(element => {
        element[1] = true;

}) } else {
  this.timeEntries.forEach(element => {
    element[1] = false;
})
}



  }
}
