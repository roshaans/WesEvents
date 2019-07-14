import { FirebaseDatabaseService, Event } from './../../services/firebaseDatabase/firebase-database.service';
import { ToastController } from '@ionic/angular';
import  * as firebase from 'firebase/app';
import { Component, NgModule } from '@angular/core';
import { mobiscroll } from '@mobiscroll/angular';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

import 'firebase/database'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  createEventForm: FormGroup;
 
  ref = firebase.database().ref('infos/');
  
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
  //   this.fStore.collection("cities").doc("LA").set({
  //     name: "Los Angeles",
  //     state: "CA",
  //     country: "USA"
  // })
  // .then(function() {
  //     console.log("Document successfully written!");
  // })
  // .catch(function(error) {
  //     console.error("Error writing document: ", error);
  // });
    var cityRef = this.fStore.collection('Events').doc('hello');

var setWithMerge = cityRef.set({
    capital: true
}, { merge: true });



  
  // ["event_title"].value, "this.createEventForm")
    this.FirebaseDatabase.createEvent({event_title: this.createEventForm.controls["event_title"].value})
      

    this.showToast("Event has been created.");
  }
  
}
