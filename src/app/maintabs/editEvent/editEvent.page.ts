import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { ToastController } from '@ionic/angular';
import  * as firebase from 'firebase/app';
import { Component, NgModule, ViewChild,ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AngularFirestore } from '@angular/fire/firestore';
import {Event} from '../../Models/Event'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import {iconDict} from './../../Models/CategoryIconsDictionary'
import { PopoverController } from '@ionic/angular';
import { UpdatePopoverComponentComponent } from './../../update-popover-component/update-popover-component.component'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: 'editEvent.page.html',
  styleUrls: ['editEvent.page.scss']
})

export class editEventPage {
  @ViewChild('myInput') myInput: ElementRef;
 
  
resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px' ;
}
  iconsMatch = iconDict;
  id;
  event: Event;
  description; 
  starttime;
  endtime;
  date;
  invited;
  selectedCategory;
  selectedLocation;
  other = "custom field";
  location;
  selected;
  title;
  user: any;
  createEventForm: FormGroup;
  viewMode;
  update = "";
  updates = [];
  constructor(public alertController: AlertController,public popoverController: PopoverController,private route: ActivatedRoute,private fireauth: AngularFireAuth, private fStore: AngularFirestore, private formBuilder: FormBuilder, private router: Router, private toastCtrl: ToastController, private FirebaseDatabase: FirebaseDatabaseService) {
    this.createEventForm = this.formBuilder.group({
      'event_title' : [null, Validators.required],
      'event_location' : [null, Validators.required], 
      'event_students' : [null, Validators.required], 
      'event_date' : [null, Validators.required],
      'event_startTime' : [null, Validators.required],
      'event_endTime' : [null, Validators.required],
      'event_description' : [null, Validators.required],
      'event_category' : [null, Validators.required]     
    });

    

  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: UpdatePopoverComponentComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  ionViewDidEnter() {
    this.myInput.nativeElement.style.height = "130px";

    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) { 
      this.FirebaseDatabase.getEvent(this.id).subscribe(res => {
       this.event = res
         this.description = this.event.event_description
         this.starttime = this.event.event_startTime
         this.endtime = this.event.event_endTime

         this.date = this.event.event_date
         this.invited = this.event.event_students

         this.selectedLocation = this.event.event_location
         this.selected = this.event.event_category
         this.title = this.event.event_title
        this.getUpdates()
      }, (err) => {
        console.log(err)
      })
     }

    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    })
  }

  addUpdate() {
    if (this.update.length <= 3 ) {
      this.showToast("Update should be more than 3 characters long!")
    } else {
      this.FirebaseDatabase.addUpdate(this.id,this.update)
      this.getUpdates()

    }


  }

  getUpdates() {
    this.FirebaseDatabase.getUpdates(this.id).subscribe((data) => 
  {
    if (data.data().updates) {
      this.updates = data.data().updates
    }
  }) 
  }
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Disclaimer',
      message: "Are you sure you would like to delete this event?"
      ,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteEvent();
            this.alertController.dismiss()

                   }, 
          
        }, 
          
        
      ]
    });

    await alert.present();
  }

 
  deleteEvent() {

    this.FirebaseDatabase.deleteEvent(this.id, this.user.uid)
    this.router.navigateByUrl('/tabs/tab4')
    }
  deleteUpdate(update) {
    this.FirebaseDatabase.deleteUpdate(this.id, update).then(()=>{
      this.getUpdates()
    })
  }
  showToast(msg) {
    this.toastCtrl.create({
      position: 'top',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }
  editEvent() {
    this.event = {  
    event_title: this.createEventForm.controls["event_title"].value,
    event_location: this.createEventForm.controls["event_location"].value,  
    event_students: this.createEventForm.controls["event_students"].value, 
    event_category: this.createEventForm.controls["event_category"].value, 
    event_date: this.createEventForm.controls["event_date"].value, 
    event_startTime: this.createEventForm.controls["event_startTime"].value, 
    event_endTime: this.createEventForm.controls["event_endTime"].value,
    event_description: this.createEventForm.controls["event_description"].value,
    event_pictureURL: "", 
    event_chatNumber: 0, 
    event_goingCounter: [], 
    event_maybeGoingCounter: 0,
    createdBy: this.user.uid
    
    
  }
    this.FirebaseDatabase.editEvent(this.event, this.id)

    this.showToast("Event edit was successful!");
  }

  segmentChanged(ev: any) {
    if (ev['detail']['value'] == "edit") {
      this.viewMode = "edit"

    } else if (ev['detail']['value'] == "addUpdate"){
      this.viewMode = "addUpdate"
    } else {
      this.viewMode = "preview";
    }
   
  }
  }
  
  
  


  