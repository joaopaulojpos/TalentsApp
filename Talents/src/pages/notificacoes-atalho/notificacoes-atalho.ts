import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { NotificacoesPage } from '../notificacoes/notificacoes';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { ConfigProvider } from '../../providers/config/config';
import { Profissional } from '../../domain/profissional/profissional';

@IonicPage()
@Component({
  selector: 'page-notificacoes-atalho',
  templateUrl: 'notificacoes-atalho.html',
})
export class NotificacoesAtalhoPage {
  public notificacoesList = [];
  public profissionalLogado: Profissional;
  public cd_profissional:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public session: ConfigProvider,
              public viewCtrl: ViewController,
              public notificacoes: ServicosProvider
            ) {
  }

  async getSession() {
    await this.session.get()
        .then(res => {
            this.profissionalLogado = (res);
            this.cd_profissional = this.profissionalLogado[0].cd_profissional;
        });
           
        console.log(this.session.exist());
  }



  fechar() {
    this.navCtrl.push(NotificacoesPage);
    console.log("Clicado");
  }

  async ionViewDidEnter(){
    await this.getSession();
    this.carregaNotificacoes(this.cd_profissional);
  }

    /**
     * Retorna as notificações profissional API
     */
    carregaNotificacoes(cd_profissional){
      this.notificacoes.getNotificacoes(cd_profissional).subscribe(data =>{
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
