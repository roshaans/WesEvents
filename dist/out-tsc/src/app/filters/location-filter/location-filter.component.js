import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Tab1Page } from './../../maintabs/browseEvents/tab1.page';
var LocationFilterComponent = /** @class */ (function () {
    function LocationFilterComponent(tab1) {
        this.tab1 = tab1;
        this.locations = { "Exley": true, "Foss Hill": true, "Usdan University Center": true, "Russel House": true, "Davison Art Center": true, "Fayerweather": true, "Memorial Chapel": true, "Patricelli ’92 Theater": true, "Powell Family Cinema": true, "Resource Center ": true, " Gordon Career Center": true, "Religious and Spiritual Life": true, "Student Resource Center": true, "Wesleyan RJ Julia Bookstore": true };
        this.locationEntries = Object.entries(this.locations);
        this.allClicked = true;
    }
    LocationFilterComponent.prototype.ngOnInit = function () { };
    LocationFilterComponent.prototype.changeColor = function (index) {
        this.allClicked = false;
        if (this.locationEntries[index][1] == false) {
            this.locationEntries[index][1] = true;
        }
        else {
            this.locationEntries[index][1] = false;
        }
        // this.tab1.filterList(this.locationEntries, "location", false)
    };
    LocationFilterComponent.prototype.allClickedFunc = function () {
        if (this.allClicked == true) {
            this.allClicked = false;
        }
        else if (this.allClicked == false) {
            this.allClicked = true;
        }
        if (this.allClicked == true) {
            this.locationEntries.forEach(function (element) {
                element[1] = true;
            });
        }
        else {
            this.locationEntries.forEach(function (element) {
                element[1] = false;
            });
        }
        // this.tab1.filterList(this.locationEntries, "location", true)
    };
    LocationFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-location-filter',
            templateUrl: './location-filter.component.html',
            styleUrls: ['./location-filter.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Tab1Page])
    ], LocationFilterComponent);
    return LocationFilterComponent;
}());
export { LocationFilterComponent };
//# sourceMappingURL=location-filter.component.js.map