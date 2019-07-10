import { Database } from '@firebase/database';
import { CardComponent } from './../card/card.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
// import { Firebase } from '@ionic-native/firebase/ngx';
import * as Firebase from 'firebase/app';

import 'firebase/database';
@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {
  cards = {};

  constructor(private route: ActivatedRoute, private toastCtrl: ToastController) {

    Firebase.database().ref('infos/'+this.route.snapshot.paramMap.get('id')).on('value', resp => {
      this.cards = snapshotToObject(resp);
      console.log(this.cards)
    })



   }

  ngOnInit() {
   
  }
  
}
export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;

  return item;
}