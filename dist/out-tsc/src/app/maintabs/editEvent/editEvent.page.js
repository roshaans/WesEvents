import * as tslib_1 from "tslib";
import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { ToastController } from '@ionic/angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { iconDict } from './../../Models/CategoryIconsDictionary';
var editEventPage = /** @class */ (function () {
    function editEventPage(route, fireauth, fStore, formBuilder, router, toastCtrl, FirebaseDatabase) {
        this.route = route;
        this.fireauth = fireauth;
        this.fStore = fStore;
        this.formBuilder = formBuilder;
        this.router = router;
        this.toastCtrl = toastCtrl;
        this.FirebaseDatabase = FirebaseDatabase;
        this.iconsMatch = iconDict;
        this.other = "custom field";
        this.updates = [1, 2];
        this.createEventForm = this.formBuilder.group({
            'event_title': [null, Validators.required],
            'event_location': [null, Validators.required],
            'event_students': [null, Validators.required],
            'event_date': [null, Validators.required],
            'event_startTime': [null, Validators.required],
            'event_endTime': [null, Validators.required],
            'event_description': [null, Validators.required],
            'event_category': [null, Validators.required]
        });
    }
    editEventPage.prototype.resize = function () {
        this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    };
    editEventPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.myInput.nativeElement.style.height = "130px";
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.FirebaseDatabase.getEvent(this.id).subscribe(function (res) {
                _this.event = res;
                _this.description = _this.event.event_description;
                _this.starttime = _this.event.event_startTime;
                _this.endtime = _this.event.event_endTime;
                _this.date = _this.event.event_date;
                _this.invited = _this.event.event_students;
                _this.selectedLocation = _this.event.event_location;
                _this.selected = _this.event.event_category;
                _this.title = _this.event.event_title;
            }, function (err) {
                console.log(err);
            });
        }
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user = user;
            }
        });
    };
    editEventPage.prototype.showToast = function (msg) {
        this.toastCtrl.create({
            position: 'top',
            message: msg,
            duration: 2000
        }).then(function (toast) { return toast.present(); });
    };
    editEventPage.prototype.editEvent = function () {
        this.event = {
            event_title: this.createEventForm.controls["event_title"].value,
            event_location: this.createEventForm.controls["event_location"].value,
            event_students: this.createEventForm.controls["event_students"].value,
            event_category: this.createEventForm.controls["event_category"].value,
            event_date: this.createEventForm.controls["event_date"].value,
            event_startTime: this.createEventForm.controls["event_startTime"].value,
            event_endTime: this.createEventForm.controls["event_endTime"].value,
            event_description: this.createEventForm.controls["event_description"].value,
            event_pictureURL: "",
            event_chatNumber: 0,
            event_goingCounter: [],
            event_maybeGoingCounter: 0,
            createdBy: this.user.uid
        };
        this.FirebaseDatabase.editEvent(this.event, this.id);
        this.showToast("Event edit was successful!");
    };
    editEventPage.prototype.segmentChanged = function (ev) {
        if (ev['detail']['value'] == "edit") {
            this.viewMode = "edit";
        }
        else if (ev['detail']['value'] == "addUpdate") {
            this.viewMode = "addUpdate";
        }
        else {
            this.viewMode = "preview";
        }
    };
    tslib_1.__decorate([
        ViewChild('myInput'),
        tslib_1.__metadata("design:type", ElementRef)
    ], editEventPage.prototype, "myInput", void 0);
    editEventPage = tslib_1.__decorate([
        Component({
            selector: 'app-edit',
            templateUrl: 'editEvent.page.html',
            styleUrls: ['editEvent.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute, AngularFireAuth, AngularFirestore, FormBuilder, Router, ToastController, FirebaseDatabaseService])
    ], editEventPage);
    return editEventPage;
}());
export { editEventPage };
//# sourceMappingURL=editEvent.page.js.map