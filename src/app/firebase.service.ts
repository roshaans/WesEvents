import { Card } from './firebase.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestoreCollection, AngularFirestore,DocumentReference } from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators'


export interface Card {
    id?: string,
    name: string,
   location : string
  //  ,
    // who : string ,
    // category : string,
    // date : string, 
    // time : string ,
    // description : string ,
    // pictureURL? : string ,
    // chatNumber? : number ,
    // goingCounter? : number ,
    // maybeGoingCounter? : number
  
  
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private cards: Observable<Card[]>;
private cardCollection: AngularFirestoreCollection<Card>;

  constructor(private afs: AngularFirestore) { 
    this.cardCollection = this.afs.collection<Card>("events");
    this.cards = this.cardCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a=> {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })
  );
  }


  getCards(): Observable<Card[]> {
    return this.cards;
  }

  getCard(id: string): Observable<Card> {
    return this.cardCollection.doc<Card>(id).valueChanges().pipe(
      take(1),
      map(card => {
        card.id = id;
        return card
      })
    );
  }
  addCard(card: Card): Promise<DocumentReference> {
    return this.cardCollection.add(card);
  }
 
  updateCard(card: Card): Promise<void> {
    return this.cardCollection.doc(card.id).update({ name: card.name });
  }
 
  deleteCard(id: string): Promise<void> {
    return this.cardCollection.doc(id).delete();
  }
}
