import * as tslib_1 from "tslib";
/**
* Ionic 4 Firebase Email Auth
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
var HomePage = /** @class */ (function () {
    function HomePage(fstore, toastController, loadingController, fireauth, router) {
        this.fstore = fstore;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.fireauth = fireauth;
        this.router = router;
        this.email = '';
        this.password = '';
        this.username = '';
        this.status = '';
        this.userWantsToSignup = false;
        this.linkError = '';
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user = user;
                _this.getData();
            }
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
    };
    HomePage.prototype.updateEmail = function () {
        var _this = this;
        this.user.updateEmail(this.email)
            .then(function () {
            _this.email = '';
            _this.presentToast('Email updated', false, 'bottom', 1000);
            _this.error = '';
        })
            .catch(function (err) {
            console.log(" failed " + err);
            _this.error = err.message;
        });
    };
    HomePage.prototype.updateStatus = function () {
        var _this = this;
        this.user.updateProfile({
            status: this.status
        })
            .then(function () {
            _this.presentToast('Status updated', false, 'bottom', 1000);
            _this.error = '';
        })
            .catch(function (err) {
            console.log(" failed " + err);
            _this.error = err.message;
        });
    };
    HomePage.prototype.updateUsername = function () {
        var _this = this;
        this.user.updateProfile({
            displayName: this.username
        })
            .then(function (data) {
            console.log(data);
            _this.username = '';
            _this.presentToast('Username updated', false, 'bottom', 1000);
            _this.error = '';
        })
            .catch(function (err) {
            console.log(" failed " + err);
            _this.error = err.message;
        });
    };
    HomePage.prototype.updateImage = function () {
        var _this = this;
        this.user.updateProfile({
            photoURL: "https://picsum.photos/id/" + this.image + "/200/200"
        })
            .then(function (data) {
            console.log(data);
            _this.image = null;
            _this.presentToast('Image updated', false, 'bottom', 1000);
            _this.error = '';
        })
            .catch(function (err) {
            console.log(" failed " + err);
            _this.error = err.message;
        });
    };
    HomePage.prototype.updateUser = function () {
        this.fstore.collection("users").doc(this.user.uid).set({
            displayName: this.username,
            photoURL: "https://picsum.photos/id/" + this.image + "/200/200",
            status: this.status
        });
    };
    HomePage.prototype.getData = function () {
        var _this = this;
        this.getUserData().subscribe(function (data) {
            _this.userData = data;
            console.log(data, "data");
        });
    };
    HomePage.prototype.getUserData = function () {
        return this.fstore.collection("users").doc(this.user.uid).valueChanges();
    };
    HomePage.prototype.updatePassword = function () {
        var _this = this;
        this.user.updatePassword(this.password)
            .then(function () {
            _this.password = '';
            _this.presentToast('Password updated', false, 'bottom', 1000);
            _this.error = '';
        })
            .catch(function (err) {
            console.log(" failed " + err);
            _this.error = err.message;
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        this.fireauth.auth.signOut().then(function () {
            _this.router.navigate(['/login']);
        });
    };
    HomePage.prototype.presentToast = function (message, show_button, position, duration) {
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
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore, ToastController, LoadingController, AngularFireAuth, Router])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map