import { card } from './../../Models/cardDetail';
import { Injectable } from '@angular/core';
 import  * as firebase from 'firebase/app';

// import 'firebase/database'
// import 'firebase/firestore'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Event {
  event_title: String, 
  event_location?: String,  
  event_students?: String, 
  event_category?: String, 
  event_date?: String, 
  
  event_startTime?: String, 
  event_endTime?: String, 
  event_description?: String, 
  event_pictureURL?: String, 
  event_chatNumber?: Number, 
  event_goingCounter?: Number, 
  event_maybeGoingCounter?: Number, 
  event_creation_timeStamp?: Date,
  event_id?: Number, 
  lastUpdate?: Number,

}


@Injectable({
  providedIn: 'root'
  
})

export class FirebaseDatabaseService {
  
  eventsCollection: AngularFirestoreCollection<Event>;
  events: Observable<Event[]>
  public event: Event;


   eventIDArray = [] //entries with 

   eventsDataDict = new Map();

  constructor(public fStore: AngularFirestore) {
this.events = this.fStore.collection('events').valueChanges()
  }
  eventCollectionRef = this.fStore.collection('events');

createEvent(event: Event) {
   this.eventCollectionRef
  .add({

  event_title: event.event_title, 
  event_location: event.event_location,  
  event_students: event.event_students, 
  event_category: event.event_category, 
  event_date: event.event_date, 
  event_startTime: event.event_startTime, 
  event_endTime: event.event_endTime, 
  event_description: event.event_description, 
  event_pictureURL: event.event_pictureURL, 
  event_chatNumber: event.event_chatNumber, 
  event_goingCounter: event.event_goingCounter, 
  event_maybeGoingCounter: event.event_maybeGoingCounter, 
   event_creation_timeStamp: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(function() {
    console.log("Event was successfully created!");
})
    .catch(function(error) {
    console.log("Error Creating Event: ", error);
});

    
}

readEvent(event_id:string) {

  this.eventCollectionRef.doc(event_id).ref.get()
  .then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data()
    } else {
        console.log("No such document:" + event_id);
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}

getEventIDs() {
  this.eventsDataDict.set("hello", "hi")
  console.log(this.eventsDataDict.size, "size" )

this.eventCollectionRef.ref
    .get()
    .then(function(querySnapshot) {
      // console.log(querySnapshot, "querySnapshotPRINT")
      querySnapshot.forEach(function(doc) {
       

         console.log(doc.id, " => ", doc.data());
         this.eventIDArray.push(doc.id)
          //  this.eventsDataDict.set(doc.id, "hello")
//         console.log(this.eventsDataDict.size)
//         let keys = Array.from(this.eventsDataDict.keys());
// console.log(keys)
        //   this.eventsDataDict.forEach((value, key: string) => {
        //     console.log(key, value);
        // });          // console.log(this.eventsDataDict.keys())


      })
    }
    )
  
            //  console.log(this.eventsDataDict.)
}




deleteEvent(event_id: string) {
this.eventCollectionRef.doc(event_id).delete();

}
updateEvent(event_id: string, updates: Event) {
 
  var ref = this.eventCollectionRef.doc(event_id).update({
    event_title: this.event.event_title, 
    event_id: this.event.event_id, 
    event_location: this.event.event_location,  
    event_students: this.event.event_students, 
    event_category: this.event.event_category, 
    event_date: this.event.event_date, 
    event_startTime: this.event.event_startTime, 
    event_endTime: this.event.event_endTime, 
    event_description: this.event.event_description, 
    event_pictureURL: this.event.event_pictureURL, 
    event_chatNumber: this.event.event_chatNumber, 
    event_goingCounter: this.event.event_goingCounter, 
    event_maybeGoingCounter: this.event.event_maybeGoingCounter, 
    event_creation_timeStamp: this.event.event_creation_timeStamp,
     lastUpdate: firebase.firestore.FieldValue.serverTimestamp()

  })
}
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();



    


      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
}