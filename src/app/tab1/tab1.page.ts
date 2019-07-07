import { card } from './../Models/cardDetail';
import { FirebaseService, Card } from './../firebase.service';
import { LocationFilterComponent } from './../location-filter/location-filter.component';
import { ScrollComponent } from './../scroll/scroll.component';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from './../card/card.component';
import { Observable } from 'rxjs';

import  * as firebase from 'firebase/app';
import 'firebase/database'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  eventsObject = {"1": {"name": "hello", "location": "Exley" }, 
  "2": {"name": "Whats up", "location": "Nics" }, 
  "3": {"name": "Whats up", "location": "Nics" }


}
eventsArray = Object.entries(this.eventsObject)

  private cards: Observable<Card[]>;
   cardss = [];
  ref = firebase.database().ref('infos/');

  constructor(private cardService: FirebaseService) {

     this.ref.on('value', resp => {
    this.cardss = [];
      this.cardss = snapshotToArray(resp);
      console.log(this.cardss)
     });
  }

  ngOnInit() {
    this.cards = this.cardService.getCards();
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
