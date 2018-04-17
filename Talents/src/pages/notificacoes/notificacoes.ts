import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServicosProvider } from '../../providers/servicos/servicos';

@IonicPage()
@Component({
  selector: 'page-notificacoes',
  templateUrl: 'notificacoes.html',
})
export class NotificacoesPage {

  public refresher;
  public isRefreshing: boolean = false;
  public notificacoesList = [];

  public loader;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notificacoes: ServicosProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.carregaNotificacoes();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregaNotificacoes();
  }

  carregaNotificacoes(){
    this.notificacoes.getNotificacoes(1).subscribe(data =>{
      this.abreCarregando();
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      console.log(objeto);
      this.notificacoesList = objeto.sucess;
      this.fechaCarregando();
      if(this.isRefreshing){
        this.refresher.complete();
        this.isRefreshing = false;
      }error =>{
        console.log(error);
        this.fechaCarregando();
        this.refresher.complete();
        this.isRefreshing = false;
        }
    })
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

  abrirNotificacao(){
  
  }

}
