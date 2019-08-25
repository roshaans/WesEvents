import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from './../shared/shared.module'

import { IonicModule } from '@ionic/angular';

import { ShowGoingPage } from './show-going.page';

const routes: Routes = [
  {
    path: '',
    component: ShowGoingPage
  }
];

@NgModule({
  imports: [ 
    MbscModule, 
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowGoingPage]
})
export class ShowGoingPageModule {}
