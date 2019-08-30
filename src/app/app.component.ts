import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';
import {timer} from 'rxjs/observable/timer'
const config = {
  apiKey: "AIzaSyAda2rGGrmtWjGtg3bYvGKOv-EsZnG_Cm0",
  
  authDomain: "wesleyaneventsapp.firebaseapp.com",
  databaseURL: "https://wesleyaneventsapp.firebaseio.com",
  projectId: "wesleyaneventsapp",
  storageBucket: "wesleyaneventsapp.appspot.com",
  messagingSenderId: "41400534112",
  appId: "1:41400534112:web:afbdc39393804002"
}



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html' })



export class AppComponent {

  showSplash = true;
  constructor(
    
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false)
    });
    firebase.initializeApp(config);

  }

}
