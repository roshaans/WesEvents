import * as tslib_1 from "tslib";
/***
Ionic 4 Firebase Email Auth
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
var ForgotPage = /** @class */ (function () {
    function ForgotPage(fireauth, router, toastController, loadingController, alertController) {
        this.fireauth = fireauth;
        this.router = router;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.email = '';
        this.password = '';
        this.error = '';
        this.username = '';
    }
    ForgotPage.prototype.openLoader = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please Wait ...',
                            duration: 2000
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ForgotPage.prototype.closeLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.dismiss()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ForgotPage.prototype.recover = function () {
        var _this = this;
        this.fireauth.auth.sendPasswordResetEmail(this.email)
            .then(function (data) {
            console.log(data);
            _this.presentToast('Password reset email sent', false, 'bottom', 1000);
            _this.router.navigateByUrl('/login');
        })
            .catch(function (err) {
            console.log(" failed " + err);
            _this.error = err.message;
        });
    };
    ForgotPage.prototype.presentToast = function (message, show_button, position, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            showCloseButton: show_button,
                            position: position,
                            duration: duration
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ForgotPage = tslib_1.__decorate([
        Component({
            selector: 'app-forgot',
            templateUrl: './forgot.page.html',
            styleUrls: ['./forgot.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth, Router, ToastController, LoadingController,
            AlertController])
    ], ForgotPage);
    return ForgotPage;
}());
export { ForgotPage };
//# sourceMappingURL=forgot.page.js.map