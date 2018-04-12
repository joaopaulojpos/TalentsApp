import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { VagasPage } from '../vagas/vagas';
import { PerfilPage } from '../perfil/perfil';
import { LoginPage } from '../login/login';
import { ConfigProvider } from '../../providers/config/config';
import { Profissional } from '../../domain/profissional/profissional';
import { ProfissionalPage } from '../profissional/profissional';
import { ProfissionalIdiomaPage } from '../profissional-idioma/profissional-idioma';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  providers: [
    ConfigProvider
  ]
})
export class MenuPage {
  rootPage = VagasPage;
  do = true;
  public profissional: Profissional;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    config: ConfigProvider
  ) {
  
  }
  ionViewDidEnter(){
    this.profissional = this.navParams.get('profissional');
    console.log(this.profissional);
  }

  
  abrirPerfil(){
    this.navCtrl.push(PerfilPage,{profissional: this.profissional});
  }
  sair(){
    this.menuCtrl.close();
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
    
  }
  chamaEditarPerfil(){
    this.navCtrl.push(ProfissionalPage,{profissional: this.profissional});
  }
  chamaHome(){
    this.navCtrl.push(ProfissionalIdiomaPage);
  }
}
