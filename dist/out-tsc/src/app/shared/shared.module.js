import * as tslib_1 from "tslib";
import { CardComponent } from './card/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = tslib_1.__decorate([
        NgModule({
            declarations: [CardComponent],
            imports: [
                CommonModule,
                IonicModule,
                CommonModule
            ],
            exports: [
                CardComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map