import { FirebaseDatabaseService } from "./../../services/firebaseDatabase/firebase-database.service"
import { CardComponent } from './../../shared/card/card.component';
import { Event } from '../../Models/Event';
import { Observable } from 'rxjs';
import {Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ToastController} from '@ionic/angular'
import {UserService} from './../../services/user/user.service'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userData: any;
  user: any;
  events;
  firstTime: boolean = false;

  constructor( private fstore:AngularFirestore, private userService: UserService,private fireauth: AngularFireAuth, private toastCtrl: ToastController,private firebaseDatabase: FirebaseDatabaseService, private router:Router) { 
    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.getData()
      }
    })
    
  }

  ionViewDidEnter() {
    this.fetchEvent()
}
deleteEvent(event) {

this.firebaseDatabase.deleteEvent(event, this.user.uid)
this.fetchEvent();

}
editEvent(event) {
  this.router.navigateByUrl("editEvent/"+event)
}
  showToast(msg) {
    this.toastCtrl.create({
      position: 'bottom',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }
  ngOnInit() {
    this.fetchEvent();
    
  }
 fetchEvent() {
   
  this.userService.getSavedIds().get().subscribe((snapshot) => {
    if (snapshot.data().createdEvents) {
      this.events = []
      this.events = snapshot.data().createdEvents
      if (this.events.length >= 1){
        this.firstTime = true;
      } else {
        this.firstTime = false
      }
    }
   
})
  
 }

 getData() {
  this.getUserData().subscribe((data)=> {
    this.userData = data
    console.log(data, "data")
  })
}
getUserData() {
 return this.fstore.collection("users").doc(this.user.uid).valueChanges()
}
settingsButtonClicked() {
  this.router.navigateByUrl('/settings');
}

doRefresh(event) {
    this.fetchEvent();
   
  setTimeout(() => {
    event.target.complete();
  }, 2000);
}
}



  
