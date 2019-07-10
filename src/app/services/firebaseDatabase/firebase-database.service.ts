import { Injectable } from '@angular/core';
import  * as firebase from 'firebase/app';

import 'firebase/database'

@Injectable({
  providedIn: 'root'
  
})


export class FirebaseDatabaseService {
  ref = firebase.database().ref('infos/');
  
  cardsEntries = [] //entries with 
  
  


  constructor() {
    this.ref.on('value', resp => {
      eventCardsArray = snapshotToArray(resp);
      var eventCardsArray = [] 
      
      this.cardsEntries = Object.entries(eventCardsArray)
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