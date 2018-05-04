import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCargosPage } from './list-cargos';

@NgModule({
  declarations: [
    ListCargosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCargosPage),
  ],
})
export class ListCargosPageModule {}
