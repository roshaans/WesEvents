import { Component, OnInit } from '@angular/core';
import { FirebaseDatabaseService } from "./../services/firebaseDatabase/firebase-database.service"
import { CardComponent } from './../shared/card/card.component';
import { Event } from '../Models/Event';
import { Observable } from 'rxjs';
import {Router,ActivatedRoute } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import {ToastController} from '@ionic/angular'
import {UserService} from './../services/user/user.service'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  uuid:any; 
  userData: any;
  profileUser?: any;
  user: any;
  limit = 10;

  eventIDs: string[] = [];
  events: Event[] = [];
  savedIDs: string[] = [];
  savedEvents: Event[] = [];
  firstTimeSaved: boolean = true;
  firstTime: boolean = true;
  searchTerm;
  showEvents = false;
  loadedEvents: Event[] =[];
  constructor(private ActivatedRoute:ActivatedRoute, private fstore:AngularFirestore, private userService: UserService,private fireauth: AngularFireAuth, private toastCtrl: ToastController,private firebaseDatabase: FirebaseDatabaseService, private router:Router) { 

   
   


  }
  segmentChanged(ev: any) {
    if (ev['detail']['value'] == "hosted") {
      this.showEvents = false

    } else if (ev['detail']['value'] == "saved") {
      this.showEvents = true


    }
   
  }
  


  showToast(msg) {
    this.toastCtrl.create({
      position: 'bottom',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }
  ngOnInit() {
    this.uuid = this.ActivatedRoute.snapshot.paramMap.get('uuid')

    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }

      this.userService.getUserdata(this.uuid).subscribe((data)=> {
        this.profileUser = data
        console.log(data)
        this.fetchEvents();
  
      })
    })
    
 
    
    
  }
 fetchEvents() {
   
  this.userService.getSavedIdForUser(this.uuid).get().subscribe((snapshot) => {
    this.events = []
    this.loadedEvents = []
    if(snapshot.data().savedEvents) {

      this.savedIDs = []
      this.savedIDs = snapshot.data().savedEvents

      if (this.savedIDs.length >= 1){
        this.firstTimeSaved = false;
      } else {
        this.firstTimeSaved = true
      }
    } else {
      this.firstTimeSaved = true

    }
    if (snapshot.data().createdEvents) {
      this.eventIDs = []
      this.eventIDs = snapshot.data().createdEvents

      if (this.eventIDs.length >= 1){
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
      
    });}

    if(this.savedIDs.length > 0) { 

      this.savedIDs.forEach(element => {
  
        this.firebaseDatabase.getEvent(element).subscribe((data)=> {
          this.savedEvents.push(data)
        })  
        
      });}

})
  
 }

//  getData() {
//   this.getUserData().subscribe((data)=> {
//     this.userData = data
//   })
// }

saveEvent(eventID: string) {
  console.log(eventID, "eventID")
  console.log(this.user.uid, "user.uid")
  console.log(eventID["event_id"], "saveEvent")
   this.firebaseDatabase.saveEvent(eventID["event_id"], this.user.uid)
    this.showToast("Event Saved")
}
// getUserData() {
//  return this.fstore.collection("users").doc(this.profileUser.uid).valueChanges()
// }
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
doRefresh(event) {
    this.fetchEvents();
   
  setTimeout(() => {
    event.target.complete();
  }, 2000);
}

}
