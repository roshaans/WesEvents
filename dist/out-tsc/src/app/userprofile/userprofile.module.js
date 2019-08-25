import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from './../shared/shared.module';
import { UserprofilePage } from './userprofile.page';
var routes = [
    {
        path: '',
        component: UserprofilePage
    }
];
var UserprofilePageModule = /** @class */ (function () {
    function UserprofilePageModule() {
    }
    UserprofilePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UserprofilePage]
        })
    ], UserprofilePageModule);
    return UserprofilePageModule;
}());
export { UserprofilePageModule };
//# sourceMappingURL=userprofile.module.js.map