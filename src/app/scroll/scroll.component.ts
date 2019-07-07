import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
})
export class ScrollComponent implements OnInit {

  days = {"MON": true, "TUE":  true, "WED": true, "THU": true, "FRI": true, "SAT": true , "SUN": true  }

  daysEntries = Object.entries(this.days)
  allClicked = true; 

  
  changeColor(index){
    this.allClicked = false;
    if (this.daysEntries[index][1] == false ) {
      this.daysEntries[index][1] = true
    } else {
      this.daysEntries[index][1] = false

    }

    
  }

  
  constructor() { }

  ngOnInit() {}

  condition(){

  }

  allClickedFunc() {

    if(this.allClicked == true) {
      this.allClicked = false
    } else if(this.allClicked == false) {
      this.allClicked = true
    
    }

    if(this.allClicked  == true) {
      this.daysEntries.forEach(element => {
        element[1] = true;

}) } else {
  this.daysEntries.forEach(element => {
    element[1] = false;
})
}



  }
  
}
