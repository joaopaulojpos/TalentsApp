import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CursoPage } from '../curso/curso';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { ListIdiomasPage } from '../list-idiomas/list-idiomas';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-listcursos',
  templateUrl: 'listcursos.html',
})
export class ListCursosPage {

  cursos: any = [];
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
    console.log(this.cd_profissional);
    this.carregaCursos(this.cd_profissional);
  }

  /**
   *Carrega uma lista no cursos
   */
  carregaCursos(cd_profissional){
    this.profissionalservice.getCursos(cd_profissional).subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.cursos = objeto.sucess;
        console.log(this.cursos);
    },error =>{
      console.log(error);
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
    }

  adicionar(){

    this.navCtrl.push(CursoPage,{ cd_profissional: this.cd_profissional });
  }

  editar(idioma){

  }

  deletar(idioma){

      let index = this.cursos.indexOf(idioma);

      if(index > -1){
          this.cursos.splice(index, 1);
      }
  }

  /***********************
   **Chama próxima tela**
   **********************/   
  avancar(){
    
    this.navCtrl.push(ListIdiomasPage,{ cd_profissional: this.cd_profissional });
  }
  alteracoes(){
    this.navCtrl.setRoot(MenuPage,{ cd_profissional: this.cd_profissional });
  }
}
