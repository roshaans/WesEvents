import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SwingModule } from 'angular2-swing';

import { HomePage } from './home.page';
import {SharedModule} from './../shared/shared.module'

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),SwingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
