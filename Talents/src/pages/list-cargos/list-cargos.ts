import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { CargoPage } from '../cargo/cargo';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { ListCursosPage } from '../listcursos/listcursos';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-list-cargos',
  templateUrl: 'list-cargos.html',
})
export class ListCargosPage {

  cargos: any = [];
  public cd_profissional;
  public tela;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private toast: ToastController,
              private profissionalservice: ProfissionalService,
              public navParams: NavParams) {
                this.tela = navParams.get("tela");
                this.cd_profissional = navParams.get("cd_profissional");
  }

  async ionViewDidEnter(){
    this.carregaCargos(this.cd_profissional);
  }

  /*******************************
   **Carrega uma lista no cargos**
   *******************************/
  carregaCargos(cd_profissional){
    this.profissionalservice.getCargos(cd_profissional).subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.cargos = objeto.sucess;
        console.log(this.cargos);
    },error =>{
      console.log(error);
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
    }

  /*********************************
   **Chama tela de cadastrar cargo**
   *********************************/    
  adicionar(){
    this.navCtrl.push(CargoPage,{ cd_profissional: this.cd_profissional });
  }

  editar(cargo){

  }

  deletar(cargo){

      let index = this.cargos.indexOf(cargo);

      if(index > -1){
          this.cargos.splice(index, 1);
      }
  }

  /***********************
   **Chama próxima tela**
   **********************/   
  avancar(){
    this.navCtrl.push(ListCursosPage,{ cd_profissional: this.cd_profissional });
  }
  alteracoes(){
    this.navCtrl.push(MenuPage,{ cd_profissional: this.cd_profissional });
  }

}
