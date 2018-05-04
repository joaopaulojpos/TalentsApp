import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCompetenciasPage } from './listcompetencias';

@NgModule({
  declarations: [
    ListCompetenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListCompetenciasPage),
  ],
})
export class ListcompetenciasPageModule {}
