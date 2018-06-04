import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { IdiomaPage } from '../idioma/idioma';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { ListCompetenciasPage } from '../listcompetencias/listcompetencias';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-list-idiomas',
  templateUrl: 'list-idiomas.html',
})
export class ListIdiomasPage {

  idiomas: any = [];
  public cd_profissional;
  public tela;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private toast: ToastController,
              private profissionalservice: ProfissionalService,
              public navParams: NavParams) {
                this.tela = navParams.get("tela");
                this.cd_profissional = navParams.get("cd_profissional");
                console.log(this.cd_profissional);
  }

  async ionViewDidEnter(){
    this.carregaIdiomas(this.cd_profissional);
    console.log(this.cd_profissional);
  }

  carregaIdiomas(cd_profissional){
    this.profissionalservice.getIdiomas(cd_profissional).subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.idiomas = objeto.sucess;
        console.log(this.idiomas);
    },error =>{
      console.log(error);
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
    }


  adicionar(){
    this.navCtrl.push(IdiomaPage,{ cd_profissional: this.cd_profissional });
  }

  editar(idioma){

  }

  deletar(idioma){

      let index = this.idiomas.indexOf(idioma);

      if(index > -1){
          this.idiomas.splice(index, 1);
      }
  }

  /***********************
   **Chama próxima tela**
   **********************/   
  avancar(){
    console.log( this.cd_profissional);
    this.navCtrl.push(ListCompetenciasPage,{ cd_profissional: this.cd_profissional });
  }
  alteracoes(){
    this.navCtrl.setRoot(MenuPage,{ cd_profissional: this.cd_profissional });
  }
}
