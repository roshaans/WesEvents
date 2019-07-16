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
  events;
  
  constructor(private userService: UserService,private fireauth: AngularFireAuth, private toastCtrl: ToastController,private firebaseDatabase: FirebaseDatabaseService, private router: Router) {
    


  }


  ngOnInit() {
   
    
  
  }

  notGoing(event: string) {
      this.firebaseDatabase.deleteEvent(event, this.user.uid).then(() => {
        this.fetchEvents()

      })
      this.showToast("Event Deleted")
    }

    fetchEvents() {
      this.userService.getSavedIds().get().subscribe((snapshot) => {
        this.events = snapshot.data().savedEvents
    })
    }
  ionViewDidEnter() {
    this.fetchEvents()

    // this.fetchEvents()

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

