 import { PopoverComponent } from './../../popover/popover.component';
import { TimeFilterComponent } from './../../filters/time-filter/time-filter.component';
import { ScrollComponent } from './../../filters/DaysOfWeekFilter/scroll.component';
import { CardComponent } from './../../shared/card/card.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import {ActivityFilterComponent} from './../../filters/Activity/activity-filter.component'
import {SharedModule} from './../../shared/shared.module'
import { LocationFilterComponent } from './../../filters/location-filter/location-filter.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  entryComponents: [PopoverComponent],
    declarations: [PopoverComponent,Tab1Page, ScrollComponent, LocationFilterComponent, TimeFilterComponent,ActivityFilterComponent ]
})
export class Tab1PageModule {}
