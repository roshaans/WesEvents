import * as tslib_1 from "tslib";
import { Tab1Page } from './../../maintabs/browseEvents/tab1.page';
import { Component } from '@angular/core';
var ActivityFilterComponent = /** @class */ (function () {
    function ActivityFilterComponent(tab1) {
        this.tab1 = tab1;
        this.custom = false;
        this.iconsMatch = { "Volunteering": "globe", "Community": "help-buoy", "Sports": "american-football", "Food": "pizza", "Special lectures": "/../../../assets/Special-lecture.svg", "Parties": "beer", "Movies": "film", "Club Meeting": "/../../../assets/club-meeting.svg", "Cultural and Language": "planet", "Student Government": "globe", "Music": "musical-notes", "Performance Art": "../../../assets/performance-arts.svg", "Dance": "/../../../assets/dance.svg", "Religious": "/../../../assetsreligious.svg", "Gaming": "logo-game-controller-b", "Social Activism": "megaphone", "Relax": "bonfire", "Science": "flask", "Shopping": "cart", "Special Shows": "color-wand", "Fitness": "fitness" };
        this.activity = { "Volunteering": true, "Community": true, "Sports": true, "Food": true, "Special lectures": true, "Parties": true, "Movies": true, "Club Meeting": true, "Cultural and Language": true, "Student Government": true, "Music": true, "Performance Art": true, "Dance": true, "Religious": true, "Gaming": true, "Social Activism": true, "Relax": true, "Science": true, "Shopping": true, "Special Shows": true, "Fitness": true };
        this.activityEntries = Object.entries(this.activity);
        this.allClicked = true;
    }
    ActivityFilterComponent.prototype.ngOnInit = function () {
    };
    ActivityFilterComponent.prototype.categoryPressed = function (category) {
        this.activityEntries.forEach(function (element) {
            if (element[1] != category) {
                element[1] = false;
            }
        });
    };
    ActivityFilterComponent.prototype.changeColor = function (index) {
        this.allClicked = false;
        if (this.activityEntries[index][1] == false) {
            this.activityEntries[index][1] = true;
        }
        else {
            this.activityEntries[index][1] = false;
        }
        // this.tab1.filterList(this.activityEntries, "category", false)
    };
    ActivityFilterComponent.prototype.allClickedFunc = function () {
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
        // this.tab1.filterList(this.activityEntries, "category", true)
    };
    ActivityFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-activity-filter',
            templateUrl: './activity-filter.component.html',
            styleUrls: ['./activity-filter.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Tab1Page])
    ], ActivityFilterComponent);
    return ActivityFilterComponent;
}());
export { ActivityFilterComponent };
//# sourceMappingURL=activity-filter.component.js.map