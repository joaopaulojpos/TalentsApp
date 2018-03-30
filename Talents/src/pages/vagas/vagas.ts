import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { VagasService } from '../../domain/vagas/vagas-service';
import { Vagas } from '../../domain/vagas/vagas';
import { Profissional } from '../../domain/profissional/profissional';
import { ProfissionalService } from '../../domain/profissional/profissional-service';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
  providers:[VagasService,ProfissionalService]
})
export class VagasPage {
   public listaVagas = new Array<any>();
   public mostrarDetalhe: boolean = false;
   //proxVaga: boolean = false;
   public vaga:  Vagas;
   public loader;
   public naoCurtir;

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
    private profissionalservice: ProfissionalService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
        )
  {}

  //Animação de carregamento na tela;
  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Vaga...",
      duration: 7000,
    });
    this.loader.present();
  }
  fechaCarregando(){
    this.loader.dismiss();
  }

  //Alert para Dislike
  confirmarNaoCurtida(cd_vaga) {
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
            this.vagaNaoCurtida(cd_vaga);
            console.log('Confirmar clicado');
          }
        }
      ]
    });
    this.naoCurtir.present();
  }

  ionViewDidEnter(){
    this.abreCarregando();
    this.vagaService.getVagas(1).subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      // if (objeto.length = 0){
      //   this.listaVagas = this.vaga_vazia;
      //   this.fechaCarregando();
      // }else{
        this.listaVagas = objeto.sucess;
        this.fechaCarregando();
      //}
     console.log(this.listaVagas);
    },error =>{
      console.log(error);
      this.fechaCarregando();
      }
     )
    }
   
    detalharvaga(){
      if (this.mostrarDetalhe) 
        this.mostrarDetalhe =false;
      else
      this.mostrarDetalhe = true;
    }

    vagaCurtida(cd_vaga){
      console.log(cd_vaga);
      this.vagaService.vagaSelecionada("Like",cd_vaga,1);
      this.navCtrl.setRoot(VagasPage);
      console.log("Curtida");
      //console.log(this.profissionalservice.isLogado()._cd_profissional);
    }

    vagaNaoCurtida(cd_vaga){
      console.log(cd_vaga);
      this.vagaService.vagaSelecionada("Dislike",cd_vaga,1);
      this.navCtrl.setRoot(VagasPage);
      console.log("Não Curtida");
      //console.log(this.profissionalservice.isLogado()._cd_profissional);
    }

     getprofissional(): Profissional{
      return this.profissionalservice.isLogado();
     }

}
