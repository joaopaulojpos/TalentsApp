import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CargoPage } from './cargo';

@NgModule({
  declarations: [
    CargoPage,
  ],
  imports: [
    IonicPageModule.forChild(CargoPage),
  ],
})
export class CargoPageModule {}
