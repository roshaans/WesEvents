import { FirebaseDatabaseService } from './services/firebaseDatabase/firebase-database.service';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule, FirebaseAuth } from '@angular/fire';
import { environment } from '../environments/environment';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeysPipe } from './key.pipe';
import { ReactiveFormsModule }from '@angular/forms';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFirestoreModule } from 'angularfire2/firestore';

var config =  {
  apiKey: "AIzaSyBdRrjJcBxlJF252l1pyhVqg55lWCkWIIk",
  authDomain: "weseventsdatabase.firebaseapp.com",
  databaseURL: "https://weseventsdatabase.firebaseio.com",
  projectId: "weseventsdatabase",
  storageBucket: "weseventsdatabase.appspot.com",
  messagingSenderId: "521874676930",
  appId: "1:521874676930:web:263d6de232e8e798"
  }
@NgModule({
  declarations: [AppComponent, KeysPipe],
  entryComponents: [],
  imports: [ 
    ReactiveFormsModule,  
    FormsModule, AngularFireModule.initializeApp(config),
    AngularFirestoreModule, AngularFireDatabaseModule,
BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [FirebaseAuthentication,FirebaseDatabaseService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
