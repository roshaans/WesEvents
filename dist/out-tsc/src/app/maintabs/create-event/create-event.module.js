import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEventPage } from './create-event.page';
var routes = [
    {
        path: '',
        component: CreateEventPage
    }
];
var CreateEventPageModule = /** @class */ (function () {
    function CreateEventPageModule() {
    }
    CreateEventPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CreateEventPage]
        })
    ], CreateEventPageModule);
    return CreateEventPageModule;
}());
export { CreateEventPageModule };
//# sourceMappingURL=create-event.module.js.map