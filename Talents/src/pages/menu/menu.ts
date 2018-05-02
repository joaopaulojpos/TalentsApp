import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { VagasPage } from '../vagas/vagas';
import { PerfilPage } from '../perfil/perfil';
import { LoginPage } from '../login/login';
import { ConfigProvider } from '../../providers/config/config';
import { Profissional } from '../../providers/profissional/profissional';
import { ProfissionalPage } from '../profissional/profissional';
import { IdiomaPage } from '../idioma/idioma';

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
  public profissionalLogado: Profissional;
  public cd_profissional:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public config: ConfigProvider,
    public session: ConfigProvider
  ) 
  { }


  async getSession() {
    await this.session.get()
        .then(res => {
            this.profissionalLogado = (res);
            this.cd_profissional = this.profissionalLogado[0].cd_profissional;
        });
           
        console.log(this.session.exist());
  }

 async ionViewDidEnter(){
   await this.getSession();
  }

  
  abrirPerfil(){
    this.navCtrl.push(PerfilPage,{profissional: this.profissionalLogado});
  }
  sair(){
    this.menuCtrl.close();
    this.session.remove();
    this.navCtrl.setRoot(LoginPage);
    
  }
  chamaEditarPerfil(){
    this.navCtrl.push(ProfissionalPage,{profissional: this.profissionalLogado});
  }
  chamaHome(){
    this.navCtrl.push(IdiomaPage);
  }
}
