import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CompetenciaPage } from '../competencia/competencia';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-listcompetencias',
  templateUrl: 'listcompetencias.html',
})
export class ListCompetenciasPage {
  competencias: any = [];
  public cd_profissional;
 
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private toast: ToastController,
              private profissionalservice: ProfissionalService,
              public navParams: NavParams
            ) {

              this.cd_profissional = navParams.get("cd_profissional");
              console.log(this.cd_profissional);

  }
  async ionViewDidEnter(){
    this.carregaCompetencias(this.cd_profissional);
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
    console.log(this.cd_profissional);
    this.navCtrl.push(CompetenciaPage,{ cd_profissional: this.cd_profissional });
  }

  editar(competencia){

  }

  deletar(competencia){

      let index = this.competencias.indexOf(competencia);

      if(index > -1){
          this.competencias.splice(index, 1);
      }
  }

  /***********************
   **Chama próxima tela**
   **********************/   
  avancar(){
    this.navCtrl.setRoot(LoginPage);
  }
  
}
