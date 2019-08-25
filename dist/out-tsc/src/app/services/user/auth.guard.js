import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router, } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    resolve(true);
                }
                else {
                    console.log('User is not logged in');
                    _this.router.navigate(['/login']);
                    resolve(false);
                }
            });
        });
    };
    AuthGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map