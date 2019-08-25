import * as tslib_1 from "tslib";
import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseDatabaseService } from '../../services/firebaseDatabase/firebase-database.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../popover/popover.component';
import 'firebase/database';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(popoverController, fireauth, toastCtrl, firebaseDatabase, router) {
        this.popoverController = popoverController;
        this.fireauth = fireauth;
        this.toastCtrl = toastCtrl;
        this.firebaseDatabase = firebaseDatabase;
        this.router = router;
        this.loadedEvents = [];
        // newEvents = [];
        this.iconsMatch = { "Volunteering": "globe", "Community": "help-buoy", "Sports": "american-football", "Food": "pizza", "Special lectures": "/../../../assets/Special-lecture.svg", "Parties": "beer", "Movies": "film", "Club Meeting": "/../../../assets/club-meeting.svg", "Cultural and Language": "planet", "Student Government": "globe", "Music": "musical-notes", "Performance Art": "../../../assets/performance-arts.svg", "Dance": "/../../../assets/dance.svg", "Religious": "/../../../assetsreligious.svg", "Gaming": "logo-game-controller-b", "Social Activism": "megaphone", "Relax": "bonfire", "Science": "flask", "Shopping": "cart", "Special Shows": "color-wand", "Fitness": "fitness" };
        this.activity = { "Volunteering": true, "Community": true, "Sports": true, "Food": true, "Special lectures": true, "Parties": true, "Movies": true, "Club Meeting": true, "Cultural and Language": true, "Student Government": true, "Music": true, "Performance Art": true, "Dance": true, "Religious": true, "Gaming": true, "Social Activism": true, "Relax": true, "Science": true, "Shopping": true, "Special Shows": true, "Fitness": true };
        this.activityEntries = Object.entries(this.activity);
        this.allClicked = true;
    }
    Tab1Page.prototype.presentPopover = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: PopoverComponent,
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Tab1Page.prototype.initializeItems = function () {
        this.events = this.loadedEvents;
    };
    Tab1Page.prototype.ionViewWillEnter = function () {
        this.firebaseDatabase.getEventIDs().then(function (data) {
            console.log(data.docs.forEach(function (element) {
                console.log(element.data(), "dataVals");
            }));
        });
        // this.fetchEvents()
        6;
    };
    Tab1Page.prototype.ngOnInit = function () {
    };
    Tab1Page.prototype.fetchEvents = function () {
        // .subscribe((events) => {
        //   this.events = events;
        //   this.loadedEvents = events
        // }, (err) => {
        //   console.log(err)
        // })
    };
    Tab1Page.prototype.fabPressed = function () {
        this.router.navigateByUrl("/create-event");
    };
    Tab1Page.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user = user;
            }
        });
    };
    Tab1Page.prototype.doRefresh = function (event) {
        this.fetchEvents();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    Tab1Page.prototype.saveEvent = function (eventID) {
        this.firebaseDatabase.saveEvent(eventID, this.user.uid);
        this.showToast("Event Saved");
    };
    Tab1Page.prototype.showToast = function (msg) {
        this.toastCtrl.create({
            position: 'top',
            message: msg,
            duration: 2000
        }).then(function (toast) { return toast.present(); });
    };
    Tab1Page.prototype.changeColor = function (index) {
        this.allClicked = false;
        if (this.activityEntries[index][1] == false) {
            this.activityEntries[index][1] = true;
        }
        else {
            this.activityEntries[index][1] = false;
        }
        // this.filterList(this.activityEntries, "category", false)
    };
    Tab1Page.prototype.allClickedFunc = function () {
        if (this.allClicked == true) {
            this.allClicked = false;
        }
        else if (this.allClicked == false) {
            this.allClicked = true;
        }
        if (this.allClicked == true) {
            this.activityEntries.forEach(function (element) {
                element[1] = true;
            });
        }
        else {
            this.activityEntries.forEach(function (element) {
                element[1] = false;
            });
        }
        // this.filterList(this.activityEntries, "category", true)
    };
    Tab1Page.prototype.filterList = function (evt) {
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
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [PopoverController, AngularFireAuth, ToastController, FirebaseDatabaseService, Router])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map