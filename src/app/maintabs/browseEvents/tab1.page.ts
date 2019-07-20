import { ToastController } from '@ionic/angular';
import { Event } from '../../Models/Event';
import { card } from './../../Models/cardDetail';
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
  loadedEvents: Event[];
  events: Event[];
  searchTerm;
   newEvents: Event[] = [];
  allfalse = false;
  counter = 0;

  // activity = this.activityFilter.activity
  // activityEntries = Object.entries(this.activity)
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
    this.counter = 0;
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
          console.log("Everything is True. ")

            return true
        } else {
          console.log("Everything is False. ")

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

  


  saveEvent(eventID: string) {
  this.firebaseDatabase.saveEvent(eventID, this.user.uid)
    this.showToast("Event Saved")
}

showToast(msg) {
    this.toastCtrl.create({
      position: 'bottom',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }
}


