import { ToastController } from '@ionic/angular';
import { Event } from '../../Models/Event';
import { card } from './../../Models/cardDetail';
import { LocationFilterComponent } from './../../filters/location-filter/location-filter.component';
import { ScrollComponent } from './../../filters/DaysOfWeekFilter/scroll.component';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from './../../shared/card/card.component';
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
  events: Event[];
  constructor( private fireauth: AngularFireAuth, private toastCtrl: ToastController,private firebaseDatabase: FirebaseDatabaseService, private router: Router) {
  

  }

  ngOnInit()  {
    this.fetchEvents()
   
  }
  fetchEvents() {
    this.firebaseDatabase.getEventIDs()
    .subscribe((events) => {
      this.events = events
    
    }, (err) => {
      console.log(err)
    })
  }
  ionViewDidEnter() {
    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    })
  }
  doRefresh(event) {
    
    this.fetchEvents()
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  


  saveEvent(eventID: string) {
  this.firebaseDatabase.saveEvent(eventID, this.user.uid)
    this.showToast("Event Saved")
}

showToast(msg) {
    this.toastCtrl.create({
      position: 'bottom',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }
}


