import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CompetenciaPage } from '../competencia/competencia';

@IonicPage()
@Component({
  selector: 'page-listcompetencias',
  templateUrl: 'listcompetencias.html',
})
export class ListCompetenciasPage {
  competencias: any = [];
 
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  adicionar(){
    this.navCtrl.push(CompetenciaPage);
  }

  editar(idioma){

  }

  deletar(idioma){

      let index = this.competencias.indexOf(idioma);

      if(index > -1){
          this.competencias.splice(index, 1);
      }
  }
  
}
