import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurpriseComponent } from './surprise.component';
import {SharedModule} from './../shared/shared.module'

@NgModule({
  imports: [ SharedModule,CommonModule, FormsModule,IonicModule,],
  declarations: [SurpriseComponent],
  exports: [SurpriseComponent]
})
export class SurpriseComponentModule {}
