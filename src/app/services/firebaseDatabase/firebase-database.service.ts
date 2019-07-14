import { Injectable } from '@angular/core';
 import  * as firebase from 'firebase/app';

// import 'firebase/database'
// import 'firebase/firestore'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Event} from '../../Models/Event'
import { ObjectToUniqueKey } from '@firebase/database/dist/src/core/util/util';
import {map, take} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
  
})

export class FirebaseDatabaseService {
  
  eventsCollection: AngularFirestoreCollection<Event>;
   events: Observable<Event[]>;
  // public event: Event;


   eventIDArray = [] //entries with 

eventsDataDict = new Map();

  constructor(public fStore: AngularFirestore) {
      this.eventsCollection = fStore.collection<Event>('events')
    

this.events = this.eventsCollection.snapshotChanges()
.pipe(
        map(actions => { 
        return actions.map( a => { 
            let data = a.payload.doc.data(); 
            let id = a.payload.doc.id; 
            return {id, ...data }; 
      });
   }) )
  }


  eventCollectionRef = this.fStore.collection('events');

  getEvents() {

   
  }
createEvent(event: Event) {
   this.eventCollectionRef.add(

   event
   
  )
    .then(function() {
    console.log("Event was successfully created!");
})
    .catch(function(error) {
    console.log("Error Creating Event: ", error);
});
    
}

getEvent(id:string) {

    return this.eventsCollection.doc<Event>(id).valueChanges().pipe(take(1), map(event => {

        return event

    }))


}


getEventIDs() {
    return this.events
  
}




deleteEvent(id: string) {
this.eventCollectionRef.doc(id).delete();

}
updateEvent(id: string, updates: Event) {
 
  var ref = this.eventCollectionRef.doc(id).update({
    // event_title: updates.event_title, 
    // event_id: updates.event_id, 
    // event_location: updates.event_location,  
    // event_students:updates.event_students, 
    // event_category: updates.event_category, 
    // event_date: updates.event_date, 
    // event_startTime: updates.event_startTime, 
    // event_endTime: updates.event_endTime, 
    // event_description: updates.event_description, 
    // event_pictureURL: updates.event_pictureURL, 
    // event_chatNumber: updates.event_chatNumber, 
    // event_goingCounter: updates.event_goingCounter, 
    // event_maybeGoingCounter: updates.event_maybeGoingCounter, 
    // event_creation_timeStamp: updates.event_creation_timeStamp,
    //  lastUpdate: firebase.firestore.FieldValue.serverTimestamp()

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