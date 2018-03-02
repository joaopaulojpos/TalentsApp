import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroProfissionalPage } from '../cadastro-profissional/cadastro-profissional';
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  chamaEditarPerfil(){
    this.navCtrl.push(CadastroProfissionalPage);
  }

}