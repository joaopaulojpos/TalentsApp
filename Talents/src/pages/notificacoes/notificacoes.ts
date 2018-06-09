import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { ConfigProvider } from '../../providers/config/config';
import { Profissional } from '../../providers/profissional/profissional';
import { NotificacoesDetalhesPage } from '../notificacoes-detalhes/notificacoes-detalhes';

@IonicPage()
@Component({
  selector: 'page-notificacoes',
  templateUrl: 'notificacoes.html',
})
export class NotificacoesPage {

  public profissionalLogado: Profissional;
  public cd_profissional:number;
  public refresher;
  public isRefreshing: boolean = false;
  public notificacoesList = [];
  public loader;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public session: ConfigProvider,
    public notificacoes: ServicosProvider,
    private toast: ToastController,
    public loadingCtrl: LoadingController) {
  }

  async getSession() {
    await this.session.get()
        .then(res => {
            this.profissionalLogado = (res);
            this.cd_profissional = this.profissionalLogado[0].cd_profissional;
        });
           
        console.log(this.session.exist());
  }



 async ionViewDidEnter() {
    await this.getSession();
    this.abreCarregando();
    this.carregaNotificacoes(this.cd_profissional);
    console.log(this.cd_profissional);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    setTimeout(() => {
      refresher.complete();
    }, 2000);
    this.carregaNotificacoes(this.cd_profissional);
  }

  carregaNotificacoes(cd_profissional){
    this.notificacoes.getNotificacoes(cd_profissional).subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      console.log(objeto);
      this.notificacoesList = objeto.sucess;
      this.fechaCarregando();
      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;
      }
    },error =>{
        console.log(error);
        this.fechaCarregando();
        this.isRefreshing = false;
        this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
        }
      )
    }


  //Animação de carregamento de notificações na tela;
  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Notificações..."
    });
    this.loader.present();
  }
  fechaCarregando(){
    this.loader.dismiss();
  }

  abrirNotificacaoDetalhes(notificacao){
    console.log("cdvaga Not: ",notificacao);
    this.navCtrl.push(NotificacoesDetalhesPage, {cd_vaga: notificacao.cd_vaga});
  
  }

}
