import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
var AutoService = /** @class */ (function () {
    function AutoService() {
    }
    AutoService.prototype.loginUser = function (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
    AutoService.prototype.resetPassword = function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    };
    AutoService.prototype.logoutUser = function () {
        return firebase.auth().signOut();
    };
    AutoService.prototype.signupUser = function (email, password) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (newUserCredential) {
            firebase
                .firestore()
                .doc("/userProfile/" + newUserCredential.user.uid)
                .set({ email: email });
        })
            .catch(function (error) {
            console.error(error);
            throw new Error(error);
        });
    };
    AutoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AutoService);
    return AutoService;
}());
export { AutoService };
//# sourceMappingURL=auto.service.js.map