import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase/app';

const config = {
  apiKey: "AIzaSyCCAHKPN1Te8LRnd06yj_GlCfjENXC_rjA",
  authDomain: "wesevents-6dbd3.firebaseapp.com",
  databaseURL: "https://wesevents-6dbd3.firebaseio.com",
  projectId: "wesevents-6dbd3",
  storageBucket: "",
  messagingSenderId: "804138425790",
  appId: "1:804138425790:web:3347e85b6099c42d"
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
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
    });
    firebase.initializeApp(config);

  }

}
