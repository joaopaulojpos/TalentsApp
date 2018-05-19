import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
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
