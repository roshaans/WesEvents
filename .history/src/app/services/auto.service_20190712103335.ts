import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/firestore'
@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor() { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
   console.log(firebase.app().options)
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  logoutUser():Promise<void> {
  return firebase.auth().signOut();
}
  signupUser(email: string, password: string): Promise<any> {
    console.log(firebase.app().options)

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }
  
}
