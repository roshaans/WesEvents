import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss'],
})
export class LocationFilterComponent implements OnInit {

  locations = {" Exley " : true , " Foss hill " : true , " Usdan University Center " : true , " Russel House " : true , " Davison Art Center " : true , " Fayerweather " : true , " Memorial Chapel " : true , " Patricelli ’92 Theater " : true , " Powell Family Cinema " : true , " Resource Center " : true , " Gordon Career Center " : true , " Religious and Spiritual Life " : true , " Student Resource Center " : true , " Wesleyan RJ Julia Bookstore " : true}

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
