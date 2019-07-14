import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { ToastController } from '@ionic/angular';
import  * as firebase from 'firebase/app';
import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {Event} from '../../Models/Event'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  createEventForm: FormGroup;
 
   event: Event
  constructor(private fStore: AngularFirestore, private formBuilder: FormBuilder, private router: Router, private toastCtrl: ToastController, private FirebaseDatabase: FirebaseDatabaseService) {
    
  
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
  showToast(msg) {
    this.toastCtrl.create({
      position: 'top',
      message: msg, 
      duration: 2000
    }).then(toast => toast.present());
  }
  createEvent() {
    this.event = {  event_title: this.createEventForm.controls["event_title"].value,
    event_location: this.createEventForm.controls["event_location"].value,  
    event_students: this.createEventForm.controls["event_students"].value, 
    event_category: this.createEventForm.controls["event_category"].value, 
    event_date: this.createEventForm.controls["event_date"].value, 
    event_startTime: this.createEventForm.controls["event_startTime"].value, 
    event_endTime: this.createEventForm.controls["event_endTime"].value, 
    event_description: this.createEventForm.controls["event_description"].value,
    event_pictureURL: ", 
    event_chatNumber: 0, 
    event_goingCounter: 0, 
    event_maybeGoingCounter: 0}
    this.FirebaseDatabase.createEvent(
    
      this.event
    )

    this.showToast("Event has been created.");
  }
  
}
