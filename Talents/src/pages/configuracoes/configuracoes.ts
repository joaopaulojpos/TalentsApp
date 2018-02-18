import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagasPage } from '../vagas/vagas';
import { PerfilPage } from '../perfil/perfil';
import { FavoritasPage } from '../favoritas/favoritas';


@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {
  rootPage = VagasPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  abrirPerfil(){
    this.navCtrl.push(PerfilPage);
  }

  abrirVagas(){
    this.navCtrl.push(VagasPage);
  }
  abrirFavoritas(){
    this.navCtrl.push(FavoritasPage);
  }
}
