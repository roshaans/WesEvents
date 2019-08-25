import * as tslib_1 from "tslib";
import { FirebaseDatabaseService } from './../../services/firebaseDatabase/firebase-database.service';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { iconDict } from './../../Models/CategoryIconsDictionary';
import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { AlertController } from '@ionic/angular';
var CreateEventPage = /** @class */ (function () {
    function CreateEventPage(alertController, camera, file, fireauth, fStore, formBuilder, router, toastCtrl, FirebaseDatabase) {
        this.alertController = alertController;
        this.camera = camera;
        this.file = file;
        this.fireauth = fireauth;
        this.fStore = fStore;
        this.formBuilder = formBuilder;
        this.router = router;
        this.toastCtrl = toastCtrl;
        this.FirebaseDatabase = FirebaseDatabase;
        this.iconsMatch = iconDict;
        this.other = "custom field";
        this.viewMode = false;
        this.createEventForm = this.formBuilder.group({
            'event_title': [null, Validators.required],
            'event_location': [null, Validators.required],
            'event_students': [null, Validators.required],
            'event_date': [null, Validators.required],
            'event_startTime': [null, Validators.required],
            'event_endTime': [null, Validators.required],
            'event_description': [null, Validators.required],
            'event_category': [null, Validators.required],
            "event_creation_timeStamp": [firebase.firestore.FieldValue.serverTimestamp()]
        });
    }
    CreateEventPage.prototype.resize = function () {
        this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    };
    CreateEventPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.myInput.nativeElement.style.height = "130px";
        this.fireauth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user = user;
            }
        });
    };
    CreateEventPage.prototype.showToast = function (msg) {
        this.toastCtrl.create({
            position: 'top',
            message: msg,
            duration: 4000
        }).then(function (toast) { return toast.present(); });
    };
    CreateEventPage.prototype.presentAlertMultipleButtons = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Disclaimer',
                            message: "Be mindful that people can see who you are. Your account is subject to disqualification if you post any inappropriate content. ",
                            buttons: [
                                {
                                    text: 'Edit',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'Show Preview',
                                    handler: function () {
                                        var preview = "preview";
                                        var some = { 'detail': { 'value': preview } };
                                        console.log(some);
                                        _this.segmentChanged(some);
                                        _this.alertController.dismiss();
                                    },
                                },
                                {
                                    text: 'Create Event',
                                    handler: function () {
                                        _this.createEvent();
                                    },
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateEventPage.prototype.createEvent = function () {
        this.event = {
            event_title: this.createEventForm.controls["event_title"].value,
            event_location: this.createEventForm.controls["event_location"].value,
            event_students: this.createEventForm.controls["event_students"].value,
            event_category: this.createEventForm.controls["event_category"].value,
            event_date: this.createEventForm.controls["event_date"].value,
            event_startTime: this.createEventForm.controls["event_startTime"].value,
            event_endTime: this.createEventForm.controls["event_endTime"].value,
            event_creation_timeStamp: this.createEventForm.controls["event_creation_timeStamp"].value,
            event_description: this.createEventForm.controls["event_description"].value,
            event_pictureURL: "",
            event_chatNumber: 0,
            event_goingCounter: [],
            event_maybeGoingCounter: 0,
            createdBy: [this.user.uid, this.user.displayName]
        };
        this.FirebaseDatabase.createEvent(this.event, this.user.uid);
        this.alertController.dismiss();
        // this.clearFields()
        this.showToast("Event has been created. Please head to the profile section to make any edits to your event.");
    };
    CreateEventPage.prototype.segmentChanged = function (ev) {
        if (ev['detail']['value'] == "edit") {
            this.viewMode = false;
        }
        else if (ev['detail']['value'] == "preview") {
            this.viewMode = true;
        }
    };
    CreateEventPage.prototype.clearFields = function () {
        this.description = "";
        // this.starttime= "";
        // this.endtime= "";
        // this.date= "";
        this.invited = "";
        this.location = "";
        this.selected = "";
        this.selectedCategory = "";
        this.selectedLocation = "";
        this.title = "";
    };
    CreateEventPage.prototype.pickImage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, cameraInfo, blobInfo, uploadInfo, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            quality: 80,
                            destinationType: this.camera.DestinationType.FILE_URI,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.PICTURE
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 2:
                        cameraInfo = _a.sent();
                        return [4 /*yield*/, this.makeFileIntoBlob(cameraInfo)];
                    case 3:
                        blobInfo = _a.sent();
                        return [4 /*yield*/, this.uploadToFirebase(blobInfo)];
                    case 4:
                        uploadInfo = _a.sent();
                        alert("File Upload Success " + uploadInfo.fileName);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log(e_1.message);
                        alert("File Upload Error " + e_1.message);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // FILE STUFF
    CreateEventPage.prototype.makeFileIntoBlob = function (_imagePath) {
        var _this = this;
        // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
        return new Promise(function (resolve, reject) {
            var fileName = "";
            _this.file
                .resolveLocalFilesystemUrl(_imagePath)
                .then(function (fileEntry) {
                var name = fileEntry.name, nativeURL = fileEntry.nativeURL;
                // get the path..
                var path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
                console.log("path", path);
                console.log("fileName", name);
                fileName = name;
                // we are provided the name, so now read the file into
                // a buffer
                return _this.file.readAsArrayBuffer(path, name);
            })
                .then(function (buffer) {
                // get the buffer and make a blob to be saved
                var imgBlob = new Blob([buffer], {
                    type: "image/jpeg"
                });
                console.log(imgBlob.type, imgBlob.size);
                resolve({
                    fileName: fileName,
                    imgBlob: imgBlob
                });
            })
                .catch(function (e) { return reject(e); });
        });
    };
    /**
     *
     * @param _imageBlobInfo
     */
    CreateEventPage.prototype.uploadToFirebase = function (_imageBlobInfo) {
        console.log("uploadToFirebase");
        return new Promise(function (resolve, reject) {
            var fileRef = firebase.storage().ref("images/" + _imageBlobInfo.fileName);
            var uploadTask = fileRef.put(_imageBlobInfo.imgBlob);
            uploadTask.on("state_changed", function (_snapshot) {
                console.log("snapshot progess " +
                    (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100);
            }, function (_error) {
                console.log(_error);
                reject(_error);
            }, function () {
                // completion...
                resolve(uploadTask.snapshot);
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('myInput'),
        tslib_1.__metadata("design:type", ElementRef)
    ], CreateEventPage.prototype, "myInput", void 0);
    CreateEventPage = tslib_1.__decorate([
        Component({
            selector: 'app-create-event',
            templateUrl: './create-event.page.html',
            styleUrls: ['./create-event.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController, Camera, File, AngularFireAuth, AngularFirestore, FormBuilder, Router, ToastController, FirebaseDatabaseService])
    ], CreateEventPage);
    return CreateEventPage;
}());
export { CreateEventPage };
//# sourceMappingURL=create-event.page.js.map