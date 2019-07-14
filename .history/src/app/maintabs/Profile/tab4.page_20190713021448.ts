import { NavController } from '@ionic/angular';
import { AutoService } from '../../services/auto.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;
  constructor(private authService: AutoService, private navCtrl: NavController) { 
    
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    }
  }

  ngOnInit() {
  }
  alogoutUser() {
  this.authService.logoutUser();
}
settingsButtonClicked() {
this.navCtrl.navigateRoot("/settings")
// ("/settings")
}
}
