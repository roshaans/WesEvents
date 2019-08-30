import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatepickerManuallyPageComponent } from './datepicker-manually-page.component';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule,],
  declarations: [DatepickerManuallyPageComponent],
  exports: [DatepickerManuallyPageComponent]
})
export class DatepickerManuallyPageComponentModule {}
