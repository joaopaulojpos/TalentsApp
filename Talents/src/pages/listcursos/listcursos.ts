import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CursoPage } from '../curso/curso';
import { ProfissionalService } from '../../providers/profissional/profissional-service';

@IonicPage()
@Component({
  selector: 'page-listcursos',
  templateUrl: 'listcursos.html',
})
export class ListCursosPage {

  cursos: any = [];
 
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private toast: ToastController,
              private profissionalservice: ProfissionalService) {

  }

  async ionViewDidEnter(){
    this.carregaCursos(1);
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
    this.navCtrl.push(CursoPage);
  }

  editar(idioma){

  }

  deletar(idioma){

      let index = this.cursos.indexOf(idioma);

      if(index > -1){
          this.cursos.splice(index, 1);
      }
  }

}
