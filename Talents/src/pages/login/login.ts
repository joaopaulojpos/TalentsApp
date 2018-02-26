import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CadastroProfissionalPage } from '../cadastro-profissional/cadastro-profissional';
import { CadastroProfissionalProvider } from './../../providers/cadastro-profissional/cadastro-profissional';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model: Profissional;
  public email:string ;
  public senha:string ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private cadastroProfissionalProvider: CadastroProfissionalProvider) {
    this.model = new Profissional();
    this.model.ds_email ='';
    this.model.ds_senha ='' ;
  }
    cadastrarProfissional(){
      this.navCtrl.push(CadastroProfissionalPage);
    }
    login() {
      this.cadastroProfissionalProvider.login(this.model.ds_email, this.model.ds_senha)
        .then((result: any) => {
          this.toast.create({ message: 'Usuário logado com sucesso.' + result.token, position: 'botton', duration: 6000 }).present();
          this.navCtrl.setRoot(TabsPage);
        })
        .catch((error: any) => {
          this.toast.create({ message: 'Erro ao efetuar login. Erro: ' + error.error, position: 'botton', duration: 6000 }).present();
        });
    }
  }
export class Profissional {
  ds_email: string;
  ds_senha: string;
}



