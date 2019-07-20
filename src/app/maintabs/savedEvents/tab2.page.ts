import { FirebaseDatabaseService } from "./../../services/firebaseDatabase/firebase-database.service"
import { CardComponent } from './../../shared/card/card.component';
import { Event } from '../../Models/Event';
import { Observable } from 'rxjs';
import {Router } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ToastController} from '@ionic/angular'
import {UserService} from './../../services/user/user.service'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  user: any;
  events: any[];
  firstTime: boolean = false;
  
  constructor(private userService: UserService,private fireauth: AngularFireAuth, private toastCtrl: ToastController,private firebaseDatabase: FirebaseDatabaseService, private router: Router) {

  }

  ngOnInit() {
    this.fetchEvents()
  }

  notGoing(event: string) {
      this.firebaseDatabase.deleteEventFromSavedEvents(event, this.user.uid).then( () => {
        this.firebaseDatabase.deleteGoing(event, this.user.uid)

        this.fetchEvents()

      })

      this.showToast("Event Deleted")
    }

    fetchEvents() {
      this.userService.getSavedIds().get().subscribe((snapshot) => {
        if ( snapshot.data().savedEvents) {
          this.events = []
          this.events = snapshot.data().savedEvents
          if (this.events.length >= 1){
            this.firstTime = true;
          } else {
            this.firstTime = false
          }
        }
       
    })
    }
  ionViewDidEnter() {
    this.fetchEvents()
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


  showToast(msg) {
    this.toastCtrl.create({
      position: 'bottom',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }
}

