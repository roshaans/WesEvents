import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { editEventPage } from './editEvent.page';
import { ReactiveFormsModule } from '@angular/forms';
var EditEventPageModule = /** @class */ (function () {
    function EditEventPageModule() {
    }
    EditEventPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule.forChild([{ path: '', component: editEventPage }])
            ],
            declarations: [editEventPage]
        })
    ], EditEventPageModule);
    return EditEventPageModule;
}());
export { EditEventPageModule };
//# sourceMappingURL=editEvent.module.js.map