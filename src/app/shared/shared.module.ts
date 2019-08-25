import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { CardComponent } from './card/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditComponentComponent } from '../edit-component/edit-component.component';

@NgModule({
  declarations: [CardComponent,EditComponentComponent],
  imports: [ 
    FormsModule,  
    MbscModule, 
    CommonModule, 
    IonicModule,
    CommonModule
  ], 
  exports: [
    CardComponent
  ], 
  entryComponents: [EditComponentComponent],

})
export class SharedModule {


 }
