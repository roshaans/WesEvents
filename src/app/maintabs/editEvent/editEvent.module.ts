import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { editEventPage } from './editEvent.page';
import { ReactiveFormsModule } from '@angular/forms'
import { UpdatePopoverComponentComponent } from './../../update-popover-component/update-popover-component.component'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild([{ path: '', component: editEventPage }])
  ],
  entryComponents: [UpdatePopoverComponentComponent],
  declarations: [UpdatePopoverComponentComponent, editEventPage]
})
export class EditEventPageModule {}
