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
import 'firebase/database'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  iconsMatch = {"volunteer": "globe", "sports": "american-football","Gordon Career Center": "briefcase","food": "pizza", "talks": "school",  "Parties":  "beer", "Usdan": "restaurant", "Exley": "true", "Foss Hill": "sunny", "movies": "film" }
  events: Event[];
  eventKeys;
  eventValues;
  constructor(private firebaseDatabase: FirebaseDatabaseService, private router: Router) {
  }

  ngOnInit()  {
this.firebaseDatabase.getEventIDs().subscribe(events => {
  this.events = events
})

Object.keys(this.events).forEach(key => this.events[key] === undefined && delete this.events[key])

this.eventKeys = Object.keys(this.events)
this.eventValues = Object.values(this.events)


  }

  doRefresh(event) {

    this.firebaseDatabase.getEventIDs().subscribe(events => {

      this.events = events
    })
    // this.eventEntries= Object.entries(event)

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}


