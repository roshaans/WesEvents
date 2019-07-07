import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss'],
})
export class LocationFilterComponent implements OnInit {

  locations = {"Gordon Career Center": true, "Parties":  true, "Usdan": true, "Exley": true, "Foss Hill": true }

  locationEntries = Object.entries(this.locations)
  allClicked = true; 
  constructor() { }

  ngOnInit() {}

  changeColor(index){
    this.allClicked = false;
    if (this.locationEntries[index][1] == false ) {
      this.locationEntries[index][1] = true
    } else {
      this.locationEntries[index][1] = false

    }

    
  }

  allClickedFunc() {

    if(this.allClicked == true) {
      this.allClicked = false
    } else if(this.allClicked == false) {
      this.allClicked = true
    
    }

    if(this.allClicked  == true) {
      this.locationEntries.forEach(element => {
        element[1] = true;

}) } else {
  this.locationEntries.forEach(element => {
    element[1] = false;
})
}



  }
}
