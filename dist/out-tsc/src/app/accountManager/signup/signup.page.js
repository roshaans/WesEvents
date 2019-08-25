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
import { Platform, AlertController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
var SignupPage = /** @class */ (function () {
    function SignupPage(fireauth, router, toastController, platform, loadingController, alertController, fStore) {
        this.fireauth = fireauth;
        this.router = router;
        this.toastController = toastController;
        this.platform = platform;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.fStore = fStore;
        this.email = '';
        this.password = '';
        this.error = '';
        this.username = '';
        this.image = Math.floor(Math.random() * 60) + 1;
        this.status = '';
    }
    SignupPage.prototype.openLoader = function () {
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
    SignupPage.prototype.closeLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.dismiss()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SignupPage.prototype.signup = function () {
        // if (this.email.includes("wesleyan.edu") ||  this.email.includes("WESLEYAN.edu") || this.email.includes("WESLEYAN.EDU")|| this.email.includes("WESleyan.edu")) {
        var _this = this;
        this.fireauth.auth.createUserWithEmailAndPassword(this.email, this.password)
            .then(function (res) {
            if (res.user) {
                console.log(res.user);
                _this.updateProfile();
                _this.fStore.collection("users").doc(res.user.uid).set({
                    displayName: _this.username,
                    photoURL: "https://picsum.photos/id/" + _this.image + "/200/200",
                    status: _this.status
                });
            }
        })
            .catch(function (err) {
            console.log("login failed " + err);
            _this.error = err.message;
        });
    };
    // else {
    //     this.presentToast("Please use Wesleyan.edu Email to sign up!", false, top, 3000)
    //  }
    SignupPage.prototype.updateProfile = function () {
        var _this = this;
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log(user);
                user.updateProfile({
                    displayName: _this.username,
                    photoURL: "https://picsum.photos/id/" + _this.image + "/200/200"
                })
                    .then(function () {
                    _this.router.navigateByUrl('/');
                });
            }
        });
    };
    SignupPage.prototype.presentToast = function (message, show_button, position, duration) {
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
    SignupPage = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.page.html',
            styleUrls: ['./signup.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth, Router, ToastController, Platform, LoadingController,
            AlertController, AngularFirestore])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map