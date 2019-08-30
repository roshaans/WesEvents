import { Component, OnInit } from '@angular/core';
import { Ionic4DatepickerModalComponent } from
    '@logisticinfotech/ionic4-datepicker';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-datepicker-manually-page',
  templateUrl: './datepicker-manually-page.component.html',
  styleUrls: ['./datepicker-manually-page.component.scss'],
})
export class DatepickerManuallyPageComponent implements OnInit {
datePickerObj: any = {};
  selectedDate;
 
  constructor(
        public modalCtrl: ModalController

  ) { }

  ngOnInit() {
    this.datePickerObj = {
      dateFormat: 'YYYY-MM-DD'
    };
  }
 
  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 
         'objConfig': this.datePickerObj, 
         'selectedDate': this.selectedDate 
      }
    });
    await datePickerModal.present();
 
    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.selectedDate = data.data.date;
      });
  }
}