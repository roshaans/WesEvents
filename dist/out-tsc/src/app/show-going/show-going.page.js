import * as tslib_1 from "tslib";
import { UserService } from '../services/user/user.service';
import { Component } from '@angular/core';
import { FirebaseDatabaseService } from '../services/firebaseDatabase/firebase-database.service';
import { ActivatedRoute, Router } from '@angular/router';
var ShowGoingPage = /** @class */ (function () {
    function ShowGoingPage(route, router, user, firebaseDatabase) {
        this.route = route;
        this.router = router;
        this.user = user;
        this.firebaseDatabase = firebaseDatabase;
        this.goingIDs = [];
        this.goingUsers = [];
        this.members = false;
    }
    ShowGoingPage.prototype.ngOnInit = function () {
        this.id = this.route.snapshot.paramMap.get('id');
        this.fetchmembers();
    };
    ShowGoingPage.prototype.fetchmembers = function () {
        var _this = this;
        this.goingUsers = [];
        this.goingIDs = [];
        this.firebaseDatabase.getEvent(this.id).subscribe(function (res) {
            _this.event = res;
            if (res["event_goingCounter"]) {
                if (res.event_goingCounter.length > 0) {
                    _this.members = true;
                    _this.goingIDs = res.event_goingCounter;
                    _this.goingIDs.forEach(function (element) {
                        _this.user.getUserdata(element).subscribe(function (snapshot) {
                            console.log(snapshot, "userSnapshot");
                            _this.goingUsers.push(snapshot);
                        });
                    });
                }
            }
        });
    };
    ShowGoingPage.prototype.doRefresh = function (event) {
        this.fetchmembers();
        setTimeout(function () {
            event.target.complete();
        }, 2000);
    };
    ShowGoingPage.prototype.goToUserProfile = function (index) {
        console.log("userprofile" + this.goingIDs[index]);
        this.router.navigateByUrl("userprofile/" + this.goingIDs[index]);
        // console.log(this.goingIDs[index])
    };
    ShowGoingPage = tslib_1.__decorate([
        Component({
            selector: 'app-show-going',
            templateUrl: './show-going.page.html',
            styleUrls: ['./show-going.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, Router, UserService, FirebaseDatabaseService])
    ], ShowGoingPage);
    return ShowGoingPage;
}());
export { ShowGoingPage };
//# sourceMappingURL=show-going.page.js.map