import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { NotificacoesPage } from '../notificacoes/notificacoes';
import { ServicosProvider } from '../../providers/servicos/servicos';

@IonicPage()
@Component({
  selector: 'page-notificacoes-atalho',
  templateUrl: 'notificacoes-atalho.html',
})
export class NotificacoesAtalhoPage {
  public notificacoesList = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public notificacoes: ServicosProvider
            ) {
  }
  fechar() {
    this.navCtrl.push(NotificacoesPage);
    console.log("Clicado");
  }

  ionViewDidEnter(){
    this.carregaNotificacoes();
  }

    /**
     * Retorna as notificações profissional API
     */
    carregaNotificacoes(){
      this.notificacoes.getNotificacoes(1).subscribe(data =>{
        const response = (data as any);
        const objeto = JSON.parse(response._body);
        this.notificacoesList = objeto;
        console.log(this.notificacoesList.valueOf);
        console.log(data);
        },error =>{
          console.log(error);
       }
      )
    }

}
