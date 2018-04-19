import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, PopoverController, ToastController } from 'ionic-angular';
import { VagasService } from '../../domain/vagas/vagas-service';
import { Vagas } from '../../domain/vagas/vagas';
import { Profissional } from '../../domain/profissional/profissional';
import { ProfissionalService } from '../../domain/profissional/profissional-service';
import { MenuPage } from '../menu/menu';
import { NotificacoesPage } from '../notificacoes/notificacoes';
import { NotificacoesAtalhoPage } from '../notificacoes-atalho/notificacoes-atalho';
import { ServicosProvider } from '../../providers/servicos/servicos';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
  providers:[VagasService,ProfissionalService]
})
export class VagasPage implements OnInit{
   public listaVagas =[];
   public mostrarDetalhe: boolean = false;
   public vaga:  Vagas;
   public loader;
   public naoCurtir;
   public profissional: Profissional;
   public profissionalLogado: Profissional;

   public vaga_vazia = [{
    ds_titulo: "TJ Borges",
    dt_criacao:"2018/03/29",
    ds_observacao:"Criando um App",
    ds_beneficios:"ndojkds",
    empresa: {
      ds_nome_fantasia:"nomeFantasia"},
    ds_competencia_tecnica:"Vistos Agora",
    ds_competencia_comport:null,
    ds_idioma: null
   }]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams ,
    public vagaService: VagasService,
    public loadingCtrl: LoadingController,
    private toast: ToastController,
    public alertCtrl: AlertController,
    public session: ConfigProvider,
    public popoverCtrl: PopoverController
    )
  { }


  //assim que o component existir capture a sseão do usuário
ngOnInit() {
  this.session.get()
      .then(res => {
          this.profissionalLogado = new Profissional(res);
          console.log('usuário logado ngOnInit  >>> ',this.profissionalLogado);
      });
         
      console.log(this.session.exist());

      // this.session.remove();

      // this.session.get()
      // .then(res => {
      //     this.profissionalLogado = new Profissional(res);
      //     console.log('USUARIO LOGADO  >>> ',this.profissionalLogado);
      // });

      // console.log(this.session.exist());
}


  /**
   * Carrega a View TODA vez que ela é chamada.
   */ 
  ionViewDidEnter(){
    this.session.get()
    .then(res => {
        this.profissionalLogado = new Profissional(res);
        console.log('usuário logado ionViewDidEnter  >>> ',this.profissionalLogado);
    });
    console.log(this.session.exist());
    console.log(this.profissionalLogado);
    this.abreCarregando();
    this.carregaVaga();
  }

  /**
   *Carrega uma vaga no listaVagas
   */
  carregaVaga(){
    this.vagaService.getVagas(1).subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.listaVagas = objeto.sucess;
      this.fechaCarregando();

        console.log(this.listaVagas);
    },error =>{
      console.log(error);
      this.fechaCarregando();
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
    }
  /**
   * Animação de carregamento da vaga na tela;
   */ 
  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Vaga..."
    });
    this.loader.present();
  }
  fechaCarregando(){
    this.loader.dismiss();
  }

  /**
   * Alert de aviso para o Usuário.
   */
  alertaCurtida(ds_titulo) {
    let alert = this.alertCtrl.create({
      title: 'Parabéns!',
      subTitle: 'Você está concorrendo a vaga de: '+ds_titulo,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.setRoot(MenuPage);
       } }]
    });
    alert.present();
  }

  /**
   * Alert para Dislike
   */ 
  alertaNaoCurtida(cd_vaga, ds_titulo) {
    this.naoCurtir = this.alertCtrl.create({
      title: 'Você deseja mesmo Ignorar esta vaga?',
      message: 'Esta pode ser sua grande Chance!',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Ignorar clicado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.vagaNaoCurtida(cd_vaga, ds_titulo);
            this.confirmarNaoCurtida();
            console.log('Confirmar clicado');
          }
        }
      ]
    });
    this.naoCurtir.present();
  }

  /**
   * Alert de aviso para o Usuário.
   */
  confirmarNaoCurtida() {
    let alert = this.alertCtrl.create({
      title: 'OK',
      subTitle: 'Esta vaga não será mostrada novamente',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.setRoot(MenuPage);
       } }]
    });
    alert.present();
    }
  
   /**
    * Altera a vizualização do Detalhamento da Vaga Exibindo/Ocultando as informações. 
    */  
    detalharvaga(){
      if (this.mostrarDetalhe) 
        this.mostrarDetalhe =false;
      else
      this.mostrarDetalhe = true;
    }

    /*
     * Envia a requisição para a API com os parâmetros.
     * chama o alert informando o usuário que está concorrendo a vaga.
     */
    vagaCurtida(cd_vaga, ds_titulo){
      console.log(cd_vaga);
      this.vagaService.vagaSelecionada("Like",cd_vaga,1);
      this.alertaCurtida(ds_titulo);
      console.log("Curtida");
    }

    /*
     * Método chamado pelo alertaNaoCurtida(...) disparado quando o 
     * botão de 'Confirmar' é selecionado.
     * Envia a requisição para a API com os parâmetros.
     */
    vagaNaoCurtida(cd_vaga, ds_titulo){
      console.log(cd_vaga);
      this.vagaService.vagaSelecionada("Dislike",cd_vaga,1);
      console.log("Não Curtida");
    }
     /**
      * Chama tela de notificações 
      */
     notificacoesPage(){
       this.navCtrl.push(NotificacoesPage);
     }
     /**
      * Chama notificações Atalho 
      * @param myEvent 
      */
     notificacoesAtalho(myEvent) {
      console.log(myEvent);
      let popover = this.popoverCtrl.create(NotificacoesAtalhoPage);
      popover.present({
        ev: myEvent
      });
    }
}
