import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FirebaseDatabaseService } from "./../services/firebaseDatabase/firebase-database.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { UserService } from './../services/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
var UserprofilePage = /** @class */ (function () {
    function UserprofilePage(ActivatedRoute, fstore, userService, fireauth, toastCtrl, firebaseDatabase, router) {
        this.ActivatedRoute = ActivatedRoute;
        this.fstore = fstore;
        this.userService = userService;
        this.fireauth = fireauth;
        this.toastCtrl = toastCtrl;
        this.firebaseDatabase = firebaseDatabase;
        this.router = router;
        this.eventIDs = [];
        this.events = [];
        this.savedIDs = [];
        this.savedEvents = [];
        this.firstTimeSaved = false;
        this.firstTime = false;
        this.showEvents = false;
        this.loadedEvents = [];
    }
    UserprofilePage.prototype.segmentChanged = function (ev) {
        if (ev['detail']['value'] == "hosted") {
            this.showEvents = false;
        }
        else if (ev['detail']['value'] == "saved") {
            this.showEvents = true;
        }
    };
    UserprofilePage.prototype.showToast = function (msg) {
        this.toastCtrl.create({
            position: 'bottom',
            message: msg,
            duration: 2000
        }).then(function (toast) { return toast.present(); });
    };
    UserprofilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.uuid = this.ActivatedRoute.snapshot.paramMap.get('uuid');
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user = user;
            }
            _this.userService.getUserdata(_this.uuid).subscribe(function (data) {
                _this.profileUser = data;
                console.log(data);
                _this.fetchEvents();
            });
        });
    };
    UserprofilePage.prototype.fetchEvents = function () {
        var _this = this;
        this.userService.getSavedIdForUser(this.uuid).get().subscribe(function (snapshot) {
            _this.events = [];
            _this.loadedEvents = [];
            if (snapshot.data().savedEvents) {
                _this.savedIDs = [];
                _this.savedIDs = snapshot.data().savedEvents;
                if (_this.savedIDs.length >= 1) {
                    _this.firstTimeSaved = true;
                }
                else {
                    _this.firstTimeSaved = false;
                }
            }
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
            if (_this.savedIDs.length > 0) {
                _this.savedIDs.forEach(function (element) {
                    _this.firebaseDatabase.getEvent(element).subscribe(function (data) {
                        _this.savedEvents.push(data);
                    });
                });
            }
        });
    };
    //  getData() {
    //   this.getUserData().subscribe((data)=> {
    //     this.userData = data
    //   })
    // }
    UserprofilePage.prototype.saveEvent = function (eventID) {
        console.log(eventID, "eventID");
        console.log(this.user.uid, "user.uid");
        console.log(eventID["event_id"], "saveEvent");
        this.firebaseDatabase.saveEvent(eventID["event_id"], this.user.uid);
        this.showToast("Event Saved");
    };
    // getUserData() {
    //  return this.fstore.collection("users").doc(this.profileUser.uid).valueChanges()
    // }
    UserprofilePage.prototype.settingsButtonClicked = function () {
        this.router.navigateByUrl('/settings');
    };
    UserprofilePage.prototype.initializeItems = function () {
        this.events = this.loadedEvents;
    };
    UserprofilePage.prototype.filterList = function (evt) {
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
    UserprofilePage.prototype.doRefresh = function (event) {
        this.fetchEvents();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    UserprofilePage = tslib_1.__decorate([
        Component({
            selector: 'app-userprofile',
            templateUrl: './userprofile.page.html',
            styleUrls: ['./userprofile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, AngularFirestore, UserService, AngularFireAuth, ToastController, FirebaseDatabaseService, Router])
    ], UserprofilePage);
    return UserprofilePage;
}());
export { UserprofilePage };
//# sourceMappingURL=userprofile.page.js.map