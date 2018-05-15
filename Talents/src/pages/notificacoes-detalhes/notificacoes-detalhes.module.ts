import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificacoesDetalhesPage } from './notificacoes-detalhes';

@NgModule({
  declarations: [
    NotificacoesDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificacoesDetalhesPage),
  ],
})
export class NotificacoesDetalhesPageModule {}
