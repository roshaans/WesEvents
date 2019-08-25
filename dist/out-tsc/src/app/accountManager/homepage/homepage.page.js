import * as tslib_1 from "tslib";
import { Router } from '@angular/router';
import { Component } from '@angular/core';
var HomepagePage = /** @class */ (function () {
    function HomepagePage(router) {
        this.router = router;
    }
    HomepagePage.prototype.ngOnInit = function () {
    };
    HomepagePage.prototype.login = function () {
        this.router.navigateByUrl("/login");
    };
    HomepagePage.prototype.register = function () {
        this.router.navigateByUrl("/signup");
    };
    HomepagePage = tslib_1.__decorate([
        Component({
            selector: 'app-homepage',
            templateUrl: './homepage.page.html',
            styleUrls: ['./homepage.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], HomepagePage);
    return HomepagePage;
}());
export { HomepagePage };
//# sourceMappingURL=homepage.page.js.map