import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
var FirebaseDatabaseService = /** @class */ (function () {
    function FirebaseDatabaseService(fStore) {
        this.fStore = fStore;
        this.eventCollectionRef = this.fStore.collection('events');
        this.eventsCollection = fStore.collection('events');
        this.events = this.eventsCollection.snapshotChanges()
            .pipe(map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return tslib_1.__assign({ id: id }, data);
            });
        }));
    }
    FirebaseDatabaseService.prototype.createEvent = function (event, user_uid) {
        var userRef = this.fStore.collection("users").doc(user_uid);
        this.eventCollectionRef.add(event)
            .then(function (docref) {
            console.log("Event was successfully created!");
            userRef.update({
                createdEvents: firebase.firestore.FieldValue.arrayUnion(docref.id)
            });
        })
            .catch(function (error) {
            console.log("Error Creating Event: ", error);
        });
    };
    FirebaseDatabaseService.prototype.getEvent = function (id) {
        return this.eventsCollection.doc(id).valueChanges().pipe(take(1), map(function (event) {
            if (event) {
                event.event_id = id;
                return event;
            }
        }));
    };
    FirebaseDatabaseService.prototype.getEventIDs = function () {
        var newCol = this.fStore.collection('events').ref.limit(10).get();
        console.log(newCol, "newCol");
        return newCol;
    };
    FirebaseDatabaseService.prototype.editEvent = function (event, eventID) {
        this.eventCollectionRef.doc(eventID).update(event)
            .then(function (docref) {
            console.log("Event was successfully updated!");
        })
            .catch(function (error) {
            console.log("Error Editing Event: ", error);
        });
        this.eventCollectionRef.doc(eventID).update({ lastUpdated: firebase.firestore.FieldValue.serverTimestamp() });
    };
    FirebaseDatabaseService.prototype.deleteEvent = function (event, user_uid) {
        var eventRef = this.fStore.collection("events").doc(event);
        this.deleteEventCreatedByArray(event, user_uid).then(function () {
            eventRef.update({
                eventDeleted: true
            });
        });
    };
    FirebaseDatabaseService.prototype.deleteGoing = function (event, user_uid) {
        var eventRef = this.eventCollectionRef.doc(event);
        return eventRef.update({
            event_goingCounter: firebase.firestore.FieldValue.arrayRemove(user_uid)
        });
    };
    FirebaseDatabaseService.prototype.deleteEventCreatedByArray = function (event, user_uid) {
        var userRef = this.fStore.collection("users").doc(user_uid);
        return userRef.update({
            createdEvents: firebase.firestore.FieldValue.arrayRemove(event)
        });
    };
    FirebaseDatabaseService.prototype.deleteEventFromSavedEvents = function (event, user_uid) {
        var userRef = this.fStore.collection("users").doc(user_uid);
        return userRef.update({
            savedEvents: firebase.firestore.FieldValue.arrayRemove(event)
        });
    };
    FirebaseDatabaseService.prototype.saveEvent = function (id, user_uid) {
        var userRef = this.fStore.collection("users").doc(user_uid);
        userRef.update({
            savedEvents: firebase.firestore.FieldValue.arrayUnion(id)
        });
        this.eventCollectionRef.doc(id).update({
            event_goingCounter: firebase.firestore.FieldValue.arrayUnion(user_uid)
        })
            .then(function (docref) {
            console.log("Marked as Going!");
        })
            .catch(function (error) {
            console.log("Error Creating Event: ", error);
        });
    };
    FirebaseDatabaseService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], FirebaseDatabaseService);
    return FirebaseDatabaseService;
}());
export { FirebaseDatabaseService };
//# sourceMappingURL=firebase-database.service.js.map