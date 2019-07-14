import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor(public fAuth:AngularFireAuth) { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.fAuth.auth.signInWithEmailAndPassword(email, password);
  }
  resetPassword(email:string): Promise<void> {
    return this.fAuth.auth.sendPasswordResetEmail(email);
  }
  logoutUser():Promise<void> {
  return this.fAuth.auth.signOut();
}
  signupUser(email: string, password: string): Promise<any> {
    return this.fAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        // firebase
        //   .firestore()
        //   .doc(`/userProfile/${newUserCredential.user.uid}`)
        //   .set({ email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }
  
}
