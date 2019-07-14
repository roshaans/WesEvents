import { Event } from '../../Models/Event';
import { card } from './../../Models/cardDetail';
import { LocationFilterComponent } from './../../filters/location-filter/location-filter.component';
import { ScrollComponent } from './../../filters/DaysOfWeekFilter/scroll.component';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from './../../card/card.component';
import { Observable } from 'rxjs';
import {Router } from '@angular/router'
import {FirebaseDatabaseService} from '../../services/firebaseDatabase/firebase-database.service'
import  * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import 'firebase/database'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  user: any;
  iconsMatch = {"volunteer": "globe", "sports": "american-football","Gordon Career Center": "briefcase","food": "pizza", "Special lectures": "school",  "Parties":  "beer", "Usdan": "restaurant", "Exley": "true", "Foss Hill": "sunny", "movies": "film" }
  events: Event[];
  eventEntries;
  constructor( private fireauth: AngularFireAuth,private firebaseDatabase: FirebaseDatabaseService, private router: Router) {
  }

  ngOnInit()  {
this.firebaseDatabase.getEventIDs()
.subscribe((event) => {
  this.events = event
}, (err)=> {
  console.log(err)
}, () => {

}

)


  }
  ionViewDidEnter() {
    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    })
  }
  doRefresh(event) {

    this.firebaseDatabase.getEventIDs().subscribe(events => {

      this.events = events
    })
    this.eventEntries = Object.entries(this.events)
  

    console.log(this.eventEntries)
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  notGoing(event: Event) {
console.log(event.event_title)
  }


  going(event) {

  }

}


