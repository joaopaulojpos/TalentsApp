import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCursosPage } from './listcursos';

@NgModule({
  declarations: [
    ListCursosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCursosPage),
  ],
})
export class ListcursosPageModule {}
