import { ToastController } from '@ionic/angular';
import  * as firebase from 'firebase/app';
import { Component, NgModule } from '@angular/core';
import { mobiscroll } from '@mobiscroll/angular';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { Router } from '@angular/router';

import 'firebase/database'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  createEventForm: FormGroup;
  ref = firebase.database().ref('infos/');

  constructor(private formBuilder: FormBuilder, private router: Router, private toastCtrl: ToastController) {
    
  
    this.createEventForm = this.formBuilder.group({
      'event_title' : [null, Validators.required],
      'event_location' : [null, Validators.required], 
      'event_who' : [null, Validators.required], 
      'event_date' : [null, Validators.required],
      'event_startTime' : [null, Validators.required],
      'event_endTime' : [null, Validators.required],
      'event_description' : [null, Validators.required]
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
    let newInfo = firebase.database().ref('infos/').push();
    newInfo.set(this.createEventForm.value);
    this.showToast("Event has been created.");
    // this.router.navigate(['/detail/'+newInfo.key]);
  }
  
}
