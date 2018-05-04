import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CursoPage } from '../curso/curso';

@IonicPage()
@Component({
  selector: 'page-listcursos',
  templateUrl: 'listcursos.html',
})
export class ListCursosPage {

  cursos: any = [];
 
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

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
