import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdiomaPage } from './idioma';

@NgModule({
  declarations: [
    IdiomaPage,
  ],
  imports: [
    IonicPageModule.forChild(IdiomaPage),
  ],
})
export class IdiomaPageModule {}
