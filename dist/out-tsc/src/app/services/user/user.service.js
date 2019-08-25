import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
var UserService = /** @class */ (function () {
    function UserService(fireauth, fStore) {
        var _this = this;
        this.fireauth = fireauth;
        this.fStore = fStore;
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user = user;
                _this.savedEventsCollection = fStore.doc("users/" + user.uid);
            }
        });
    }
    UserService.prototype.getUserdata = function (id) {
        return this.fStore.collection("users").doc(id).valueChanges();
    };
    UserService.prototype.getSavedIds = function () {
        return this.savedEventsCollection;
    };
    UserService.prototype.getSavedIdForUser = function (uuid) {
        var collection = this.fStore.doc("users/" + uuid);
        return collection;
    };
    UserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth, AngularFirestore])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map