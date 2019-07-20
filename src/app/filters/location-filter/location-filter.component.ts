import { Component, OnInit } from '@angular/core';
import { Tab1Page } from './../../maintabs/browseEvents/tab1.page'

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss'],
})
export class LocationFilterComponent implements OnInit {

  locations = {"Exley" : true , "Foss Hill" : true , "Usdan University Center" : true , "Russel House" : true , "Davison Art Center" : true , "Fayerweather" : true , "Memorial Chapel" : true , "Patricelli ’92 Theater" : true , "Powell Family Cinema" : true , "Resource Center " : true , " Gordon Career Center" : true , "Religious and Spiritual Life" : true , "Student Resource Center" : true , "Wesleyan RJ Julia Bookstore" : true}

  locationEntries = Object.entries(this.locations)
  allClicked = true; 
  constructor(private tab1: Tab1Page) { }

  ngOnInit() {}

  changeColor(index){
    this.allClicked = false;
    if (this.locationEntries[index][1] == false ) {
      this.locationEntries[index][1] = true
    } else {
      this.locationEntries[index][1] = false

    }
    this.tab1.filterList(this.locationEntries, "location", false)

    
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
this.tab1.filterList(this.locationEntries, "location", true)



  }
}
