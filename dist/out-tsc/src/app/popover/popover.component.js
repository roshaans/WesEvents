import * as tslib_1 from "tslib";
import { PopoverController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
var PopoverComponent = /** @class */ (function () {
    function PopoverComponent(fireauth, router, popoverController) {
        this.fireauth = fireauth;
        this.router = router;
        this.popoverController = popoverController;
    }
    PopoverComponent.prototype.ngOnInit = function () { };
    PopoverComponent.prototype.openAbout = function () {
        this.router.navigateByUrl('/about');
        this.popoverController.dismiss();
    };
    PopoverComponent.prototype.openWesleyanAcademic = function () {
        window.open('https://catalog.wesleyan.edu/calendar/', '_blank');
        this.popoverController.dismiss();
    };
    PopoverComponent.prototype.openWesleying = function () {
        window.open('http://wesleying.org/category/events/', '_blank');
        this.popoverController.dismiss();
    };
    PopoverComponent.prototype.openWesleyanArgus = function () {
        window.open('http://wesleyanargus.com/', '_blank');
        this.popoverController.dismiss();
    };
    PopoverComponent.prototype.openWesleyanAtheletics = function () {
        window.open('https://athletics.wesleyan.edu/composite', '_blank');
        this.popoverController.dismiss();
    };
    PopoverComponent.prototype.openMovieCalendar = function () {
        window.open('https://www.wesleyan.edu/cfilm/Film%20Series%20Poster%20.html', '_blank');
        this.popoverController.dismiss();
    };
    PopoverComponent.prototype.openFacebookEvents = function () {
        window.open('https://m.facebook.com/pg/wesleyan.university/events/', '_blank');
        this.popoverController.dismiss();
    };
    PopoverComponent.prototype.openWesleyanMasterCalendar = function () {
        window.open('https://eaglet.wesleyan.edu/MasterCalendar/MasterCalendar.aspx?data=cr7N8e0fDWPjflNju05m7FowpKvBf0sH2RbSv0rjROOoovq7Pr9MEBmVA3QuoEqCcKQ1jbx7UfT6RNDBaJ5K3PsOkPpuYN3hhcqTbZfePMLOTE34W9ov3Sf0b8atB56noetvC5YrfzfuWbQONmQj81T2YPf6SP6apfP8dQRdftFafPUhoA9pKkUnNndn0W16qTyaRYV0qNS03BkBaMfI1bQLstULrY4tulyCyCTRHXOqR9Dv9dfTIw==', '_blank');
        this.popoverController.dismiss();
    };
    PopoverComponent.prototype.close = function () {
        this.popoverController.dismiss();
    };
    PopoverComponent.prototype.signout = function () {
        var _this = this;
        this.fireauth.auth.signOut().then(function () {
            _this.router.navigate(['/login']);
        });
        this.popoverController.dismiss();
    };
    PopoverComponent = tslib_1.__decorate([
        Component({
            selector: 'app-popover',
            templateUrl: './popover.component.html',
            styleUrls: ['./popover.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth, Router, PopoverController])
    ], PopoverComponent);
    return PopoverComponent;
}());
export { PopoverComponent };
//# sourceMappingURL=popover.component.js.map