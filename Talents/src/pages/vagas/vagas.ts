import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagasService } from '../../domain/vagas/vagas-service';
@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
  providers:[VagasService]
})
export class VagasPage {
   public listaVagas = new Array<any>();
   public mostrarDetalhe: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams ,
    public vagaService: VagasService 
        )
  {}

  ionViewDidLoad(){
    this.vagaService.getVagas().subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.listaVagas = objeto.sucess;
     console.log(objeto);
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

}
