import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
   public vaga:  Vagas;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams ,
    public vagaService: VagasService,
    private profissionalservice: ProfissionalService
        )
  {}

  ionViewDidLoad(){
    this.vagaService.getVagas().subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.listaVagas = objeto.sucess;
     console.log(this.listaVagas);
    },error =>{
      console.log(error);
      }
     )
    }
   
    detalharvaga(){
      if (this.mostrarDetalhe) 
        this.mostrarDetalhe =false;
      else
      this.mostrarDetalhe = true;
    }

    vagaCurtida(){
      this.vagaService.vagaSelecionada("Like",1,1);
      this.navCtrl.setRoot(VagasPage);
      console.log("Curtida");
    }

    vagaNaoCurtida(){
      this.vagaService.vagaSelecionada("Dislike",1,1);
      console.log("Não Curtida");
    }

     get profissional(): Profissional{
      return this.profissionalservice.isLogado();
     }

}
