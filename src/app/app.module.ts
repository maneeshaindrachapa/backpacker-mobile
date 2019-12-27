import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {UserService} from './services/user.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {OpenNativeSettings} from '@ionic-native/open-native-settings/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { File } from '@ionic-native/file/ngx';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {UtilitiesService} from './services/utilities.service';
import {SensorsService} from './services/sensors.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { Sensors } from '@ionic-native/sensors/ngx';
import { DBMeter } from '@ionic-native/db-meter/ngx';
import {GoogleMaps, GoogleMap } from '@ionic-native/google-maps/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      UserService,
    OpenNativeSettings,
    Network,
      Camera,
      File,
      CameraPreview,
    UtilitiesService,
      SensorsService,
      Geolocation,
      Sensors,
      DBMeter,
      GoogleMaps,
      GoogleMaps
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
