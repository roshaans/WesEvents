import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { Event } from '../../Models/Event';
import { Component, OnInit, Input} from '@angular/core';
import {card} from '../../Models/cardDetail';
import { Router, ActivatedRoute } from '@angular/router';
import * as Firebase from 'firebase/app';
import { Database } from '@firebase/database';
import 'firebase/database';
import { iconDict } from '../../Models/CategoryIconsDictionary';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() id;
  iconsMatch = iconDict

  event: Event;
   
  colorScheme = {"Sports": "#195DF7", "Party": "#36454f" }
  constructor(private route: ActivatedRoute, private firebaseDatabase: FirebaseDatabaseService) { 
    // const el = document.querySelector('.fancy-button');
    // document.querySelector("newCard").assignedSlot.style.setProperty('background', '#36454f')
    // document.documentElement.style.setProperty(`backround`, "#195DF7");
    // document.getElementById("newCard").style.color = "blue";

    // el.style
    // style.setProperty('--background', '#36454f');
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