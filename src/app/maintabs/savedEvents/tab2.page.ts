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
  events: Event[] = [];
  eventIDs: string[];
  mode = "savedEvents";
  searchTerm;
  loadedEvents: Event[] =[];
  connectionIsGood: Boolean = false;
  firstTime;
  
  likedEventIDs: string[];
  likedEvents: Event[] = []
  searchTermLiked;
  loadedEventsLiked
  firstTimeLiked;
  constructor(private userService: UserService,private fireauth: AngularFireAuth, private toastCtrl: ToastController,private firebaseDatabase: FirebaseDatabaseService, private router: Router) {
  
    this.fetchEvents()
    this.fetchLikedEvents();
  }
  ionViewWillEnter () {

        this.fetchEvents()
        this.fetchLikedEvents();

   }
   
  ngOnInit() {


    // this.fireauth.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.user = user;

    
    //   }
    // })

   
  }

  notGoing(event) {
      this.firebaseDatabase.deleteEventFromSavedEvents(event.event_id, this.user.uid).then( () => {
        this.firebaseDatabase.deleteGoing(event.event_id, this.user.uid)

        this.fetchEvents()

      })

      this.showToast("Event Deleted")
    }

    fetchEvents() {
      this.userService.getSavedIds().get().subscribe((snapshot) => {
        this.events = []
        this.loadedEvents = []
        if ( snapshot.data().savedEvents) {
          this.eventIDs = []
          this.likedEventIDs  = []


          this.eventIDs = snapshot.data().savedEvents

         

          if (this.eventIDs.length > 0){
            this.firstTime = false;

          } else if (this.eventIDs.length == 0) {

            this.firstTime = true

          }
          if(this.eventIDs.length > 0) {
            this.connectionIsGood = true;
          this.eventIDs.forEach(element => {
            this.firebaseDatabase.getEvent(element).subscribe((data)=> {
              this.events.push(data)
              this.loadedEvents.push(data)
            })  
            
          }); 
        
          this.animateCSS("ion-list", "bounceInUp", null)
        }
        } else {
          this.firstTime = true

        }

      

    })
    }

    fetchLikedEvents() {
      this.userService.getSavedIds().get().subscribe((snapshot) => {
        this.likedEvents = []
        this.loadedEventsLiked = []
        if ( snapshot.data().savedEvents) {
          this.eventIDs = []
          this.likedEventIDs  = []


          this.eventIDs = snapshot.data().likedEvents

         
      if (this.likedEventIDs.length > 0){
        this.firstTimeLiked = false;

      } else if (this.likedEventIDs.length == 0) {

        this.firstTimeLiked = true

      }
      if(this.likedEventIDs.length > 0) {
        this.eventIDs.forEach(element => {
          this.firebaseDatabase.getEvent(element).subscribe((data)=> {
            this.likedEvents.push(data)
            this.loadedEventsLiked.push(data)
          })  
          
        }); 
      
        this.animateCSS("ion-list", "bounceInUp", null)
      }
      } else {
        this.firstTimeLiked = true

      }
    })
    }
    initializeItems() {
      this.events = this.loadedEvents
    }
    initializeLikedItems() {
      this.likedEvents = this.loadedEventsLiked
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
   filterListLiked(evt) {
    this.initializeLikedItems();
   const searchTermLiked = evt.srcElement.value;
   if (!searchTermLiked) {
     return;
     }
     this.likedEvents = this.likedEvents.filter(currentEvent => {
       if (currentEvent.event_title && searchTermLiked) {
       if (currentEvent.event_title.toLowerCase().indexOf(searchTermLiked.toLowerCase()) > -1) {
       return true;
       }
       return false;
       }
       } );
 }
  doRefresh(event) {
   this.events = []
    this.fetchEvents()

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  doRefreshLiked(event) {
    this.likedEvents = []
     this.fetchLikedEvents()
 
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

  segmentChanged(ev: any) {
    if (ev['detail']['value'] == "savedEvents") {
      this.mode = 'savedEvents'

    } else if (ev['detail']['value'] == "likedEvents") {
      this.mode = 'likedEvents'


    }
   
  }


}

