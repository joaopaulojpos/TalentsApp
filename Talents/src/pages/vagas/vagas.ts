import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { VagasService } from '../../domain/vagas/vagas-service';
import { Vagas } from '../../domain/vagas/vagas';
import { Profissional } from '../../domain/profissional/profissional';
import { ProfissionalService } from '../../domain/profissional/profissional-service';

@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
  providers:[VagasService,ProfissionalService]
})
export class VagasPage {
   public listaVagas = new Array<any>();
   public mostrarDetalhe: boolean = false;
   proxVaga: boolean = true;
   public vaga:  Vagas;
   public loader;
   public naoCurtir;

   /*public vaga_vazia = {[
    ds_titulo:"TJ Borges",
    dt_criacao:"Sábado, 17 de Fevereiro de 2018",
    ds_observacao:"Criando um App",
    ds_beneficios:12,
    ds_nome_fantasia:12,
    ds_competencia_tecnica:"Vistos Agora",
    ds_competencia_comport:null,
    ds_idioma: null
   ]}*/

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams ,
    public vagaService: VagasService,
    private profissionalservice: ProfissionalService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
        )
  {}

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Vaga...",
      duration: 3000
    });
    this.loader.present();
  }
  fechaCarregando(){
    this.loader.dismiss();
  }

  confirmarNaoCurtida() {
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
            this.vagaNaoCurtida();
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
      if (objeto != null){
        this.listaVagas = objeto.sucess;
        this.fechaCarregando();
      }else{
      }
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
      this.vagaService.vagaSelecionada("Like",1,1);
      this.navCtrl.setRoot(VagasPage);
      this.proxVaga =false;
      console.log("Curtida");
    }

    vagaNaoCurtida(){
      this.vagaService.vagaSelecionada("Dislike",1,1);
      this.navCtrl.setRoot(VagasPage);
      this.proxVaga =false;
      console.log("Não Curtida");
    }

     get profissional(): Profissional{
      return this.profissionalservice.isLogado();
     }

}
