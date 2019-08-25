import * as tslib_1 from "tslib";
import { Tab1Page } from './maintabs/browseEvents/tab1.page';
import { FirebaseDatabaseService } from './services/firebaseDatabase/firebase-database.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeysPipe } from './key.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Autosize } from './autosize';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
// import { PopoverComponent } from './popover/popover.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent, KeysPipe, Autosize],
            entryComponents: [],
            imports: [
                ReactiveFormsModule,
                FormsModule, AngularFireModule.initializeApp(environment), AngularFireAuthModule,
                AngularFirestoreModule, AngularFireDatabaseModule,
                BrowserModule, IonicModule.forRoot(), AppRoutingModule
            ],
            providers: [AngularFireAuth, FirebaseAuthentication, FirebaseDatabaseService,
                File,
                Camera, StatusBar,
                SplashScreen,
                Tab1Page,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                { provide: FirestoreSettingsToken, useValue: {} }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map