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
  eventIDs: string[] = [];
  events: Event[] = [];
  firstTime: boolean = false;
  searchTerm;
  loadedEvents: Event[] =[];
  hasStatus = false;
  constructor( private fstore:AngularFirestore, private userService: UserService,private fireauth: AngularFireAuth, private toastCtrl: ToastController,private firebaseDatabase: FirebaseDatabaseService, private router:Router) { 
    

  }


  ionViewWillEnter () {
  // this.fetchEvents()
this.fetchEvents()

 }

ngOnInit() {
  this.fireauth.auth.onAuthStateChanged((user) => {
    if (user) {
      this.user = user;

      this.getData()

    }
  })
  // this.fetchEvents()
  this.fetchEvents()

}
deleteEvent(event) {

this.firebaseDatabase.deleteEvent(event.event_id, this.user.uid)
this.fetchEvents();

}
editEvent(event) {
  this.router.navigateByUrl("editEvent/"+event.event_id)
}
  showToast(msg) {
    this.toastCtrl.create({
      position: 'bottom',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }
  
 fetchEvents() {
   
  this.userService.getSavedIds().get().subscribe((snapshot) => {
    this.events = []
    this.loadedEvents = []
    if (snapshot.data().createdEvents) {
      this.eventIDs = []
      this.eventIDs = snapshot.data().createdEvents

      if (this.eventIDs.length > 0){
        this.firstTime = false;
      } else {
        this.firstTime = true
      }
    } else {
      this.firstTime = true
    }
   if(this.eventIDs.length > 0) { 

    this.eventIDs.forEach(element => {

      this.firebaseDatabase.getEvent(element).subscribe((data)=> {
        this.events.push(data)
        this.loadedEvents.push(data)
      })  
      
    });
    this.animateCSS("ion-list", "bounceInUp", null)

  }

})

 }

 getData() {
  this.getUserData().subscribe((data)=> {
    this.userData = data
    if (this.userData.status != "" || this.userData.status != " ") {
      this.hasStatus = true;
    }
  })
}
getUserData() {
 return this.fstore.collection("users").doc(this.user.uid).valueChanges()
}
settingsButtonClicked() {
  this.router.navigateByUrl('/settings');
}
initializeItems() {
  this.events = this.loadedEvents
}
filterList(evt) {
   this.initializeItems();
  const searchTerm = evt.srcElement.value;
  if (!searchTerm) {
    return;
    }
    this.events = this.events.filter(currentEvent => {
      if (currentEvent.event_title && searchTerm) {
      if (currentEvent.event_title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
      return true;
      }
      return false;
      }
      } );
}
animateCSS(element, animationName, callback) {
  const node = document.querySelector(element)
  node.classList.add('animated', animationName)

  function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd)
}
doRefresh(event) {
  this.events = [];
    this.fetchEvents();

  setTimeout(() => {
    event.target.complete();
  }, 2000);
}


}



  
