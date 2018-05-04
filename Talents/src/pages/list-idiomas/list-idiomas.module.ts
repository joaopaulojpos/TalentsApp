import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListIdiomasPage } from './list-idiomas';

@NgModule({
  declarations: [
    ListIdiomasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListIdiomasPage),
  ],
})
export class ListIdiomasPageModule {}
