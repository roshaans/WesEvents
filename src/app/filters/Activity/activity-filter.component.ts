import { Component, OnInit } from '@angular/core';
import {iconDict} from './../../Models/CategoryIconsDictionary'

@Component({
  selector: 'app-activity-filter',
  templateUrl: './activity-filter.component.html',
  styleUrls: ['./activity-filter.component.scss'],
})
export class ActivityFilterComponent implements OnInit {
  custom: Boolean = false;
  iconsMatch = {"Volunteering":"globe","Community":"help-buoy","Sports":"american-football","Food":"pizza","Special lectures":"/../../../assets/Special-lecture.svg","Parties":"beer","Movies":"film","Club Meeting":"/../../../assets/club-meeting.svg","Cultural and Language":"planet","Student Government":"globe","Music":"musical-notes","Performance Art":"../../../assets/performance-arts.svg","Dance":"/../../../assets/dance.svg","Religious":"/../../../assetsreligious.svg","Gaming":"logo-game-controller-b","Social Activism":"megaphone","Relax":"bonfire","Science":"flask","Shopping":"cart","Special Shows":"color-wand","Fitness":"fitness"} 
  ;

  activity = {"Volunteering": true,"Community":true,"Sports":true,"Food":true,"Special lectures":true,"Parties":true,"Movies":true,"Club Meeting":true,"Cultural and Language":true,"Student Government":true,"Music":true,"Performance Art":true,"Dance":true,"Religious":true,"Gaming":true,"Social Activism":true,"Relax":true,"Science":true,"Shopping":true,"Special Shows":true,"Fitness":true}
  activityEntries = Object.entries(this.activity)
  allClicked = true; 

  
  constructor() { 


  }

  ngOnInit() {

  }

  changeColor(index){
    this.allClicked = false;
    if (this.activityEntries[index][1] == false ) {
      this.activityEntries[index][1] = true
    } else {
      this.activityEntries[index][1] = false

    }

    
  }

  allClickedFunc() {

    if(this.allClicked == true) {
      this.allClicked = false
    } else if(this.allClicked == false) {
      this.allClicked = true
    
    }

    if(this.allClicked  == true) {
      this.activityEntries.forEach(element => {
        element[1] = true;

}) } else {
  this.activityEntries.forEach(element => {
    element[1] = false;
})
}



  }
}
