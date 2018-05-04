import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IdiomaPage } from '../idioma/idioma';

@IonicPage()
@Component({
  selector: 'page-list-idiomas',
  templateUrl: 'list-idiomas.html',
})
export class ListIdiomasPage {

  idiomas: any = [];
 
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  adicionar(){
    this.navCtrl.push(IdiomaPage);
  }

  editar(idioma){

  }

  deletar(idioma){

      let index = this.idiomas.indexOf(idioma);

      if(index > -1){
          this.idiomas.splice(index, 1);
      }
  }

}
