import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MbscModule } from '@mobiscroll/angular';
import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms'
import { CreateEventPage } from './create-event.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEventPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MbscModule, // add the mobiscroll module
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateEventPage]
})
export class CreateEventPageModule {}
