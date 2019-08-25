import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { CardDetailPage } from './card-detail.page';
var routes = [
    {
        path: '',
        component: CardDetailPage
    }
];
var CardDetailPageModule = /** @class */ (function () {
    function CardDetailPageModule() {
    }
    CardDetailPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                SharedModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CardDetailPage]
        })
    ], CardDetailPageModule);
    return CardDetailPageModule;
}());
export { CardDetailPageModule };
//# sourceMappingURL=card-detail.module.js.map