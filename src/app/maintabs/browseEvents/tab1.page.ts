import { element } from 'protractor';
import { ToastController } from '@ionic/angular';
import { Event } from '../../Models/Event';
import { LocationFilterComponent } from './../../filters/location-filter/location-filter.component';
import { ScrollComponent } from './../../filters/DaysOfWeekFilter/scroll.component';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from './../../shared/card/card.component';
import { Observable } from 'rxjs';
import {Router } from '@angular/router'
import {FirebaseDatabaseService} from '../../services/firebaseDatabase/firebase-database.service'
import  * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {ActivityFilterComponent} from './../../filters/Activity/activity-filter.component'

import 'firebase/database'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  user: any;
  loadedEvents: Event[] = [];
  events: Event[];
  searchTerm;
  newEvents: Event[] = [];
  allfalse = false;
  counter = 0;
  custom: Boolean = false;
  iconsMatch = {"Volunteering":"globe","Community":"help-buoy","Sports":"american-football","Food":"pizza","Special lectures":"/../../../assets/Special-lecture.svg","Parties":"beer","Movies":"film","Club Meeting":"/../../../assets/club-meeting.svg","Cultural and Language":"planet","Student Government":"globe","Music":"musical-notes","Performance Art":"../../../assets/performance-arts.svg","Dance":"/../../../assets/dance.svg","Religious":"/../../../assetsreligious.svg","Gaming":"logo-game-controller-b","Social Activism":"megaphone","Relax":"bonfire","Science":"flask","Shopping":"cart","Special Shows":"color-wand","Fitness":"fitness"} 
  ;

  activity = {"Volunteering": true,"Community":true,"Sports":true,"Food":true,"Special lectures":true,"Parties":true,"Movies":true,"Club Meeting":true,"Cultural and Language":true,"Student Government":true,"Music":true,"Performance Art":true,"Dance":true,"Religious":true,"Gaming":true,"Social Activism":true,"Relax":true,"Science":true,"Shopping":true,"Special Shows":true,"Fitness":true}
  activityEntries = Object.entries(this.activity)
  allClicked = true; 
  constructor( private fireauth: AngularFireAuth, private toastCtrl: ToastController,private firebaseDatabase: FirebaseDatabaseService, private router: Router) {
  
  }

  ngOnInit()  {
    this.fetchEvents()
   
  }
  fetchEvents() {

    this.firebaseDatabase.getEventIDs()
    .subscribe((events) => {
      this.events = events;
      this.loadedEvents = events
     
    }, (err) => {
      console.log(err)
    })
    
  }

  initializeItems(): void {
    this.events = this.loadedEvents;
    this.newEvents = []
    this.allfalse = false;
    }

    filterList(evt, filterOption: string, allClicked: Boolean) {
      this.initializeItems();

      if (filterOption == "category"){

        var allFalse =  this.allFalseFunc(evt) 
        var allTrue =  this.allTrueFunc(evt) 
 
         this.events.forEach( val => {
        
           evt.forEach(element => {
             if(val.event_category == element[0] && element[1]) {
 
               this.newEvents.push(val)
 
             } 
           })
         })
 
         if (allClicked == false) { //Categories clicked
         this.events = this.newEvents
       } 
       if (allClicked == true && allFalse == true && allTrue == false) {//all clicked, all Categories on
           this.events = this.loadedEvents
       }
       if (allClicked == true && allTrue == false) {//all clicked, All Categories Off
 
         this.events = this.newEvents
 
       }
       
      }
      if (filterOption == "location"){
       var allFalse =  this.allFalseFunc(evt) 
       var allTrue =  this.allTrueFunc(evt) 

        this.events.forEach( val => {
       
          evt.forEach(element => {
            if(val.event_location == element[0] && element[1]) {

              this.newEvents.push(val)

            } 
          })
        })

        if (allClicked == false) { //Locations clicked
        this.events = this.newEvents
      } 
      if (allClicked == true && allFalse == true && allTrue == false) {//all clicked, all locations on
          this.events = this.loadedEvents
      }
      if (allClicked == true && allTrue == false) {//all clicked, All locations Off

        this.events = this.newEvents

      }
          


      }
      if (filterOption == "time"){
        


      }
      if (filterOption == "search"){
        const searchTerm = evt.srcElement.value;
        if (!searchTerm) {
          return;
          }
          this.events = this.events.filter(currentGoal => {
            if (currentGoal.event_title && searchTerm) {
            if (currentGoal.event_title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            return true;
            }
            return false;
            }
            } );
      }
        
      
      
   
      }

      allFalseFunc(filterEntries) {
        var counter = 0;
        var allFalse = false;
        filterEntries.forEach(element => {
          if(element[1] == true) {
            allFalse = false;
          }
          else {
            counter += 1
          }
        });
        
        if (counter == filterEntries.length) {
            return true
        } else {

          return false
        }
      }

      allTrueFunc(filterEntries) {

        var counter = 0;
        var allTrue = false;
        filterEntries.forEach(element => {
          if(element[1] == false) {
            return false
          }
          else {
            counter += 1
          }
        });
        
        if (counter == filterEntries.length) {

            return true
        } else {

          return false
        }

      }
  ionViewDidEnter() {
    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    })
  }
  doRefresh(event) {
    
    this.fetchEvents()
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  
// categoryPressed(category) {
    
// }

  saveEvent(eventID: string) {
  this.firebaseDatabase.saveEvent(eventID, this.user.uid)
    this.showToast("Event Saved")
}

showToast(msg) {
    this.toastCtrl.create({
      position: 'top',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }

  categoryPressed(category) {

    this.allClicked = false;
    console.log(this.activityEntries, "activityEntry")
    this.activityEntries.forEach(element => {
      if (element[0] != category) {
        element[1] = false
      } else {
        this.showToast("Showing " + element[0] + " events only")
      }
    })
    this.filterList(this.activityEntries, "category", true)
    
  }
  changeColor(index){
  
    
    this.allClicked = false;
    if (this.activityEntries[index][1] == false ) {
      this.activityEntries[index][1] = true
    } else {
      this.activityEntries[index][1] = false

    }
    this.filterList(this.activityEntries, "category", false)

    
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

this.filterList(this.activityEntries, "category", true)


  }
}


