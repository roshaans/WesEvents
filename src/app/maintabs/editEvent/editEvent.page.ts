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
  viewMode = true;
  constructor(private route: ActivatedRoute,private fireauth: AngularFireAuth, private fStore: AngularFirestore, private formBuilder: FormBuilder, private router: Router, private toastCtrl: ToastController, private FirebaseDatabase: FirebaseDatabaseService) {
    this.createEventForm = this.formBuilder.group({
      'event_title' : [null, Validators.required],
      'event_location' : [null, Validators.required], 
      'event_students' : [null, Validators.required], 
      'event_date' : [null, Validators.required],
      'event_startTime' : [null, Validators.required],
      'event_endTime' : [null, Validators.required],
      'event_description' : [null, Validators.required],
      'event_category' : [null, Validators.required],
      "event_creation_timeStamp" : [firebase.firestore.FieldValue.serverTimestamp()]
     
    });

    

  }
  ionViewDidEnter() {
    this.id = this.route.snapshot.paramMap.get('id')
    // this.FirebaseDatabase.getEvent(this.id).subscribe();
    if (this.id) { 
      this.FirebaseDatabase.getEvent(this.id).subscribe(res => {
       this.event = res
         this.description = this.event.event_description
         this.starttime = this.event.event_startTime
         this.endtime = this.event.event_endTime

         this.date = this.event.event_date
         this.invited = this.event.event_students

         this.location = this.event.event_location
         this.selected = this.event.event_category
         this.title = this.event.event_title

      }, (err) => {
        console.log(err)
      })
     }
    this.myInput.nativeElement.style.height = "130px";

    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
      }
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
    event_creation_timeStamp: this.createEventForm.controls["event_creation_timeStamp"].value,
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
    // console.log('Segment changed', ev);
    if (ev['detail']['value'] == "edit") {
      this.viewMode = false

    } else {
      this.viewMode = true


    }
   
  }
  }
  
  
  


  