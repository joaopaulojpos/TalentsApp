import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CompetenciaService } from '../../providers/competencia/competencia-service';

@IonicPage()
@Component({
  selector: 'page-competencia',
  templateUrl: 'competencia.html',
})
export class CompetenciaPage {
  public competencias =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastController,
              public competenciaService: CompetenciaService) {
  }
  ionViewDidEnter(){
    this.carregaCompetencias();
  }   

  carregaCompetencias(){
    this.competenciaService.getCompetencias().subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.competencias = objeto.sucess;
        console.log(this.competencias);
    },error =>{
      console.log(error);
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
    }

}
