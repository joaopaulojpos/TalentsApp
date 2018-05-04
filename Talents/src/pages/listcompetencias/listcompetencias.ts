import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CompetenciaPage } from '../competencia/competencia';
import { ProfissionalService } from '../../providers/profissional/profissional-service';

@IonicPage()
@Component({
  selector: 'page-listcompetencias',
  templateUrl: 'listcompetencias.html',
})
export class ListCompetenciasPage {
  competencias: any = [];
 
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private toast: ToastController,
              private profissionalservice: ProfissionalService
            ) {

  }
  async ionViewDidEnter(){
    this.carregaCompetencias(1);
  }

  carregaCompetencias(cd_profissional){
    this.profissionalservice.getCompetencias(cd_profissional).subscribe(data =>{
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
