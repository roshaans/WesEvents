import { card } from './../Models/cardDetail';
import { LocationFilterComponent } from './../filters/location-filter/location-filter.component';
import { ScrollComponent } from './../filters/DaysOfWeekFilter/scroll.component';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from './../card/card.component';
import { Observable } from 'rxjs';
import {FirebaseDatabaseService} from '../services/firebaseDatabase/firebase-database.service'
import  * as firebase from 'firebase/app';
import 'firebase/database'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  iconsMatch = {"volunteer": "globe", "sports": "american-football","Gordon Career Center": "briefcase","food": "pizza", "talks": "school",  "Parties":  "beer", "Usdan": "restaurant", "Exley": "true", "Foss Hill": "sunny", "movies": "film" }

   eventCardsArray = [];
  ref = firebase.database().ref('infos/');

  constructor(public firebaseDatabase: FirebaseDatabaseService) {
    
  }

  ngOnInit() {
    
  }
  doRefresh(event) {

  
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}


