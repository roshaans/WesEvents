import { Injectable } from '@angular/core';
 import  * as firebase from 'firebase/app';

// import 'firebase/database'
// import 'firebase/firestore'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Event} from '../../Models/Event'
import { ObjectToUniqueKey } from '@firebase/database/dist/src/core/util/util';
import {map, take} from 'rxjs/operators'
import { identifierName } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
  
})

export class FirebaseDatabaseService {
  
  eventsCollection: AngularFirestoreCollection<Event>;
   events: Observable<Event[]>;




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
   }))
  }


  eventCollectionRef = this.fStore.collection('events');

  getEvents() {

   
  }

createEvent(event: Event, user_uid: string) {
    var userRef = this.fStore.collection("users").doc(user_uid)

   this.eventCollectionRef.add(event)
    .then(function(docref) {
        // var id = docref.id
    console.log("Event was successfully created!");
    userRef.update({
    createdEvents: firebase.firestore.FieldValue.arrayUnion(docref.id)
    })

 
})
    .catch(function(error) {
    console.log("Error Creating Event: ", error);
});




    
}

editEvent(event: Event, eventID: string) {

   this.eventCollectionRef.doc(eventID).update(event )
    .then(function(docref) {
    console.log("Event was successfully updated!");
   
    
   

})
    .catch(function(error) {
    console.log("Error Editing Event: ", error);
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



deleteEvent(event: string, user_uid: string) {
    var eventRef = this.fStore.collection("events").doc(event)
    this.deleteEventCreatedFromArray(event, user_uid).then(() => {

        return eventRef.delete()

    })



}
deleteEventCreatedFromArray(event: string, user_uid: string) {
    var userRef = this.fStore.collection("users").doc(user_uid)
    return userRef.update({
        createdEvents: firebase.firestore.FieldValue.arrayRemove(event)
    })
}


deleteEventFromArray(event: string, user_uid: string) {
    var userRef = this.fStore.collection("users").doc(user_uid)
    return userRef.update({
        savedEvents: firebase.firestore.FieldValue.arrayRemove(event)
    })
}
updateEvent(id: string, updates: Event) {
 
  var ref = this.eventCollectionRef.doc(id).update(
    updates

  )
}

saveEvent(id: string, user_uid: string) {
    var userRef = this.fStore.collection("users").doc(user_uid)


    userRef.update({
        savedEvents: firebase.firestore.FieldValue.arrayUnion(id)
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