import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { Profissional } from '../../providers/profissional/profissional';

@IonicPage()
@Component({
  selector: 'page-notificacoes-detalhes',
  templateUrl: 'notificacoes-detalhes.html',
})
export class NotificacoesDetalhesPage {
  
  public profissionalLogado: Profissional;
  public cd_profissional:number;
  public cd_vaga:number;
  public refresher;
  public isRefreshing: boolean = false;
  public notificacaoDetalhe = [];
  public loader;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public session: ConfigProvider,
    public notificacoes: ServicosProvider,
    private toast: ToastController,
    public loadingCtrl: LoadingController) 
    {      
    this.cd_vaga = this.navParams.get("cd_vaga");
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
    this.cd_vaga = this.navParams.get("cd_vaga");
    this.abreCarregando();
    this.carregaNotificacoesDetalhes();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    setTimeout(() => {
      refresher.complete();
    }, 2000);
    this.carregaNotificacoesDetalhes();
  }

  carregaNotificacoesDetalhes(){
    this.notificacoes.getNotificacoesDetalhes(this.cd_vaga,this.cd_profissional).subscribe(data =>{
      const response = (data as any)
      const objeto = JSON.parse(response._body)
      this.notificacaoDetalhe = objeto.sucess;  
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
      content: "Carregando Detalhes..."
    });
    this.loader.present();
  }
  fechaCarregando(){
    this.loader.dismiss();
  }
}
