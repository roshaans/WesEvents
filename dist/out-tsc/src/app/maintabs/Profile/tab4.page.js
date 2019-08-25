import * as tslib_1 from "tslib";
import { FirebaseDatabaseService } from "./../../services/firebaseDatabase/firebase-database.service";
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { UserService } from './../../services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
var Tab4Page = /** @class */ (function () {
    function Tab4Page(fstore, userService, fireauth, toastCtrl, firebaseDatabase, router) {
        var _this = this;
        this.fstore = fstore;
        this.userService = userService;
        this.fireauth = fireauth;
        this.toastCtrl = toastCtrl;
        this.firebaseDatabase = firebaseDatabase;
        this.router = router;
        this.eventIDs = [];
        this.events = [];
        this.firstTime = false;
        this.loadedEvents = [];
        this.hasStatus = false;
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user = user;
                _this.getData();
            }
        });
    }
    Tab4Page.prototype.ionViewDidEnter = function () {
        // this.fetchEvents()
    };
    Tab4Page.prototype.deleteEvent = function (event) {
        this.firebaseDatabase.deleteEvent(event.event_id, this.user.uid);
        this.fetchEvents();
    };
    Tab4Page.prototype.editEvent = function (event) {
        this.router.navigateByUrl("editEvent/" + event.event_id);
    };
    Tab4Page.prototype.showToast = function (msg) {
        this.toastCtrl.create({
            position: 'bottom',
            message: msg,
            duration: 2000
        }).then(function (toast) { return toast.present(); });
    };
    Tab4Page.prototype.ngOnInit = function () {
        this.fetchEvents();
    };
    Tab4Page.prototype.fetchEvents = function () {
        var _this = this;
        this.userService.getSavedIds().get().subscribe(function (snapshot) {
            _this.events = [];
            _this.loadedEvents = [];
            if (snapshot.data().createdEvents) {
                _this.eventIDs = [];
                _this.eventIDs = snapshot.data().createdEvents;
                if (_this.eventIDs.length >= 1) {
                    _this.firstTime = true;
                }
                else {
                    _this.firstTime = false;
                }
            }
            if (_this.eventIDs.length > 0) {
                _this.eventIDs.forEach(function (element) {
                    _this.firebaseDatabase.getEvent(element).subscribe(function (data) {
                        _this.events.push(data);
                        _this.loadedEvents.push(data);
                    });
                });
            }
        });
    };
    Tab4Page.prototype.getData = function () {
        var _this = this;
        this.getUserData().subscribe(function (data) {
            _this.userData = data;
            console.log(_this.userData.status, "status");
            if (_this.userData.status != "") {
                _this.hasStatus = true;
            }
        });
    };
    Tab4Page.prototype.getUserData = function () {
        return this.fstore.collection("users").doc(this.user.uid).valueChanges();
    };
    Tab4Page.prototype.settingsButtonClicked = function () {
        this.router.navigateByUrl('/settings');
    };
    Tab4Page.prototype.initializeItems = function () {
        this.events = this.loadedEvents;
    };
    Tab4Page.prototype.filterList = function (evt) {
        this.initializeItems();
        var searchTerm = evt.srcElement.value;
        if (!searchTerm) {
            return;
        }
        this.events = this.events.filter(function (currentEvent) {
            if (currentEvent.event_title && searchTerm) {
                if (currentEvent.event_title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
    };
    Tab4Page.prototype.doRefresh = function (event) {
        this.fetchEvents();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    Tab4Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab4',
            templateUrl: './tab4.page.html',
            styleUrls: ['./tab4.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore, UserService, AngularFireAuth, ToastController, FirebaseDatabaseService, Router])
    ], Tab4Page);
    return Tab4Page;
}());
export { Tab4Page };
//# sourceMappingURL=tab4.page.js.map