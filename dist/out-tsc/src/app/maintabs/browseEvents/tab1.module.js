import * as tslib_1 from "tslib";
import { PopoverComponent } from './../../popover/popover.component';
import { TimeFilterComponent } from './../../filters/time-filter/time-filter.component';
import { ScrollComponent } from './../../filters/DaysOfWeekFilter/scroll.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ActivityFilterComponent } from './../../filters/Activity/activity-filter.component';
import { SharedModule } from './../../shared/shared.module';
import { LocationFilterComponent } from './../../filters/location-filter/location-filter.component';
var Tab1PageModule = /** @class */ (function () {
    function Tab1PageModule() {
    }
    Tab1PageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                SharedModule,
                RouterModule.forChild([{ path: '', component: Tab1Page }])
            ],
            entryComponents: [PopoverComponent],
            declarations: [PopoverComponent, Tab1Page, ScrollComponent, LocationFilterComponent, TimeFilterComponent, ActivityFilterComponent]
        })
    ], Tab1PageModule);
    return Tab1PageModule;
}());
export { Tab1PageModule };
//# sourceMappingURL=tab1.module.js.map