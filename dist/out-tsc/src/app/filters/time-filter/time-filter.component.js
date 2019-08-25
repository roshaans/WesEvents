import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Tab1Page } from './../../maintabs/browseEvents/tab1.page';
var TimeFilterComponent = /** @class */ (function () {
    function TimeFilterComponent(tab1) {
        this.tab1 = tab1;
        this.time = { "Morning": true, "Afternoon": true, "Evening": true, "Night": true };
        this.timeEntries = Object.entries(this.time);
        this.allClicked = true;
    }
    TimeFilterComponent.prototype.ngOnInit = function () {
    };
    TimeFilterComponent.prototype.changeColor = function (index) {
        this.allClicked = false;
        if (this.timeEntries[index][1] == false) {
            this.timeEntries[index][1] = true;
        }
        else {
            this.timeEntries[index][1] = false;
        }
        // this.tab1.filterList(this.timeEntries, "time", false)
    };
    TimeFilterComponent.prototype.allClickedFunc = function () {
        if (this.allClicked == true) {
            this.allClicked = false;
        }
        else if (this.allClicked == false) {
            this.allClicked = true;
        }
        if (this.allClicked == true) {
            this.timeEntries.forEach(function (element) {
                element[1] = true;
            });
        }
        else {
            this.timeEntries.forEach(function (element) {
                element[1] = false;
            });
        }
        // this.tab1.filterList(this.timeEntries, "time", true)
    };
    TimeFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-time-filter',
            templateUrl: './time-filter.component.html',
            styleUrls: ['./time-filter.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Tab1Page])
    ], TimeFilterComponent);
    return TimeFilterComponent;
}());
export { TimeFilterComponent };
//# sourceMappingURL=time-filter.component.js.map