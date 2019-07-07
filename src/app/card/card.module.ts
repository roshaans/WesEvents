import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [
        CommonModule, 
        IonicModule 
       ],
  declarations: [CardComponent], 
  exports: [CardComponent]
})
export class CardModule {

    

}