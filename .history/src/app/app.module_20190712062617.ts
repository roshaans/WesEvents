import { FirebaseDatabaseService } from './services/firebaseDatabase/firebase-database.service';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { environment } from '../environments/environment';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeysPipe } from './key.pipe';
import { ReactiveFormsModule }from '@angular/forms';

// import { FirestoreSettingsToken } from '@angular/fire/firestore';
// import { AngularFireModule, FirebaseAuth } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFirestoreModule } from 'angularfire2/firestore';

import {AngularFireModule} from '@angular/fire'
import {AngularFireAuthModule} from '@angular/fire/auth'
@NgModule({
  declarations: [AppComponent, KeysPipe],
  entryComponents: [],
  imports: [ 
    ReactiveFormsModule,  
    FormsModule,     AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, AngularFireAuthModule,
BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [,FirebaseDatabaseService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
