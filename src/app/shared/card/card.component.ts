import { ImageViewerComponent } from './../../image-viewer/image-viewer.component';
import { Tab1Page } from './../../maintabs/browseEvents/tab1.page';
// import { ActivityFilterComponent } from './../../filters/Activity/activity-filter.component'
import { UserService } from '../../services/user/user.service'
import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { Event } from '../../Models/Event';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Firebase from 'firebase/app';
import { Database } from '@firebase/database';
import 'firebase/database';
import { iconDict } from '../../Models/CategoryIconsDictionary';
import * as moment from 'moment';
import { create } from 'domain';
import { filter, retryWhen } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import {ToastController} from '@ionic/angular'
import { AlertController } from '@ionic/angular';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PopoverController } from '@ionic/angular';
import { EditComponentComponent } from '../../edit-component/edit-component.component';
import { FullScreenImage, FullScreenImageOriginal } from '@ionic-native/full-screen-image';
import { ModalController } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  // @Output() valueChange = new EventEmitter();
  @Input() id?;
  Updates = 7;
  sinceDate?:any;
  iconsMatch = iconDict
  event: Event;
  colorScheme = {"Volunteering":["#16A085","#F4D03F"],"Sports":["#16A085","#F4D03F"],"Food":["#FF4E50","#F9D423"],"Speciallectures":["#FC354C","#0ABFBC"],"Parties":["#360033","#0b8793"],"Movies":["#8E0E00","#1F1C18"],"CultureAndLanguage":["#FC354C","#0ABFBC"],"StudentGovernment":["#659999","#f4791f"],"Music":["#70e1f5","#ffd194"],"Dance":["#EECDA3","#EF629F"],"Religious":["#ff4b1f","#1fddff"],"Gaming":["#141E30","#243B55"],"Relax":["#A1FFCE","#FAFFD1"],"Science":["#4DA0B0","#D39D38"],"Shopping":["#D3959B","#BFE6BA"],"SpecialShows":["#DBE6F6","#C5796D"],"Fitness":["#22c1c3","#fdbb2d"]}
  colorSchemeEntries =   Object.entries(this.colorScheme)
  startTime?;
  endTime?;
  date?;
  time?;
  createdBy?: any;
  avatarImg: any;
  eventIsUpdated = false;
  updatedDate?;
  updateDate?;
  savedEventIds: string[];
  createdEventsIds: string[];
  user: any;
  profileUser: any;
  eventIsSaved: boolean = false
  applyClass: boolean = true;
  color: any = "background-color: blue"
  classes: any;
  edit: boolean = false;
  updates: any = []
  colorOne: any  = '#e66465';
  colorTwo: any = '#9198e5';
  background: any = {'background':  'linear-gradient(' + this.colorOne + ',' + this.colorTwo + ')'}
  toggle: boolean = false;
  collapse: boolean = false; 

  
  // this is the complete list of currently supported params you can pass to the plugin (all optional)
 optionMessage: any;


  constructor(private calendar: Calendar, public modalController: ModalController, public popoverController: PopoverController,private socialSharing: SocialSharing, private taptic: TapticEngine,private alertController: AlertController,private toastCtrl: ToastController, private fireauth: AngularFireAuth,private tab1: Tab1Page, private userService: UserService, private route: ActivatedRoute, private router: Router, private firebaseDatabase: FirebaseDatabaseService) {
    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        if(this.user.uid) {
            this.userService.getSavedIdForUser(this.user["uid"]).get().subscribe((snapshot) => {
              if(snapshot.data().createdEvents) {
                this.createdEventsIds = snapshot.data().createdEvents
              if(this.createdEventsIds.indexOf(this.id) > -1) {
                this.edit = true;
              }
              }
              if (snapshot.data().savedEvents) {
                this.savedEventIds = snapshot.data().savedEvents 
                if (this.savedEventIds.indexOf(this.id) > -1 ) {
                 this.eventIsSaved = true
                 this.classes = {
                  'normal': this.eventIsSaved, 
                }
                   } else {
                     this.eventIsSaved = false;
                     
                 }
                }
               
           })
        }
      }
    })
  

    // console.log(this.colorScheme["Sports"][0].valueOf(), "priting value")
    // console.log(this.colorScheme["Sports"][0], "priting sports")
    // var bodyStyles = document.body.style;
    // bodyStyles.setProperty('--background', 'black');
   
  }
 
//   changeCollapse(valueChange) { 
//     console.log("I am inside the card speaking now!")
//     console.log("this.collapse", this.collapse)
//     console.log(valueChange, "vlaueChanged")
//   this.collapse =  !this.collapse
// }

collapseCard () {
  this.collapse = !this.collapse
}
valueChanged() {
  console.log("collpaose Was Clicked")
  this.collapse = !this.collapse;

  console.log("collpaose Was Clicked2")

  // this.valueChange.emit(this.collapse);
  console.log("collpaose Was Clicked3")

} 
  async viewImage() {
    const modal = await this.modalController.create({
      component: ImageViewerComponent,
      componentProps: {
        imgSource: 'https://cdn.vox-cdn.com/thumbor/Or0rhkc1ciDqjrKv73IEXGHtna0=/0x0:666x444/1200x800/filters:focal(273x193:379x299)/cdn.vox-cdn.com/uploads/chorus_image/image/59384673/Macaca_nigra_self-portrait__rotated_and_cropped_.0.jpg',
        imgTitle: this.event.event_title,
        imgDescription: this.event.event_description
      },
      cssClass: 'modal-fullscreen',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }
  openImage() {
    var options = {
      share: true, // default is false
      closeButton: false, // default is true
      copyToReference: true, // default is false
      headers: '',  // If this is not provided, an exception will be triggered
      piccasoOptions: { } // If this is not provided, an exception will be triggered
  };
  
  // this.photoViewer
  // .show('https://cdn.vox-cdn.com/thumbor/Or0rhkc1ciDqjrKv73IEXGHtna0=/0x0:666x444/1200x800/filters:focal(273x193:379x299)/cdn.vox-cdn.com/uploads/chorus_image/image/59384673/Macaca_nigra_self-portrait__rotated_and_cropped_.0.jpg', 'Optional Title', options);
  }
// openImage() {
//   this.fullScreenImage.showImageURL('/assets/img/loginbackround.png')
//   .then((data: any) => console.log(data))
//   .catch((error: any) => console.error(error));
// }
  onSuccess(result) {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  }
  
  onError(msg) {
    console.log("Sharing failed with message: " + msg);
  };
  addToCalendar() {
    this.calendar.createEventInteractivelyWithOptions(this.event.event_title, this.event.event_location, this.event.event_description, this.event.event_startTime, this.event.event_endTime)

  }
  share() {
    this.optionMessage = {
      message: 'Check out this event: ' + this.event.event_title + " on " + moment( this.event.event_date).calendar()+ " from " + moment(this.event.event_startTime).format('h:m') + " to " + moment(this.event.event_endTime).format('h:m') + ".                                                        Download WesEvents to see more events like these!                                ", // not supported on some apps (Facebook, Instagram)
      subject: "Event: " + this.event.event_title, // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.apple.com/ios/app-store/',
      chooserTitle: 'Pick an app to share your event!', // Android only, you can override the default share sheet title,
      appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
    };
    window['plugins'].socialsharing.shareWithOptions(this.optionMessage, this.onSuccess, this.onError);

  }
  shareFacebook() {
    this.optionMessage = {
      message: 'Check out this event: ' + this.event.event_title + " on " + moment( this.event.event_date).calendar()+ " from " + moment(this.event.event_startTime).format('h:m') + " to " + moment(this.event.event_endTime).format('h:m') + ".                                                        Download WesEvents to see more events like these!                                ", // not supported on some apps (Facebook, Instagram)
      subject: "Event: " + this.event.event_title, // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.apple.com/ios/app-store/',
      chooserTitle: 'Pick an app to share your event!', // Android only, you can override the default share sheet title,
      appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
    };
    window['plugins'].socialsharing.shareViaFacebookWithPasteMessageHint(this.optionMessage.message, null, this.optionMessage.url, this.optionMessage.message)

  }
  shareInstagram() {
    this.optionMessage = {
      message: 'Check out this event: ' + this.event.event_title + " on " + moment( this.event.event_date).calendar()+ " from " + moment(this.event.event_startTime).format('h:m') + " to " + moment(this.event.event_endTime).format('h:m') + ".                                                        Download WesEvents to see more events like these!                                ", // not supported on some apps (Facebook, Instagram)
      subject: "Event: " + this.event.event_title, // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.apple.com/ios/app-store/',
      chooserTitle: 'Pick an app to share your event!', // Android only, you can override the default share sheet title,
      appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
    };


  }
  shareMessages() {
    this.optionMessage = {
      message: 'Check out this event: ' + this.event.event_title + " on " + moment( this.event.event_date).calendar()+ " from " + moment(this.event.event_startTime).format('h:m') + " to " + moment(this.event.event_endTime).format('h:m') + ".                                                        Download WesEvents to see more events like these!                                ", // not supported on some apps (Facebook, Instagram)
      subject: "Event: " + this.event.event_title, // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.apple.com/ios/app-store/',
      chooserTitle: 'Pick an app to share your event!', // Android only, you can override the default share sheet title,
      appPackageName: 'com.apple.social.facebook' // Android only, you can provide id of the App you want to share with
    };

    
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: EditComponentComponent,
      event: ev,
      translucent: true, 
      componentProps: {id: this.id}
    });
    return await popover.present();
  }
  toggleHeart() {
    this.taptic.impact({style: "light"});

    // this.taptic.notification();
    
    // this.taptic.impact();

    this.toggle = !this.toggle

    if(this.toggle == false ) {
      this.likeEvent()
    } else {
      this.unlikeEvent()
    }
  }
  editEvent() {
   
      this.router.navigateByUrl("editEvent/"+this.id)
    
  }
  getUpdates() {
    this.firebaseDatabase.getUpdates(this.id).subscribe((data) => 
  {
    if (data.data().updates) {
      this.updates = data.data().updates
    }
  }) 
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
  saveEvent() {
    this.firebaseDatabase.saveEvent(this.id, this.user.uid)
      this.showToast("Event Saved")
      this.eventIsSaved = true;
      this.taptic.impact({style: "heavy"});

      this.classes = {
        'normal': this.eventIsSaved, 
      }

  }
  
  notGoing() {
    this.firebaseDatabase.deleteEventFromSavedEvents(this.id, this.user.uid).then( () => {
      this.firebaseDatabase.deleteGoing(this.id, this.user.uid)
      this.taptic.impact({style: "heavy"});

      this.eventIsSaved = false;
      this.classes = {
        'normal': this.eventIsSaved, 
      }
    })
   
    this.showToast("Event Deleted")
  }


  likeEvent() {
    this.firebaseDatabase.likeEvent(this.id, this.user.uid)
      this.showToast("Event Saved")
      this.eventIsSaved = true;
      this.taptic.impact({style: "heavy"});

      this.classes = {
        'normal': this.eventIsSaved, 
      }

  }
  
  unlikeEvent() {
    this.firebaseDatabase.deleteEventFromLikedEvents(this.id, this.user.uid).then( () => {
      this.taptic.impact({style: "heavy"});

     
    })}

  addUpdates() {
    this.router.navigateByUrl("editEvent/"+this.id)

  }
  showToast(msg) {
    this.toastCtrl.create({
      position: 'bottom',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }
  

 
  fetchEvent() {
    if (this.id) {
      this.getUpdates()
      this.firebaseDatabase.getEvent(this.id).subscribe(res => {
        this.event = res
        this.startTime = new Date(this.event.event_startTime)
        this.endTime = new Date(this.event.event_endTime)
        this.date = res.event_creation_timeStamp
        
        if(this.colorScheme[this.event.event_category] != null) {
          this.colorOne = this.colorScheme[this.event.event_category][0]
          this.colorTwo = this.colorScheme[this.event.event_category][1]
          this.background = {'background':  'linear-gradient(' + this.colorOne + ',' + this.colorTwo + ')'}

        }
        var creationDateObjectInMilliseconds = this.date.seconds * 1000 + this.date.nanoseconds / 1000000
        var createDate = moment.unix(creationDateObjectInMilliseconds/1000).format('dddd, MMMM Do, YYYY h:mm:ss A')      
        
        this.createdBy = res.createdBy

        this.userService.getUserdata(this.createdBy[0]).subscribe((data)=> {
          this.profileUser = data

        })       
         this.sinceDate = moment(createDate, 'dddd, MMMM Do, YYYY h:mm:ss A').fromNow(); // 8 years ago
        if (res.lastUpdated) {
          this.updateDate = res.lastUpdated
          var updatedDateObjectInMilliseconds = this.updateDate.seconds * 1000 + this.date.nanoseconds / 1000000
          var updateDate = moment.unix(updatedDateObjectInMilliseconds/1000).format('dddd, MMMM Do, YYYY h:mm:ss A')      
          this.updatedDate = moment(updateDate, 'dddd, MMMM Do, YYYY h:mm:ss A').fromNow();
          this.eventIsUpdated = true

        }
      })

    }
  }

  ngOnInit() {
   
    this.fetchEvent()

    
  
   
  }
  goToUserProfile(index) {
    this.router.navigateByUrl("userprofile/"+ this.createdBy[0])
  }
  seeMore() {
    this.router.navigateByUrl('/card/' + this.id)
  }

  categoryClicked(event_cat: string) {
  console.log(event_cat, "eventCat")
 this.tab1.categoryPressed(event_cat.toLowerCase());
 this.router.navigateByUrl("/tabs/tab1")
  }
  showGoingList() {
    this.fetchEvent()
    this.router.navigateByUrl("show-going/" + this.id)
  }
 

  // categoryClicked(category) {
  //   this.activity.categoryPressed(category)
  // }

}
