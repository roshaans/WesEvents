import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { editEventPage } from './editEvent.page';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([{ path: '', component: editEventPage }])
  ],
  declarations: [editEventPage]
})
export class EditEventPageModule {}
