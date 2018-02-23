import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VagasPage } from './vagas';

@NgModule({
  declarations: [
    VagasPage,
  ],
  imports: [
    IonicPageModule.forChild(VagasPage),
  ],
})
export class VagasPageModule {}
