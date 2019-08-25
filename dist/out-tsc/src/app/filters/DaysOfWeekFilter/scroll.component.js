import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as moment from 'moment';
var ScrollComponent = /** @class */ (function () {
    function ScrollComponent() {
        this.momentjs = moment;
        this.currentDate = moment();
        // currentDateTime = this.momentjs().format('YYYY-MM-DD HH:mm:ss ZZ');
        this.newDay = moment(this.currentDate).add(1, 'day').format('ddd');
        this.daysOfWeek = moment(this.newDay).format('ddd');
        this.currentFullDate = Date.now;
        // currentDate = this.currentFullDate.getDate
        // currentDay = this.currentFullDate.getDay
        // currentTime = this.currentFullDate.getHours
        this.days = { "First": [moment(this.currentDate).add(0, 'day').format('ddd'), moment(this.currentDate).add(0, 'day').format('DD'), true], "Second": [moment(this.currentDate).add(1, 'day').format('ddd'), moment(this.currentDate).add(1, 'day').format('DD'), true], "Third": [moment(this.currentDate).add(2, 'day').format('ddd'), moment(this.currentDate).add(2, 'day').format('DD'), true], "Fourth": [moment(this.currentDate).add(3, 'day').format('ddd'), moment(this.currentDate).add(3, 'day').format('DD'), true], "Fifth": [moment(this.currentDate).add(4, 'day').format('ddd'), moment(this.currentDate).add(4, 'day').format('DD'), true], "Sixth": [moment(this.currentDate).add(5, 'day').format('ddd'), moment(this.currentDate).add(5, 'day').format('DD'), true], "Seventh": [moment(this.currentDate).add(6, 'day').format('ddd'), moment(this.currentDate).add(6, 'day').format('DD'), true] };
        this.daysEntries = Object.entries(this.days);
        this.allClicked = true;
    }
    ScrollComponent.prototype.changeColor = function (index) {
        this.allClicked = false;
        if (this.daysEntries[index][1][2] == false) {
            this.daysEntries[index][1][2] = true;
        }
        else {
            this.daysEntries[index][1][2] = false;
        }
    };
    ScrollComponent.prototype.ngOnInit = function () { };
    ScrollComponent.prototype.condition = function () {
    };
    ScrollComponent.prototype.allClickedFunc = function () {
        if (this.allClicked == true) {
            this.allClicked = false;
        }
        else if (this.allClicked == false) {
            this.allClicked = true;
        }
        if (this.allClicked == true) {
            this.daysEntries.forEach(function (element) {
                element[1][2] = true;
            });
        }
        else {
            this.daysEntries.forEach(function (element) {
                element[1][2] = false;
            });
        }
    };
    ScrollComponent = tslib_1.__decorate([
        Component({
            selector: 'app-scroll',
            templateUrl: './scroll.component.html',
            styleUrls: ['./scroll.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ScrollComponent);
    return ScrollComponent;
}());
export { ScrollComponent };
//# sourceMappingURL=scroll.component.js.map