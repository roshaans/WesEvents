// import { FcmService } from './fcm.service';
import { MbscModule } from '@mobiscroll/angular';
import { Tab1Page } from './maintabs/browseEvents/tab1.page'
import { Ionic4DatepickerModule } from
    '@logisticinfotech/ionic4-datepicker';
import { FirebaseDatabaseService } from './services/firebaseDatabase/firebase-database.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule, FirebaseAuth } from '@angular/fire';
import { environment } from '../environments/environment';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {SharedModule} from './shared/shared.module'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component, OnInit, Input } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule }from '@angular/forms';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireAuth} from '@angular/fire/auth'
import {AngularFireAuthModule} from '@angular/fire/auth'
import {Autosize } from './autosize'
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ImageViewerComponent } from './../app/image-viewer/image-viewer.component'
import { ImagePicker} from '@ionic-native/image-picker/ngx'
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';


// import { PopoverComponent } from './popover/popover.component';
@NgModule({
  declarations: [AppComponent, Autosize,ImageViewerComponent],
  entryComponents: [ImageViewerComponent],
  imports: [ 
    SharedModule,
    HttpModule,
    MbscModule,   
    ReactiveFormsModule,  
    FormsModule, 
    
    AngularFireModule.initializeApp(environment)
    ,AngularFireAuthModule, 
    AngularFirestoreModule, AngularFireDatabaseModule,
    IonicStorageModule.forRoot() // <-- here
,
BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [AngularFireAuth, FirebaseAuthentication,FirebaseDatabaseService,
    File,
    Calendar,
    Ionic4DatepickerModule,
    SocialSharing,
    TapticEngine,
    
    ImagePicker,
    Camera, StatusBar,
    SplashScreen,
    Tab1Page,
    // FcmService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
