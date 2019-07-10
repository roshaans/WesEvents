import { CardModule } from './../card/card.module';
import { TimeFilterComponent } from './../filters/time-filter/time-filter.component';
import { ScrollComponent } from './../filters/DaysOfWeekFilter/scroll.component';
import { CardComponent } from './../card/card.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { LocationFilterComponent } from './../filters/location-filter/location-filter.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CardModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, ScrollComponent, LocationFilterComponent, TimeFilterComponent]
})
export class Tab1PageModule {}
