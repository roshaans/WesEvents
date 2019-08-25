import * as tslib_1 from "tslib";
import { Tab1Page } from './../../maintabs/browseEvents/tab1.page';
// import { ActivityFilterComponent } from './../../filters/Activity/activity-filter.component'
import { UserService } from '../../services/user/user.service';
import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'firebase/database';
import { iconDict } from '../../Models/CategoryIconsDictionary';
import * as moment from 'moment';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
var CardComponent = /** @class */ (function () {
    function CardComponent(toastCtrl, fireauth, tab1, userService, route, router, firebaseDatabase) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.fireauth = fireauth;
        this.tab1 = tab1;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.firebaseDatabase = firebaseDatabase;
        this.Updates = 7;
        this.iconsMatch = iconDict;
        this.colorScheme = { "Sports": ["#FF0000", "#195DF7"], "Party": "#36454f" };
        this.eventIsUpdated = false;
        this.eventIsSaved = false;
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user = user;
                if (_this.user.uid) {
                    _this.userService.getSavedIdForUser(_this.user["uid"]).get().subscribe(function (snapshot) {
                        if (snapshot.data().savedEvents) {
                            _this.savedEventIds = snapshot.data().savedEvents;
                            if (_this.savedEventIds.indexOf(_this.id) > -1) {
                                _this.eventIsSaved = true;
                            }
                            else {
                                _this.eventIsSaved = false;
                            }
                        }
                    });
                }
            }
        });
        // console.log(this.colorScheme["Sports"][0].valueOf(), "priting value")
        // console.log(this.colorScheme["Sports"][0], "priting sports")
        var bodyStyles = document.body.style;
        // bodyStyles.setProperty('--background', 'black');
    }
    CardComponent.prototype.saveEvent = function () {
        this.firebaseDatabase.saveEvent(this.id, this.user.uid);
        this.showToast("Event Saved");
        this.eventIsSaved = true;
    };
    CardComponent.prototype.notGoing = function () {
        var _this = this;
        this.firebaseDatabase.deleteEventFromSavedEvents(this.id, this.user.uid).then(function () {
            _this.firebaseDatabase.deleteGoing(_this.id, _this.user.uid);
            _this.eventIsSaved = false;
        });
        this.showToast("Event Deleted");
    };
    CardComponent.prototype.showToast = function (msg) {
        this.toastCtrl.create({
            position: 'bottom',
            message: msg,
            duration: 2000
        }).then(function (toast) { return toast.present(); });
    };
    CardComponent.prototype.filterTime = function () {
        var hour = this.startTime.getHours();
        if (hour >= 6 && hour < 12) {
            return "Morning";
        }
        else if (hour >= 12 && hour < 17) {
            return "Afternoon";
        }
        else if (hour >= 17 && hour < 20) {
            return "Evening";
        }
        else if (hour >= 20 && hour <= 24) {
            return "Night";
        }
    };
    CardComponent.prototype.fetchEvent = function () {
        var _this = this;
        if (this.id) {
            this.firebaseDatabase.getEvent(this.id).subscribe(function (res) {
                _this.event = res;
                _this.startTime = new Date(_this.event.event_startTime);
                _this.endTime = new Date(_this.event.event_endTime);
                _this.date = res.event_creation_timeStamp;
                var creationDateObjectInMilliseconds = _this.date.seconds * 1000 + _this.date.nanoseconds / 1000000;
                var createDate = moment.unix(creationDateObjectInMilliseconds / 1000).format('dddd, MMMM Do, YYYY h:mm:ss A');
                _this.createdBy = res.createdBy;
                _this.userService.getUserdata(_this.createdBy[0]).subscribe(function (data) {
                    _this.profileUser = data;
                });
                _this.sinceDate = moment(createDate, 'dddd, MMMM Do, YYYY h:mm:ss A').fromNow(); // 8 years ago
                _this.time = _this.filterTime();
                if (res.lastUpdated) {
                    _this.updateDate = res.lastUpdated;
                    var updatedDateObjectInMilliseconds = _this.updateDate.seconds * 1000 + _this.date.nanoseconds / 1000000;
                    var updateDate = moment.unix(updatedDateObjectInMilliseconds / 1000).format('dddd, MMMM Do, YYYY h:mm:ss A');
                    _this.updatedDate = moment(updateDate, 'dddd, MMMM Do, YYYY h:mm:ss A').fromNow();
                    _this.eventIsUpdated = true;
                }
            });
        }
    };
    CardComponent.prototype.ngOnInit = function () {
        this.fetchEvent();
    };
    CardComponent.prototype.goToUserProfile = function (index) {
        this.router.navigateByUrl("userprofile/" + this.createdBy[0]);
    };
    CardComponent.prototype.seeMore = function () {
        this.router.navigateByUrl('/card/' + this.id);
    };
    CardComponent.prototype.categoryClicked = function (event_category) {
        // this.tab1.categoryPressed(event_category);
        this.router.navigateByUrl("/tabs/tab1");
    };
    CardComponent.prototype.showGoingList = function () {
        this.fetchEvent();
        this.router.navigateByUrl("show-going/" + this.id);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CardComponent.prototype, "id", void 0);
    CardComponent = tslib_1.__decorate([
        Component({
            selector: 'app-card',
            templateUrl: './card.component.html',
            styleUrls: ['./card.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController, AngularFireAuth, Tab1Page, UserService, ActivatedRoute, Router, FirebaseDatabaseService])
    ], CardComponent);
    return CardComponent;
}());
export { CardComponent };
//# sourceMappingURL=card.component.js.map