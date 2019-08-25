import { Event } from '../Models/Event';
import { FirebaseDatabaseService } from '../services/firebaseDatabase/firebase-database.service';
import { Database } from '@firebase/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit,  } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import {iconDict} from './../Models/CategoryIconsDictionary'
import { AngularFireAuth } from '@angular/fire/auth';
import { Calendar } from '@ionic-native/calendar/ngx';

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
  user: any;
  updates:any = [];
  constructor(private platform: Platform, private calendar: Calendar,private fireauth: AngularFireAuth, private firebaseDatabase: FirebaseDatabaseService, private route: ActivatedRoute, private toastCtrl: ToastController) {
    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        
       
   }
  })
}

createEvent() {
  this.calendar.createEventInteractivelyWithOptions(this.event.event_title, this.event.event_location, this.event.event_description, this.event.startTime, this.event.endTime)

  // if (this.platform.is('ios')) {

  //   this.calendar.createCalendar('MyCalendar').then(
  //     (msg) => { console.log(msg); },
  //     (err) => { console.log(err); }
  //   );
  // } else if (this.platform.is('android')) {

  // }
  
}
getUpdates() {
  this.firebaseDatabase.getUpdates(this.id).subscribe((data) => 
{
  if (data.data().updates) {
    this.updates = data.data().updates
  }
}) 
}
   saveEvent() {
    this.firebaseDatabase.saveEvent(this.id, this.user.uid)
    this.reloadCard()
      this.showToast("Event Saved")
  }
  showToast(msg) {
    this.toastCtrl.create({
      position: 'bottom',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }
  ngOnInit() {
     this.reloadCard();
    
}

share() {
  
}


reloadCard() {
  this.id = this.route.snapshot.paramMap.get('id')
  this.getUpdates()
    if (this.id) { 
   this.firebaseDatabase.getEvent(this.id).subscribe(res => {
    this.event = res
      
   }, (err) => {
     console.log(err)
   })
  }
}
}
