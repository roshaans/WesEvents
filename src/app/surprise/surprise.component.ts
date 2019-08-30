import { Component,  ViewChild, ViewChildren, OnInit,QueryList } from '@angular/core';
import { PopoverController } from '@ionic/angular';
// import {
//   StackConfig,
//   Stack,
//   Card,
//   ThrowEvent,
//   DragEvent,
//   SwingStackComponent,
//   SwingCardComponent} from 'angular2-swing';
@Component({
  selector: 'app-surprise',
  templateUrl: './surprise.component.html',
  styleUrls: ['./surprise.component.scss'],
})
export class SurpriseComponent implements OnInit {


randomIDList= ["qYXsdZYSDMjmvphsYEgv", "7RdAdniJ7Q0eU1bvKHCu", "GXBXeABqXygaBAgktEOD"];
idNumber = 0;
backButtonDisabled = false;
randomEvent = this.randomIDList[this.idNumber];

  constructor(private popoverController: PopoverController) { 
   
 
  }
  

  ngOnInit() {

    this.generateRandomIDs()
  }


generateRandomIDs() {
 
}
close()  {
  this.popoverController.dismiss();
}
back() {
  if(this.idNumber > 0 ) {
    this.backButtonDisabled = false;
  }else {
        this.backButtonDisabled = true;

  }
  this.idNumber =  this.idNumber  - 1;
    this.randomIDList[this.idNumber]

}
next() {
   if(this.idNumber > 0 ) {
    this.backButtonDisabled = false;
  } else {
        this.backButtonDisabled = true;

  }
  this.idNumber =  this.idNumber  + 1;
  this.randomIDList[this.idNumber]
}

}
