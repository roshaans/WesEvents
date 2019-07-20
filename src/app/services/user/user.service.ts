import { Injectable, Pipe } from '@angular/core';
 import  * as firebase from 'firebase/app';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, ObservableLike } from 'rxjs';
import {Event} from '../../Models/Event'
import { ObjectToUniqueKey } from '@firebase/database/dist/src/core/util/util';
import {map, take} from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';
import { snapshotChanges } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  savedEventsCollection: AngularFirestoreDocument;
  savedEvents;
  user: any;

  constructor(private fireauth: AngularFireAuth, public fStore: AngularFirestore) { 

    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user; 
        this.savedEventsCollection = fStore.doc("users/"+user.uid)
        
        }

    })
        
      
    
}
getUsername(id: string): any {

   return this.fStore.collection("users").doc(id).snapshotChanges()
} 


  getSavedIds(): AngularFirestoreDocument {
    return  this.savedEventsCollection
    
  
  }



  }