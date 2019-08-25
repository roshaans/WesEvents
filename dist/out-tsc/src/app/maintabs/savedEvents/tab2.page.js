import * as tslib_1 from "tslib";
import { FirebaseDatabaseService } from "./../../services/firebaseDatabase/firebase-database.service";
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { UserService } from './../../services/user/user.service';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(userService, fireauth, toastCtrl, firebaseDatabase, router) {
        this.userService = userService;
        this.fireauth = fireauth;
        this.toastCtrl = toastCtrl;
        this.firebaseDatabase = firebaseDatabase;
        this.router = router;
        this.events = [];
        this.loadedEvents = [];
        this.connectionIsGood = false;
        this.firstTime = false;
    }
    Tab2Page.prototype.ngOnInit = function () {
        console.log(this.eventIDs);
        this.fetchEvents();
    };
    Tab2Page.prototype.notGoing = function (event) {
        var _this = this;
        this.firebaseDatabase.deleteEventFromSavedEvents(event.event_id, this.user.uid).then(function () {
            _this.firebaseDatabase.deleteGoing(event.event_id, _this.user.uid);
            _this.fetchEvents();
        });
        this.showToast("Event Deleted");
    };
    Tab2Page.prototype.fetchEvents = function () {
        var _this = this;
        this.userService.getSavedIds().get().subscribe(function (snapshot) {
            _this.events = [];
            _this.loadedEvents = [];
            if (snapshot.data().savedEvents) {
                _this.eventIDs = [];
                _this.eventIDs = snapshot.data().savedEvents;
                if (_this.eventIDs.length >= 1) {
                    _this.firstTime = true;
                }
                else {
                    _this.firstTime = false;
                }
                if (_this.eventIDs.length > 0) {
                    _this.connectionIsGood = true;
                    _this.eventIDs.forEach(function (element) {
                        _this.firebaseDatabase.getEvent(element).subscribe(function (data) {
                            _this.events.push(data);
                            _this.loadedEvents.push(data);
                        });
                    });
                }
            }
        });
    };
    Tab2Page.prototype.initializeItems = function () {
        this.events = this.loadedEvents;
    };
    Tab2Page.prototype.filterList = function (evt) {
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
    Tab2Page.prototype.ionViewDidEnter = function () {
        var _this = this;
        // this.fetchEvents()
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user = user;
            }
        });
    };
    Tab2Page.prototype.doRefresh = function (event) {
        this.fetchEvents();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    Tab2Page.prototype.showToast = function (msg) {
        this.toastCtrl.create({
            position: 'bottom',
            message: msg,
            duration: 2000
        }).then(function (toast) { return toast.present(); });
    };
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, AngularFireAuth, ToastController, FirebaseDatabaseService, Router])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map