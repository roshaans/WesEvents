import { Component, OnInit } from '@angular/core';
import {card} from '../Models/cardDetail';
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
  newCard = {};
//    newCard =  new card("My Name is Khan and I ", 
//   "", 
//    "", 
//    "", 
//  "Wed, July 20, 2019", 
//   "", 
//   "", 
//    "", 
//   0, 
//    0, 
//    0)
   
   

  constructor(private route: ActivatedRoute) { 
    Firebase.database().ref('infos/'+this.route.snapshot.paramMap.get('id')).on('value', resp => {
      this.newCard = snapshotToObject(resp);
      console.log(this.newCard)
    })
  }

  ngOnInit() {}

  // showCardDetail(id) {
  //   this.router.navigateByUrl('/card/' + id);
  // }
}
export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}