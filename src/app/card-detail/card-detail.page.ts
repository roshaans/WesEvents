import { Event } from '../Models/Event';
import { FirebaseDatabaseService } from '../services/firebaseDatabase/firebase-database.service';
import { Database } from '@firebase/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {iconDict} from './../Models/CategoryIconsDictionary'

import * as Firebase from 'firebase/app';
import 'firebase/database';
@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {
  iconsMatch = iconDict;
  id;
  event;
  constructor(private firebaseDatabase: FirebaseDatabaseService, private route: ActivatedRoute, private toastCtrl: ToastController) {

   }

  ngOnInit() {
     this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) { 
   this.firebaseDatabase.getEvent(this.id).subscribe(res => {
    this.event = res
      
   }, (err) => {
     console.log(err)
   })
  }
  
}
}
