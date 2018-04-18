import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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
    private toast: ToastController,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    this.abreCarregando();
    this.carregaNotificacoes();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    setTimeout(() => {
      refresher.complete();
    }, 2000);
    this.carregaNotificacoes();
  }

  carregaNotificacoes(){
    this.notificacoes.getNotificacoes(2).subscribe(data =>{
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

  abrirNotificacao(){
  
  }

}
