import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomepagePage } from './homepage.page';
var routes = [
    {
        path: '',
        component: HomepagePage
    }
];
var HomepagePageModule = /** @class */ (function () {
    function HomepagePageModule() {
    }
    HomepagePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HomepagePage]
        })
    ], HomepagePageModule);
    return HomepagePageModule;
}());
export { HomepagePageModule };
//# sourceMappingURL=homepage.module.js.map