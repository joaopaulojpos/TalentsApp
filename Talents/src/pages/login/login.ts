import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CadastroProfissionalPage } from '../cadastro-profissional/cadastro-profissional';
import { ServicosProvider } from './../../providers/servicos/servicos';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model: Profissional;
  public email:string ;
  public senha:string ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private servicosProvider: ServicosProvider) {
    this.model = new Profissional();
  }
    cadastrarProfissional(){
      this.navCtrl.push(CadastroProfissionalPage);
    }
    login() {
      this.servicosProvider.login(this.model.ds_email, this.model.ds_senha)
        .then((result: any) => {
          if(result == 'erro: {Dados inválidos}'){
            this.toast.create({ message: 'Erro ao efetuar login '+ result, position: 'center', duration: 6000 }).present();

          }else{
             this.navCtrl.setRoot(TabsPage);
             console.log(result);
           }     
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



