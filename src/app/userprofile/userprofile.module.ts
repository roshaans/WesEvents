import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {SharedModule} from './../shared/shared.module'

import { UserprofilePage } from './userprofile.page';

const routes: Routes = [
  {
    path: '',
    component: UserprofilePage
  }
];

@NgModule({
  imports: [ 
    MbscModule, 
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
        RouterModule.forChild(routes)
  ],
  declarations: [UserprofilePage]
})
export class UserprofilePageModule {}
