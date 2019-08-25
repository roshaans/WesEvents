import * as tslib_1 from "tslib";
import { FirebaseDatabaseService } from '../services/firebaseDatabase/firebase-database.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { iconDict } from './../Models/CategoryIconsDictionary';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/database';
var CardDetailPage = /** @class */ (function () {
    function CardDetailPage(fireauth, firebaseDatabase, route, toastCtrl) {
        var _this = this;
        this.fireauth = fireauth;
        this.firebaseDatabase = firebaseDatabase;
        this.route = route;
        this.toastCtrl = toastCtrl;
        this.iconsMatch = iconDict;
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user = user;
            }
        });
    }
    CardDetailPage.prototype.saveEvent = function () {
        this.firebaseDatabase.saveEvent(this.id, this.user.uid);
        this.reloadCard();
        this.showToast("Event Saved");
    };
    CardDetailPage.prototype.showToast = function (msg) {
        this.toastCtrl.create({
            position: 'bottom',
            message: msg,
            duration: 2000
        }).then(function (toast) { return toast.present(); });
    };
    CardDetailPage.prototype.ngOnInit = function () {
        this.reloadCard();
    };
    CardDetailPage.prototype.reloadCard = function () {
        var _this = this;
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.firebaseDatabase.getEvent(this.id).subscribe(function (res) {
                _this.event = res;
            }, function (err) {
                console.log(err);
            });
        }
    };
    CardDetailPage = tslib_1.__decorate([
        Component({
            selector: 'app-card-detail',
            templateUrl: './card-detail.page.html',
            styleUrls: ['./card-detail.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth, FirebaseDatabaseService, ActivatedRoute, ToastController])
    ], CardDetailPage);
    return CardDetailPage;
}());
export { CardDetailPage };
//# sourceMappingURL=card-detail.page.js.map