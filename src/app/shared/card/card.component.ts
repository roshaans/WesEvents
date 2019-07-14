import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { Event } from '../../Models/Event';
import { Component, OnInit, Input} from '@angular/core';
import {card} from '../../Models/cardDetail';
import { Router, ActivatedRoute } from '@angular/router';
import * as Firebase from 'firebase/app';
import { Database } from '@firebase/database';
import 'firebase/database';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() id;
  iconsMatch = {"volunteer": "globe", "sports": "american-football","gordon career center": "briefcase","food": "pizza", "special lectures": "school",  "parties":  "beer", "usdan": "restaurant", "exley": "true", "foss hill": "sunny", "movies": "film" }

  event: Event;
   

  constructor(private route: ActivatedRoute, private firebaseDatabase: FirebaseDatabaseService) { 
   
  }

  ngOnInit() {
    this.firebaseDatabase.getEvent(this.id).subscribe( res => {
      this.event = res
    })
   

  }
  clickButton() {
   
  }
  // showCardDetail(id) {
  //   this.router.navigateByUrl('/card/' + id);
  // }
}
export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}