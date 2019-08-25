import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { ShowGoingPage } from './show-going.page';
var routes = [
    {
        path: '',
        component: ShowGoingPage
    }
];
var ShowGoingPageModule = /** @class */ (function () {
    function ShowGoingPageModule() {
    }
    ShowGoingPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                SharedModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ShowGoingPage]
        })
    ], ShowGoingPageModule);
    return ShowGoingPageModule;
}());
export { ShowGoingPageModule };
//# sourceMappingURL=show-going.module.js.map