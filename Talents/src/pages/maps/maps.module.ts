import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { MapsPage } from './maps';

@NgModule({
  declarations: [
    MapsPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsPage),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB8rlkYvUU6FrObUQbsttNDF94uOeuGBCI",
      libraries: ["places"]
  })
  ],
})
export class MapsPageModule {}
